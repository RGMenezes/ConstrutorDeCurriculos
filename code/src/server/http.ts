import "server-only";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ServiceError } from "./errors";
export function assertMutation(request: Request) {
  const configuredOrigin = process.env.AUTH_URL;
  const origin = request.headers.get("origin");
  // Browser requests must be same-origin. Server requests carry the configured origin explicitly.
  if (!configuredOrigin || origin !== new URL(configuredOrigin).origin) throw new ServiceError("Origem da requisição inválida.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new ServiceError("Use JSON na requisição.", 415);
}
export async function jsonBody(request: Request) {
  const text = await request.text();
  if (text.length > 100000) throw new ServiceError("Conteúdo muito grande.", 413);
  try { return JSON.parse(text); } catch { throw new ServiceError("JSON inválido."); }
}
export async function respond(operation: () => Promise<unknown>, status = 200) {
  try { return NextResponse.json({ data: await operation() }, { status, headers: { "Cache-Control": "private, no-store" } }); }
  catch (error) {
    if (error instanceof ZodError) return NextResponse.json({ error: error.issues[0]?.message ?? "Dados inválidos" }, { status: 400 });
    if (error instanceof ServiceError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error("Falha na operação de dados", error instanceof Error ? error.name : "UnknownError");
    return NextResponse.json({ error: "Não foi possível concluir. Tente novamente." }, { status: 500 });
  }
}
