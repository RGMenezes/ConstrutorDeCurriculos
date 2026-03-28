import { useEffect, useState } from "react";
import { IFeedback } from "@/types/feedback";
import { getFeedback } from "@/app/actions/feedbackActions";

export function useFeedback() {
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      const result = await getFeedback();
      if (result.error) {
        setError(result.error);
        setFeedbacks([]);
      } else {
        setFeedbacks(result.data || []);
        setError(null);
      }
      setLoading(false);
    };
    fetchFeedbacks();
  }, []);

  return { feedbacks, loading, error };
}
