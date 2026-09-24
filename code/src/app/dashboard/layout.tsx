import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { requirePageUser } from "@/server/auth";
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requirePageUser();
  return <><Header /><main className="mx-auto min-h-[70vh] w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main><Footer /></>;
}
