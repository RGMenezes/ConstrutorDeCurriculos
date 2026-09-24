"use client";
import { useData } from "@/providers/DataProvider";
export function useProfile() {
  const { data } = useData();
  return { profiles: data.profiles ?? [], loading: false, error: null as string | null };
}
