"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { primaryButton, button, panel } from "@/components/ui/styles";
export default function PageClient({ hasError }: { hasError: boolean }) {
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState(hasError ? "Não foi possível entrar. Tente novamente com seu provedor." : "");
  async function login(provider: "google" | "github") {
    setPending(provider); setError("");
    try { await signIn(provider, { callbackUrl: "/dashboard" }); }
    catch { setError("Falha ao iniciar o login. Tente novamente."); setPending(null); }
  }
  return <section className={`${panel} mx-auto my-8 max-w-md space-y-5`}>
    <h1 className="text-2xl font-bold">Seus currículos, em um só lugar</h1>
    <p>Entre para organizar suas informações profissionais.</p>
    {error && <p role="alert" className="text-red-700 dark:text-red-300">{error}</p>}
    <div className="flex flex-col gap-3">
      <button className={primaryButton} disabled={!!pending} onClick={() => login("google")}>{pending === "google" ? "Entrando..." : "Entrar com Google"}</button>
      <button className={button} disabled={!!pending} onClick={() => login("github")}>{pending === "github" ? "Entrando..." : "Entrar com GitHub"}</button>
    </div>
    <p className="text-sm">Use sempre o mesmo provedor para acessar seus dados. Google e GitHub criam contas separadas nesta versão.</p>
    <p className="text-sm">Ao continuar, você concorda com os <Link href="/terms">termos</Link> e a <Link href="/privacy">política de privacidade</Link>.</p>
  </section>;
}
