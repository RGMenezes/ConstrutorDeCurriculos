import { dataKey } from "@/server/dataKey";
import { notFound } from "next/navigation";
import { loadData } from "@/server/components/DataBoundary";
import { DataProvider } from "@/providers/DataProvider";
import PageClient from "./pageClient";
export default async function Page({ searchParams }: { searchParams: Promise<{ type?: string; id?: string }> }) {
  const { type = "personal", id } = await searchParams;
  const resource = type === "personal" ? "profiles" : type === "address" ? "addresses" : type === "link" ? "links" : null;
  if (!resource) notFound();
  const data = await loadData([resource]);
  const initial = id ? data[resource]?.find(item => item.id === id) : undefined;
  if (id && !initial) notFound();
  return <DataProvider key={dataKey(data)} initial={data}><PageClient resource={resource} initial={initial} /></DataProvider>;
}
