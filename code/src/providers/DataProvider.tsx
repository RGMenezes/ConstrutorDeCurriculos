"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { EntityData, EntityMap, Resource } from "@/types/entities";
type Store = { data: Partial<EntityData>; replace: <K extends Resource>(key: K, item: EntityMap[K]) => void; remove: (key: Resource, id: string) => void };
const Context = createContext<Store | null>(null);
export function DataProvider({ initial, children }: { initial: Partial<EntityData>; children: ReactNode }) {
  const [data, setData] = useState(initial);
  function replace<K extends Resource>(key: K, item: EntityMap[K]) {
    setData(previous => ({ ...previous, [key]: previous[key]?.some(value => value.id === item.id)
      ? previous[key]?.map(value => value.id === item.id ? item : value)
      : [item, ...(previous[key] ?? [])] }));
  }
  function remove(key: Resource, id: string) {
    setData(previous => ({ ...previous, [key]: previous[key]?.filter(value => value.id !== id) }));
  }
  return <Context.Provider value={{ data, replace, remove }}>{children}</Context.Provider>;
}
export function useData() {
  const store = useContext(Context);
  if (!store) throw new Error("Esta página precisa de DataProvider.");
  return store;
}
