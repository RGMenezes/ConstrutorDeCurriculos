"use client";
import TableSelect from "@/components/tables/TableSelect";
import Text from "@/components/base/Text";
import styles from "./profileStep.module.css";
import { IFormation } from "@/types/formation";
import { formatDateBR } from "@/utils/dateFormat";

interface FormationStepProps {
  formation: IFormation[];
  selectedFormation: string[];
  setSelectedFormation: (ids: string[]) => void;
  loading?: boolean;
  error?: string | null;
}

export default function FormationStep({ formation, selectedFormation, setSelectedFormation, loading, error }: FormationStepProps) {
  return (
    <div className={styles.profileStep}>
      <Text variant="h4">Selecione as formações</Text>
      <TableSelect
        data={formation}
        columns={[
          { key: "degree", label: "Grau" },
          { key: "institution", label: "Instituição" },
          { key: "type", label: "Tipo" },
          { key: "status", label: "Status" },
          { key: "start_date", label: "Início", render: (value) => formatDateBR(value as string) },
          { key: "end_date", label: "Término", render: (value) => formatDateBR(value as string) },
        ]}
        selectedIds={selectedFormation}
        onSelect={setSelectedFormation}
        selectionMode="multiple"
        loading={loading}
        emptyMessage="Nenhuma formação cadastrada"
      />
      {error && <Text variant="p2" className={styles.error}>{error}</Text>}
    </div>
  );
}