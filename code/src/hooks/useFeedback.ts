"use client";
import { useData } from "@/providers/DataProvider";
export function useFeedback() {
  const { data } = useData();
  return { feedbacks: data.feedbacks ?? [], loading: false, error: null as string | null };
}
