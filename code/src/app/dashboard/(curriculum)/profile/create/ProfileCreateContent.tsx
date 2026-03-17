"use client";

import { useProfile } from "@/hooks/useProfile";
import { useAddresses } from "@/hooks/useAddresses";
import { useExternalLinks } from "@/hooks/useExternalLinks";
import { useSearchParams } from "next/navigation";
import ProfileForm from "@/components/forms/ProfileForm";
import AddressForm from "@/components/forms/AddressForm";
import LinkForm from "@/components/forms/LinkForm";
import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import styles from "./create.module.css";

export default function ProfileCreateContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "personal";
  const id = searchParams.get("id");

  const { profiles, loading: profileLoading } = useProfile();
  const { addresses, loading: addressesLoading } = useAddresses();
  const { links, loading: linksLoading } = useExternalLinks();

  const getTitle = () => {
    switch (type) {
    case "personal":
      return id ? "Editar Perfil Pessoal" : "Criar Perfil Pessoal";
    case "address":
      return id ? "Editar Endereço" : "Novo Endereço";
    case "link":
      return id ? "Editar Link" : "Novo Link";
    default:
      return "Editar";
    }
  };

  const renderForm = () => {
    switch (type) {
    case "personal": {
      if (profileLoading) return <Text variant="p1">Carregando...</Text>;
      const profileItem = id ? profiles.find((p) => p.id === id) : undefined;
      return <ProfileForm initialData={profileItem} />;}

    case "address":
      if (addressesLoading) return <Text variant="p1">Carregando...</Text>;
      const address = id ? addresses.find((a) => a.id === id) : undefined;
      return <AddressForm initialData={address} />;

    case "link":
      if (linksLoading) return <Text variant="p1">Carregando...</Text>;
      const link = id ? links.find((l) => l.id === id) : undefined;
      return <LinkForm initialData={link} />;

    default:
      return <Text variant="p1">Tipo invalido</Text>;
    }
  };

  return (
    <Section className={styles.container}>
      <Text variant="h3" className={styles.title}>{getTitle()}</Text>
      {renderForm()}
    </Section>
  );
}
