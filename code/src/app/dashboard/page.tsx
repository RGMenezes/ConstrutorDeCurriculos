"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/base/Button";
import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import styles from "./page.module.css";
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
    <Section className={styles.container}>
      <Text variant="h2">Meus Currículos</Text>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="h4">Currículos</Text>
          <Button
            variant="buttonPrimary"
            onClick={() => router.push("/dashboard/curriculum/create")}
          >
            + Novo Currículo
          </Button>
        </div>
        {/* Aqui virá a tabela/listagem dos currículos */}
      </section>
      <Button onClick={handleLogout}>Logout</Button>
    </Section>
  );
}