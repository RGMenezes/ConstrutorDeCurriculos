import { useEffect, useState } from "react";
import { getProfile } from "@/app/actions/profileActions";
import { IProfile } from "@/types/resume";

export function useProfile() {
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      const result = await getProfile();
      
      if (result.error) {
        setError(result.error);
        setProfiles([]);
      } else {
        setProfiles(result.data || []);
        setError(null);
      }
      
      setLoading(false);
    };

    fetchProfiles();
  }, []);

  return { profiles, loading, error };
}
