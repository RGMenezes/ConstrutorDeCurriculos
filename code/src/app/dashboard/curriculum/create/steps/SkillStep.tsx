"use client";
import TableSelect from "@/components/tables/TableSelect";
import Text from "@/components/base/Text";
import styles from "./profileStep.module.css";
import { ISkill } from "@/types/skill";

interface SkillStepProps {
  skills: ISkill[];
  selectedSkills: string[];
  setSelectedSkills: (ids: string[]) => void;
  loading?: boolean;
  error?: string | null;
}

export default function SkillStep({ skills, selectedSkills, setSelectedSkills, loading, error }: SkillStepProps) {
  return (
    <div className={styles.profileStep}>
      <Text variant="h4">Selecione as habilidades</Text>
      <TableSelect
        data={skills}
        columns={[
          { key: "name", label: "Nome" },
          { key: "category", label: "Categoria" },
        ]}
        selectedIds={selectedSkills}
        onSelect={setSelectedSkills}
        selectionMode="multiple"
        loading={loading}
        emptyMessage="Nenhuma habilidade cadastrada"
      />
      {error && <Text variant="p2" className={styles.error}>{error}</Text>}
    </div>
  );
}