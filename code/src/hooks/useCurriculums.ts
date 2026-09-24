"use client";
import { useData } from "@/providers/DataProvider";
export function useCurriculums() {
  const { data } = useData();
  return { curriculums: data.curriculums ?? [], loading: false, error: null as string | null };
}
