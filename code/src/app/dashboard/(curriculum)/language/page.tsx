"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { deleteLanguage } from "@/app/actions/languageActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Table from "@/components/tables/Table";
import Button from "@/components/base/Button";
import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import styles from "./language.module.css";

export default function LanguagePage() {
  const { languages, loading, error } = useLanguage();
  const router = useRouter();
  const [, setDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    const result = await deleteLanguage(id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
    setDeleting(false);
  };

  return (
    <Section className={styles.container}>
      <Text variant="h2">Idiomas</Text>
      {error && <div className={styles.error}><Text variant="p2">{error}</Text></div>}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="h4">Idiomas</Text>
          <Button
            variant="buttonPrimary"
            onClick={() => router.push("/dashboard/language/create")}
          >
            Novo Idioma
          </Button>
        </div>
        <Table
          data={languages}
          columns={[
            { key: "language", label: "Idioma" },
            { key: "proficiency", label: "Proficiência" },
          ]}
          onEdit={(item) => router.push(`/dashboard/language/create?id=${item.id}`)}
          onDelete={(id) => handleDelete(id)}
          loading={loading}
          emptyMessage="Nenhum idioma cadastrado"
        />
      </section>
    </Section>
  );
}
