"use client";
import TableSelect from "@/components/tables/TableSelect";
import Text from "@/components/base/Text";
import styles from "./profileStep.module.css";
import { IFeedback } from "@/types/feedback";

interface FeedbackStepProps {
  feedbacks: IFeedback[];
  selectedFeedbacks: string[];
  setSelectedFeedbacks: (ids: string[]) => void;
  loading?: boolean;
  error?: string | null;
}

export default function FeedbackStep({ feedbacks, selectedFeedbacks, setSelectedFeedbacks, loading, error }: FeedbackStepProps) {
  return (
    <div className={styles.profileStep}>
      <Text variant="h4">Selecione os feedbacks</Text>
      <TableSelect
        data={feedbacks}
        columns={[
          { key: "name", label: "Nome" },
          { key: "position", label: "Cargo" },
          { key: "company", label: "Empresa" },
          { key: "relationship", label: "Relação" },
          { key: "contact", label: "Contato" },
          { key: "feedback", label: "Feedback", render: (value) => <Text variant="md">{value}</Text> },
        ]}
        selectedIds={selectedFeedbacks}
        onSelect={setSelectedFeedbacks}
        selectionMode="multiple"
        loading={loading}
        emptyMessage="Nenhum feedback cadastrado"
      />
      {error && <Text variant="p2" className={styles.error}>{error}</Text>}
    </div>
  );
}