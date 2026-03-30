"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IFeedback } from "@/types/feedback";
import { upsertFeedback } from "@/app/actions/feedbackActions";
import InputText from "../inputs/InputText";
import Button from "../base/Button";
import Text from "../base/Text";
import styles from "./ResumeForm.module.css";

interface FeedbackFormProps {
  initialData?: IFeedback;
}

export default function FeedbackForm({ initialData }: FeedbackFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof IFeedback, string>>>({});
  const [formData, setFormData] = useState<IFeedback>({
    id: initialData?.id,
    user_id: initialData?.user_id || "",
    name: initialData?.name || "",
    position: initialData?.position || "",
    company: initialData?.company || "",
    contact: initialData?.contact || "",
    relationship: initialData?.relationship || "",
    link_name: initialData?.link_name || "",
    link_url: initialData?.link_url || "",
    feedback: initialData?.feedback || "",
  });

  const validate = (): boolean => {
    const errors: Partial<Record<keyof IFeedback, string>> = {};
    if (!formData.name?.trim()) errors.name = "Nome obrigatório";
    if (!formData.position?.trim()) errors.position = "Cargo obrigatório";
    if (!formData.company?.trim()) errors.company = "Empresa obrigatória";
    if (!formData.relationship?.trim()) errors.relationship = "Relacionamento obrigatório";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field: keyof IFeedback, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError(null);
    const result = await upsertFeedback(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard/feedback");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.errorBanner}><Text variant="p2">{error}</Text></div>}
      <InputText
        label="Nome"
        placeholder="Ex: João da Silva, Maria Oliveira"
        value={formData.name}
        onChange={e => handleChange("name", e.target.value)}
        error={fieldErrors.name}
        required
        autoComplete="name"
      />
      <InputText
        label="Cargo"
        placeholder="Ex: Gerente, Professor, Coordenador"
        value={formData.position}
        onChange={e => handleChange("position", e.target.value)}
        error={fieldErrors.position}
        required
        autoComplete="organization-title"
      />
      <InputText
        label="Empresa"
        placeholder="Ex: Microsoft, Escola ABC, ONG XYZ"
        value={formData.company}
        onChange={e => handleChange("company", e.target.value)}
        error={fieldErrors.company}
        required
        autoComplete="organization"
      />
      <InputText
        label="Contato"
        placeholder="Ex: (11) 99999-9999, email@exemplo.com"
        value={formData.contact}
        onChange={e => handleChange("contact", e.target.value)}
        error={fieldErrors.contact}
        autoComplete="tel"
      />
      <InputText
        label="Relacionamento"
        placeholder="Ex: Chefe direto, Professor, Colega de trabalho"
        value={formData.relationship}
        onChange={e => handleChange("relationship", e.target.value)}
        error={fieldErrors.relationship}
        autoComplete="off"
      />
      <InputText
        label="Nome do link"
        placeholder="Ex: LinkedIn, Portfólio, Site pessoal"
        value={formData.link_name}
        onChange={e => handleChange("link_name", e.target.value)}
        error={fieldErrors.link_name}
        autoComplete="off"
      />
      <InputText
        label="URL do link"
        placeholder="Ex: https://linkedin.com/in/usuario"
        value={formData.link_url}
        onChange={e => handleChange("link_url", e.target.value)}
        error={fieldErrors.link_url}
        autoComplete="url"
      />
      <InputText
        label="Feedback"
        placeholder="Ex: Excelente profissional, sempre colaborativo..."
        value={formData.feedback}
        onChange={e => handleChange("feedback", e.target.value)}
        error={fieldErrors.feedback}
        autoComplete="off"
      />
      <div className={styles.actions}>
        <Button variant="buttonSecondary" onClick={() => router.back()} type="button">Cancelar</Button>
        <Button variant="buttonPrimary" type="submit" disabled={loading}>{loading ? "Salvando..." : "Salvar"}</Button>
      </div>
    </form>
  );
}
