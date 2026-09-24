import "server-only";
import { randomUUID } from "node:crypto";
import { Schema, model, models, type Model, type SchemaDefinition } from "mongoose";
import type { EntityMap, Resource } from "@/types/entities";
export type Stored<K extends Resource> = Omit<EntityMap[K], "id"> & { _id: string };
export function defineModel<K extends Resource>(name: K, fields: SchemaDefinition) {
  const schema = new Schema({
    _id: { type: String, default: randomUUID },
    user_id: { type: String, required: true, index: true, immutable: true, ref: "AppUser" },
    ...fields
  }, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, strict: "throw", versionKey: false });
  schema.index({ user_id: 1, created_at: -1 });
  return (models[name] ?? model(name, schema, name)) as Model<Stored<K>>;
}
