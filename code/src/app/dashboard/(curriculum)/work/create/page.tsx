import { dataKey } from "@/server/dataKey";
import { notFound } from "next/navigation";
import { loadData } from "@/server/components/DataBoundary";
import { DataProvider } from "@/providers/DataProvider";
import PageClient from "./pageClient";
export default async function Page({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const data = await loadData(["work"]);
  const initialData = id ? data.work?.find(item => item.id === id) : undefined;
  if (id && !initialData) notFound();
  return <DataProvider key={dataKey(data)} initial={data}><PageClient initialData={initialData} /></DataProvider>;
}
