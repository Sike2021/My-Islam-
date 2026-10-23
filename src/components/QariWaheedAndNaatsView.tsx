import React, { useState, useEffect, useRef } from 'react';
import {
  ALL_NAATS_AND_QASMI_TRACKS,
  QARI_WAHEED_NAATS,
  SHUKRAN_YA_RABBI_NAAT,
  QARI_WAHEED_QURAN_RECITATIONS,
  NaatItem
} from '../data/qariWaheedAndNaats';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Search,
  Sparkles,
  Music,
  Download,
  Share2,
  Heart,
  Clock,
  BookOpen,
  Filter,
  Check,
  RefreshCw,
  Radio,
  Repeat,
  ExternalLink,
  Youtube,
} from 'lucide-react';

interface QariWaheedAndNaatsViewProps {
  onOpenSurahReader?: (surahNumber: number) => void;
}

export const QariWaheedAndNaatsView: React.FC<QariWaheedAndNaatsViewProps> = ({
  onOpenSurahReader
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'naats' | 'quran' | 'shukran'>('all');
  const [selectedTrack, setSelectedTrack] = useState<NaatItem>(SHUKRAN_YA_RABBI_NAAT);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showFullLyrics, setShowFullLyrics] = useState(true);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sike_naats_favorites');
      return saved ? JSON.parse(saved) : ['qw-faslon', 'qw-zahe', 'nasheed-shukran-ya-rabbi'];
    } catch {
      return ['qw-faslon', 'qw-zahe', 'nasheed-shukran-ya-rabbi'];
    }
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('sike_naats_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Audio setup & MediaSession
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsLoadingAudio(true);
    setCurrentTime(0);

    audio.src = selectedTrack.audioUrl;
    audio.playbackRate = playbackSpeed;
    audio.volume = isMuted ? 0 : volume;
    audio.loop = isLooping;

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: selectedTrack.titleEnglish,
        artist: selectedTrack.artist,
        album: selectedTrack.category === 'quran-recitation' ? 'Holy Quran Recitation' : 'Sacred Naats & Nasheeds',
        artwork: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => audio.play());
      navigator.mediaSession.setActionHandler('pause', () => audio.pause());
      navigator.mediaSession.setActionHandler('seekbackward', () => skipTime(-15));
      navigator.mediaSession.setActionHandler('seekforward', () => skipTime(15));
    }

    const onCanPlay = () => {
      setIsLoadingAudio(false);
      setDuration(audio.duration || 0);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      if (!isLooping) {
        setIsPlaying(false);
        handleNextTrack();
      }
    };
    const onError = () => {
      setIsLoadingAudio(false);
      setIsPlaying(false);
    };

    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [selectedTrack.id]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      setIsLoadingAudio(true);
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoadingAudio(false);
        })
        .catch(() => {
          setIsPlaying(false);
          setIsLoadingAudio(false);
        });
    }
  };

  const handleSelectTrack = (track: NaatItem, autoPlay = true) => {
    setSelectedTrack(track);
    if (autoPlay) {
      setIsPlaying(true);
      const audio = audioRef.current;
      if (audio) {
        audio.src = track.audioUrl;
        audio.currentTime = 0;
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.warn('Auto-play blocked or buffering:', err));
      }
    }
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, audio.duration || 0));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const target = parseFloat(e.target.value);
    audio.currentTime = target;
    setCurrentTime(target);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);
      audioRef.current.muted = nextMuted;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (audioRef.current) {
      audioRef.current.volume = val;
      audioRef.current.muted = val === 0;
    }
  };

  const handleShare = () => {
    const text = `Listen to: "${selectedTrack.titleEnglish}" by ${selectedTrack.artist}: ${selectedTrack.audioUrl}`;
    if (navigator.share) {
      navigator.share({ title: selectedTrack.titleEnglish, text, url: selectedTrack.audioUrl }).catch(() => {});
    } else {
      navigator.clipboard.writeText(selectedTrack.audioUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Filtered tracks
  const displayedTracks = ALL_NAATS_AND_QASMI_TRACKS.filter((item) => {
    if (activeTab === 'naats' && item.category !== 'naat') return false;
    if (activeTab === 'quran' && item.category !== 'quran-recitation') return false;
    if (activeTab === 'shukran' && item.category !== 'shukran-ya-rabbi') return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.titleEnglish.toLowerCase().includes(q) ||
      item.titleUrdu.includes(q) ||
      item.artist.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleNextTrack = () => {
    const currentIndex = displayedTracks.findIndex((item) => item.id === selectedTrack.id);
    if (currentIndex >= 0 && currentIndex < displayedTracks.length - 1) {
      handleSelectTrack(displayedTracks[currentIndex + 1], true);
    }
  };

  const handlePrevTrack = () => {
    const currentIndex = displayedTracks.findIndex((item) => item.id === selectedTrack.id);
    if (currentIndex > 0) {
      handleSelectTrack(displayedTracks[currentIndex - 1], true);
    }
  };

  return (
    <div className="space-y-6">
      <audio ref={audioRef} preload="metadata" />

      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#023326] via-[#03231a] to-[#01140e] border border-amber-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-sm">
              <Music className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>قاری وحید ظفر قاسمی و کلامِ شکر</span>
            </span>
            <span className="text-xs text-emerald-300/80">
              Legendary Naats · Complete 114 Surahs Recitation · Shukran Ya Rabbi
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Qari Waheed Zafar Qasmi Naats & Quran Sanctuary
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed max-w-2xl">
            Immerse in the timeless voice of Qari Waheed Zafar Qasmi: the complete master collection of heart-stirring Naats (*Faslon Ko Takalluf*, *Zahe Muqaddar*, *Darbar-e-Mustafa*), the complete 114 Surahs Quran recitation with Urdu translation, and the deeply loved muffled acoustic *Shukran Ya Rabbi* gratitude nasheed.
          </p>

          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <button
              onClick={() => handleSelectTrack(QARI_WAHEED_NAATS[0], true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer transition transform active:scale-95"
            >
              <Play className="w-4 h-4 fill-emerald-950" />
              <span>Play "Faslon Ko Takalluf"</span>
            </button>

            <button
              onClick={() => handleSelectTrack(SHUKRAN_YA_RABBI_NAAT, true)}
              className="px-4 py-2.5 rounded-xl bg-[#021812] hover:bg-emerald-900 border border-amber-400/50 text-amber-300 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Play "Shukran Ya Rabbi" (Muffled)</span>
            </button>

            <button
              onClick={() => handleSelectTrack(QARI_WAHEED_NAATS[1], true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/60 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition"
            >
              <Music className="w-4 h-4 text-emerald-400" />
              <span>"Zahe Muqaddar"</span>
            </button>
          </div>
        </div>
      </div>

      {/* MASTER ACTIVE AUDIO PLAYER */}
      <div className="bg-gradient-to-r from-[#032a21] via-[#021d16] to-[#032a21] border-2 border-amber-500/60 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 relative overflow-hidden">
        
        {/* Track Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-emerald-800/80">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 font-bold font-mono text-xl flex items-center justify-center shrink-0 shadow-lg border border-amber-300/40">
              {selectedTrack.category === 'quran-recitation' ? '📖' : '🎙️'}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                <span>{selectedTrack.artist}</span>
                <span aria-hidden="true" className="text-emerald-500">·</span>
                <span className="text-emerald-300 font-normal">{selectedTrack.durationFormatted}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold font-display text-white truncate">
                {selectedTrack.titleEnglish}
              </h2>
              <p className="text-xs text-amber-200 font-arabic truncate" dir="rtl">
                {selectedTrack.titleUrdu}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            {/* Loop Toggle */}
            <button
              onClick={() => {
                const next = !isLooping;
                setIsLooping(next);
                if (audioRef.current) audioRef.current.loop = next;
              }}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                isLooping
                  ? 'bg-amber-500 text-emerald-950 border-amber-400 font-bold shadow-sm'
                  : 'bg-[#021812] border-emerald-800 text-emerald-400 hover:text-white'
              }`}
              title={isLooping ? 'Looping enabled' : 'Enable repeat loop'}
            >
              <Repeat className="w-4 h-4" />
            </button>

            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(selectedTrack.id)}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                favorites.includes(selectedTrack.id)
                  ? 'bg-amber-500/20 border-amber-400 text-amber-400'
                  : 'bg-[#021812] border-emerald-800 text-emerald-400 hover:text-white'
              }`}
              title="Add to Favorites"
            >
              <Heart className={`w-4 h-4 ${favorites.includes(selectedTrack.id) ? 'fill-amber-400' : ''}`} />
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-[#021812] border border-emerald-800 text-emerald-300 hover:text-white transition cursor-pointer"
              title="Share Link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Download MP3 */}
            <a
              href={selectedTrack.audioUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-[#021812] border border-emerald-800 text-emerald-300 hover:text-amber-300 transition cursor-pointer"
              title="Download MP3"
            >
              <Download className="w-4 h-4" />
            </a>

            {/* Open in Quran Reader if track is Quran Surah */}
            {onOpenSurahReader && selectedTrack.surahNumber !== undefined && (
              <button
                onClick={() => onOpenSurahReader(selectedTrack.surahNumber!)}
                className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read Surah</span>
              </button>
            )}
          </div>
        </div>

        {/* YouTube Video Section if available (e.g. Shukran Laka Rabbi wi1_1cJtMY4) */}
        {selectedTrack.youtubeId && (
          <div className="rounded-2xl bg-[#01140e] border border-amber-500/40 p-4 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center">
                  <Youtube size={15} />
                </span>
                <span className="text-xs font-bold text-amber-300">
                  YouTube: Shukran Laka Rabbi (Official)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowYoutubeModal(!showYoutubeModal)}
                  className="px-3 py-1 rounded-xl bg-amber-400 text-emerald-950 font-bold text-xs hover:bg-amber-300 transition"
                >
                  {showYoutubeModal ? 'Hide Video' : 'Watch Video'}
                </button>

                <a
                  href={`https://youtu.be/${selectedTrack.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 text-xs border border-emerald-700/60 transition"
                  title="Open on YouTube"
                >
                  <span>Open</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {showYoutubeModal && (
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-emerald-800 bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedTrack.youtubeId}?autoplay=0&rel=0`}
                  title="Shukran Laka Rabbi Official Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            )}
          </div>
        )}

        {/* Full Line-by-Line Lyrics & Translation Box (Urdu & English) */}
        {selectedTrack.fullLyrics ? (
          <div className="p-4 rounded-2xl bg-[#01140e]/95 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-900/60">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-400" />
                <span>Line-by-Line Lyrics & Translations (شعر در شعر ترجمہ)</span>
              </span>
              <button
                onClick={() => setShowFullLyrics(!showFullLyrics)}
                className="text-xs text-emerald-400 hover:text-white"
              >
                {showFullLyrics ? 'Collapse' : 'Expand All'}
              </button>
            </div>

            {showFullLyrics && (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-emerald-900/40">
                {selectedTrack.fullLyrics.map((line, idx) => (
                  <div key={idx} className="pt-2.5 first:pt-0 space-y-1">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[10px] font-mono text-emerald-500 shrink-0 mt-1">
                        #{idx + 1}
                      </span>
                      <p className="font-arabic text-base sm:text-lg text-amber-200 text-right font-bold flex-1" dir="rtl">
                        {line.arabic}
                      </p>
                    </div>

                    {line.transliteration && (
                      <p className="text-[11px] text-amber-300/80 font-mono italic">
                        {line.transliteration}
                      </p>
                    )}

                    <p className="font-arabic text-xs sm:text-sm text-emerald-200 text-right leading-relaxed" dir="rtl">
                      {line.urdu}
                    </p>

                    <p className="text-[11.5px] text-emerald-300/80 leading-relaxed">
                      {line.english}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          selectedTrack.lyricsExcerptUrdu && (
            <div className="p-4 rounded-2xl bg-[#01140e]/90 border border-emerald-800/80 space-y-2">
              <p className="text-sm sm:text-base font-arabic text-amber-200 text-right leading-relaxed font-medium whitespace-pre-line" dir="rtl">
                {selectedTrack.lyricsExcerptUrdu}
              </p>
              {selectedTrack.lyricsExcerptEnglish && (
                <p className="text-xs text-emerald-300/80 italic leading-relaxed whitespace-pre-line">
                  "{selectedTrack.lyricsExcerptEnglish}"
                </p>
              )}
            </div>
          )
        )}

        {/* Timeline Scrubber */}
        <div className="space-y-1.5">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            disabled={duration === 0}
            className="w-full h-2.5 bg-[#01140e] rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
          />

          <div className="flex items-center justify-between text-xs font-mono text-emerald-400/80">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{formatTime(currentTime)}</span>
            </div>
            <div className="flex items-center gap-2">
              {isLoadingAudio && (
                <span className="flex items-center gap-1 text-amber-300 text-[11px] animate-pulse">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Buffering...</span>
                </span>
              )}
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Playback Controls Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          
          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-[#01140e] p-1 rounded-xl border border-emerald-800/80">
            <span className="text-[10px] font-bold text-emerald-400/80 px-2 uppercase">Speed:</span>
            {[0.75, 1.0, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  playbackSpeed === speed
                    ? 'bg-amber-500 text-emerald-950 shadow-sm'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Central Cluster */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevTrack}
              className="w-10 h-10 rounded-xl bg-[#021812] hover:bg-emerald-900 border border-emerald-800 text-emerald-200 flex items-center justify-center cursor-pointer transition"
              title="Previous Track"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => skipTime(-15)}
              className="w-11 h-11 rounded-xl bg-[#021812] hover:bg-emerald-900 border border-emerald-800 text-emerald-200 flex items-center justify-center cursor-pointer transition"
              title="Rewind 15 seconds"
            >
              <span className="text-xs font-bold font-mono">-15s</span>
            </button>

            <button
              onClick={togglePlayPause}
              disabled={isLoadingAudio && !isPlaying}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-300 text-emerald-950 font-bold flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition cursor-pointer border-2 border-amber-200"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isLoadingAudio ? (
                <RefreshCw className="w-7 h-7 animate-spin text-emerald-950" />
              ) : isPlaying ? (
                <Pause className="w-8 h-8 fill-emerald-950" />
              ) : (
                <Play className="w-8 h-8 fill-emerald-950 ml-1" />
              )}
            </button>

            <button
              onClick={() => skipTime(15)}
              className="w-11 h-11 rounded-xl bg-[#021812] hover:bg-emerald-900 border border-emerald-800 text-emerald-200 flex items-center justify-center cursor-pointer transition"
              title="Forward 15 seconds"
            >
              <span className="text-xs font-bold font-mono">+15s</span>
            </button>

            <button
              onClick={handleNextTrack}
              className="w-10 h-10 rounded-xl bg-[#021812] hover:bg-emerald-900 border border-emerald-800 text-emerald-200 flex items-center justify-center cursor-pointer transition"
              title="Next Track"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 bg-[#01140e] px-3 py-1.5 rounded-xl border border-emerald-800/80">
            <button
              onClick={toggleMute}
              className="text-emerald-400 hover:text-amber-300 transition cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-400" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1.5 bg-[#03231a] rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

        </div>

        {copiedLink && (
          <div className="text-center text-xs font-semibold text-amber-300 animate-in fade-in">
            ✓ Audio stream link copied to clipboard!
          </div>
        )}
      </div>

      {/* FILTER TABS & SEARCH BAR */}
      <div className="space-y-4">
        
        <div className="bg-[#03231a] p-4 rounded-2xl border border-emerald-800/80 shadow-lg flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-amber-500 text-emerald-950 font-extrabold shadow-sm'
                  : 'bg-[#021812] text-emerald-200 hover:text-white border border-emerald-800'
              }`}
            >
              All Tracks ({ALL_NAATS_AND_QASMI_TRACKS.length})
            </button>
            <button
              onClick={() => setActiveTab('naats')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'naats'
                  ? 'bg-amber-500 text-emerald-950 font-extrabold shadow-sm'
                  : 'bg-[#021812] text-emerald-200 hover:text-white border border-emerald-800'
              }`}
            >
              Qari Waheed Naats ({QARI_WAHEED_NAATS.length})
            </button>
            <button
              onClick={() => setActiveTab('shukran')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                activeTab === 'shukran'
                  ? 'bg-amber-500 text-emerald-950 font-extrabold shadow-sm'
                  : 'bg-[#021812] text-amber-300 hover:text-white border border-amber-500/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Shukran Ya Rabbi</span>
            </button>
            <button
              onClick={() => setActiveTab('quran')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'quran'
                  ? 'bg-amber-500 text-emerald-950 font-extrabold shadow-sm'
                  : 'bg-[#021812] text-emerald-200 hover:text-white border border-emerald-800'
              }`}
            >
              Quran Recitations ({QARI_WAHEED_QURAN_RECITATIONS.length})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400" />
            <input
              type="text"
              placeholder="Search naat, Surah or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#021812] border border-emerald-700/80 rounded-xl text-xs text-white placeholder:text-emerald-500 focus:outline-none focus:border-amber-400 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* TRACKS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {displayedTracks.map((item) => {
            const isCurrentActive = selectedTrack.id === item.id;
            const isCurrentlyPlayingThis = isCurrentActive && isPlaying;
            const isFav = favorites.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => handleSelectTrack(item, true)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                  isCurrentActive
                    ? 'bg-[#033126] border-amber-400 shadow-xl ring-1 ring-amber-400/50'
                    : 'bg-[#021c15] border-emerald-800/80 hover:border-emerald-600 hover:bg-[#03261d]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-0.5 rounded-lg font-bold text-[10px] uppercase font-mono ${
                        item.category === 'naat'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : item.category === 'shukran-ya-rabbi'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                          : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50'
                      }`}
                    >
                      {item.category === 'naat' ? 'Naat' : item.category === 'shukran-ya-rabbi' ? 'Nasheed' : 'Quran'}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-emerald-300/80 font-mono">
                        {item.durationFormatted}
                      </span>
                      <button
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className="p-1 text-emerald-500 hover:text-amber-400 transition cursor-pointer"
                        title="Favorite"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-white group-hover:text-amber-200 transition line-clamp-1">
                    {item.titleEnglish}
                  </h3>

                  <p className="font-arabic text-sm text-amber-300/90 font-medium line-clamp-1" dir="rtl">
                    {item.titleUrdu}
                  </p>

                  <p className="text-xs text-emerald-300/70 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-emerald-900/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/90 truncate max-w-[70%]">
                    <span>{item.artist}</span>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition shadow-sm shrink-0 ${
                      isCurrentlyPlayingThis
                        ? 'bg-amber-400 text-emerald-950 font-bold'
                        : 'bg-emerald-900 text-amber-300 group-hover:bg-amber-500 group-hover:text-emerald-950'
                    }`}
                  >
                    {isCurrentlyPlayingThis ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {displayedTracks.length === 0 && (
          <div className="bg-[#03231a] border border-emerald-800 rounded-2xl p-12 text-center space-y-3">
            <Search className="w-10 h-10 text-emerald-500 mx-auto opacity-50" />
            <h3 className="text-base font-bold text-emerald-100">No Tracks Found</h3>
            <p className="text-xs text-emerald-400">
              No matching track found for "{searchQuery}". Try searching by Naat title, Surah name, or reset filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
