"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IWork } from "@/types/work";
import { upsertWork } from "@/app/actions/workActions";
import InputText from "../inputs/InputText";
import InputTextarea from "../inputs/InputTextarea";
import InputDate from "../inputs/InputDate";
import Button from "../base/Button";
import Text from "../base/Text";
import styles from "./ResumeForm.module.css";

interface WorkFormProps {
  initialData?: IWork;
}

export default function WorkForm({ initialData }: WorkFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof IWork, string>>>({});
  const [formData, setFormData] = useState<IWork>({
    id: initialData?.id,
    user_id: initialData?.user_id || "",
    company: initialData?.company || "",
    position: initialData?.position || "",
    start_date: initialData?.start_date || "",
    end_date: initialData?.end_date || "",
    description: initialData?.description || "",
  });

  const validate = (): boolean => {
    const errors: Partial<Record<keyof IWork, string>> = {};
    if (!formData.company?.trim()) errors.company = "Empresa obrigatória";
    if (!formData.position?.trim()) errors.position = "Cargo obrigatório";
    if (!formData.start_date?.trim()) errors.start_date = "Data de início obrigatória";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field: keyof IWork, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError(null);
    const result = await upsertWork(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard/work");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.errorBanner}><Text variant="p2">{error}</Text></div>}
      <InputText
        label="Empresa"
        placeholder="Ex: Microsoft, Google, Padaria do Zé"
        value={formData.company}
        onChange={e => handleChange("company", e.target.value)}
        error={fieldErrors.company}
        required
        autoComplete="organization"
      />
      <InputText
        label="Cargo"
        placeholder="Ex: Desenvolvedor Frontend, Gerente de Projetos"
        value={formData.position}
        onChange={e => handleChange("position", e.target.value)}
        error={fieldErrors.position}
        required
        autoComplete="organization-title"
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
      <InputTextarea
        label="Descrição"
        placeholder="Descreva suas atividades, conquistas, tecnologias utilizadas..."
        value={formData.description || ""}
        onChange={e => handleChange("description", e.target.value)}
        error={fieldErrors.description}
        autoComplete="on"
      />
      <div className={styles.actions}>
        <Button variant="buttonSecondary" onClick={() => router.back()} type="button">Cancelar</Button>
        <Button variant="buttonPrimary" type="submit" disabled={loading}>{loading ? "Salvando..." : "Salvar"}</Button>
      </div>
    </form>
  );
}
