"use client";
import FeedbackForm from "@/components/forms/FeedbackForm";
import type { IFeedback } from "@/types/feedback";
import Section from "@/components/layout/Section";
import Text from "@/components/base/Text";
import styles from "./create.module.css";
export default function PageClient({ initialData }: { initialData?: IFeedback }) {
  return <Section className={styles.container}><Text variant="h3">{initialData ? "Editar" : "Adicionar"} Feedback</Text><FeedbackForm initialData={initialData} /></Section>;
}
