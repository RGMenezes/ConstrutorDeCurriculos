"use client";
import TableSelect from "@/components/tables/TableSelect";
import Text from "@/components/base/Text";
import styles from "./profileStep.module.css";
import { IWork } from "@/types/work";
import { formatDateBR } from "@/utils/dateFormat";

interface WorkStepProps {
  work: IWork[];
  selectedWork: string[];
  setSelectedWork: (ids: string[]) => void;
  loading?: boolean;
  error?: string | null;
}

export default function WorkStep({ work, selectedWork, setSelectedWork, loading, error }: WorkStepProps) {
  return (
    <div className={styles.profileStep}>
      <Text variant="h4">Selecione as experiências</Text>
      <TableSelect
        data={work}
        columns={[
          { key: "company", label: "Empresa" },
          { key: "position", label: "Cargo" },
          { key: "start_date", label: "Início", render: (value) => formatDateBR(value as string) },
          { key: "end_date", label: "Término", render: (value) => formatDateBR(value as string) },
          { key: "description", label: "Descrição", render: (value) => <Text variant="md">{value}</Text> },
        ]}
        selectedIds={selectedWork}
        onSelect={setSelectedWork}
        selectionMode="multiple"
        loading={loading}
        emptyMessage="Nenhuma experiência cadastrada"
      />
      {error && <Text variant="p2" className={styles.error}>{error}</Text>}
    </div>
  );
}