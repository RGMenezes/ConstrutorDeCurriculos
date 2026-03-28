import { useEffect, useState } from "react";
import { ISkill } from "@/types/skill";
import { getSkill } from "@/app/actions/skillActions";

export function useSkill() {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      const result = await getSkill();
      if (result.error) {
        setError(result.error);
        setSkills([]);
      } else {
        setSkills(result.data || []);
        setError(null);
      }
      setLoading(false);
    };
    fetchSkills();
  }, []);

  return { skills, loading, error };
}
