import { useEffect, useState } from "react";
import { getExternalLinks } from "@/app/actions/linksActions";
import { IExternalLink } from "@/types/resume";

export function useExternalLinks() {
  const [links, setLinks] = useState<IExternalLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      const result = await getExternalLinks();
      
      if (result.error) {
        setError(result.error);
        setLinks([]);
      } else {
        setLinks(result.data || []);
        setError(null);
      }
      
      setLoading(false);
    };

    fetchLinks();
  }, []);

  return { links, loading, error };
}
