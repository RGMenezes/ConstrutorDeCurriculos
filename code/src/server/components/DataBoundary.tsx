import { dataKey } from "@/server/dataKey";
import "server-only";
import type { ReactNode } from "react";
import type { EntityData, Resource } from "@/types/entities";
import { serverServices } from "../services";
import { DataProvider } from "@/providers/DataProvider";
export async function loadData(resources: Resource[]) {
  const entries = await Promise.all(resources.map(async resource => [resource, await serverServices[resource].list()] as const));
  return Object.fromEntries(entries) as Partial<EntityData>;
}
export default async function DataBoundary({ resources, children }: { resources: Resource[]; children: ReactNode }) {
  const data = await loadData(resources);
  return <DataProvider key={dataKey(data)} initial={data}>{children}</DataProvider>;
}
