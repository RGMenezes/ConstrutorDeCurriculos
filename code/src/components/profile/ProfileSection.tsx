"use client";
import { useState } from "react";
import type { EntityMap } from "@/types/entities";
import { useData } from "@/providers/DataProvider";
import { useResourceMutations } from "@/hooks/useResourceMutations";
import Modal from "@/components/ui/Modal";
import { button, primaryButton, dangerButton, panel } from "@/components/ui/styles";
import ProfileEditor from "./ProfileEditor";
import { profileLabels, profileFields, type ProfileResource } from "./fields";
export default function ProfileSection<K extends ProfileResource>({ resource, title }: { resource: K; title: string }) {
  const { data } = useData();
  const items = (data[resource] ?? []) as EntityMap[K][];
  const { remove } = useResourceMutations(resource);
  const [editing, setEditing] = useState<{ item?: EntityMap[K] } | null>(null);
  const [deleting, setDeleting] = useState<EntityMap[K] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function confirmDelete() {
    if (!deleting?.id || busy) return;
    setBusy(true); setError("");
    const result = await remove(deleting.id);
    setBusy(false);
    if (result.success) setDeleting(null); else setError(result.error ?? "Não foi possível excluir.");
  }
  return <section className={`${panel} space-y-5`}>
    <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-bold">{title}</h2><button className={primaryButton} onClick={() => setEditing({})}>Adicionar {profileLabels[resource].toLowerCase()}</button></div>
    {items.length === 0 ? <p className="text-sm text-slate-600 dark:text-slate-300">Nenhum item cadastrado. Adicione o primeiro para utilizar nos seus currículos.</p> : <ul className="list-none space-y-3">
      {items.map(item => <li key={item.id} className="flex flex-wrap items-start justify-between gap-4 rounded-lg border border-solid border-slate-200 p-4 dark:border-slate-600">
        <dl className="min-w-0 flex-1 space-y-2">{profileFields[resource].map(field => {
          const value = String((item as unknown as Record<string, unknown>)[field.name] ?? "");
          return value && <div key={field.name}><dt className="text-xs font-semibold text-slate-500 dark:text-slate-300">{field.label}</dt><dd className="m-0 whitespace-pre-wrap break-words text-sm">{field.name === "url" ? <a href={value} target="_blank" rel="noopener noreferrer">{value}</a> : value}</dd></div>;
        })}</dl>
        <div className="flex gap-2"><button className={button} onClick={() => setEditing({ item })}>Editar</button><button className={button} onClick={() => { setError(""); setDeleting(item); }}>Excluir</button></div>
      </li>)}
    </ul>}
    {editing && <Modal title={`${editing.item ? "Editar" : "Adicionar"} ${profileLabels[resource].toLowerCase()}`} busy={busy} onClose={() => setEditing(null)}><ProfileEditor resource={resource} initial={editing.item} onBusy={setBusy} onDone={() => setEditing(null)} onCancel={() => setEditing(null)} /></Modal>}
    {deleting && <Modal title={`Excluir ${profileLabels[resource].toLowerCase()}?`} busy={busy} onClose={() => setDeleting(null)}>
      <p className="mb-4">Este item será removido do cadastro e deixará de aparecer em todos os currículos que o utilizam. Esta ação não pode ser desfeita.</p>
      {error && <p role="alert" className="mb-4 text-red-700 dark:text-red-300">{error}</p>}
      <div className="flex justify-end gap-3"><button className={button} disabled={busy} onClick={() => setDeleting(null)}>Cancelar</button><button className={dangerButton} disabled={busy} onClick={confirmDelete}>{busy ? "Excluindo..." : "Excluir"}</button></div>
    </Modal>}
  </section>;
}
