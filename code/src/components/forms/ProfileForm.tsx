"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IProfile } from "@/types/resume";
import { upsertProfile } from "@/app/actions/profileActions";
import InputText from "../inputs/InputText";
import InputTextarea from "../inputs/InputTextarea";
import Button from "../base/Button";
import Text from "../base/Text";
import styles from "./ResumeForm.module.css";

interface ProfileFormProps {
  initialData?: IProfile;
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof IProfile, string>>>({});
  const [formData, setFormData] = useState<IProfile>({
    id: initialData?.id,
    user_id: initialData?.user_id || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    description: initialData?.description || "",
  });

  const validate = (): boolean => {
    const errors: Partial<Record<keyof IProfile, string>> = {};
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "E-mail inválido";
    }
    if (formData.phone && !/^[\d\s\-()+]{7,}$/.test(formData.phone)) {
      errors.phone = "Telefone inválido";
    }
    if (!formData.email?.trim() && !formData.phone?.trim() && !formData.description?.trim()) {
      errors.email = "Preencha pelo menos um campo";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field: keyof IProfile, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError(null);

    const result = await upsertProfile(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard/profile");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.errorBanner}><Text variant="p2">{error}</Text></div>}

      <InputText
        label="Email"
        type="email"
        value={formData.email || ""}
        onChange={(e) => handleChange("email", e.target.value)}
        placeholder="seu@email.com"
        error={fieldErrors.email}
      />

      <InputText
        label="Telefone"
        type="tel"
        value={formData.phone || ""}
        onChange={(e) => handleChange("phone", e.target.value)}
        placeholder="(00) 00000-0000"
        error={fieldErrors.phone}
      />

      <InputTextarea
        label="Descrição Profissional"
        value={formData.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
        placeholder="Fale um pouco sobre você..."
        error={fieldErrors.description}
      />

      <div className={styles.actions}>
        <Button
          variant="buttonSecondary"
          onClick={() => router.back()}
          type="button"
        >
          Cancelar
        </Button>
        <Button variant="buttonPrimary" type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}
