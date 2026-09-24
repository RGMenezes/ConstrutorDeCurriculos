"use client";
import { useEffect, useId, useRef } from "react";
import { button } from "./styles";
export default function Modal({ title, busy = false, onClose, children }: { title: string; busy?: boolean; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    if (dialog && !dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return <dialog ref={ref} aria-labelledby={titleId} aria-busy={busy} onCancel={event => { event.preventDefault(); if (!busy) onClose(); }} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-xl overflow-y-auto rounded-xl border border-solid border-slate-200 bg-white p-5 text-slate-900 shadow-xl backdrop:bg-black/60 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
    <div className="mb-5 flex items-center justify-between gap-3"><h2 id={titleId} className="text-xl font-bold">{title}</h2><button type="button" className={button} disabled={busy} onClick={onClose} aria-label="Fechar janela">Fechar</button></div>
    {children}
  </dialog>;
}
