"use client";

import { useSkill } from "@/hooks/useSkill";
import { useSearchParams } from "next/navigation";
import SkillForm from "@/components/forms/SkillForm";
import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import styles from "./create.module.css";
import Loading from "@/components/layout/Loading";

export default function SkillCreateContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { skills, loading } = useSkill();

  const title = id ? "Editar Skill" : "Nova Skill";
  const initialData = id ? skills.find((s) => s.id === id) : undefined;

  return (
    <Section className={styles.container}>
      <Text variant="h3" className={styles.title}>{title}</Text>
      {loading ? <Loading /> : <SkillForm initialData={initialData} />}
    </Section>
  );
}
