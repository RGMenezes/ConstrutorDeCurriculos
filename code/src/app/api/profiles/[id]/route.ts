import { profilesService as service } from "@/server/services/profiles.service";
import { assertMutation, jsonBody, respond } from "@/server/http";
export const runtime = "nodejs";
type Context = { params: Promise<{ id: string }> };
export async function GET(_request: Request, context: Context) { return respond(async () => service.get((await context.params).id)); }
export async function PUT(request: Request, context: Context) {
  return respond(async () => { assertMutation(request); return service.save(await jsonBody(request), (await context.params).id); });
}
export async function DELETE(request: Request, context: Context) {
  return respond(async () => { assertMutation(request); await service.remove((await context.params).id); return null; });
}
