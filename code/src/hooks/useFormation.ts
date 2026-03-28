import { useEffect, useState } from "react";
import { IFormation } from "@/types/formation";
import { getFormation } from "@/app/actions/formationActions";

export function useFormation() {
  const [formation, setFormation] = useState<IFormation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormation = async () => {
      setLoading(true);
      const result = await getFormation();
      if (result.error) {
        setError(result.error);
        setFormation([]);
      } else {
        setFormation(result.data || []);
        setError(null);
      }
      setLoading(false);
    };
    fetchFormation();
  }, []);

  return { formation, loading, error };
}
