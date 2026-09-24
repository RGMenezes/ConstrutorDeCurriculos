"use client";
import { useContext } from "react";
import { ServicesContext } from "@/providers/ServicesProvider";
export function useServices() {
  const services = useContext(ServicesContext);
  if (!services) throw new Error("useServices exige ServicesProvider.");
  return services;
}
