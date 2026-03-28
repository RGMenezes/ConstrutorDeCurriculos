"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ILanguage } from "@/types/language";
import { upsertLanguage } from "@/app/actions/languageActions";
import InputText from "../inputs/InputText";
import Button from "../base/Button";
import Text from "../base/Text";
import styles from "./ResumeForm.module.css";

interface LanguageFormProps {
  initialData?: ILanguage;
}

export default function LanguageForm({ initialData }: LanguageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ILanguage, string>>>({});
  const [formData, setFormData] = useState<ILanguage>({
    id: initialData?.id,
    user_id: initialData?.user_id || "",
    language: initialData?.language || "",
    proficiency: initialData?.proficiency || "",
  });

  const validate = (): boolean => {
    const errors: Partial<Record<keyof ILanguage, string>> = {};
    if (!formData.language?.trim()) errors.language = "Idioma obrigatório";
    if (!formData.proficiency?.trim()) errors.proficiency = "Nível obrigatório";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field: keyof ILanguage, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError(null);
    const result = await upsertLanguage(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard/language");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.errorBanner}><Text variant="p2">{error}</Text></div>}
      <InputText
        label="Idioma"
        placeholder="Ex: Inglês, Espanhol, Francês"
        value={formData.language}
        onChange={e => handleChange("language", e.target.value)}
        error={fieldErrors.language}
        required
        autoComplete="off"
      />
      <InputText
        label="Nível"
        placeholder="Ex: Básico, Intermediário, Avançado, Fluente"
        value={formData.proficiency}
        onChange={e => handleChange("proficiency", e.target.value)}
        error={fieldErrors.proficiency}
        required
        autoComplete="off"
      />
      <div className={styles.actions}>
        <Button variant="buttonSecondary" onClick={() => router.back()} type="button">Cancelar</Button>
        <Button variant="buttonPrimary" type="submit" disabled={loading}>{loading ? "Salvando..." : "Salvar"}</Button>
      </div>
    </form>
  );
}
