"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/base/Button";
import { createClient } from "@/utils/supabase/client";

export default function DashboardPage() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh(); 
  };
  return (
    <main>
      <Button onClick={handleLogout}>Logout</Button>
    </main>
  );
}