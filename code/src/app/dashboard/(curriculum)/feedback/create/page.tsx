import { Suspense } from "react";
import Section from "@/components/layout/Section";
import FeedbackCreateContent from "./FeedbackCreateContent";
import Loading from "@/components/layout/Loading";

export default function FeedbackCreatePage() {
  return (
    <Suspense fallback={<Section><Loading /></Section>}>
      <FeedbackCreateContent />
    </Suspense>
  );
}
