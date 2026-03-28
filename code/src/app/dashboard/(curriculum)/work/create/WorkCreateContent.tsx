"use client";

import { useWork } from "@/hooks/useWork";
import { useSearchParams } from "next/navigation";
import WorkForm from "@/components/forms/WorkForm";
import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import styles from "./create.module.css";
import Loading from "@/components/layout/Loading";

export default function WorkCreateContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { work, loading } = useWork();

  const title = id ? "Editar Experiência" : "Nova Experiência";
  const initialData = id ? work.find((w) => w.id === id) : undefined;

  return (
    <Section className={styles.container}>
      <Text variant="h3" className={styles.title}>{title}</Text>
      {loading ? <Loading /> : <WorkForm initialData={initialData} />}
    </Section>
  );
}
