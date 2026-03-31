"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Button from "@/components/base/Button";

export default function SettingsPage() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div>
      <h1>Configurações</h1>
      <p>Aqui você pode ajustar suas preferências e configurações de conta.</p>

      <Button onClick={handleLogout} variant="buttonSecondary">Logout</Button>
    </div>
  );
}