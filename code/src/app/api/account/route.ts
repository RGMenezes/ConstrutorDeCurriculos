import { accountService } from "@/server/services/account.service";
import { assertMutation, jsonBody, respond } from "@/server/http";
export const runtime = "nodejs";
export async function GET() { return respond(() => accountService.get()); }
export async function PUT(request: Request) {
  return respond(async () => { assertMutation(request); return accountService.update(await jsonBody(request)); });
}
export async function DELETE(request: Request) {
  return respond(async () => { assertMutation(request); await accountService.remove(); return null; });
}
