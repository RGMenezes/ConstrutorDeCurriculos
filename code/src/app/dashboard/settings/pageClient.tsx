"use client";
import { useState, type FormEvent } from "react";
import { signOut } from "next-auth/react";
import type { AccountInfo } from "@/types/account";
import { useServices } from "@/hooks/useServices";
import { errorMessage } from "@/lib/http/error";
import Modal from "@/components/ui/Modal";
import { panel, button, primaryButton, dangerButton, input } from "@/components/ui/styles";
export default function PageClient({ account }: { account: AccountInfo }) {
  const services = useServices();
  const [user, setUser] = useState(account);
  const [name, setName] = useState(account.name);
  const [mode, setMode] = useState<"edit" | "delete" | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function save(event: FormEvent) {
    event.preventDefault(); if (busy) return; setBusy(true); setError("");
    try { setUser(await services.account.update(name)); setMode(null); } catch (error) { setError(errorMessage(error)); }
    finally { setBusy(false); }
  }
  async function remove() {
    if (busy) return; setBusy(true); setError("");
    try { await services.account.remove(); await signOut({ callbackUrl: "/" }); }
    catch (error) { setError(errorMessage(error)); setBusy(false); }
  }
  return <section className={`${panel} mx-auto max-w-2xl space-y-5`}>
    <h1 className="text-3xl font-bold">Minha conta</h1>
    <dl className="space-y-3"><div><dt className="text-sm">Nome de exibição</dt><dd className="m-0 font-semibold">{user.name}</dd></div><div><dt className="text-sm">E-mail do login</dt><dd className="m-0 break-words">{user.email || "Não informado pelo provedor"}</dd></div><div><dt className="text-sm">Provedor</dt><dd className="m-0">{user.provider === "google" ? "Google" : "GitHub"}</dd></div></dl>
    <p className="text-sm">O e-mail de login é gerenciado pelo seu provedor. Você pode usar outro contato nos seus perfis profissionais.</p>
    <div className="flex flex-wrap gap-3"><button className={button} onClick={() => { setName(user.name); setError(""); setMode("edit"); }}>Editar nome</button><button className={button} onClick={() => signOut({ callbackUrl: "/" })}>Sair</button><button className={dangerButton} onClick={() => { setError(""); setMode("delete"); }}>Excluir conta</button></div>
    {mode && <Modal title={mode === "edit" ? "Editar nome" : "Excluir sua conta?"} busy={busy} onClose={() => setMode(null)}>
      {error && <p role="alert" className="mb-4 text-red-700 dark:text-red-300">{error}</p>}
      {mode === "edit" ? <form onSubmit={save} className="space-y-4"><label htmlFor="account-name" className="block">Nome</label><input id="account-name" className={input} value={name} disabled={busy} onChange={e => setName(e.target.value)} required maxLength={200} /><button type="submit" className={primaryButton} disabled={busy}>{busy ? "Salvando..." : "Salvar"}</button></form>
        : <><p className="mb-5">Todos os seus currículos e dados cadastrados nesta conta serão apagados permanentemente.</p><div className="flex flex-wrap justify-end gap-3"><button className={button} disabled={busy} onClick={() => setMode(null)}>Cancelar</button><button className={dangerButton} disabled={busy} onClick={remove}>{busy ? "Excluindo..." : "Excluir meus dados e conta"}</button></div></>}
    </Modal>}
  </section>;
}
