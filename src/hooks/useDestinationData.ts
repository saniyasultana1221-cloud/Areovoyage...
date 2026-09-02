import { useState, useEffect, useCallback } from 'react';
import { fetchDestinationData, FullDestinationPayload } from '../services/destinationService';

export interface UseDestinationDataResult {
  data: FullDestinationPayload | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDestinationData(citySlugOrName?: string | null): UseDestinationDataResult {
  const [data, setData] = useState<FullDestinationPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(citySlugOrName));
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!citySlugOrName) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchDestinationData(citySlugOrName);
      if (result) {
        setData(result);
      } else {
        setError(`No destination details found for "${citySlugOrName}".`);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while fetching destination details.');
    } finally {
      setLoading(false);
    }
  }, [citySlugOrName]);

  useEffect(() => {
    let isMounted = true;
    loadData();
    return () => {
      isMounted = false;
    };
  }, [loadData]);

  return {
    data,
    loading,
    error,
    refetch: loadData,
  };
}
