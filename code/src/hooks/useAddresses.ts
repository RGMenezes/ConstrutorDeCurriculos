import { useEffect, useState } from "react";
import { getAddresses } from "@/app/actions/addressesActions";
import { IAdresses } from "@/types/resume";

export function useAddresses() {
  const [addresses, setAddresses] = useState<IAdresses[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      const result = await getAddresses();
      
      if (result.error) {
        setError(result.error);
        setAddresses([]);
      } else {
        setAddresses(result.data || []);
        setError(null);
      }
      
      setLoading(false);
    };

    fetchAddresses();
  }, []);

  return { addresses, loading, error };
}
