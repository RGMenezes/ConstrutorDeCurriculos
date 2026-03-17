"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IExternalLink } from "@/types/resume";
import { upsertExternalLink } from "@/app/actions/linksActions";
import InputText from "../inputs/InputText";
import Button from "../base/Button";
import Text from "../base/Text";
import styles from "./ResumeForm.module.css";

interface LinkFormProps {
  initialData?: IExternalLink;
  userId?: string;
}

export default function LinkForm({ initialData, userId = "" }: LinkFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof IExternalLink, string>>>({});
  const [formData, setFormData] = useState<IExternalLink>({
    id: initialData?.id,
    user_id: initialData?.user_id || userId,
    name: initialData?.name || "",
    url: initialData?.url || "",
  });

  const validate = (): boolean => {
    const errors: Partial<Record<keyof IExternalLink, string>> = {};
    if (!formData.name?.trim()) errors.name = "Nome é obrigatório";
    if (!formData.url?.trim()) {
      errors.url = "URL é obrigatória";
    } else if (!/^https?:\/\/.+/.test(formData.url)) {
      errors.url = "URL deve começar com http:// ou https://";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field: keyof IExternalLink, value: string) => {
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

    const result = await upsertExternalLink(formData);

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
        label="Nome"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="LinkedIn"
        error={fieldErrors.name}
      />

      <InputText
        label="URL"
        type="url"
        value={formData.url}
        onChange={(e) => handleChange("url", e.target.value)}
        placeholder="https://linkedin.com/in/seu-perfil"
        error={fieldErrors.url}
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
