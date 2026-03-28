"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IFormation } from "@/types/formation";
import { upsertFormation } from "@/app/actions/formationActions";
import InputText from "../inputs/InputText";
import InputDate from "../inputs/InputDate";
import Button from "../base/Button";
import Text from "../base/Text";
import styles from "./ResumeForm.module.css";

interface FormationFormProps {
  initialData?: IFormation;
}

export default function FormationForm({ initialData }: FormationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof IFormation, string>>>({});
  const [formData, setFormData] = useState<IFormation>({
    id: initialData?.id,
    user_id: initialData?.user_id || "",
    degree: initialData?.degree || "",
    institution: initialData?.institution || "",
    type: initialData?.type || "",
    status: initialData?.status || "",
    start_date: initialData?.start_date || "",
    end_date: initialData?.end_date || "",
  });

  const validate = (): boolean => {
    const errors: Partial<Record<keyof IFormation, string>> = {};
    if (!formData.degree?.trim()) errors.degree = "Curso obrigatório";
    if (!formData.institution?.trim()) errors.institution = "Instituição obrigatória";
    if (!formData.start_date?.trim()) errors.start_date = "Data de início obrigatória";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field: keyof IFormation, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError(null);
    const result = await upsertFormation(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard/formation");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.errorBanner}><Text variant="p2">{error}</Text></div>}
      <InputText
        label="Curso"
        placeholder="Ex: Engenharia de Software, Administração"
        value={formData.degree}
        onChange={e => handleChange("degree", e.target.value)}
        error={fieldErrors.degree}
        required
        autoComplete="organization"
      />
      <InputText
        label="Instituição"
        placeholder="Ex: USP, UNICAMP, Harvard"
        value={formData.institution}
        onChange={e => handleChange("institution", e.target.value)}
        error={fieldErrors.institution}
        required
        autoComplete="organization"
      />
      <InputText
        label="Tipo"
        placeholder="Ex: Bacharelado, Técnico, Pós-graduação"
        value={formData.type}
        onChange={e => handleChange("type", e.target.value)}
        error={fieldErrors.type}
        autoComplete="off"
      />
      <InputText
        label="Status"
        placeholder="Ex: Concluído, Em andamento"
        value={formData.status}
        onChange={e => handleChange("status", e.target.value)}
        error={fieldErrors.status}
        autoComplete="off"
      />
      <InputDate
        label="Data de início"
        placeholder="Selecione a data de início"
        value={formData.start_date}
        onChange={e => handleChange("start_date", e.target.value)}
        error={fieldErrors.start_date}
        required
        autoComplete="on"
      />
      <InputDate
        label="Data de término"
        placeholder="Selecione a data de término (opcional)"
        value={formData.end_date || ""}
        onChange={e => handleChange("end_date", e.target.value)}
        error={fieldErrors.end_date}
        autoComplete="on"
      />
      <div className={styles.actions}>
        <Button variant="buttonSecondary" onClick={() => router.back()} type="button">Cancelar</Button>
        <Button variant="buttonPrimary" type="submit" disabled={loading}>{loading ? "Salvando..." : "Salvar"}</Button>
      </div>
    </form>
  );
}
