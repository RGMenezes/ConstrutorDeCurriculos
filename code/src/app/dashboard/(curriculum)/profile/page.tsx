"use client";

import { useProfile } from "@/hooks/useProfile";
import { useAddresses } from "@/hooks/useAddresses";
import { useExternalLinks } from "@/hooks/useExternalLinks";
import { deleteProfile } from "@/app/actions/profileActions";
import { deleteAddress } from "@/app/actions/addressesActions";
import { deleteExternalLink } from "@/app/actions/linksActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Table from "@/components/tables/Table";
import { formatDateBR } from "@/utils/dateFormat";
import Button from "@/components/base/Button";
import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import styles from "./profile.module.css";
import A from "@/components/base/A";

export default function ProfilePage() {
  const { profiles, loading: profileLoading, error: profileError } = useProfile();
  const { addresses, loading: addressesLoading } = useAddresses();
  const { links, loading: linksLoading } = useExternalLinks();
  const router = useRouter();
  const [, setDeleting] = useState(false);

  const handleDelete = async (id: string, type: "profile" | "address" | "link") => {
    setDeleting(true);
    let result;
    if (type === "profile") {
      result = await deleteProfile(id);
    } else if (type === "address") {
      result = await deleteAddress(id);
    } else {
      result = await deleteExternalLink(id);
    }

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
    setDeleting(false);
  };

  return (
    <Section className={styles.container}>
      <Text variant="h2">Perfil Profissional</Text>

      {profileError && <div className={styles.error}><Text variant="p2">{profileError}</Text></div>}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="h4">Perfil Pessoal</Text>
          <Button
            variant="buttonPrimary"
            onClick={() => router.push("/dashboard/profile/create?type=personal")}
          >
            Novo Perfil
          </Button>
        </div>

        <Table
          data={profiles}
          columns={[
            { key: "name", label: "Nome" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Telefone" },
            // Exemplo: se houver campos de data, adicione-os aqui:
            // {
            //   key: "birth_date",
            //   label: "Nascimento",
            //   render: (value) => formatDateBR(value as string),
            // },
            {
              key: "description",
              label: "Descrição",
              render: (value) => (value ? <Text variant="md">{String(value).substring(0, 50) + "..."}</Text> : "-"),
            },
          ]}
          onEdit={(item) => router.push(`/dashboard/profile/create?type=personal&id=${item.id}`)}
          onDelete={(id) => handleDelete(id, "profile")}
          loading={profileLoading}
          emptyMessage="Nenhum perfil criado"
        />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="h4">Enderecos</Text>
          <Button
            variant="buttonPrimary"
            onClick={() => router.push("/dashboard/profile/create?type=address")}
          >
            Novo Endereco
          </Button>
        </div>

        <Table
          data={addresses}
          columns={[
            { key: "city", label: "Cidade" },
            { key: "state", label: "Estado" },
            { key: "country", label: "Pais" },
          ]}
          onEdit={(item) => router.push(`/dashboard/profile/create?type=address&id=${item.id}`)}
          onDelete={(id) => handleDelete(id, "address")}
          loading={addressesLoading}
          emptyMessage="Nenhum endereco cadastrado"
        />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Text variant="h4">Links Externos</Text>
          <Button
            variant="buttonPrimary"
            onClick={() => router.push("/dashboard/profile/create?type=link")}
          >
            Novo Link
          </Button>
        </div>

        <Table
          data={links}
          columns={[
            { key: "name", label: "Nome" },
            {
              key: "url",
              label: "URL",
              render: (value) => (
                <A href={String(value)} target="_blank" rel="noopener noreferrer">
                  {String(value)}
                </A>
              ),
            },
          ]}
          onEdit={(item) => router.push(`/dashboard/profile/create?type=link&id=${item.id}`)}
          onDelete={(id) => handleDelete(id, "link")}
          loading={linksLoading}
          emptyMessage="Nenhum link cadastrado"
        />
      </section>
    </Section>
  );
}
