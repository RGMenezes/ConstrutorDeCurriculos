"use client";

import { useSkill } from "@/hooks/useSkill";
import { deleteSkill } from "@/app/actions/skillActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Table from "@/components/tables/Table";
import Button from "@/components/base/Button";
import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import styles from "./skill.module.css";

export default function SkillPage() {
  const { skills, loading, error } = useSkill();
  const router = useRouter();
  const [, setDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    const result = await deleteSkill(id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
    setDeleting(false);
  };

  return (
    <Section className={styles.container}>
      <Text variant="h2">Habilidades</Text>
      {error && <div className={styles.error}><Text variant="p2">{error}</Text></div>}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="h4">Skills</Text>
          <Button
            variant="buttonPrimary"
            onClick={() => router.push("/dashboard/skill/create")}
          >
            Nova Skill
          </Button>
        </div>
        <Table
          data={skills}
          columns={[
            { key: "name", label: "Nome" },
            { key: "category", label: "Categoria" },
          ]}
          onEdit={(item) => router.push(`/dashboard/skill/create?id=${item.id}`)}
          onDelete={(id) => handleDelete(id)}
          loading={loading}
          emptyMessage="Nenhuma skill cadastrada"
        />
      </section>
    </Section>
  );
}
