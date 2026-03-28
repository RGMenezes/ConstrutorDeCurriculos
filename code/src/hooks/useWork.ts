import { useEffect, useState } from "react";
import { IWork } from "@/types/work";
import { getWork } from "@/app/actions/workActions";

export function useWork() {
  const [work, setWork] = useState<IWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWork = async () => {
      setLoading(true);
      const result = await getWork();
      if (result.error) {
        setError(result.error);
        setWork([]);
      } else {
        setWork(result.data || []);
        setError(null);
      }
      setLoading(false);
    };
    fetchWork();
  }, []);

  return { work, loading, error };
}
