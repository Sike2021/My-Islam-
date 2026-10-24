import React, { useState, useEffect, useRef } from 'react';
import {
  SCHOLARS_LIST,
  ALL_ULAMA_LECTURES,
  MAUDUDI_LECTURES,
  MAULANA_ISHAQ_LECTURES,
  ScholarId,
  UlamaLectureItem
} from '../data/ulamaLectures';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Search,
  BookOpen,
  Sparkles,
  Radio,
  Clock,
  Download,
  Share2,
  Heart,
  ExternalLink,
  GraduationCap,
  RefreshCw,
  Repeat,
  Video
} from 'lucide-react';

interface UlamaBayansViewProps {
  onOpenSurahReader?: (surahNumber: number) => void;
  onNavigateToIsrar?: () => void;
}

export const UlamaBayansView: React.FC<UlamaBayansViewProps> = ({
  onOpenSurahReader,
  onNavigateToIsrar
}) => {
  const [activeScholar, setActiveScholar] = useState<ScholarId>('maududi');
  const [selectedLecture, setSelectedLecture] = useState<UlamaLectureItem>(MAUDUDI_LECTURES[1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sike_ulama_favorites');
      return saved ? JSON.parse(saved) : ['mm-surah-1', 'mm-surah-36', 'mi-namaz-jama', 'mi-kalma-janati'];
    } catch {
      return ['mm-surah-1', 'mm-surah-36', 'mi-namaz-jama', 'mi-kalma-janati'];
    }
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('sike_ulama_favorites', JSON.stringify(favorites));
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsLoadingAudio(true);
    setCurrentTime(0);

    audio.src = selectedLecture.audioUrl;
    audio.playbackRate = playbackSpeed;
    audio.volume = isMuted ? 0 : volume;

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: selectedLecture.titleEnglish,
        artist: selectedLecture.scholarName,
        album: selectedLecture.category,
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
      setIsPlaying(false);
      handleNextTrack();
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
  }, [selectedLecture.id]);

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

  const handleSelectLecture = (item: UlamaLectureItem, autoPlay = true) => {
    setSelectedLecture(item);
    if (item.scholarId !== activeScholar) {
      setActiveScholar(item.scholarId);
    }
    if (autoPlay) {
      setIsPlaying(true);
      const audio = audioRef.current;
      if (audio) {
        audio.src = item.audioUrl;
        audio.currentTime = 0;
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.warn('Auto-play blocked or loading:', err));
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
    const text = `Listen to lecture: "${selectedLecture.titleEnglish}" by ${selectedLecture.scholarName}: ${selectedLecture.audioUrl}`;
    if (navigator.share) {
      navigator.share({ title: selectedLecture.titleEnglish, text, url: selectedLecture.audioUrl }).catch(() => {});
    } else {
      navigator.clipboard.writeText(selectedLecture.audioUrl);
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

  const currentLectures =
    activeScholar === 'maududi'
      ? MAUDUDI_LECTURES
      : activeScholar === 'ishaq'
      ? MAULANA_ISHAQ_LECTURES
      : [];

  const filteredLectures = currentLectures.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.titleEnglish.toLowerCase().includes(q) ||
      item.titleUrdu.includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.keyTopics.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleNextTrack = () => {
    const currentIndex = currentLectures.findIndex((item) => item.id === selectedLecture.id);
    if (currentIndex >= 0 && currentIndex < currentLectures.length - 1) {
      handleSelectLecture(currentLectures[currentIndex + 1], true);
    }
  };

  const handlePrevTrack = () => {
    const currentIndex = currentLectures.findIndex((item) => item.id === selectedLecture.id);
    if (currentIndex > 0) {
      handleSelectLecture(currentLectures[currentIndex - 1], true);
    }
  };

  return (
    <div className="space-y-6">
      <audio ref={audioRef} preload="metadata" />

      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#023126] via-[#03231a] to-[#01140e] border border-amber-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-sm">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>مکتبۂ علمائے کرام و مفسرین</span>
            </span>
            <span className="text-xs text-emerald-300/80">
              Maulana Maududi · Maulana Ishaq Madani · Dr. Israr Ahmed
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Distinguished Islamic Scholars & Tafseer Archive
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed max-w-2xl">
            Stream the seminal works of landmark scholars: Maulana Syed Abul A’la Maududi’s complete 114 Surahs *Tafheem-ul-Quran* audio, Maulana Ishaq Madani’s heartfelt discourses on Namaz, Imaan, and Hadith questions, and seamless access to Dr. Israr Ahmed’s Bayan-ul-Quran.
          </p>

          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <button
              onClick={() => {
                setActiveScholar('maududi');
                handleSelectLecture(MAUDUDI_LECTURES[1], true);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer transition transform active:scale-95"
            >
              <Play className="w-4 h-4 fill-emerald-950" />
              <span>Maududi: Tafheem Surah Al-Fatihah</span>
            </button>

            <button
              onClick={() => {
                setActiveScholar('ishaq');
                handleSelectLecture(MAULANA_ISHAQ_LECTURES[0], true);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#021812] hover:bg-emerald-900 border border-amber-400/50 text-amber-300 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition"
            >
              <Radio className="w-4 h-4 text-amber-400" />
              <span>Maulana Ishaq: Namaz & Fiqh</span>
            </button>

            {onNavigateToIsrar && (
              <button
                onClick={onNavigateToIsrar}
                className="px-4 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/60 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Dr. Israr Bayans Hub</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SCHOLAR SELECTOR - VISIBLE 3-CARD GRID (NO SWIPE REQUIRED) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-amber-300 font-semibold px-1">
          <span>Select Scholar / عالم دین منتخب کریں:</span>
          <span className="text-[11px] text-emerald-400">All 3 Scholars Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SCHOLARS_LIST.map((scholar) => {
            const isActive = activeScholar === scholar.id;
            return (
              <button
                key={scholar.id}
                onClick={() => {
                  if (scholar.id === 'israr' && onNavigateToIsrar) {
                    onNavigateToIsrar();
                    return;
                  }
                  setActiveScholar(scholar.id);
                  if (scholar.id === 'maududi') {
                    handleSelectLecture(MAUDUDI_LECTURES[1] || MAUDUDI_LECTURES[0], true);
                  } else if (scholar.id === 'ishaq') {
                    handleSelectLecture(MAULANA_ISHAQ_LECTURES[0], true);
                  }
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-br from-[#064234] to-[#032a21] border-amber-400 ring-2 ring-amber-400/40 shadow-xl'
                    : 'bg-[#021d15] border-emerald-800/80 hover:border-amber-400/50 hover:bg-[#03261c]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="w-7 h-7 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center text-xs font-bold">
                      {scholar.id === 'maududi' ? '📚' : scholar.id === 'ishaq' ? '⚖️' : '🎙️'}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-900 text-amber-300'
                    }`}>
                      {scholar.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white group-hover:text-amber-200 transition">
                    {scholar.nameEnglish}
                  </h3>

                  <p className="font-arabic text-xs text-amber-300/90 font-medium mt-0.5" dir="rtl">
                    {scholar.nameUrdu}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-emerald-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-300/80">{scholar.titleEnglish.split(' ')[0]} {scholar.titleEnglish.split(' ')[1]}</span>
                  <span className={`font-semibold ${isActive ? 'text-amber-300' : 'text-emerald-400'}`}>
                    {isActive ? '● Playing Now' : 'Tap to Listen →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MASTER ACTIVE AUDIO PLAYER */}
      <div className="bg-gradient-to-r from-[#032a21] via-[#021d16] to-[#032a21] border-2 border-amber-500/60 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 relative overflow-hidden">
        
        {/* Track Details */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-emerald-800/80">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 font-bold font-mono text-xl flex items-center justify-center shrink-0 shadow-lg border border-amber-300/40">
              🎙️
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                <span>{selectedLecture.scholarName}</span>
                <span aria-hidden="true" className="text-emerald-500">·</span>
                <span className="text-emerald-300 font-normal">{selectedLecture.durationFormatted}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold font-display text-white truncate">
                {selectedLecture.titleEnglish}
              </h2>
              <p className="text-xs text-amber-200 font-arabic truncate" dir="rtl">
                {selectedLecture.titleUrdu}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(selectedLecture.id)}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                favorites.includes(selectedLecture.id)
                  ? 'bg-amber-500/20 border-amber-400 text-amber-400'
                  : 'bg-[#021812] border-emerald-800 text-emerald-400 hover:text-white'
              }`}
              title="Add to Favorites"
            >
              <Heart className={`w-4 h-4 ${favorites.includes(selectedLecture.id) ? 'fill-amber-400' : ''}`} />
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
              href={selectedLecture.audioUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-[#021812] border border-emerald-800 text-emerald-300 hover:text-amber-300 transition cursor-pointer"
              title="Download MP3"
            >
              <Download className="w-4 h-4" />
            </a>

            {/* Watch Video Toggle Button (as requested: Audio player with optional toggle to watch video) */}
            <button
              onClick={() => setIsVideoPlayerOpen(prev => !prev)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                isVideoPlayerOpen
                  ? 'bg-amber-400 text-emerald-950 border border-amber-300 font-bold shadow-md'
                  : 'bg-red-900/50 hover:bg-red-900/80 text-amber-300 border border-red-500/40'
              }`}
              title="Toggle to watch video bayan"
            >
              <Video className="w-3.5 h-3.5" />
              <span>{isVideoPlayerOpen ? 'Audio Only' : 'Watch Video'}</span>
            </button>

            {/* Open in Quran Reader if lecture is Surah based */}
            {onOpenSurahReader && selectedLecture.surahNumber !== undefined && selectedLecture.surahNumber > 0 && (
              <button
                onClick={() => onOpenSurahReader(selectedLecture.surahNumber!)}
                className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read Surah</span>
              </button>
            )}
          </div>
        </div>

        {/* Optional Collapsible Video Frame */}
        {isVideoPlayerOpen && (
          <div className="pt-2 border-t border-emerald-800/80 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-amber-300/90">
              <span className="font-medium">
                📺 Video Bayan: {selectedLecture.titleEnglish} &bull; {selectedLecture.scholarName}
              </span>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                  `${selectedLecture.scholarName} ${selectedLecture.titleEnglish} ${selectedLecture.titleUrdu}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Search YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-amber-500/40 bg-black shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(
                  `${selectedLecture.scholarName} ${selectedLecture.titleEnglish} تفہیم القرآن`
                )}`}
                title={`Video Bayan: ${selectedLecture.titleEnglish}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
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

          {/* Central Controls */}
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

          {/* Volume Slider */}
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

        {/* Description & Topics */}
        <div className="pt-3 border-t border-emerald-800/60 text-xs space-y-2">
          <p className="text-emerald-200/90 leading-relaxed">
            {selectedLecture.description}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400/80 flex-wrap">
            <span className="text-amber-400 font-semibold">Key Topics:</span>
            {selectedLecture.keyTopics.map((topic, i) => (
              <React.Fragment key={topic}>
                <span>{topic}</span>
                {i < selectedLecture.keyTopics.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {copiedLink && (
          <div className="text-center text-xs font-semibold text-amber-300 animate-in fade-in">
            ✓ Audio stream link copied to clipboard!
          </div>
        )}
      </div>

      {/* SEARCH BAR & PLAYLIST */}
      <div className="space-y-4">
        
        <div className="bg-[#03231a] p-4 rounded-2xl border border-emerald-800/80 shadow-lg flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="text-xs text-emerald-300">
            <span className="text-amber-300 font-bold">{filteredLectures.length}</span> lectures available in {activeScholar === 'maududi' ? 'Tafheem-ul-Quran' : 'Discourses'}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400" />
            <input
              type="text"
              placeholder="Search by topic, Urdu name or Surah..."
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

        {/* LECTURES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredLectures.map((item) => {
            const isCurrentActive = selectedLecture.id === item.id;
            const isCurrentlyPlayingThis = isCurrentActive && isPlaying;
            const isFav = favorites.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => handleSelectLecture(item, true)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                  isCurrentActive
                    ? 'bg-[#033126] border-amber-400 shadow-xl ring-1 ring-amber-400/50'
                    : 'bg-[#021c15] border-emerald-800/80 hover:border-emerald-600 hover:bg-[#03261d]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-lg font-bold text-[10px] uppercase font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {item.category}
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
                    <span>{item.scholarName}</span>
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
      </div>
    </div>
  );
};
