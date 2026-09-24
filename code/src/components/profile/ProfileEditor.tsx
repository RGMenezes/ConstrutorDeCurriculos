"use client";
import { useId, useState, type FormEvent } from "react";
import type { EntityMap } from "@/types/entities";
import { useResourceMutations } from "@/hooks/useResourceMutations";
import { entitySchemas } from "@/schemas/entities";
import { profileFields, type ProfileResource } from "./fields";
import { button, primaryButton, input } from "@/components/ui/styles";
export default function ProfileEditor<K extends ProfileResource>({ resource, initial, onDone, onCancel, onBusy }: {
  resource: K; initial?: EntityMap[K]; onDone: () => void; onCancel: () => void; onBusy?: (busy: boolean) => void;
}) {
  const prefix = useId();
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(profileFields[resource].map(field => [field.name, String((initial as unknown as Record<string, unknown> | undefined)?.[field.name] ?? "")])));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const { save } = useResourceMutations(resource);
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    const result = entitySchemas[resource].safeParse(values);
    if (!result.success) { setError(result.error.issues[0].message); return; }
    setBusy(true); onBusy?.(true); setError("");
    const saved = await save({ ...result.data, id: initial?.id } as unknown as Parameters<typeof save>[0]);
    setBusy(false); onBusy?.(false);
    if (saved.success) onDone(); else setError(saved.error ?? "Não foi possível salvar.");
  }
  return <form onSubmit={submit} className="space-y-4">
    {error && <p role="alert" className="text-red-700 dark:text-red-300">{error}</p>}
    <fieldset disabled={busy} className="space-y-4 border-0 p-0">
      {profileFields[resource].map(field => {
        const type = "type" in field ? field.type : "text";
        const required = "required" in field && field.required;
        const id = `${prefix}-${field.name}`;
        return <div key={field.name} className="space-y-1"><label htmlFor={id} className="block text-sm font-semibold">{field.label}{required ? " *" : ""}</label>
          {type === "textarea" ? <textarea id={id} className={`${input} min-h-36`} maxLength={12000} value={values[field.name]} onChange={e => setValues({ ...values, [field.name]: e.target.value })} />
            : <input id={id} className={input} type={type} required={required} maxLength={field.name === "url" ? 2000 : 200} value={values[field.name]} onChange={e => setValues({ ...values, [field.name]: e.target.value })} />}
        </div>;
      })}
    </fieldset>
    <div className="flex justify-end gap-3"><button className={button} type="button" disabled={busy} onClick={onCancel}>Cancelar</button><button className={primaryButton} disabled={busy} type="submit">{busy ? "Salvando..." : "Salvar"}</button></div>
  </form>;
}
