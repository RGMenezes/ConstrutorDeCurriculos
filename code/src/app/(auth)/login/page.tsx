import { redirect } from "next/navigation";
import { currentUser } from "@/server/auth";
import PageClient from "./pageClient";
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await currentUser()) redirect("/dashboard");
  const { error } = await searchParams;
  return <PageClient hasError={!!error} />;
}
