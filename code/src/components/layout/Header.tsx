"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ThemeSelect from "@/components/ui/ThemeSelect";
export default function Header() {
  const { data: session } = useSession();
  return <header className="border-0 border-b border-solid border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
      <Link href="/" className="text-lg font-bold no-underline">Construtor de Currículos</Link>
      <nav aria-label="Principal" className="flex flex-wrap items-center gap-4 text-sm">
        {session?.user ? <><Link href="/dashboard">Currículos</Link><Link href="/dashboard/profile">Perfil</Link><Link href="/dashboard/settings">Conta</Link></> : <><Link href="/about">Sobre</Link><Link href="/login">Entrar</Link></>}
        <ThemeSelect />
      </nav>
    </div>
  </header>;
}
