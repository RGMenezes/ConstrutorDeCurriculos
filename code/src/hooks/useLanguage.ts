"use client";
import { useData } from "@/providers/DataProvider";
export function useLanguage() {
  const { data } = useData();
  return { languages: data.languages ?? [], loading: false, error: null as string | null };
}
