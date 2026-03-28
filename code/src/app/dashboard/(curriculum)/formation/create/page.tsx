import { Suspense } from "react";
import Section from "@/components/layout/Section";
import Loading from "@/components/layout/Loading";
import FormationCreateContent from "./FormationCreateContent";

export default function FormationCreatePage() {
  return (
    <Suspense fallback={<Section><Loading /></Section>}>
      <FormationCreateContent />
    </Suspense>
  );
}
