import { useEffect, useState } from "react";
import { Curriculum } from "@/types/curriculum";
import { getCurriculums } from "@/app/actions/curriculumActions";

export function useCurriculums() {
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurriculums = async () => {
      setLoading(true);
      const result = await getCurriculums();
      if (result.error) {
        setError(result.error);
        setCurriculums([]);
      } else {
        setCurriculums(result.data || []);
        setError(null);
      }
      setLoading(false);
    };
    fetchCurriculums();
  }, []);

  return { curriculums, loading, error };
}
