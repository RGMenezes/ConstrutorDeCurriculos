"use client";
import WorkForm from "@/components/forms/WorkForm";
import type { IWork } from "@/types/work";
import Section from "@/components/layout/Section";
import Text from "@/components/base/Text";
import styles from "./create.module.css";
export default function PageClient({ initialData }: { initialData?: IWork }) {
  return <Section className={styles.container}><Text variant="h3">{initialData ? "Editar" : "Adicionar"} Experiência</Text><WorkForm initialData={initialData} /></Section>;
}
