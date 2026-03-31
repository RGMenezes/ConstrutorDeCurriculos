"use client";

import { Suspense } from "react";
import CurriculumFormContent from "./CurriculumFormContent";
import Loading from "@/components/layout/Loading";
import { useSearchParams } from "next/navigation";
import { useCurriculums } from "@/hooks/useCurriculums";

export default function CurriculumFormPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { curriculums, loading } = useCurriculums();
  const initialData = id ? curriculums.find(c => c.id === id) : undefined;

  if (loading) return <Loading />;

  return (
    <Suspense fallback={<Loading />}> 
      <CurriculumFormContent initialData={initialData} curriculumId={id ?? undefined} />
    </Suspense>
  );
}
