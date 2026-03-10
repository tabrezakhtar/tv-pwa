import useSWR from 'swr';
import { saveShowsToCache, getShowsFromCache } from '@/lib/db';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch show details');
  }
  return response.json();
};

export function useShowDetails(showId) {
  const shouldFetch = showId != null;
  const url = shouldFetch ? `https://api.tvmaze.com/shows/${showId}?embed[]=cast&embed[]=seasons` : null;

  const { data, error, isLoading, mutate } = useSWR(
    url,
    async (url) => {
      try {
        const data = await fetcher(url);
        // Save to IndexedDB for offline use
        await saveShowsToCache(`show:${showId}`, data);
        return data;
      } catch (err) {
        // If fetch fails, try to get from cache
        const cached = await getShowsFromCache(`show:${showId}`);
        if (cached) {
          return cached;
        }
        throw err;
      }
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // Cache for 5 minutes
    }
  );

  return {
    show: data,
    isLoading,
    error,
    clearError: () => mutate(undefined, false),
  };
}
