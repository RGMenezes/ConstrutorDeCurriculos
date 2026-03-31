import PageLoading from "@/components/layout/PageLoading";
import PDFdefault from "@/components/pdf/PDFdefault";
import { useCurriculumPopulated } from "@/hooks/useCurriculumPopulated";
import { ICurriculum } from "@/types/curriculum";

export default function WrapperCurriculum({ curriculum }: { curriculum: ICurriculum }) {
  const { curriculum: newCurriculum, loading } = useCurriculumPopulated(curriculum);
  if (loading) {
    return <PageLoading />;
  }
  return (
    <PDFdefault curriculum={newCurriculum} />
  );
}