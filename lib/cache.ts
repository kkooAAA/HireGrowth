import { Campaign, DailyMetric } from "@/types/analytics";

/**
 * Simple in-memory cache for server-side responses.
 * In a real production environment, this would be Redis or a similar persistent store.
 */
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function getCachedData<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  const now = Date.now();

  if (cached && (now - cached.timestamp < CACHE_TTL)) {
    console.log(`[Cache] Hit: ${key}`);
    return cached.data;
  }

  console.log(`[Cache] Miss: ${key}. Fetching new data...`);
  const data = await fetcher();
  cache.set(key, { data, timestamp: now });
  return data;
}

export function clearCache(key?: string) {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
}
