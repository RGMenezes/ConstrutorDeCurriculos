import { Suspense } from "react";
import Section from "@/components/layout/Section";
import ProfileCreateContent from "./ProfileCreateContent";
import Loading from "@/components/layout/Loading";

export default function ProfileCreatePage() {
  return (
    <Suspense fallback={<Section><Loading /></Section>}>
      <ProfileCreateContent />
    </Suspense>
  );
}
