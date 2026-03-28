"use client";

import { useFeedback } from "@/hooks/useFeedback";
import { useSearchParams } from "next/navigation";
import FeedbackForm from "@/components/forms/FeedbackForm";
import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import styles from "./create.module.css";
import Loading from "@/components/layout/Loading";

export default function FeedbackCreateContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { feedbacks, loading } = useFeedback();

  const title = id ? "Editar Feedback" : "Novo Feedback";
  const initialData = id ? feedbacks.find((f) => f.id === id) : undefined;

  return (
    <Section className={styles.container}>
      <Text variant="h3" className={styles.title}>{title}</Text>
      {loading ? <Loading /> : <FeedbackForm initialData={initialData} />}
    </Section>
  );
}
