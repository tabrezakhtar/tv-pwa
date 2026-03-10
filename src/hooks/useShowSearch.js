import useSWR from 'swr';
import { saveShowsToCache, getShowsFromCache } from '@/lib/db';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch shows');
  }
  return response.json();
};

export function useShowSearch(query) {
  const shouldFetch = query && query.trim().length > 0;
  const url = shouldFetch ? `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}` : null;

  const { data, error, isLoading } = useSWR(
    url,
    async (url) => {
      try {
        const data = await fetcher(url);
        // Save to IndexedDB for offline use
        await saveShowsToCache(query, data);
        return data;
      } catch (err) {
        // If fetch fails, try to get from cache
        const cached = await getShowsFromCache(query);
        if (cached) {
          return cached;
        }
        throw err;
      }
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  return {
    shows: data,
    isLoading,
    error,
  };
}
