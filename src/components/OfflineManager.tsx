import React, { useState, useEffect } from 'react';
import {
  Download,
  Trash2,
  CheckCircle,
  HardDrive,
  WifiOff,
  Sparkles,
  Play,
  RotateCw,
  Search,
  AlertCircle,
} from 'lucide-react';
import { SURAHS_METADATA, SurahMeta } from '../data/quranMetadata';
import { Qari, QARIS, getSurahAudioUrl } from '../data/qaris';
import {
  downloadSurahAudio,
  removeOfflineSurah,
  isSurahOffline,
  clearAllOfflineStorage,
  estimateOfflineStorageUsage,
  getDownloadedList,
  DownloadedItem,
} from '../utils/offlineStorage';
import { PWAStatusCard } from './PWAStatusCard';

interface OfflineManagerProps {
  currentQari: Qari;
  onPlaySurah: (surahNumber: number) => void;
  onOpenInstallModal?: () => void;
}

export const OfflineManager: React.FC<OfflineManagerProps> = ({
  currentQari,
  onPlaySurah,
  onOpenInstallModal,
}) => {
  const [downloadedItems, setDownloadedItems] = useState<DownloadedItem[]>([]);
  const [downloadingSurah, setDownloadingSurah] = useState<number | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [storageUsedMB, setStorageUsedMB] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const refreshState = async () => {
    const list = getDownloadedList();
    setDownloadedItems(list);
    const used = await estimateOfflineStorageUsage();
    setStorageUsedMB(used);
  };

  useEffect(() => {
    refreshState();
  }, [currentQari]);

  const handleDownload = async (surahNumber: number) => {
    setDownloadingSurah(surahNumber);
    setDownloadProgress(5);
    setStatusMessage(`Downloading Surah ${surahNumber}...`);

    try {
      const remoteUrl = getSurahAudioUrl(currentQari, surahNumber);
      await downloadSurahAudio(
        currentQari.id,
        surahNumber,
        remoteUrl,
        percent => setDownloadProgress(percent)
      );
      setStatusMessage(`Surah ${surahNumber} saved offline!`);
      setTimeout(() => setStatusMessage(null), 3000);
      await refreshState();
    } catch (err: unknown) {
      console.error('Download error:', err);
      setStatusMessage('Download failed. Please check internet connection.');
      setTimeout(() => setStatusMessage(null), 4000);
    } finally {
      setDownloadingSurah(null);
      setDownloadProgress(0);
    }
  };

  const handleDelete = async (surahNumber: number) => {
    await removeOfflineSurah(currentQari.id, surahNumber);
    await refreshState();
  };

  const handleClearAll = async () => {
    if (confirm('Clear all downloaded offline Surah audios?')) {
      await clearAllOfflineStorage();
      await refreshState();
      setStatusMessage('All offline storage cleared');
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  // Popular Essential Surahs Bundle (Al-Fatihah, Yasin, Ar-Rahman, Al-Mulk, Al-Waqi'ah, Al-Ikhlas, Al-Falaq, An-Nas)
  const essentialSurahNumbers = [1, 36, 55, 56, 67, 112, 113, 114];

  const handleDownloadEssentials = async () => {
    setStatusMessage('Downloading Essential Surahs Bundle...');
    for (const num of essentialSurahNumbers) {
      const isAlready = downloadedItems.some(
        item => item.qariId === currentQari.id && item.surahNumber === num
      );
      if (!isAlready) {
        setDownloadingSurah(num);
        try {
          const url = getSurahAudioUrl(currentQari, num);
          await downloadSurahAudio(currentQari.id, num, url);
        } catch (e) {
          console.error(e);
        }
      }
    }
    setDownloadingSurah(null);
    setStatusMessage('Essential bundle downloaded!');
    setTimeout(() => setStatusMessage(null), 3000);
    await refreshState();
  };

  const filteredSurahs = SURAHS_METADATA.filter(
    s =>
      s.nameEnglish.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.nameArabic.includes(searchFilter) ||
      s.number.toString() === searchFilter
  );

  return (
    <div className="space-y-4 pb-6">
      {/* PWA Chrome App & Android WebAPK Status */}
      <PWAStatusCard onOpenInstallModal={onOpenInstallModal || (() => {})} />

      {/* Offline Storage Status Card */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-950 border border-emerald-800 p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30">
              <HardDrive size={18} />
            </div>
            <div>
              <h2 className="font-bold text-base text-white font-display">Offline Audio Manager</h2>
              <p className="text-xs text-emerald-300/80">
                Works inside the app completely without internet
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            {storageUsedMB} MB Used
          </span>
        </div>

        {/* Current Qari context */}
        <div className="p-3 rounded-2xl bg-emerald-950/70 border border-emerald-800/60 flex items-center justify-between text-xs mb-3">
          <span className="text-emerald-300">
            Active Qari: <strong className="text-amber-300">{currentQari.name}</strong>
          </span>
          <span className="text-emerald-400 font-mono">
            {downloadedItems.filter(i => i.qariId === currentQari.id).length} Surahs Offline
          </span>
        </div>

        {/* Action row: Bundle download or Clear All */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleDownloadEssentials}
            className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition"
          >
            <Sparkles size={13} />
            <span>Download Top Surahs</span>
          </button>

          <button
            onClick={handleClearAll}
            className="py-2 px-3 rounded-xl bg-emerald-900/60 hover:bg-red-500/20 text-emerald-300 hover:text-red-300 border border-emerald-800 font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition"
          >
            <Trash2 size={13} />
            <span>Clear Storage</span>
          </button>
        </div>

        {/* Status notification */}
        {statusMessage && (
          <div className="mt-3 p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-medium text-center flex items-center justify-center gap-2">
            <CheckCircle size={14} />
            <span>{statusMessage}</span>
          </div>
        )}
      </div>

      {/* Search Surah */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-emerald-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Filter surah to download offline..."
          value={searchFilter}
          onChange={e => setSearchFilter(e.target.value)}
          className="w-full bg-emerald-950 border border-emerald-800 rounded-2xl pl-9 pr-3 py-2 text-xs text-white placeholder-emerald-600 focus:outline-none focus:border-amber-400"
        />
      </div>

      {/* Surah List for Downloading */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
        {filteredSurahs.map(surah => {
          const isDownloaded = downloadedItems.some(
            item => item.qariId === currentQari.id && item.surahNumber === surah.number
          );
          const isCurrentlyDownloading = downloadingSurah === surah.number;

          return (
            <div
              key={surah.number}
              className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                isDownloaded
                  ? 'bg-emerald-950/90 border-amber-500/30 shadow-sm'
                  : 'bg-emerald-900/20 border-emerald-800/60 hover:border-emerald-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-xl text-xs font-mono font-bold flex items-center justify-center border ${
                    isDownloaded
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-emerald-950 border-emerald-800 text-emerald-400'
                  }`}
                >
                  {surah.number}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{surah.nameEnglish}</span>
                    <span className="text-xs font-arabic text-amber-300">{surah.nameArabic}</span>
                  </div>
                  <div className="text-[10px] text-emerald-400/80">
                    {surah.totalVerses} Ayahs &bull; {surah.revelationType}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {isDownloaded ? (
                  <>
                    <button
                      onClick={() => onPlaySurah(surah.number)}
                      className="p-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold transition active:scale-95"
                      title="Play Offline"
                    >
                      <Play size={14} fill="currentColor" />
                    </button>
                    <button
                      onClick={() => handleDelete(surah.number)}
                      className="p-2 rounded-xl bg-emerald-950 text-emerald-500 hover:text-red-400 border border-emerald-800 transition"
                      title="Remove from offline cache"
                    >
                      <Trash2 size={13} />
                    </button>
                  </>
                ) : isCurrentlyDownloading ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono">
                    <div className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    <span>{downloadProgress}%</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDownload(surah.number)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/80 text-xs font-medium active:scale-95 transition"
                  >
                    <Download size={13} />
                    <span>Save</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
