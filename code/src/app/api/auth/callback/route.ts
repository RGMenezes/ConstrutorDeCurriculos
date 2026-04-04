import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const rawNext = searchParams.get("next");
  const next = rawNext?.startsWith("/dashboard") ? rawNext : "/dashboard";

  if (code) {
    const supabase = await createClient(await cookies());
    
    // Troca o código (code) por uma sessão (session)
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Se houver erro na troca do código, manda de volta para o login com uma flag de erro
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}