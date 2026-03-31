"use client";


import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Button from "@/components/base/Button";
import InputText from "@/components/inputs/InputText";
import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import styles from "./page.module.css";
import Loading from "@/components/layout/Loading";

type User = {
  id: string;
  email?: string;
  user_metadata?: { name?: string };
  app_metadata?: { provider?: string };
  created_at?: string;
};

export default function SettingsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUser(data.user as User);
        setEditName(data.user.user_metadata?.name || "");
        setEditEmail(data.user.email || "");
      }
      setLoading(false);
    });
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handleEdit = async () => {
    setEditLoading(true);
    setError("");
    const { error } = await supabase.auth.updateUser({
      email: editEmail,
      data: { name: editName },
    });
    setEditLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setShowEdit(false);
      setUser((u) => u ? { ...u, email: editEmail, user_metadata: { ...u.user_metadata, name: editName } } : u);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    setError("");
    try {
      const res = await fetch("/api/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao deletar conta");
      setDeleteLoading(false);
      setDeleteConfirm(false);
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    } catch (err) {
      setDeleteLoading(false);
      setError(err instanceof Error ? err.message : "Erro inesperado");
    }
  };

  if (loading) return <Loading />;

  return (
    <Section className={styles.settingsContainer}>
      <div className={styles.userInfo}>
        <Text variant="h2">Configurações</Text>
        <Text variant="p2">
        Gerencie suas informações básicas e preferências da conta.
        </Text>
      </div>

      <div className={styles.userInfo}>
        <Text variant="h4">Nome</Text>
        <Text variant="p1">{user?.user_metadata?.name || "-"}</Text>
        <Text variant="h4">Email</Text>
        <Text variant="p1">{user?.email || "-"}</Text>
      </div>

      <div className={styles.actionsContainer}>
        <Button onClick={() => setShowEdit(true)} variant="buttonPrimary">Editar dados</Button>
        {showEdit && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <Text variant="h3">Editar dados</Text>
              <InputText
                label="Nome"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                required
              />
              <InputText
                label="Email"
                value={editEmail}
                onChange={e => setEditEmail(e.target.value)}
                required
                type="email"
              />
              {error && <Text variant="p2" className={styles.error}>{error}</Text>}
              <div className={styles.modalActions}>
                <Button onClick={handleEdit} disabled={editLoading} variant="buttonPrimary">Salvar</Button>
                <Button onClick={() => setShowEdit(false)} variant="buttonSecondary">Cancelar</Button>
              </div>
            </div>
          </div>
        )}
        <Button onClick={handleLogout} variant="buttonSecondary">Logout</Button>
        <Button onClick={() => setDeleteConfirm(true)} variant="danger">Deletar conta</Button>
        {deleteConfirm && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <Text variant="h3">Tem certeza?</Text>
              <Text variant="p2">Deseja realmente deletar sua conta? Esta ação não pode ser desfeita.</Text>
              {error && <Text variant="p2" className={styles.error}>{error}</Text>}
              <div className={styles.modalActions}>
                <Button onClick={handleDelete} disabled={deleteLoading} variant="danger">Deletar</Button>
                <Button onClick={() => setDeleteConfirm(false)} variant="buttonSecondary">Cancelar</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

