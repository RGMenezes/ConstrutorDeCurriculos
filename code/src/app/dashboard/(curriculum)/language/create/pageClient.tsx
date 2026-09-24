"use client";
import LanguageForm from "@/components/forms/LanguageForm";
import type { ILanguage } from "@/types/language";
import Section from "@/components/layout/Section";
import Text from "@/components/base/Text";
import styles from "./create.module.css";
export default function PageClient({ initialData }: { initialData?: ILanguage }) {
  return <Section className={styles.container}><Text variant="h3">{initialData ? "Editar" : "Adicionar"} Idioma</Text><LanguageForm initialData={initialData} /></Section>;
}
