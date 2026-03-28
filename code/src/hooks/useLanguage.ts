import { useEffect, useState } from "react";
import { ILanguage } from "@/types/language";
import { getLanguage } from "@/app/actions/languageActions";

export function useLanguage() {
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      setLoading(true);
      const result = await getLanguage();
      if (result.error) {
        setError(result.error);
        setLanguages([]);
      } else {
        setLanguages(result.data || []);
        setError(null);
      }
      setLoading(false);
    };
    fetchLanguages();
  }, []);

  return { languages, loading, error };
}
