import { languagesService as service } from "@/server/services/languages.service";
import { assertMutation, jsonBody, respond } from "@/server/http";
export const runtime = "nodejs";
export async function GET() { return respond(() => service.list()); }
export async function POST(request: Request) {
  return respond(async () => { assertMutation(request); return service.save(await jsonBody(request)); }, 201);
}
