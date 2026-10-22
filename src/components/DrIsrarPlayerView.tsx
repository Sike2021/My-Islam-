import React, { useState, useRef, useEffect } from 'react';
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
} from 'lucide-react';
import {
  ISRAR_SERIES_LIST,
  ALL_ISRAR_BAYANS,
  IsrarSeriesId,
  IsrarBayanItem,
  getBayansBySeries,
  searchBayans,
} from '../data/israrBayansCatalog';

interface DrIsrarPlayerViewProps {
  onPlayExternalAudio?: (url: string, title: string, artist: string) => void;
}

export const DrIsrarPlayerView: React.FC<DrIsrarPlayerViewProps> = () => {
  const [selectedSeries, setSelectedSeries] = useState<IsrarSeriesId>('bayan-ul-quran');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBayan, setSelectedBayan] = useState<IsrarBayanItem>(ALL_ISRAR_BAYANS[0]);
  const [mediaMode, setMediaMode] = useState<'audio' | 'video'>('audio');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [downloadedBayanIds, setDownloadedBayanIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('easy_islam_israr_downloads');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Filtered bayans
  const displayedBayans = searchQuery
    ? searchBayans(searchQuery, selectedSeries)
    : getBayansBySeries(selectedSeries);

  useEffect(() => {
    // When selected bayan changes, pause and reset
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = selectedBayan.audioUrl;
      audioRef.current.currentTime = 0;
    }
    if (videoRef.current && selectedBayan.videoUrl) {
      videoRef.current.pause();
      videoRef.current.src = selectedBayan.videoUrl;
      videoRef.current.currentTime = 0;
    }
  }, [selectedBayan]);

  const togglePlay = () => {
    if (mediaMode === 'audio' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
    } else if (mediaMode === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
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
      console.warn('Download error:', e);
      // Fallback mark as saved
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
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Dr. Israr Header Card */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-950 border border-amber-500/30 p-5 shadow-2xl relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-emerald-950 font-bold font-serif text-xl shadow-lg shadow-amber-500/20">
              <span>اقرأ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg text-white font-display">Dr. Israr Ahmed</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30">
                  رحمه الله
                </span>
              </div>
              <p className="text-xs text-emerald-300/80">
                Complete Bayan-ul-Quran (114 Surahs), Videos, Audios & Downloads
              </p>
            </div>
          </div>
        </div>

        {/* Media Player Showcase: Audio vs Video Toggle */}
        <div className="mt-4 pt-4 border-t border-emerald-800/60">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMediaMode('audio')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  mediaMode === 'audio'
                    ? 'bg-amber-500 text-emerald-950 shadow-md font-bold'
                    : 'bg-emerald-950/70 text-emerald-300 hover:text-white border border-emerald-800'
                }`}
              >
                <Volume2 size={13} />
                <span>Audio Bayan</span>
              </button>
              <button
                onClick={() => setMediaMode('video')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  mediaMode === 'video'
                    ? 'bg-amber-500 text-emerald-950 shadow-md font-bold'
                    : 'bg-emerald-950/70 text-emerald-300 hover:text-white border border-emerald-800'
                }`}
              >
                <Video size={13} />
                <span>Video Lecture</span>
              </button>
            </div>

            {/* Download Status */}
            {downloadedBayanIds.includes(selectedBayan.id) ? (
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                <CheckCircle size={11} />
                <span>Downloaded Offline</span>
              </span>
            ) : downloadingId === selectedBayan.id ? (
              <span className="text-[11px] text-emerald-300 animate-pulse">
                Downloading audio...
              </span>
            ) : (
              <button
                onClick={() => handleDownload(selectedBayan)}
                className="flex items-center gap-1 text-[11px] text-emerald-300 hover:text-amber-300 bg-emerald-950/80 px-2.5 py-1 rounded-xl border border-emerald-800"
              >
                <Download size={11} />
                <span>Download Audio</span>
              </button>
            )}
          </div>

          {/* Currently Selected Bayan Details */}
          <div className="bg-emerald-950/90 rounded-2xl p-4 border border-emerald-800/80 space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-amber-400 font-mono uppercase tracking-wider font-semibold">
                  {selectedBayan.seriesTitle}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  {selectedBayan.durationFormatted}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                {selectedBayan.titleEnglish}
              </h3>
              <div className="font-arabic text-lg text-amber-300 font-normal mt-0.5">
                {selectedBayan.titleUrdu}
              </div>
              <p className="text-xs text-emerald-300/80 mt-1 line-clamp-2 leading-relaxed">
                {selectedBayan.description}
              </p>
            </div>

            {/* Video Player */}
            {mediaMode === 'video' && selectedBayan.videoUrl && (
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-emerald-800 shadow-lg">
                <video
                  ref={videoRef}
                  src={selectedBayan.videoUrl}
                  controls
                  className="w-full h-full object-contain"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onTimeUpdate={() => {
                    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
                  }}
                  onLoadedMetadata={() => {
                    if (videoRef.current) setDuration(videoRef.current.duration);
                  }}
                />
              </div>
            )}

            {/* Audio Player Controls */}
            {mediaMode === 'audio' && (
              <div className="space-y-2 pt-1">
                <audio
                  ref={audioRef}
                  src={selectedBayan.audioUrl}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onTimeUpdate={() => {
                    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
                  }}
                  onLoadedMetadata={() => {
                    if (audioRef.current) setDuration(audioRef.current.duration);
                  }}
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Scrubber */}
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={e => {
                    const t = parseFloat(e.target.value);
                    if (audioRef.current) audioRef.current.currentTime = t;
                    setCurrentTime(t);
                  }}
                  className="w-full h-1.5 bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />

                <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
                  <span>{formatSecs(currentTime)}</span>
                  <span>{formatSecs(duration)}</span>
                </div>

                <div className="flex items-center justify-center gap-4 pt-1">
                  <button
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 15);
                      }
                    }}
                    className="p-2 rounded-xl bg-emerald-900 text-emerald-300 hover:text-white"
                    title="Rewind 15s"
                  >
                    <RotateCcw size={15} />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/25 active:scale-95 transition"
                  >
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                  </button>

                  <button
                    onClick={() => {
                      const speeds = [0.75, 1, 1.25, 1.5];
                      const nxt = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                      setPlaybackSpeed(nxt);
                      if (audioRef.current) audioRef.current.playbackRate = nxt;
                    }}
                    className="px-2 py-1 rounded-xl bg-emerald-900 text-emerald-300 text-xs font-mono font-bold"
                  >
                    {playbackSpeed}x
                  </button>
                </div>
              </div>
            )}

            {/* YouTube Search Link shortcut */}
            <div className="flex items-center justify-between pt-2 border-t border-emerald-900/60 text-xs">
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedBayan.youtubeSearchQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-emerald-400 hover:text-amber-300 transition text-[11px]"
              >
                <span>Watch on YouTube</span>
                <ExternalLink size={11} />
              </a>

              <span className="text-[10px] text-emerald-400/80">
                Direct Archive.org Stream
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Series Selector Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {ISRAR_SERIES_LIST.map(series => {
          const isSelected = selectedSeries === series.id;
          return (
            <button
              key={series.id}
              onClick={() => {
                setSelectedSeries(series.id);
                setSearchQuery('');
              }}
              className={`px-3 py-2 rounded-2xl text-xs font-semibold shrink-0 transition flex items-center gap-1.5 border ${
                isSelected
                  ? 'bg-amber-500 text-emerald-950 border-amber-400 shadow-md font-bold'
                  : 'bg-emerald-900/40 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900/70'
              }`}
            >
              <span>{series.titleEnglish.split(' ')[0]}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-950/60 text-emerald-200">
                {series.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-emerald-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search Surah, Bayan title, or Urdu topic..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-emerald-950 border border-emerald-800 rounded-2xl pl-9 pr-3 py-2 text-xs text-white placeholder-emerald-600 focus:outline-none focus:border-amber-400"
        />
      </div>

      {/* Lectures List */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
        {displayedBayans.map(bayan => {
          const isCurrent = selectedBayan.id === bayan.id;
          const isSaved = downloadedBayanIds.includes(bayan.id);

          return (
            <div
              key={bayan.id}
              onClick={() => setSelectedBayan(bayan)}
              className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                isCurrent
                  ? 'bg-amber-500/20 border-amber-400/80 shadow-md'
                  : 'bg-emerald-900/30 border-emerald-800/60 hover:bg-emerald-900/60'
              }`}
            >
              <div className="flex-1 pr-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{bayan.titleEnglish}</span>
                  {bayan.isFeatured && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                      Featured
                    </span>
                  )}
                  {isSaved && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-800 text-emerald-200">
                      Offline
                    </span>
                  )}
                </div>
                <div className="font-arabic text-sm text-amber-300 font-normal mt-0.5">
                  {bayan.titleUrdu}
                </div>
                <div className="text-[10px] text-emerald-400/80 mt-1 flex items-center gap-2">
                  <span>{bayan.durationFormatted}</span>
                  <span>&bull;</span>
                  <span>{bayan.seriesTitle}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedBayan(bayan);
                    togglePlay();
                  }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold transition active:scale-90 ${
                    isCurrent && isPlaying
                      ? 'bg-amber-400 text-emerald-950'
                      : 'bg-emerald-950 border border-emerald-800 text-amber-400 hover:bg-amber-500 hover:text-emerald-950'
                  }`}
                >
                  {isCurrent && isPlaying ? (
                    <Pause size={14} fill="currentColor" />
                  ) : (
                    <Play size={14} fill="currentColor" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
