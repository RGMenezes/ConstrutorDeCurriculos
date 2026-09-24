"use client";
import { useResourceMutations } from "@/hooks/useResourceMutations";

import { useFormation } from "@/hooks/useFormation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Table from "@/components/tables/Table";
import { formatDateBR } from "@/utils/dateFormat";
import Button from "@/components/base/Button";
import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import styles from "./formation.module.css";

export default function FormationPage() {
  const { remove: deleteFormation } = useResourceMutations("formation");
  const { formation, loading, error } = useFormation();
  const router = useRouter();
  const [, setDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    const result = await deleteFormation(id);
    if (result.success) {
      // Local data is updated by useResourceMutations.
    } else {
      alert(result.error);
    }
    setDeleting(false);
  };

  return (
    <Section className={styles.container}>
      <Text variant="h2">Formação Acadêmica</Text>
      {error && <div className={styles.error}><Text variant="p2">{error}</Text></div>}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="h4">Formações</Text>
          <Button
            variant="buttonPrimary"
            onClick={() => router.push("/dashboard/formation/create")}
          >
            Nova Formação
          </Button>
        </div>
        <Table
          data={formation}
          columns={[
            { key: "degree", label: "Grau" },
            { key: "institution", label: "Instituição" },
            { key: "type", label: "Tipo" },
            { key: "status", label: "Status" },
            {
              key: "start_date",
              label: "Início",
              render: (value) => formatDateBR(value as string),
            },
            {
              key: "end_date",
              label: "Término",
              render: (value) => formatDateBR(value as string),
            },
          ]}
          onEdit={(item) => router.push(`/dashboard/formation/create?id=${item.id}`)}
          onDelete={(id) => handleDelete(id)}
          loading={loading}
          emptyMessage="Nenhuma formação cadastrada"
        />
      </section>
    </Section>
  );
}
