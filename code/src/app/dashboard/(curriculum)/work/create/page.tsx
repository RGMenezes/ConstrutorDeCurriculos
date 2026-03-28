import { Suspense } from "react";
import Section from "@/components/layout/Section";
import Loading from "@/components/layout/Loading";
import WorkCreateContent from "./WorkCreateContent";

export default function WorkCreatePage() {
  return (
    <Suspense fallback={<Section><Loading /></Section>}>
      <WorkCreateContent />
    </Suspense>
  );
}
