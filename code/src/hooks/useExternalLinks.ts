"use client";
import { useData } from "@/providers/DataProvider";
export function useExternalLinks() {
  const { data } = useData();
  return { links: data.links ?? [], loading: false, error: null as string | null };
}
