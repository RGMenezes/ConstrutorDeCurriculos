"use client";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
const subscribe = () => () => {};
export default function ThemeSelect() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const { theme, setTheme } = useTheme();
  return <label className="flex items-center gap-2 text-sm">Tema
    <select aria-label="Tema de aparência" className="rounded-lg border border-solid border-slate-300 bg-white px-2 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white" value={mounted ? theme : "system"} onChange={event => setTheme(event.target.value)}>
      <option value="system">Sistema</option><option value="light">Claro</option><option value="dark">Escuro</option>
    </select>
  </label>;
}
