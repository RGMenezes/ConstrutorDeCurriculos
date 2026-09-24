const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
// These unit tests use model doubles. OAuth and real MongoDB transactions require integration checks.
function load(file, dependencies = {}) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const result = { exports: {} };
  const requireDependency = name => {
    if (name === "server-only") return {};
    if (name === "next/cache") return { revalidatePath() {} };
    if (name in dependencies) return dependencies[name];
    return require(name);
  };
  vm.runInThisContext(`(function(require, module, exports) { ${output}\n})`, { filename: file })(requireDependency, result, result.exports);
  return result.exports;
}
const { entitySchemas } = load("src/schemas/entities.ts");
const { ServiceError } = load("src/server/errors.ts");
const owner = "4e086bd9-dab8-4c35-adf5-88c7ecb7c907";
const other = "1ac3a6f3-88c8-45c4-8b42-714c14468d54";
const id = "2ad84bd4-7188-4c4f-80fd-a120c7d0bb61";
function fixture(authenticated = true) {
  let record = { _id: id, user_id: owner, name: "Nome", email: "", phone: "", description: "" };
  const calls = [];
  const matches = query => record && query.user_id === record.user_id && (!query._id || query._id === record._id);
  const model = {
    find(query) { calls.push(query); return { sort: () => ({ lean: async () => matches(query) ? [record] : [] }) }; },
    findOne(query) { calls.push(query); return { lean: async () => matches(query) ? record : null }; },
    findOneAndUpdate(query, update) {
      calls.push(query);
      return { lean: async () => { if (!matches(query)) return null; record = { ...record, ...update.$set }; return record; } };
    },
    async create(data) { calls.push(data); return { toObject: () => ({ _id: id, ...data }) }; },
    deleteOne(query) {
      calls.push(query);
      return { session: async () => { const count = matches(query) ? 1 : 0; if (count) record = null; return { deletedCount: count }; } };
    }
  };
  let sessionUser = owner;
  const pulls = [];
  const { createDataService } = load("src/server/services/base.ts", {
    "../db/mongoose": { connectDB: async () => ({ connection: { transaction: async fn => fn({}) } }) },
    "../models/curriculums": { curriculumsModel: { updateMany: (query, update) => ({ session: async () => { pulls.push({ query, update }); } }) } },
    "../auth": { requireUser: async () => { if (!authenticated) throw new ServiceError("Unauthorized", 401); return { id: sessionUser }; } },
    "../errors": { ServiceError },
    "@/schemas/entities": { entitySchemas }
  });
  return { service: createDataService("profiles", model), calls, pulls, useOtherUser() { sessionUser = other; } };
}
test("unauthenticated operations never reach a model", async () => {
  for (const operation of [s => s.list(), s => s.get(id), s => s.save({ name: "A" }), s => s.save({ name: "A" }, id), s => s.remove(id)]) {
    const f = fixture(false);
    await assert.rejects(operation(f.service), error => error.status === 401);
    assert.equal(f.calls.length, 0);
  }
});
test("another user's record cannot be read, edited or deleted", async () => {
  const f = fixture(); f.useOtherUser();
  assert.equal((await f.service.list()).length, 0);
  await assert.rejects(f.service.get(id), error => error.status === 404);
  await assert.rejects(f.service.save({ name: "Injected" }, id), error => error.status === 404);
  await assert.rejects(f.service.remove(id), error => error.status === 404);
  assert.ok(f.calls.every(query => query.user_id === other));
  assert.equal(f.pulls.length, 0);
});
test("payload cannot choose owner or database ID", async () => {
  const f = fixture();
  const value = await f.service.save({ name: "Valid", user_id: other, _id: other, id: other, created_at: "fake" });
  assert.equal(value.user_id, owner);
  assert.equal(value.id, id);
  assert.equal(f.calls[0]._id, undefined);
  assert.equal(f.calls[0].created_at, undefined);
});
test("editing keeps the same shared identity and is visible on the next read", async () => {
  const f = fixture();
  const updated = await f.service.save({ name: "Updated" }, id);
  assert.equal(updated.id, id);
  assert.equal((await f.service.get(id)).name, "Updated");
});
test("deleting pulls references only from owned curricula", async () => {
  const f = fixture(); await f.service.remove(id);
  assert.deepEqual(f.pulls, [{ query: { user_id: owner, profile_ids: id }, update: { $pull: { profile_ids: id } } }]);
});
test("invalid IDs are rejected before database work", async () => {
  const f = fixture();
  await assert.rejects(f.service.get("not-an-id"), error => error.status === 400);
  assert.equal(f.calls.length, 0);
});
test("schemas reject unsafe links, invalid dates and excessive profile selections", () => {
  assert.equal(entitySchemas.links.safeParse({ name: "Link", url: "javascript:alert(1)" }).success, false);
  assert.equal(entitySchemas.work.safeParse({ company: "A", position: "B", start_date: "2026-02-30" }).success, false);
  assert.equal(entitySchemas.work.safeParse({ company: "A", position: "B", start_date: "2026-03-01", end_date: "2026-02-01" }).success, false);
  assert.equal(entitySchemas.curriculums.safeParse({ name: "CV", profile_ids: [owner, id] }).success, false);
  assert.equal(entitySchemas.curriculums.safeParse({ name: "CV", profile_ids: [id] }).success, true);
});
test("mutating HTTP requests require JSON and the configured origin", () => {
  const { assertMutation } = load("src/server/http.ts", { "next/server": {}, "./errors": { ServiceError } });
  const previous = process.env.AUTH_URL;
  process.env.AUTH_URL = "http://localhost:3000";
  try {
    const request = (origin, type = "application/json") => ({ headers: new Headers({ ...(origin ? { origin } : {}), "content-type": type }) });
    assert.throws(() => assertMutation(request("https://other.example")), error => error.status === 403);
    assert.throws(() => assertMutation(request(null)), error => error.status === 403);
    assert.throws(() => assertMutation(request("http://localhost:3000", "text/plain")), error => error.status === 415);
    assert.doesNotThrow(() => assertMutation(request("http://localhost:3000")));
  } finally { if (previous === undefined) delete process.env.AUTH_URL; else process.env.AUTH_URL = previous; }
});
test("curriculum references must all belong to the authenticated owner", async () => {
  const names = ["profiles", "addresses", "links", "work", "formation", "skills", "languages", "feedbacks"];
  const dependencies = { "../errors": { ServiceError } };
  for (const name of names) dependencies[`../models/${name}`] = {
    [`${name}Model`]: { countDocuments: async query => query.user_id === owner ? query._id.$in.filter(value => value === id).length : 0 }
  };
  const { validateReferences } = load("src/server/services/references.ts", dependencies);
  await assert.doesNotReject(validateReferences({ profile_ids: [id] }, owner));
  await assert.rejects(validateReferences({ profile_ids: [other] }, owner), error => error.status === 400);
  await assert.rejects(validateReferences({ profile_ids: [id] }, other), error => error.status === 400);
});
