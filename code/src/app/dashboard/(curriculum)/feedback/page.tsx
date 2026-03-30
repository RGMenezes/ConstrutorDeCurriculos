"use client";

import { useFeedback } from "@/hooks/useFeedback";
import { deleteFeedback } from "@/app/actions/feedbackActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Table from "@/components/tables/Table";
import Button from "@/components/base/Button";
import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import styles from "./feedback.module.css";

export default function FeedbackPage() {
  const { feedbacks, loading, error } = useFeedback();
  const router = useRouter();
  const [, setDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    const result = await deleteFeedback(id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
    setDeleting(false);
  };

  return (
    <Section className={styles.container}>
      <Text variant="h2">Feedbacks</Text>
      {error && <div className={styles.error}><Text variant="p2">{error}</Text></div>}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="h4">Feedbacks</Text>
          <Button
            variant="buttonPrimary"
            onClick={() => router.push("/dashboard/feedback/create")}
          >
            Novo Feedback
          </Button>
        </div>
        <Table
          data={feedbacks}
          columns={[
            { key: "name", label: "Nome" },
            { key: "position", label: "Cargo" },
            { key: "company", label: "Empresa" },
            { key: "relationship", label: "Relação" },
            { key: "contact", label: "Contato" },
            {
              key: "feedback",
              label: "Feedback",
              render: (value) => <Text variant="md">{value}</Text>,
            },
          ]}
          onEdit={(item) => router.push(`/dashboard/feedback/create?id=${item.id}`)}
          onDelete={(id) => handleDelete(id)}
          loading={loading}
          emptyMessage="Nenhum feedback cadastrado"
        />
      </section>
    </Section>
  );
}
