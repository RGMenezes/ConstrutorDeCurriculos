"use client";
import { useData } from "@/providers/DataProvider";
export function useWork() {
  const { data } = useData();
  return { work: data.work ?? [], loading: false, error: null as string | null };
}
