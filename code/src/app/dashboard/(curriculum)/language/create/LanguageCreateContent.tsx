"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { useSearchParams } from "next/navigation";
import LanguageForm from "@/components/forms/LanguageForm";
import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import styles from "./create.module.css";
import Loading from "@/components/layout/Loading";

export default function LanguageCreateContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { languages, loading } = useLanguage();

  const title = id ? "Editar Idioma" : "Novo Idioma";
  const initialData = id ? languages.find((l) => l.id === id) : undefined;

  return (
    <Section className={styles.container}>
      <Text variant="h3" className={styles.title}>{title}</Text>
      {loading ? <Loading /> : <LanguageForm initialData={initialData} />}
    </Section>
  );
}
