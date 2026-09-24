import { accountService } from "@/server/services/account.service";
import { assertMutation, respond } from "@/server/http";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return respond(async () => { assertMutation(request); await accountService.remove(); return null; });
}
