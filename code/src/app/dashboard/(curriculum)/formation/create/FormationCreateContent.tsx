"use client";

import { useFormation } from "@/hooks/useFormation";
import { useSearchParams } from "next/navigation";
import FormationForm from "@/components/forms/FormationForm";
import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import styles from "./create.module.css";
import Loading from "@/components/layout/Loading";

export default function FormationCreateContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { formation, loading } = useFormation();

  const title = id ? "Editar Formação" : "Nova Formação";
  const initialData = id ? formation.find((f) => f.id === id) : undefined;

  return (
    <Section className={styles.container}>
      <Text variant="h3" className={styles.title}>{title}</Text>
      {loading ? <Loading /> : <FormationForm initialData={initialData} />}
    </Section>
  );
}
