"use client";
import TableSelect from "@/components/tables/TableSelect";
import Text from "@/components/base/Text";
import styles from "./profileStep.module.css";
import { ILanguage } from "@/types/language";

interface LanguageStepProps {
  languages: ILanguage[];
  selectedLanguages: string[];
  setSelectedLanguages: (ids: string[]) => void;
  loading?: boolean;
  error?: string | null;
}

export default function LanguageStep({ languages, selectedLanguages, setSelectedLanguages, loading, error }: LanguageStepProps) {
  return (
    <div className={styles.profileStep}>
      <Text variant="h4">Selecione os idiomas</Text>
      <TableSelect
        data={languages}
        columns={[
          { key: "language", label: "Idioma" },
          { key: "proficiency", label: "Proficiência" },
        ]}
        selectedIds={selectedLanguages}
        onSelect={setSelectedLanguages}
        selectionMode="multiple"
        loading={loading}
        emptyMessage="Nenhum idioma cadastrado"
      />
      {error && <Text variant="p2" className={styles.error}>{error}</Text>}
    </div>
  );
}