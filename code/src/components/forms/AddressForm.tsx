"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IAdresses } from "@/types/resume";
import { upsertAddress } from "@/app/actions/addressesActions";
import InputText from "../inputs/InputText";
import Button from "../base/Button";
import Text from "../base/Text";
import styles from "./ResumeForm.module.css";

interface AddressFormProps {
  initialData?: IAdresses;
  userId?: string;
}

export default function AddressForm({ initialData, userId = "" }: AddressFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof IAdresses, string>>>({});
  const [formData, setFormData] = useState<IAdresses>({
    id: initialData?.id,
    user_id: initialData?.user_id || userId,
    city: initialData?.city || "",
    state: initialData?.state || "",
    country: initialData?.country || "",
  });

  const validate = (): boolean => {
    const errors: Partial<Record<keyof IAdresses, string>> = {};
    if (!formData.city?.trim()) errors.city = "Cidade é obrigatória";
    if (!formData.state?.trim()) errors.state = "Estado é obrigatório";
    if (!formData.country?.trim()) errors.country = "País é obrigatório";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field: keyof IAdresses, value: string) => {
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

    const result = await upsertAddress(formData);

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
        label="Cidade"
        value={formData.city || ""}
        onChange={(e) => handleChange("city", e.target.value)}
        placeholder="São Paulo"
        error={fieldErrors.city}
      />

      <InputText
        label="Estado"
        value={formData.state || ""}
        onChange={(e) => handleChange("state", e.target.value)}
        placeholder="SP"
        error={fieldErrors.state}
      />

      <InputText
        label="País"
        value={formData.country || ""}
        onChange={(e) => handleChange("country", e.target.value)}
        placeholder="Brasil"
        error={fieldErrors.country}
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
