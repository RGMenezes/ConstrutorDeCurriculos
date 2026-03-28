"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ISkill } from "@/types/skill";
import { upsertSkill } from "@/app/actions/skillActions";
import InputText from "../inputs/InputText";
import Button from "../base/Button";
import Text from "../base/Text";
import styles from "./ResumeForm.module.css";

interface SkillFormProps {
  initialData?: ISkill;
}

export default function SkillForm({ initialData }: SkillFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ISkill, string>>>({});
  const [formData, setFormData] = useState<ISkill>({
    id: initialData?.id,
    user_id: initialData?.user_id || "",
    name: initialData?.name || "",
    category: initialData?.category || "",
  });

  const validate = (): boolean => {
    const errors: Partial<Record<keyof ISkill, string>> = {};
    if (!formData.name?.trim()) errors.name = "Nome da habilidade obrigatório";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field: keyof ISkill, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError(null);
    const result = await upsertSkill(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard/skill");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.errorBanner}><Text variant="p2">{error}</Text></div>}
      <InputText
        label="Nome da habilidade"
        placeholder="Ex: JavaScript, Liderança, Inglês"
        value={formData.name}
        onChange={e => handleChange("name", e.target.value)}
        error={fieldErrors.name}
        required
        autoComplete="off"
      />
      <InputText
        label="Categoria"
        placeholder="Ex: Técnica, Comportamental, Linguagem"
        value={formData.category}
        onChange={e => handleChange("category", e.target.value)}
        error={fieldErrors.category}
        autoComplete="off"
      />
      <div className={styles.actions}>
        <Button variant="buttonSecondary" onClick={() => router.back()} type="button">Cancelar</Button>
        <Button variant="buttonPrimary" type="submit" disabled={loading}>{loading ? "Salvando..." : "Salvar"}</Button>
      </div>
    </form>
  );
}
