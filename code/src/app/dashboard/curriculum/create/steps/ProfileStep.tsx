"use client";
import TableSelect from "@/components/tables/TableSelect";
import Text from "@/components/base/Text";
import styles from "./profileStep.module.css";
import { IProfile, IAdresses, IExternalLink } from "@/types/resume";

interface ProfileStepProps {
  profiles: IProfile[];
  addresses: IAdresses[];
  links: IExternalLink[];
  selectedProfile: string[];
  setSelectedProfile: (ids: string[]) => void;
  selectedAddresses: string[];
  setSelectedAddresses: (ids: string[]) => void;
  selectedLinks: string[];
  setSelectedLinks: (ids: string[]) => void;
  loading?: boolean;
  error?: string | null;
}

export default function ProfileStep({
  profiles,
  addresses,
  links,
  selectedProfile,
  setSelectedProfile,
  selectedAddresses,
  setSelectedAddresses,
  selectedLinks,
  setSelectedLinks,
  loading,
  error,
}: ProfileStepProps) {
  return (
    <div className={styles.profileStep}>
      <Text variant="h4">Selecione o perfil</Text>
      <div className={styles.profileTables}>
        <TableSelect
          data={profiles}
          columns={[
            { key: "name", label: "Nome" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Telefone" },
            {
              key: "description",
              label: "Descrição",
              render: (value) => <Text variant="md">{value}</Text>,
            },
          ]}
          selectedIds={selectedProfile}
          onSelect={setSelectedProfile}
          selectionMode="single"
          loading={loading}
          emptyMessage="Nenhum perfil cadastrado"
        />
        <TableSelect
          data={addresses}
          columns={[
            { key: "city", label: "Cidade" },
            { key: "state", label: "Estado" },
            { key: "country", label: "País" },
          ]}
          selectedIds={selectedAddresses}
          onSelect={setSelectedAddresses}
          selectionMode="single"
          loading={loading}
          emptyMessage="Nenhum endereço cadastrado"
        />
        <TableSelect
          data={links}
          columns={[
            { key: "name", label: "Nome" },
            { key: "url", label: "URL" },
          ]}
          selectedIds={selectedLinks}
          onSelect={setSelectedLinks}
          loading={loading}
          emptyMessage="Nenhum link cadastrado"
        />
      </div>
      {error && <Text variant="p2" className={styles.error}>{error}</Text>}
    </div>
  );
}
