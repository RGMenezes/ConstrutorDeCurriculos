import { Suspense } from "react";
import Section from "@/components/layout/Section";
import Loading from "@/components/layout/Loading";
import LanguageCreateContent from "./LanguageCreateContent";

export default function LanguageCreatePage() {
  return (
    <Suspense fallback={<Section><Loading /></Section>}>
      <LanguageCreateContent />
    </Suspense>
  );
}
