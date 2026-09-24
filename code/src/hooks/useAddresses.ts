"use client";
import { useData } from "@/providers/DataProvider";
export function useAddresses() {
  const { data } = useData();
  return { addresses: data.addresses ?? [], loading: false, error: null as string | null };
}
