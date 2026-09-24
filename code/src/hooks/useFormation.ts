"use client";
import { useData } from "@/providers/DataProvider";
export function useFormation() {
  const { data } = useData();
  return { formation: data.formation ?? [], loading: false, error: null as string | null };
}
