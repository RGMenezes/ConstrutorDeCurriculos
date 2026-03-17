import { Suspense } from "react";
import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import styles from "./create.module.css";
import ProfileCreateContent from "./ProfileCreateContent";

export default function ProfileCreatePage() {
  return (
    <Suspense fallback={<Section><Text variant="p1">Carregando...</Text></Section>}>
      <ProfileCreateContent />
    </Suspense>
  );
}
