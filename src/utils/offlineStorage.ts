const CACHE_NAME = 'easy-islam-audio-v1';

export interface DownloadProgress {
  surahNumber: number;
  qariId: string;
  progressPercent: number;
  status: 'idle' | 'downloading' | 'completed' | 'error';
  error?: string;
}

// Check if Cache API is supported in the current browser
export function isCacheSupported(): boolean {
  return typeof window !== 'undefined' && 'caches' in window;
}

// Generate unique cache key for a Surah audio file
export function getCacheKey(qariId: string, surahNumber: number): string {
  return `/audio-cache/${qariId}/${surahNumber.toString().padStart(3, '0')}.mp3`;
}

// Check if a Surah audio is already saved in offline storage
export async function isSurahOffline(qariId: string, surahNumber: number): Promise<boolean> {
  if (!isCacheSupported()) return false;
  try {
    const cache = await caches.open(CACHE_NAME);
    const key = getCacheKey(qariId, surahNumber);
    const match = await cache.match(key);
    return !!match;
  } catch (err) {
    console.error('Error checking offline status:', err);
    return false;
  }
}

// Retrieve an offline playback URL for a cached Surah
export async function getOfflineAudioUrl(qariId: string, surahNumber: number): Promise<string | null> {
  if (!isCacheSupported()) return null;
  try {
    const cache = await caches.open(CACHE_NAME);
    const key = getCacheKey(qariId, surahNumber);
    const response = await cache.match(key);
    if (!response) return null;
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error('Failed to get offline audio URL:', err);
    return null;
  }
}

// Download a Surah audio file and store it in offline CacheStorage
export async function downloadSurahAudio(
  qariId: string,
  surahNumber: number,
  remoteUrl: string,
  onProgress?: (percent: number) => void
): Promise<boolean> {
  if (!isCacheSupported()) {
    throw new Error('Offline Cache is not supported in this browser environment.');
  }

  try {
    onProgress?.(10);
    const response = await fetch(remoteUrl, { mode: 'cors' });
    if (!response.ok) {
      throw new Error(`Failed to download audio from server (status ${response.status})`);
    }

    const contentLength = response.headers.get('content-length');
    const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

    let receivedBytes = 0;
    const reader = response.body?.getReader();
    const chunks: Uint8Array[] = [];

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          receivedBytes += value.length;
          if (totalBytes > 0 && onProgress) {
            const percent = Math.min(95, Math.round((receivedBytes / totalBytes) * 100));
            onProgress(percent);
          }
        }
      }
    } else {
      const blob = await response.blob();
      const cache = await caches.open(CACHE_NAME);
      const cacheResponse = new Response(blob, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': blob.size.toString(),
        },
      });
      await cache.put(getCacheKey(qariId, surahNumber), cacheResponse);
      onProgress?.(100);
      recordDownloadedSurah(qariId, surahNumber);
      return true;
    }

    const fullBlob = new Blob(chunks as unknown as BlobPart[], { type: 'audio/mpeg' });
    const cache = await caches.open(CACHE_NAME);
    const cacheResponse = new Response(fullBlob, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': fullBlob.size.toString(),
      },
    });

    await cache.put(getCacheKey(qariId, surahNumber), cacheResponse);
    onProgress?.(100);
    recordDownloadedSurah(qariId, surahNumber);
    return true;
  } catch (err: unknown) {
    console.error('Download error:', err);
    throw err;
  }
}

// Remove a Surah from offline cache
export async function removeOfflineSurah(qariId: string, surahNumber: number): Promise<boolean> {
  if (!isCacheSupported()) return false;
  try {
    const cache = await caches.open(CACHE_NAME);
    const key = getCacheKey(qariId, surahNumber);
    const deleted = await cache.delete(key);
    removeDownloadedSurahRecord(qariId, surahNumber);
    return deleted;
  } catch (err) {
    console.error('Error removing offline surah:', err);
    return false;
  }
}

// Clear all offline audio storage
export async function clearAllOfflineStorage(): Promise<boolean> {
  if (!isCacheSupported()) return false;
  try {
    const deleted = await caches.delete(CACHE_NAME);
    localStorage.removeItem('easy_islam_downloads_meta');
    return deleted;
  } catch (err) {
    console.error('Error clearing cache:', err);
    return false;
  }
}

// Track downloaded Surahs list in localStorage for instant rendering
export interface DownloadedItem {
  qariId: string;
  surahNumber: number;
  downloadedAt: number;
}

export function getDownloadedList(): DownloadedItem[] {
  try {
    const data = localStorage.getItem('easy_islam_downloads_meta');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function recordDownloadedSurah(qariId: string, surahNumber: number) {
  const list = getDownloadedList();
  const exists = list.some(item => item.qariId === qariId && item.surahNumber === surahNumber);
  if (!exists) {
    list.push({ qariId, surahNumber, downloadedAt: Date.now() });
    localStorage.setItem('easy_islam_downloads_meta', JSON.stringify(list));
  }
}

function removeDownloadedSurahRecord(qariId: string, surahNumber: number) {
  const list = getDownloadedList().filter(
    item => !(item.qariId === qariId && item.surahNumber === surahNumber)
  );
  localStorage.setItem('easy_islam_downloads_meta', JSON.stringify(list));
}

// Estimate storage used in megabytes
export async function estimateOfflineStorageUsage(): Promise<number> {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
    try {
      const estimate = await navigator.storage.estimate();
      const usedBytes = estimate.usage || 0;
      return parseFloat((usedBytes / (1024 * 1024)).toFixed(1));
    } catch {
      return 0;
    }
  }
  return 0;
}
