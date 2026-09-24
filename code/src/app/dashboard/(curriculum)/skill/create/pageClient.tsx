"use client";
import SkillForm from "@/components/forms/SkillForm";
import type { ISkill } from "@/types/skill";
import Section from "@/components/layout/Section";
import Text from "@/components/base/Text";
import styles from "./create.module.css";
export default function PageClient({ initialData }: { initialData?: ISkill }) {
  return <Section className={styles.container}><Text variant="h3">{initialData ? "Editar" : "Adicionar"} Habilidade</Text><SkillForm initialData={initialData} /></Section>;
}
