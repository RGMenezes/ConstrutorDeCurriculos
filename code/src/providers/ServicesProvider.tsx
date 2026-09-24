"use client";
import { createContext, useState, type ReactNode } from "react";
import { createServices, type Services } from "@/services";
import { apiClient } from "@/lib/http/apiClient";
export const ServicesContext = createContext<Services | null>(null);
export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services] = useState(() => createServices(apiClient));
  return <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>;
}
