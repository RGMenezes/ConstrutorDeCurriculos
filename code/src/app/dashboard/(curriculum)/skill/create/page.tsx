import { Suspense } from "react";
import Section from "@/components/layout/Section";
import Loading from "@/components/layout/Loading";
import SkillCreateContent from "./SkillCreateContent";

export default function SkillCreatePage() {
  return (
    <Suspense fallback={<Section><Loading /></Section>}>
      <SkillCreateContent />
    </Suspense>
  );
}
