"use client";
import Link from "next/link";
import { button, panel } from "@/components/ui/styles";
export default function DashboardError({ reset }: { reset: () => void }) {
  return <section className={`${panel} space-y-4`} role="alert"><h2 className="text-xl font-bold">Não foi possível carregar seus dados</h2><p>Tente novamente. Se o problema continuar, confira sua sessão e a conexão com o banco.</p><div className="flex flex-wrap gap-3"><button className={button} onClick={reset}>Tentar novamente</button><Link className={button} href="/login">Voltar ao login</Link></div></section>;
}
