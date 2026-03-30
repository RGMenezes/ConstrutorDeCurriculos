"use client";

import { useWork } from "@/hooks/useWork";
import { deleteWork } from "@/app/actions/workActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Table from "@/components/tables/Table";
import { formatDateBR } from "@/utils/dateFormat";
import Button from "@/components/base/Button";
import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import styles from "./work.module.css";

export default function WorkPage() {
  const { work, loading, error } = useWork();
  const router = useRouter();
  const [, setDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    const result = await deleteWork(id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
    setDeleting(false);
  };

  return (
    <Section className={styles.container}>
      <Text variant="h2">Experiência Profissional</Text>
      {error && <div className={styles.error}><Text variant="p2">{error}</Text></div>}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="h4">Experiências</Text>
          <Button
            variant="buttonPrimary"
            onClick={() => router.push("/dashboard/work/create")}
          >
            Nova Experiência
          </Button>
        </div>
        <Table
          data={work}
          columns={[
            { key: "company", label: "Empresa" },
            { key: "position", label: "Cargo" },
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
            {
              key: "description",
              label: "Descrição",
              render: (value) => <Text variant="md">{value}</Text>,
            },
          ]}
          onEdit={(item) => router.push(`/dashboard/work/create?id=${item.id}`)}
          onDelete={(id) => handleDelete(id)}
          loading={loading}
          emptyMessage="Nenhuma experiência cadastrada"
        />
      </section>
    </Section>
  );
}
