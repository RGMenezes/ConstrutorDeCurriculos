"use client";
import FormationForm from "@/components/forms/FormationForm";
import type { IFormation } from "@/types/formation";
import Section from "@/components/layout/Section";
import Text from "@/components/base/Text";
import styles from "./create.module.css";
export default function PageClient({ initialData }: { initialData?: IFormation }) {
  return <Section className={styles.container}><Text variant="h3">{initialData ? "Editar" : "Adicionar"} Formação</Text><FormationForm initialData={initialData} /></Section>;
}
