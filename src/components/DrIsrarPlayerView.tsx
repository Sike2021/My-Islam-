import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Play,
  Pause,
  Video,
  Volume2,
  Download,
  Share2,
  Search,
  BookOpen,
  GraduationCap,
  Sparkles,
  Radio,
  Compass,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  Maximize2,
  Trash2,
  Clock,
  Filter,
  Check,
  Copy,
  Layers,
  ArrowRight,
  Flame,
  FileText,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import {
  ISRAR_SERIES_LIST,
  ALL_ISRAR_BAYANS,
  IsrarSeriesId,
  IsrarBayanItem,
  getBayansBySeries,
  searchBayans,
} from '../data/israrBayansCatalog';
import { SURAHS_METADATA } from '../data/quranMetadata';
import { fetchAyahTafsir, TafsirResult } from '../data/quranIndex';
import { useUnifiedPlayer } from '../context/UnifiedPlayerContext';

interface DrIsrarPlayerViewProps {
  initialSurahNumber?: number;
}

export const DrIsrarPlayerView: React.FC<DrIsrarPlayerViewProps> = ({ initialSurahNumber }) => {
  const { playBayanTrack, activeTrack, isPlaying: isGlobalPlaying, togglePlay: toggleGlobalPlay, openVideoWatch } = useUnifiedPlayer();

  const [selectedSeries, setSelectedSeries] = useState<IsrarSeriesId>('bayan-ul-quran');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJuz, setSelectedJuz] = useState<number | 0>(0);
  const [revelationFilter, setRevelationFilter] = useState<'all' | 'Meccan' | 'Medinan'>('all');
  const [selectedBayan, setSelectedBayan] = useState<IsrarBayanItem>(() => {
    if (initialSurahNumber) {
      const found = ALL_ISRAR_BAYANS.find(b => b.surahNumber === initialSurahNumber);
      if (found) return found;
    }
    return ALL_ISRAR_BAYANS[0];
  });

  const [mediaMode, setMediaMode] = useState<'audio' | 'video' | 'tafsir'>('audio');
  const [activeMirrorIndex, setActiveMirrorIndex] = useState(0);

  // Audio Playback state
  const [localAudioPlaying, setLocalAudioPlaying] = useState(false);
  const [localAudioProgress, setLocalAudioProgress] = useState(0);
  const [localAudioDuration, setLocalAudioDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Tafseer Text state
  const [tafsirAyah, setTafsirAyah] = useState<number>(1);
  const [tafsirLoading, setTafsirLoading] = useState(false);
  const [tafsirData, setTafsirData] = useState<TafsirResult | null>(null);
  const [tafsirError, setTafsirError] = useState<string | null>(null);
  const [copiedTafsir, setCopiedTafsir] = useState(false);

  // Offline downloads
  const [downloadedBayanIds, setDownloadedBayanIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('easy_islam_israr_downloads');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const localAudioRef = useRef<HTMLAudioElement | null>(null);

  // Sync initialSurahNumber if changed
  useEffect(() => {
    if (initialSurahNumber) {
      const found = ALL_ISRAR_BAYANS.find(b => b.surahNumber === initialSurahNumber);
      if (found) {
        setSelectedBayan(found);
      }
    }
  }, [initialSurahNumber]);

  // Filtered Bayans
  const displayedBayans = useMemo(() => {
    return searchBayans(
      searchQuery,
      selectedSeries,
      selectedSeries === 'bayan-ul-quran' && selectedJuz > 0 ? selectedJuz : undefined,
      selectedSeries === 'bayan-ul-quran' ? revelationFilter : undefined
    );
  }, [searchQuery, selectedSeries, selectedJuz, revelationFilter]);

  // Check if active bayan is playing globally or locally
  const isSelectedPlaying =
    (isGlobalPlaying && activeTrack.title === selectedBayan.titleEnglish) ||
    localAudioPlaying;

  // Current audio source URL based on active mirror
  const currentAudioUrl = useMemo(() => {
    if (selectedBayan.audioSources && selectedBayan.audioSources.length > 0) {
      const idx = Math.min(activeMirrorIndex, selectedBayan.audioSources.length - 1);
      return selectedBayan.audioSources[idx];
    }
    return selectedBayan.audioUrl;
  }, [selectedBayan, activeMirrorIndex]);

  // Handle Tafseer fetch when selecting a Surah or Ayah in Tafseer mode
  useEffect(() => {
    if (mediaMode === 'tafsir' && selectedBayan.surahNumber) {
      setTafsirLoading(true);
      setTafsirError(null);
      fetchAyahTafsir(selectedBayan.surahNumber, tafsirAyah, 'israr')
        .then((res) => {
          setTafsirData(res);
          setTafsirLoading(false);
        })
        .catch(() => {
          setTafsirError('Failed to load online commentary for this verse. Please check your connection.');
          setTafsirLoading(false);
        });
    }
  }, [mediaMode, selectedBayan.surahNumber, tafsirAyah]);

  // Setup local audio element handlers
  useEffect(() => {
    const audio = localAudioRef.current;
    if (!audio) return;

    const onPlay = () => setLocalAudioPlaying(true);
    const onPause = () => setLocalAudioPlaying(false);
    const onTimeUpdate = () => setLocalAudioProgress(audio.currentTime);
    const onLoadedMetadata = () => {
      setLocalAudioDuration(audio.duration || 0);
      setAudioError(null);
    };
    const onError = () => {
      console.warn('Dr. Israr audio stream error, trying fallback mirror...');
      // Try next mirror if available
      if (selectedBayan.audioSources && activeMirrorIndex < selectedBayan.audioSources.length - 1) {
        setActiveMirrorIndex(prev => prev + 1);
      } else {
        setAudioError('Unable to connect to audio mirror. Please tap Retry or Switch Mirror.');
      }
      setLocalAudioPlaying(false);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('error', onError);
    };
  }, [selectedBayan, activeMirrorIndex]);

  // When selected bayan changes, reset mirror index and local audio
  const handleSelectBayan = (bayan: IsrarBayanItem, autoPlay = true) => {
    setSelectedBayan(bayan);
    setActiveMirrorIndex(0);
    setAudioError(null);
    setTafsirAyah(1);

    if (mediaMode === 'audio') {
      if (autoPlay) {
        // Play via Global Unified Player for seamless background audio across tabs
        playBayanTrack(
          bayan.titleEnglish,
          bayan.audioUrl,
          'Dr. Israr Ahmed',
          bayan.videoUrl,
          undefined,
          bayan.audioSources
        );
      }
    } else if (mediaMode === 'video') {
      const vidTarget = bayan.videoUrl || bayan.youtubeSearchQuery;
      openVideoWatch(vidTarget, bayan.titleEnglish, 'Dr. Israr Ahmed • ' + bayan.titleUrdu);
    }
  };

  const togglePlayback = () => {
    if (activeTrack.title === selectedBayan.titleEnglish) {
      toggleGlobalPlay();
    } else {
      playBayanTrack(
        selectedBayan.titleEnglish,
        currentAudioUrl,
        'Dr. Israr Ahmed',
        selectedBayan.videoUrl,
        undefined,
        selectedBayan.audioSources
      );
    }
  };

  const handleSeek = (newTime: number) => {
    if (localAudioRef.current) {
      localAudioRef.current.currentTime = newTime;
      setLocalAudioProgress(newTime);
    }
  };

  const handleSkip = (seconds: number) => {
    if (localAudioRef.current) {
      const current = localAudioRef.current.currentTime;
      localAudioRef.current.currentTime = Math.max(0, Math.min(current + seconds, localAudioDuration));
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (localAudioRef.current) {
      localAudioRef.current.playbackRate = speed;
    }
  };

  const handleDownload = async (bayan: IsrarBayanItem) => {
    if (downloadedBayanIds.includes(bayan.id)) return;
    setDownloadingId(bayan.id);

    try {
      if ('caches' in window) {
        const cache = await caches.open('easy-islam-israr-audio-v1');
        const res = await fetch(bayan.audioUrl, { mode: 'cors' });
        if (res.ok) {
          await cache.put(bayan.audioUrl, res);
        }
      }
      const updated = [...downloadedBayanIds, bayan.id];
      setDownloadedBayanIds(updated);
      localStorage.setItem('easy_islam_israr_downloads', JSON.stringify(updated));
    } catch (e) {
      console.warn('Download cache note:', e);
      const updated = [...downloadedBayanIds, bayan.id];
      setDownloadedBayanIds(updated);
      localStorage.setItem('easy_islam_israr_downloads', JSON.stringify(updated));
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDeleteDownload = (bayanId: string) => {
    const updated = downloadedBayanIds.filter(id => id !== bayanId);
    setDownloadedBayanIds(updated);
    localStorage.setItem('easy_islam_israr_downloads', JSON.stringify(updated));
  };

  const formatSecs = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopyTafsir = () => {
    if (!tafsirData) return;
    const clean = tafsirData.text.replace(/<[^>]*>?/gm, '');
    navigator.clipboard.writeText(
      `Tafseer Surah ${selectedBayan.titleEnglish} Ayah ${tafsirAyah} - Dr. Israr Ahmed\n\n${clean}`
    );
    setCopiedTafsir(true);
    setTimeout(() => setCopiedTafsir(false), 2000);
  };

  const currentSurahMeta = useMemo(() => {
    if (!selectedBayan.surahNumber) return null;
    return SURAHS_METADATA.find(s => s.number === selectedBayan.surahNumber);
  }, [selectedBayan.surahNumber]);

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      {/* Hidden fallback audio element for standalone in-view scrubbing if needed */}
      <audio ref={localAudioRef} src={currentAudioUrl} preload="none" />

      {/* Hero Header: Dr. Israr Ahmed (رحمه الله) */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 border border-amber-500/30 p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-emerald-950 font-bold font-serif text-2xl shadow-xl shadow-amber-500/20 shrink-0">
              <span>اقرأ</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-bold text-lg text-white font-display">Dr. Israr Ahmed</h1>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30">
                  رحمه الله
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200 font-mono">
                  Tanzeem-e-Islami
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Complete Bayan-ul-Quran (114 Surahs), Audio MP3s, Video Bayanat & Written Tafseer
              </p>
            </div>
          </div>

          {/* Quick External Channel Links */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <a
              href="https://www.youtube.com/playlist?list=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/30 hover:bg-red-600/50 text-red-200 border border-red-500/40 text-xs font-semibold transition active:scale-95 shadow-sm"
              title="Open Official Complete 108 Bayan-ul-Quran Playlist on YouTube"
            >
              <span>108 Videos Playlist</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Master Media Deck Card */}
        <div className="mt-4 pt-4 border-t border-emerald-800/80">
          {/* Mode Switcher: Audio Bayan vs Video Lecture vs Written Tafseer */}
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div className="inline-flex p-1 rounded-2xl bg-emerald-950/90 border border-emerald-800/80 shadow-inner">
              <button
                onClick={() => setMediaMode('audio')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 ${
                  mediaMode === 'audio'
                    ? 'bg-amber-400 text-emerald-950 font-bold shadow-md shadow-amber-400/20'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                <Volume2 size={14} />
                <span>Audio Bayan</span>
              </button>

              <button
                onClick={() => setMediaMode('video')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 ${
                  mediaMode === 'video'
                    ? 'bg-amber-400 text-emerald-950 font-bold shadow-md shadow-amber-400/20'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                <Video size={14} />
                <span>Video Lecture</span>
              </button>

              {selectedBayan.surahNumber && (
                <button
                  onClick={() => setMediaMode('tafsir')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 ${
                    mediaMode === 'tafsir'
                      ? 'bg-amber-400 text-emerald-950 font-bold shadow-md shadow-amber-400/20'
                      : 'text-emerald-300 hover:text-white'
                  }`}
                >
                  <FileText size={14} />
                  <span>تفسیر بیان القرآن</span>
                </button>
              )}
            </div>

            {/* Offline PWA Download Status */}
            <div className="flex items-center gap-2">
              {downloadedBayanIds.includes(selectedBayan.id) ? (
                <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 bg-amber-500/15 px-2.5 py-1 rounded-full border border-amber-500/30">
                  <CheckCircle size={12} />
                  <span>Saved Offline</span>
                  <button
                    onClick={() => handleDeleteDownload(selectedBayan.id)}
                    className="ml-1 text-emerald-400 hover:text-red-400 transition"
                    title="Remove from offline cache"
                  >
                    <Trash2 size={11} />
                  </button>
                </span>
              ) : downloadingId === selectedBayan.id ? (
                <span className="text-[11px] text-amber-300 animate-pulse flex items-center gap-1">
                  <RefreshCw size={11} className="animate-spin" />
                  <span>Downloading MP3...</span>
                </span>
              ) : (
                <button
                  onClick={() => handleDownload(selectedBayan)}
                  className="flex items-center gap-1.5 text-xs text-emerald-200 hover:text-white bg-emerald-950/80 hover:bg-emerald-900 px-3 py-1.5 rounded-xl border border-emerald-700/80 transition active:scale-95 shadow-sm"
                >
                  <Download size={13} className="text-amber-400" />
                  <span>Download MP3</span>
                </button>
              )}
            </div>
          </div>

          {/* Currently Selected Bayan Details Box */}
          <div className="bg-emerald-950/95 rounded-2xl p-4 border border-emerald-800/90 shadow-xl space-y-3">
            <div>
              <div className="flex items-center justify-between flex-wrap gap-1 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-400/15 text-amber-300 font-mono font-bold border border-amber-400/30">
                    {selectedBayan.seriesTitle}
                  </span>
                  {selectedBayan.juzNumber && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-800/70 text-emerald-200 font-mono">
                      Juz / Para {selectedBayan.juzNumber}
                    </span>
                  )}
                  {selectedBayan.revelationType && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-900 text-emerald-300 text-[10px]">
                      {selectedBayan.revelationType} • {selectedBayan.totalVerses} Ayahs
                    </span>
                  )}
                </div>
                <span className="text-emerald-400 font-mono flex items-center gap-1">
                  <Clock size={12} />
                  {selectedBayan.durationFormatted}
                </span>
              </div>

              <h2 className="text-lg font-bold text-white mt-1.5 font-display tracking-tight">
                {selectedBayan.titleEnglish}
              </h2>
              <div className="font-arabic text-xl text-amber-300 font-normal mt-0.5">
                {selectedBayan.titleUrdu}
              </div>
              <p className="text-xs text-emerald-200/80 mt-1.5 leading-relaxed">
                {selectedBayan.description}
              </p>
            </div>

            {/* Error Banner with Mirror Failover Switch */}
            {audioError && (
              <div className="p-3 bg-red-950/60 rounded-xl border border-red-500/40 flex items-center justify-between text-xs text-red-200">
                <div className="flex items-center gap-2">
                  <AlertCircle size={15} className="text-red-400 shrink-0" />
                  <span>{audioError}</span>
                </div>
                {selectedBayan.audioSources && selectedBayan.audioSources.length > 1 && (
                  <button
                    onClick={() => {
                      setActiveMirrorIndex(prev => (prev + 1) % selectedBayan.audioSources.length);
                      setAudioError(null);
                      togglePlayback();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-400 text-emerald-950 font-bold hover:bg-amber-300 transition text-[11px]"
                  >
                    Switch Mirror
                  </button>
                )}
              </div>
            )}

            {/* MODE 1: AUDIO BAYAN CONTROLS */}
            {mediaMode === 'audio' && (
              <div className="p-3.5 bg-emerald-900/60 rounded-2xl border border-emerald-800/80 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isSelectedPlaying ? 'bg-amber-400 animate-ping' : 'bg-emerald-600'
                      }`}
                    />
                    <span className="text-xs text-emerald-200 font-medium">
                      {isSelectedPlaying
                        ? 'Playing via High-Clarity Audio Stream'
                        : 'Direct Archive.org Cloud Stream'}
                    </span>
                  </div>

                  {/* Mirror Selector */}
                  {selectedBayan.audioSources && selectedBayan.audioSources.length > 1 && (
                    <div className="flex items-center gap-1 text-[10px] text-emerald-300">
                      <span>Mirror:</span>
                      {selectedBayan.audioSources.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveMirrorIndex(i)}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition ${
                            activeMirrorIndex === i
                              ? 'bg-amber-400 text-emerald-950 font-bold'
                              : 'bg-emerald-950 text-emerald-400 hover:text-white'
                          }`}
                        >
                          M{i + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Master Play Button & Speed Controls */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlayback}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition active:scale-95"
                    >
                      {isSelectedPlaying ? (
                        <Pause size={16} fill="currentColor" />
                      ) : (
                        <Play size={16} fill="currentColor" className="ml-0.5" />
                      )}
                      <span>{isSelectedPlaying ? 'Pause Bayan' : 'Play Audio Bayan'}</span>
                    </button>

                    <button
                      onClick={() => handleSkip(-15)}
                      className="p-2 rounded-xl bg-emerald-950 text-emerald-300 hover:text-white border border-emerald-800 transition active:scale-90 text-[11px] font-mono"
                      title="Rewind 15 seconds"
                    >
                      -15s
                    </button>
                    <button
                      onClick={() => handleSkip(15)}
                      className="p-2 rounded-xl bg-emerald-950 text-emerald-300 hover:text-white border border-emerald-800 transition active:scale-90 text-[11px] font-mono"
                      title="Skip forward 15 seconds"
                    >
                      +15s
                    </button>
                  </div>

                  {/* Playback speed toggle */}
                  <div className="flex items-center gap-1">
                    {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-mono transition ${
                          playbackSpeed === speed
                            ? 'bg-amber-400 text-emerald-950 font-bold'
                            : 'bg-emerald-950/80 text-emerald-300 hover:text-white border border-emerald-800'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MODE 2: VIDEO LECTURE EMBED / WATCH */}
            {mediaMode === 'video' && (
              <div className="space-y-2">
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-emerald-800 shadow-2xl flex items-center justify-center">
                  {selectedBayan.youtubeVideoId ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${selectedBayan.youtubeVideoId}?rel=0&modestbranding=1`}
                      title={selectedBayan.titleEnglish}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center group">
                      <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition active:scale-95 mb-3">
                        <Play size={28} fill="currentColor" className="ml-1" />
                      </div>
                      <h4 className="text-sm font-bold text-white font-display">
                        Watch {selectedBayan.titleEnglish} Video
                      </h4>
                      <p className="text-xs text-emerald-300 font-arabic mt-0.5">
                        ڈاکٹر اسرار احمد کا ویڈیو بیان مکمل اسکرین پر دیکھیں
                      </p>
                      <button
                        onClick={() =>
                          openVideoWatch(
                            selectedBayan.videoUrl || selectedBayan.youtubeSearchQuery,
                            selectedBayan.titleEnglish,
                            'Dr. Israr Ahmed'
                          )
                        }
                        className="mt-3 px-4 py-2 rounded-xl bg-amber-400 text-emerald-950 font-bold text-xs shadow-md transition active:scale-95"
                      >
                        Open Fullscreen Video Player
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs px-1">
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                      selectedBayan.youtubeSearchQuery
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                  >
                    <span>Search on YouTube Official Channel</span>
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href="https://www.youtube.com/playlist?list=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-300 hover:text-white flex items-center gap-1"
                  >
                    <span>Complete 108 Parts Playlist</span>
                    <ChevronRight size={13} />
                  </a>
                </div>
              </div>
            )}

            {/* MODE 3: WRITTEN TAFSEER (تفسیر بیان القرآن) */}
            {mediaMode === 'tafsir' && selectedBayan.surahNumber && currentSurahMeta && (
              <div className="p-4 bg-emerald-900/50 rounded-2xl border border-emerald-800 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-amber-400" />
                    <span className="text-sm font-bold text-white">
                      تفسیر بیان القرآن • سورۃ {currentSurahMeta.nameArabic}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Ayah selector dropdown */}
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-emerald-300">آیت نمبر:</span>
                      <select
                        value={tafsirAyah}
                        onChange={(e) => setTafsirAyah(Number(e.target.value))}
                        className="bg-emerald-950 border border-emerald-700 text-amber-300 text-xs rounded-lg px-2 py-1 font-mono focus:outline-none"
                      >
                        {Array.from({ length: currentSurahMeta.totalVerses }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            Ayah {num} / {currentSurahMeta.totalVerses}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={handleCopyTafsir}
                      disabled={!tafsirData}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-800 text-emerald-200 text-xs border border-emerald-700 transition"
                      title="Copy Tafseer text"
                    >
                      {copiedTafsir ? <Check size={12} className="text-amber-400" /> : <Copy size={12} />}
                      <span>{copiedTafsir ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Tafseer Content Container */}
                <div className="bg-emerald-950/80 rounded-xl p-4 border border-emerald-800/80 min-h-[160px] text-emerald-50">
                  {tafsirLoading ? (
                    <div className="py-8 flex flex-col items-center justify-center text-center text-emerald-300 gap-2">
                      <RefreshCw size={20} className="animate-spin text-amber-400" />
                      <span className="text-xs">ڈاکٹر اسرار احمد کی تفسیر بیان القرآن لوڈ ہو رہی ہے...</span>
                    </div>
                  ) : tafsirError ? (
                    <div className="py-6 text-center text-xs text-amber-300 space-y-2">
                      <p>{tafsirError}</p>
                      <button
                        onClick={() => {
                          setTafsirLoading(true);
                          setTafsirError(null);
                          fetchAyahTafsir(selectedBayan.surahNumber!, tafsirAyah, 'israr')
                            .then(res => { setTafsirData(res); setTafsirLoading(false); })
                            .catch(() => { setTafsirError('Retry failed.'); setTafsirLoading(false); });
                        }}
                        className="px-3 py-1 rounded-lg bg-amber-400 text-emerald-950 font-bold text-xs"
                      >
                        Retry
                      </button>
                    </div>
                  ) : tafsirData ? (
                    <div
                      className="text-right font-urdu text-base leading-loose font-normal text-emerald-50"
                      dir="rtl"
                      dangerouslySetInnerHTML={{ __html: tafsirData.text }}
                    />
                  ) : (
                    <div className="text-center py-6 text-xs text-emerald-400 font-arabic">
                      آیت منتخب کریں اور تفسیر بیان القرآن پڑھیں
                    </div>
                  )}
                </div>

                {/* Previous / Next Ayah navigation buttons */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={() => setTafsirAyah(prev => Math.max(1, prev - 1))}
                    disabled={tafsirAyah <= 1}
                    className="px-3 py-1 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    ← Previous Ayah
                  </button>

                  <span className="font-mono text-xs text-amber-400">
                    Ayah {tafsirAyah} of {currentSurahMeta.totalVerses}
                  </span>

                  <button
                    onClick={() => setTafsirAyah(prev => Math.min(currentSurahMeta.totalVerses, prev + 1))}
                    disabled={tafsirAyah >= currentSurahMeta.totalVerses}
                    className="px-3 py-1 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    Next Ayah →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Series Selection Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {ISRAR_SERIES_LIST.map((series) => {
          const isActive = selectedSeries === series.id;
          return (
            <button
              key={series.id}
              onClick={() => {
                setSelectedSeries(series.id);
                setSelectedJuz(0);
                const firstInSeries = getBayansBySeries(series.id)[0];
                if (firstInSeries) {
                  setSelectedBayan(firstInSeries);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition active:scale-95 shrink-0 shadow-sm ${
                isActive
                  ? 'bg-amber-400 text-emerald-950 font-bold shadow-md shadow-amber-400/20'
                  : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/80'
              }`}
            >
              <span>{series.titleEnglish}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  isActive
                    ? 'bg-emerald-950 text-amber-300'
                    : 'bg-emerald-950/80 text-emerald-300'
                }`}
              >
                {series.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Filter & Search Toolbar (Only for Bayan-ul-Quran) */}
      {selectedSeries === 'bayan-ul-quran' && (
        <div className="bg-emerald-950/80 rounded-2xl p-3 border border-emerald-800/80 space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-emerald-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search 114 Surahs by name (e.g. Yasin, Kahf), number (1-114), or Para (1-30)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-emerald-900/70 border border-emerald-700/80 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-emerald-400/60 focus:outline-none focus:border-amber-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-emerald-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Juz / Parah Filter (1 to 30) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setSelectedJuz(0)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                selectedJuz === 0
                  ? 'bg-amber-400 text-emerald-950 font-bold'
                  : 'bg-emerald-900/50 text-emerald-300 hover:text-white border border-emerald-800'
              }`}
            >
              All 114 Surahs
            </button>

            {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
              <button
                key={juz}
                onClick={() => setSelectedJuz(juz)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                  selectedJuz === juz
                    ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm'
                    : 'bg-emerald-900/50 text-emerald-300 hover:text-white border border-emerald-800'
                }`}
              >
                Para {juz}
              </button>
            ))}
          </div>

          {/* Makki / Madani Filter Chips */}
          <div className="flex items-center justify-between text-xs pt-1 border-t border-emerald-800/60">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-emerald-400 font-medium">Revelation:</span>
              {(['all', 'Meccan', 'Medinan'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setRevelationFilter(type)}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition ${
                    revelationFilter === type
                      ? 'bg-amber-400 text-emerald-950 font-bold'
                      : 'bg-emerald-900/60 text-emerald-300 hover:text-white'
                  }`}
                >
                  {type === 'all' ? 'All' : type === 'Meccan' ? 'Makki (مکی)' : 'Madani (مدنی)'}
                </button>
              ))}
            </div>

            <span className="text-[11px] text-emerald-400 font-mono">
              {displayedBayans.length} lectures found
            </span>
          </div>
        </div>
      )}

      {/* Lectures Catalog Grid / List */}
      <div className="space-y-2.5">
        {displayedBayans.length === 0 ? (
          <div className="p-8 text-center bg-emerald-950/60 rounded-2xl border border-emerald-800 text-emerald-300 space-y-2">
            <p className="text-sm font-semibold text-white">No lectures match your search filter</p>
            <p className="text-xs text-emerald-400">Try searching with a different Surah name, number, or reset filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedJuz(0);
                setRevelationFilter('all');
              }}
              className="mt-2 px-3 py-1.5 rounded-xl bg-amber-400 text-emerald-950 font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          displayedBayans.map((bayan) => {
            const isCurrent = selectedBayan.id === bayan.id;
            const isPlayingThis = isGlobalPlaying && activeTrack.title === bayan.titleEnglish;
            const isSaved = downloadedBayanIds.includes(bayan.id);

            return (
              <div
                key={bayan.id}
                onClick={() => handleSelectBayan(bayan, false)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isCurrent
                    ? 'bg-emerald-900/90 border-amber-400 shadow-lg shadow-amber-400/5'
                    : 'bg-emerald-950/70 border-emerald-800/70 hover:bg-emerald-900/50 hover:border-emerald-700'
                }`}
              >
                {/* Left: Number Badge / Equalizer */}
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold font-mono text-sm shrink-0 shadow-inner ${
                    isPlayingThis
                      ? 'bg-amber-400 text-emerald-950 shadow-md animate-pulse'
                      : isCurrent
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                      : 'bg-emerald-900/80 text-emerald-200 border border-emerald-800'
                  }`}
                >
                  {isPlayingThis ? (
                    <Volume2 size={18} className="animate-bounce" />
                  ) : bayan.surahNumber ? (
                    bayan.surahNumber
                  ) : (
                    bayan.partNumber || '•'
                  )}
                </div>

                {/* Middle: Titles & Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-white truncate font-display">
                      {bayan.titleEnglish}
                    </span>
                    {bayan.isFeatured && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-semibold shrink-0">
                        Featured
                      </span>
                    )}
                    {isSaved && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-800 text-emerald-200 shrink-0">
                        Offline
                      </span>
                    )}
                  </div>

                  <div className="font-arabic text-sm text-amber-300 font-normal mt-0.5 truncate">
                    {bayan.titleUrdu}
                  </div>

                  <div className="text-[10px] text-emerald-400/80 mt-1 flex items-center gap-2 flex-wrap">
                    <span className="font-mono flex items-center gap-1">
                      <Clock size={11} />
                      {bayan.durationFormatted}
                    </span>
                    {bayan.juzNumber && (
                      <>
                        <span>•</span>
                        <span>Para {bayan.juzNumber}</span>
                      </>
                    )}
                    {bayan.revelationType && (
                      <>
                        <span>•</span>
                        <span>{bayan.revelationType}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Play audio button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectBayan(bayan, true);
                    }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold transition active:scale-90 shadow-md ${
                      isPlayingThis
                        ? 'bg-amber-400 text-emerald-950 scale-105'
                        : isCurrent
                        ? 'bg-amber-400 text-emerald-950'
                        : 'bg-emerald-900 hover:bg-amber-400 text-emerald-200 hover:text-emerald-950 border border-emerald-700/80'
                    }`}
                    title={isPlayingThis ? 'Pause Audio' : 'Play Audio Bayan'}
                  >
                    {isPlayingThis ? (
                      <Pause size={15} fill="currentColor" />
                    ) : (
                      <Play size={15} fill="currentColor" className="ml-0.5" />
                    )}
                  </button>

                  {/* Video launch button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBayan(bayan);
                      setMediaMode('video');
                      const vidTarget = bayan.videoUrl || bayan.youtubeSearchQuery;
                      openVideoWatch(vidTarget, bayan.titleEnglish, 'Dr. Israr Ahmed • ' + bayan.titleUrdu);
                    }}
                    className="w-9 h-9 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-800 flex items-center justify-center transition active:scale-90"
                    title="Watch Video Lecture"
                  >
                    <Video size={15} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
