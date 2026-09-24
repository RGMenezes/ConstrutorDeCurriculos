"use client";
import { useData } from "@/providers/DataProvider";
export function useSkill() {
  const { data } = useData();
  return { skills: data.skills ?? [], loading: false, error: null as string | null };
}
