import React, { useState, useEffect, useRef } from 'react';
import {
  QURAN_114_SURAHS,
  SurahMeta,
  Ayah,
  fetchSurahVerses,
  RECITERS,
  ReciterId,
  URDU_VOICES,
  UrduVoiceId,
  URDU_SCHOLARS,
  UrduScholarId,
  TAFSIR_SOURCES,
  TafsirSourceId,
  TafsirResult,
  fetchAyahTafsir,
  getDrIsrarSurahAudioUrl,
  getAyahAudioUrl,
  getAyahUrduAudioUrl,
  getAyahEnglishAudioUrl
} from '../data/quranIndex';
import {
  BookOpen,
  Search,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Heart,
  Sparkles,
  RotateCcw,
  RefreshCw,
  Columns,
  Rows,
  Maximize2,
  X,
  Radio,
  Languages,
  BookMarked,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  FileText,
  Download,
  Tv
} from 'lucide-react';

interface FullQuranReaderProps {
  initialSurahNumber?: number;
  onNavigateToIsrarHub?: (surahNumber?: number) => void;
}

export type TranslationAudioMode = 'arabic_urdu' | 'arabic_english' | 'arabic_both' | 'arabic_only' | 'urdu_only' | 'english_only';

export const FullQuranReader: React.FC<FullQuranReaderProps> = ({ 
  initialSurahNumber = 1,
  onNavigateToIsrarHub
}) => {
  // Navigation / Directory state
  const [selectedSurah, setSelectedSurah] = useState<SurahMeta | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Meccan' | 'Medinan' | 'Bookmarks'>('All');
  
  // Verses state
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Translation Scholars state
  const [urduScholar, setUrduScholar] = useState<UrduScholarId>('israr');
  const [showUrdu, setShowUrdu] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [arabicFontSize, setArabicFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [layoutMode, setLayoutMode] = useState<'alongside' | 'stacked'>('alongside');

  // Reciter & Voice Recitation Audio state
  const [reciterId, setReciterId] = useState<ReciterId>('sudais');
  const [urduVoiceId, setUrduVoiceId] = useState<UrduVoiceId>('jalandhari');
  const [audioMode, setAudioMode] = useState<TranslationAudioMode>('arabic_urdu');
  const [currentAudioPhase, setCurrentAudioPhase] = useState<'arabic' | 'urdu' | 'english'>('arabic');
  const [isCompanionModalOpen, setIsCompanionModalOpen] = useState(false);

  // Audio Playback state
  const [currentPlayingAyahIndex, setCurrentPlayingAyahIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Tafseer Modal & Inline State
  const [selectedTafsirAyah, setSelectedTafsirAyah] = useState<Ayah | null>(null);
  const [activeTafsirSource, setActiveTafsirSource] = useState<TafsirSourceId>('israr');
  const [tafsirData, setTafsirData] = useState<TafsirResult | null>(null);
  const [tafsirLoading, setTafsirLoading] = useState(false);
  const [tafsirError, setTafsirError] = useState<string | null>(null);

  // Inline Tafseer Expansion
  const [expandedInlineAyah, setExpandedInlineAyah] = useState<number | null>(null);
  const [inlineTafsirMap, setInlineTafsirMap] = useState<Record<number, TafsirResult>>({});
  const [inlineLoadingMap, setInlineLoadingMap] = useState<Record<number, boolean>>({});

  // Dr. Israr Ahmed Bayan-ul-Quran Audio Lecture State
  const [isDrIsrarAudioPlaying, setIsDrIsrarAudioPlaying] = useState(false);
  const [drIsrarCurrentTime, setDrIsrarCurrentTime] = useState(0);
  const [drIsrarDuration, setDrIsrarDuration] = useState(0);
  const [drIsrarLoading, setDrIsrarLoading] = useState(false);
  const [drIsrarSpeed, setDrIsrarSpeed] = useState<number>(1.0);
  const [showDrIsrarPlayerBar, setShowDrIsrarPlayerBar] = useState(false);
  const drIsrarAudioRef = useRef<HTMLAudioElement | null>(null);

  // Bookmarks & Last Read state
  const [bookmarkedSurahs, setBookmarkedSurahs] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('sike_bookmarked_surahs');
      return saved ? JSON.parse(saved) : [1, 36, 67, 112];
    } catch {
      return [1, 36, 67, 112];
    }
  });

  const [lastRead, setLastRead] = useState<{ surahNumber: number; ayahNumber: number } | null>(() => {
    try {
      const saved = localStorage.getItem('sike_last_read_quran');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);
  const [copiedTafsir, setCopiedTafsir] = useState(false);

  // Save bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('sike_bookmarked_surahs', JSON.stringify(bookmarkedSurahs));
    } catch {
      // ignore
    }
  }, [bookmarkedSurahs]);

  // Load verses when a Surah is selected
  useEffect(() => {
    if (!selectedSurah) return;

    let isMounted = true;
    setLoading(true);
    setLoadError(null);
    setAyahs([]);
    stopAudio();
    stopDrIsrarAudio();

    // Update last read
    const readingPos = { surahNumber: selectedSurah.number, ayahNumber: 1 };
    setLastRead(readingPos);
    try {
      localStorage.setItem('sike_last_read_quran', JSON.stringify(readingPos));
    } catch {
      // ignore
    }

    fetchSurahVerses(selectedSurah.number)
      .then((data) => {
        if (isMounted) {
          setAyahs(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoadError('Failed to load verses. Please check your internet connection and try again.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      stopAudio();
      stopDrIsrarAudio();
    };
  }, [selectedSurah]);

  // Fetch Tafsir when selectedTafsirAyah or activeTafsirSource changes
  useEffect(() => {
    if (!selectedSurah || !selectedTafsirAyah) return;

    let isMounted = true;
    setTafsirLoading(true);
    setTafsirError(null);
    setTafsirData(null);

    fetchAyahTafsir(selectedSurah.number, selectedTafsirAyah.numberInSurah, activeTafsirSource)
      .then((res) => {
        if (isMounted) {
          setTafsirData(res);
          setTafsirLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setTafsirError('Failed to load Tafseer. Please verify your connection.');
          setTafsirLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedSurah, selectedTafsirAyah, activeTafsirSource]);

  // Stop main Quran recitation audio
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setCurrentPlayingAyahIndex(null);
    setCurrentAudioPhase('arabic');
  };

  // Synchronize initialSurahNumber prop
  useEffect(() => {
    if (initialSurahNumber && initialSurahNumber > 0) {
      const match = QURAN_114_SURAHS.find(s => s.number === initialSurahNumber);
      if (match) setSelectedSurah(match);
    }
  }, [initialSurahNumber]);

  // Format seconds into readable MM:SS or HH:MM:SS
  const formatSeconds = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (h > 0) {
      return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Stop Dr. Israr audio lecture
  const stopDrIsrarAudio = () => {
    if (drIsrarAudioRef.current) {
      drIsrarAudioRef.current.pause();
    }
    setIsDrIsrarAudioPlaying(false);
    setDrIsrarLoading(false);
  };

  const closeDrIsrarPlayerBar = () => {
    stopDrIsrarAudio();
    setShowDrIsrarPlayerBar(false);
  };

  const toggleDrIsrarAudio = () => {
    if (!selectedSurah) return;
    const targetUrl = getDrIsrarSurahAudioUrl(selectedSurah.number);

    if (!drIsrarAudioRef.current) {
      drIsrarAudioRef.current = new Audio();
    }
    const audio = drIsrarAudioRef.current;

    audio.ontimeupdate = () => {
      setDrIsrarCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDrIsrarDuration(audio.duration);
      }
    };
    audio.onloadedmetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDrIsrarDuration(audio.duration);
      }
      setDrIsrarLoading(false);
    };
    audio.onended = () => {
      setIsDrIsrarAudioPlaying(false);
      setDrIsrarLoading(false);
    };
    audio.onerror = () => {
      console.warn('Dr. Israr audio error loading URL:', audio.src);
      setIsDrIsrarAudioPlaying(false);
      setDrIsrarLoading(false);
    };

    if (!audio.src || (!audio.src.includes(encodeURIComponent(targetUrl.split('/').pop() || '')) && audio.src !== targetUrl)) {
      audio.src = targetUrl;
      setDrIsrarCurrentTime(0);
      setDrIsrarDuration(0);
    }

    setShowDrIsrarPlayerBar(true);

    if (isDrIsrarAudioPlaying) {
      audio.pause();
      setIsDrIsrarAudioPlaying(false);
    } else {
      // Stop recitation if playing to avoid audio conflict
      if (isPlaying) {
        stopAudio();
      }
      setDrIsrarLoading(true);
      audio.playbackRate = drIsrarSpeed;
      audio.play()
        .then(() => {
          setIsDrIsrarAudioPlaying(true);
          setDrIsrarLoading(false);
        })
        .catch(err => {
          console.warn('Playback error:', err);
          setIsDrIsrarAudioPlaying(false);
          setDrIsrarLoading(false);
        });
    }
  };

  const handleDrIsrarSkip = (deltaSeconds: number) => {
    if (!drIsrarAudioRef.current) return;
    const audio = drIsrarAudioRef.current;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + deltaSeconds, audio.duration || 0));
  };

  const handleDrIsrarSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!drIsrarAudioRef.current) return;
    const target = parseFloat(e.target.value);
    drIsrarAudioRef.current.currentTime = target;
    setDrIsrarCurrentTime(target);
  };

  const handleDrIsrarSpeedChange = (speed: number) => {
    setDrIsrarSpeed(speed);
    if (drIsrarAudioRef.current) {
      drIsrarAudioRef.current.playbackRate = speed;
    }
  };

  // Speaks translation using Web Speech API as resilient fallback
  const speakTranslationFallback = (text: string, lang: 'ur-PK' | 'en-US', onFinish: () => void) => {
    if (!('speechSynthesis' in window)) {
      onFinish();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = playbackSpeed;
    utterance.onend = () => onFinish();
    utterance.onerror = () => onFinish();
    window.speechSynthesis.speak(utterance);
  };

  // Master Play Ayah Function with Phase Routing
  const playAyahAt = (index: number, phase?: 'arabic' | 'urdu' | 'english') => {
    if (!selectedSurah || !ayahs[index]) return;

    // Pause Dr. Israr audio lecture if active
    if (isDrIsrarAudioPlaying) {
      stopDrIsrarAudio();
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const ayah = ayahs[index];

    let activePhase: 'arabic' | 'urdu' | 'english' = phase || 'arabic';
    if (!phase) {
      if (audioMode === 'urdu_only') activePhase = 'urdu';
      else if (audioMode === 'english_only') activePhase = 'english';
      else activePhase = 'arabic';
    }

    setCurrentPlayingAyahIndex(index);
    setCurrentAudioPhase(activePhase);

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    audio.playbackRate = playbackSpeed;

    let url = '';
    if (activePhase === 'arabic') {
      url = getAyahAudioUrl(reciterId, selectedSurah.number, ayah.numberInSurah);
    } else if (activePhase === 'urdu') {
      url = getAyahUrduAudioUrl(selectedSurah.number, ayah.numberInSurah, urduVoiceId);
    } else if (activePhase === 'english') {
      url = getAyahEnglishAudioUrl(selectedSurah.number, ayah.numberInSurah);
    }

    audio.src = url;

    audio.onended = () => {
      handlePhaseCompletion(index, activePhase, ayah);
    };

    audio.onerror = () => {
      console.warn(`Audio source unavailable for phase ${activePhase} at ${url}. Trying speech synthesis fallback.`);
      const activeUrduText = (urduScholar === 'israr' && ayah.textUrduIsrar) ? ayah.textUrduIsrar : ayah.textUrdu;
      if (activePhase === 'urdu' && activeUrduText) {
        speakTranslationFallback(activeUrduText, 'ur-PK', () => handlePhaseCompletion(index, activePhase, ayah));
      } else if (activePhase === 'english' && ayah.textEnglish) {
        speakTranslationFallback(ayah.textEnglish, 'en-US', () => handlePhaseCompletion(index, activePhase, ayah));
      } else {
        handlePhaseCompletion(index, activePhase, ayah);
      }
    };

    audio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.warn('Playback initiation error:', err);
        const activeUrduText = (urduScholar === 'israr' && ayah.textUrduIsrar) ? ayah.textUrduIsrar : ayah.textUrdu;
        if (activePhase === 'urdu' && activeUrduText) {
          speakTranslationFallback(activeUrduText, 'ur-PK', () => handlePhaseCompletion(index, activePhase, ayah));
        } else if (activePhase === 'english' && ayah.textEnglish) {
          speakTranslationFallback(ayah.textEnglish, 'en-US', () => handlePhaseCompletion(index, activePhase, ayah));
        }
      });
  };

  // Phase Transition Manager for Recitation & Translation Alongside
  const handlePhaseCompletion = (currentIndex: number, completedPhase: 'arabic' | 'urdu' | 'english', currentAyah: Ayah) => {
    if (audioMode === 'arabic_urdu') {
      if (completedPhase === 'arabic') {
        playAyahAt(currentIndex, 'urdu');
      } else {
        advanceToNextAyah(currentIndex);
      }
    } else if (audioMode === 'arabic_english') {
      if (completedPhase === 'arabic') {
        playAyahAt(currentIndex, 'english');
      } else {
        advanceToNextAyah(currentIndex);
      }
    } else if (audioMode === 'arabic_both') {
      if (completedPhase === 'arabic') {
        playAyahAt(currentIndex, 'urdu');
      } else if (completedPhase === 'urdu') {
        playAyahAt(currentIndex, 'english');
      } else {
        advanceToNextAyah(currentIndex);
      }
    } else if (audioMode === 'arabic_only') {
      advanceToNextAyah(currentIndex);
    } else if (audioMode === 'urdu_only') {
      advanceToNextAyah(currentIndex, 'urdu');
    } else if (audioMode === 'english_only') {
      advanceToNextAyah(currentIndex, 'english');
    }
  };

  // Advances to the next Ayah seamlessly
  const advanceToNextAyah = (currentIndex: number, defaultPhase?: 'arabic' | 'urdu' | 'english') => {
    if (currentIndex < ayahs.length - 1) {
      const nextIdx = currentIndex + 1;
      playAyahAt(nextIdx, defaultPhase);
      const row = document.getElementById(`ayah-row-${ayahs[nextIdx].numberInSurah}`);
      if (row) {
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      stopAudio();
    }
  };

  const togglePlayPause = () => {
    if (!isPlaying) {
      if (currentPlayingAyahIndex !== null) {
        if (audioRef.current && audioRef.current.src) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          playAyahAt(currentPlayingAyahIndex);
        }
      } else {
        playAyahAt(0);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
      setIsPlaying(false);
    }
  };

  const handlePrevAyah = () => {
    if (currentPlayingAyahIndex !== null && currentPlayingAyahIndex > 0) {
      playAyahAt(currentPlayingAyahIndex - 1);
    }
  };

  const handleNextAyah = () => {
    if (currentPlayingAyahIndex !== null && currentPlayingAyahIndex < ayahs.length - 1) {
      playAyahAt(currentPlayingAyahIndex + 1);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const handleCopyAyah = (ayah: Ayah) => {
    const activeUrdu = (urduScholar === 'israr' && ayah.textUrduIsrar) ? ayah.textUrduIsrar : ayah.textUrdu;
    const israrSnippet = ayah.textUrduIsrar ? `\n[Dr. Israr Ahmed - بیان القرآن]: ${ayah.textUrduIsrar}` : '';
    const textToCopy = `Surah ${selectedSurah?.englishName} (${selectedSurah?.number}:${ayah.numberInSurah})\n\n${ayah.textArabic}\n\n[Urdu - ${urduScholar === 'israr' ? 'Dr. Israr Ahmed' : 'Jalandhari'}]: ${activeUrdu}${urduScholar === 'both' ? israrSnippet : ''}\n\n[English]: ${ayah.textEnglish}\n\n— Sike's Perspective on Islam`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyah(ayah.numberInSurah);
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  const handleCopyTafsir = () => {
    if (!tafsirData || !selectedTafsirAyah || !selectedSurah) return;
    const cleanTafsir = tafsirData.text.replace(/<[^>]+>/g, '').trim();
    const text = `Tafseer: Surah ${selectedSurah.englishName} (${selectedSurah.number}:${selectedTafsirAyah.numberInSurah})\nAuthor: ${tafsirData.authorName} (${tafsirData.resourceName})\n\n${cleanTafsir}\n\n— Sike's Perspective on Islam`;
    navigator.clipboard.writeText(text);
    setCopiedTafsir(true);
    setTimeout(() => setCopiedTafsir(false), 2000);
  };

  const toggleBookmark = (surahNum: number) => {
    setBookmarkedSurahs((prev) =>
      prev.includes(surahNum) ? prev.filter((n) => n !== surahNum) : [...prev, surahNum]
    );
  };

  // Toggle inline tafseer for an Ayah
  const toggleInlineTafsir = async (ayah: Ayah) => {
    if (expandedInlineAyah === ayah.numberInSurah) {
      setExpandedInlineAyah(null);
      return;
    }
    setExpandedInlineAyah(ayah.numberInSurah);

    if (!inlineTafsirMap[ayah.numberInSurah] && selectedSurah) {
      setInlineLoadingMap(prev => ({ ...prev, [ayah.numberInSurah]: true }));
      try {
        const res = await fetchAyahTafsir(selectedSurah.number, ayah.numberInSurah, activeTafsirSource);
        setInlineTafsirMap(prev => ({ ...prev, [ayah.numberInSurah]: res }));
      } catch (err) {
        console.error(err);
      } finally {
        setInlineLoadingMap(prev => ({ ...prev, [ayah.numberInSurah]: false }));
      }
    }
  };

  // Filter Surahs
  const filteredSurahs = QURAN_114_SURAHS.filter((surah) => {
    const matchesSearch =
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.name.includes(searchQuery) ||
      String(surah.number) === searchQuery.trim();

    if (!matchesSearch) return false;

    if (filterType === 'Meccan') return surah.revelationType === 'Meccan';
    if (filterType === 'Medinan') return surah.revelationType === 'Medinan';
    if (filterType === 'Bookmarks') return bookmarkedSurahs.includes(surah.number);
    return true;
  });

  const currentAyah = currentPlayingAyahIndex !== null ? ayahs[currentPlayingAyahIndex] : null;

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Breadcrumb / Surah Navigation Header */}
      <div className="bg-[#03231a] border border-emerald-800/80 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-amber-500/10 via-emerald-600/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>القرآن الكريم · 114 Surahs</span>
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-900/60 text-emerald-300 border border-emerald-700/60">
                Dr. Israr Ahmed (بیان القرآن) Translation & Tafseer
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-950/80 text-amber-200 border border-emerald-800">
                Recitation alongside Translation Voice
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
              <span>Noble Quran Directory & Reader</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Explore the whole Quran with Dr. Israr Ahmed's Bayan-ul-Quran translation & Tafseer in Urdu and English, authentic Arabic recitations by Sheikh Abdul Rahman Al-Sudais & Saud Al-Shuraim, and Maulana Fateh Muhammad Jalandhari voice.
            </p>
          </div>

          {/* Quick Stats or Actions */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            {lastRead && (
              <button
                onClick={() => {
                  const s = QURAN_114_SURAHS.find((item) => item.number === lastRead.surahNumber);
                  if (s) setSelectedSurah(s);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-xs font-semibold text-amber-300 flex items-center gap-1.5 transition cursor-pointer"
              >
                <BookMarked className="w-3.5 h-3.5" />
                <span>Resume Surah {lastRead.surahNumber}</span>
              </button>
            )}

            {selectedSurah && (
              <button
                onClick={() => setSelectedSurah(null)}
                className="px-3.5 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/60 text-xs font-semibold text-emerald-200 flex items-center gap-1.5 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>All Surahs (فہرست)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* VIEW 1: 114 SURAHS DIRECTORY & SEARCH */}
      {!selectedSurah ? (
        <div className="space-y-5">
          {/* Search, Makki/Medinan Filters, and Bookmarks */}
          <div className="bg-[#03231a] border border-emerald-800/80 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400" />
              <input
                type="text"
                placeholder="Search Surah by name, number, meaning (e.g. 36, Yasin, Cow, يس)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#021812] border border-emerald-700/80 rounded-xl text-xs sm:text-sm text-emerald-100 placeholder:text-emerald-500/70 focus:outline-none focus:border-amber-400 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-white text-xs cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-[#021812] p-1 rounded-xl border border-emerald-700/70 w-full md:w-auto overflow-x-auto">
              {(['All', 'Meccan', 'Medinan', 'Bookmarks'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                    filterType === type
                      ? 'bg-amber-500 text-emerald-950 font-bold shadow-sm'
                      : 'text-emerald-300 hover:text-white'
                  }`}
                >
                  {type === 'All' && 'All (114)'}
                  {type === 'Meccan' && 'Makki (مكية)'}
                  {type === 'Medinan' && 'Medinan (مدنية)'}
                  {type === 'Bookmarks' && `Saved (${bookmarkedSurahs.length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Surahs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredSurahs.map((surah) => {
              const isBookmarked = bookmarkedSurahs.includes(surah.number);
              return (
                <div
                  key={surah.number}
                  onClick={() => setSelectedSurah(surah)}
                  className="group bg-[#04281f] hover:bg-[#06382b] border border-emerald-800/80 hover:border-amber-400/60 rounded-2xl p-4 transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl relative flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Surah Number Badge */}
                    <div className="w-11 h-11 rounded-xl bg-[#021812] border border-emerald-700/60 group-hover:border-amber-400/60 flex items-center justify-center shrink-0 font-mono text-sm font-bold text-amber-300 transition">
                      {surah.number}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-emerald-50 group-hover:text-amber-200 transition truncate">
                          {surah.englishName}
                        </h4>
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
                            surah.revelationType === 'Meccan'
                              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {surah.revelationType}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-400/80 truncate">
                        {surah.englishNameTranslation} · {surah.numberOfAyahs} Ayahs
                      </p>
                    </div>
                  </div>

                  {/* Arabic Calligraphy & Bookmark Button */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-arabic text-xl text-amber-300/90 group-hover:text-amber-200 transition">
                      {surah.name}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(surah.number);
                      }}
                      className="p-1.5 rounded-lg text-emerald-400 hover:text-amber-300 transition cursor-pointer"
                      title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isBookmarked ? 'fill-amber-400 text-amber-400' : 'text-emerald-500'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSurahs.length === 0 && (
            <div className="bg-[#03231a] border border-emerald-800 rounded-2xl p-12 text-center space-y-3">
              <Search className="w-10 h-10 text-emerald-500 mx-auto opacity-50" />
              <h3 className="text-base font-bold text-emerald-100">No Surahs Found</h3>
              <p className="text-xs text-emerald-400">
                No matching Surah found for "{searchQuery}". Try searching by English name, Arabic name, or Surah number.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('All');
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        /* VIEW 2: ACTIVE SURAH READER WITH ALONGSIDE RECITATION & TRANSLATION */
        <div className="space-y-6">
          
          {/* Active Surah Hero Header */}
          <div className="bg-gradient-to-r from-[#022b20] via-[#043d2e] to-[#022b20] border border-amber-500/40 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl space-y-4">
            <div className="flex items-center justify-between text-xs text-emerald-300">
              <button
                onClick={() => {
                  const prevNum = selectedSurah.number > 1 ? selectedSurah.number - 1 : 114;
                  const prevSurah = QURAN_114_SURAHS.find(s => s.number === prevNum);
                  if (prevSurah) setSelectedSurah(prevSurah);
                }}
                className="flex items-center gap-1 hover:text-white px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous Surah</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="font-mono text-amber-400 font-bold">Surah {selectedSurah.number} of 114</span>
                <span className="text-emerald-500">·</span>
                <span className="text-emerald-300">{selectedSurah.revelationType} ({selectedSurah.numberOfAyahs} Ayahs)</span>
              </div>

              <button
                onClick={() => {
                  const nextNum = selectedSurah.number < 114 ? selectedSurah.number + 1 : 1;
                  const nextSurah = QURAN_114_SURAHS.find(s => s.number === nextNum);
                  if (nextSurah) setSelectedSurah(nextSurah);
                }}
                className="flex items-center gap-1 hover:text-white px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800 transition cursor-pointer"
              >
                <span className="hidden sm:inline">Next Surah</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h1 className="font-arabic text-4xl sm:text-5xl text-amber-200 font-bold mb-2 tracking-wide">
                سُورَةُ {selectedSurah.name}
              </h1>
              <h2 className="text-2xl font-bold font-display text-white">
                {selectedSurah.englishName}
              </h2>
              <p className="text-emerald-300 text-xs sm:text-sm mt-1">
                "{selectedSurah.englishNameTranslation}"
              </p>
            </div>

            {/* Bismillah (except for Surah At-Tawbah) */}
            {selectedSurah.number !== 9 && (
              <div className="pt-2">
                <p className="font-arabic text-2xl sm:text-3xl text-amber-300/90 leading-loose" dir="rtl">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-[11px] text-emerald-300/80 font-medium italic mt-1">
                  In the name of Allah, the Entirely Merciful, the Especially Merciful
                </p>
              </div>
            )}

            {/* Quick Action Badges */}
            <div className="pt-2 flex items-center justify-center gap-2.5 flex-wrap">
              {/* Play Whole Surah Alongside */}
              <button
                onClick={() => playAyahAt(0)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition"
              >
                <Play className="w-4 h-4 fill-emerald-950" />
                <span>Play Recitation & Translation Alongside</span>
              </button>

              {/* Dr. Israr Ahmed Audio Bayan-ul-Quran Lecture Button */}
              <button
                onClick={toggleDrIsrarAudio}
                className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer transition ${
                  isDrIsrarAudioPlaying
                    ? 'bg-amber-400 text-emerald-950 border-amber-300 animate-pulse'
                    : 'bg-[#03231a] text-amber-300 border-amber-500/50 hover:bg-emerald-900'
                }`}
                title="Listen to Dr. Israr Ahmed complete audio Bayan-ul-Quran lecture for this Surah"
              >
                {isDrIsrarAudioPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>
                  {isDrIsrarAudioPlaying ? 'Pause Dr. Israr Bayan' : '🎙️ Dr. Israr Audio Bayan-ul-Quran'}
                </span>
              </button>

              {/* Open Tafseer Reader Button */}
              <button
                onClick={() => {
                  if (ayahs.length > 0) {
                    setSelectedTafsirAyah(ayahs[0]);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-[#021812] hover:bg-emerald-900/80 border border-emerald-700 text-amber-300 font-bold text-xs flex items-center gap-2 cursor-pointer transition"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>📖 Open Surah Tafseer (تفسیر)</span>
              </button>
            </div>
          </div>

          {/* AUDIO & TRANSLATION ENGINE TOOLBAR */}
          <div className="bg-[#03231a] border border-emerald-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
            
            {/* Top Toolbar Row: Recitation Reciter & Urdu Scholar Selector */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              
              {/* Urdu Translation Scholar Picker (Dr. Israr Ahmed vs Jalandhari vs Both) */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 shrink-0">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>Urdu Translation:</span>
                </span>
                <div className="flex items-center gap-1 bg-[#021812] p-1 rounded-xl border border-emerald-700/70 overflow-x-auto">
                  {URDU_SCHOLARS.map((scholar) => (
                    <button
                      key={scholar.id}
                      onClick={() => setUrduScholar(scholar.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                        urduScholar === scholar.id
                          ? 'bg-amber-500 text-emerald-950 font-bold shadow-sm'
                          : 'text-emerald-200/80 hover:text-white'
                      }`}
                      title={scholar.description}
                    >
                      {scholar.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reciter Selector (Al-Sudais / Al-Shuraim) */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-xs font-bold text-emerald-200 flex items-center gap-1.5 shrink-0">
                  <Radio className="w-4 h-4 text-amber-400" />
                  <span>Qari:</span>
                </span>
                <div className="flex items-center gap-1 bg-[#021812] p-1 rounded-xl border border-emerald-700/70">
                  {RECITERS.map((reciter) => (
                    <button
                      key={reciter.id}
                      onClick={() => setReciterId(reciter.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        reciterId === reciter.id
                          ? 'bg-amber-500 text-emerald-950 font-bold shadow-sm'
                          : 'text-emerald-200/80 hover:text-white'
                      }`}
                    >
                      {reciter.id === 'sudais' ? 'Al-Sudais (السديس)' : 'Al-Shuraim (الشريم)'}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Second Toolbar Row: Audio Modes & Layout & Text Size */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-3 border-t border-emerald-900/80">
              
              {/* Audio Alongside Mode Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 shrink-0">
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span>Audio Sync:</span>
                </span>
                <select
                  value={audioMode}
                  onChange={(e) => setAudioMode(e.target.value as TranslationAudioMode)}
                  className="bg-[#021812] border border-emerald-700 text-xs text-amber-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="arabic_urdu">Arabic Recitation + Urdu Translation Voice (Alongside)</option>
                  <option value="arabic_english">Arabic Recitation + English Translation</option>
                  <option value="arabic_both">Arabic Recitation + Urdu + English</option>
                  <option value="arabic_only">Arabic Recitation Only</option>
                  <option value="urdu_only">Urdu Voice Translation Only (Fateh Muhammad Jalandhari)</option>
                  <option value="english_only">English Translation Only</option>
                </select>
              </div>

              {/* Alongside View vs Stacked View */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1 bg-[#021812] p-1 rounded-xl border border-emerald-700/70">
                  <button
                    onClick={() => setLayoutMode('alongside')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition cursor-pointer ${
                      layoutMode === 'alongside'
                        ? 'bg-amber-500 text-emerald-950 shadow-sm'
                        : 'text-emerald-200/80 hover:text-white'
                    }`}
                    title="Parallel columns for Arabic and translation"
                  >
                    <Columns className="w-3.5 h-3.5" />
                    <span>Alongside View</span>
                  </button>
                  <button
                    onClick={() => setLayoutMode('stacked')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition cursor-pointer ${
                      layoutMode === 'stacked'
                        ? 'bg-amber-500 text-emerald-950 shadow-sm'
                        : 'text-emerald-200/80 hover:text-white'
                    }`}
                    title="Stacked verse-by-verse view"
                  >
                    <Rows className="w-3.5 h-3.5" />
                    <span>Stacked</span>
                  </button>
                </div>

                {/* Font Size & Toggles */}
                <div className="flex items-center gap-1 bg-[#021812] p-1 rounded-xl border border-emerald-700/70">
                  {(['normal', 'large', 'xlarge'] as const).map((sz, i) => (
                    <button
                      key={sz}
                      onClick={() => setArabicFontSize(sz)}
                      className={`px-2 py-1 rounded-lg text-xs cursor-pointer ${
                        arabicFontSize === sz ? 'bg-amber-500 text-emerald-950 font-bold' : 'text-emerald-300'
                      }`}
                    >
                      {i === 0 ? 'A' : i === 1 ? 'A+' : 'A++'}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1 border-l border-emerald-800 pl-2">
                  <button
                    onClick={() => setShowUrdu(!showUrdu)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border cursor-pointer ${
                      showUrdu ? 'bg-emerald-900 text-amber-300 border-amber-500/40' : 'border-emerald-800 text-emerald-500'
                    }`}
                  >
                    Urdu
                  </button>
                  <button
                    onClick={() => setShowEnglish(!showEnglish)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border cursor-pointer ${
                      showEnglish ? 'bg-emerald-900 text-amber-300 border-amber-500/40' : 'border-emerald-800 text-emerald-500'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between text-[11px] text-emerald-300/80 pt-2 border-t border-emerald-900/70 flex-wrap gap-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>
                  Active Urdu: <strong>{urduScholar === 'israr' ? 'Dr. Israr Ahmed (Bayan-ul-Quran)' : urduScholar === 'jalandhari' ? 'Fateh Muhammad Jalandhari' : 'Both Dr. Israr & Jalandhari'}</strong>
                </span>
                <span className="text-emerald-500">·</span>
                <span>Voice Translation: <strong>Fateh Muhammad Jalandhari</strong></span>
              </span>
              <span className="text-amber-400 font-medium">
                Click 📖 Tafseer on any Ayah to view Dr. Israr Ahmed's complete commentary
              </span>
            </div>
          </div>

          {/* Loading or Error State */}
          {loading && (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
              <p className="text-xs text-emerald-300">
                Loading sacred verses and Dr. Israr Ahmed translations for {selectedSurah.englishName}...
              </p>
            </div>
          )}

          {loadError && (
            <div className="bg-red-950/40 border border-red-500/40 p-6 rounded-2xl text-center space-y-3">
              <p className="text-xs text-red-300">{loadError}</p>
              <button
                onClick={() => {
                  setLoading(true);
                  setLoadError(null);
                  fetchSurahVerses(selectedSurah.number)
                    .then(data => { setAyahs(data); setLoading(false); })
                    .catch(() => { setLoadError('Network retry failed.'); setLoading(false); });
                }}
                className="px-4 py-2 bg-red-900/60 hover:bg-red-800 text-white text-xs rounded-xl border border-red-500/50"
              >
                Retry Loading Verses
              </button>
            </div>
          )}

          {/* Verses List with Alongside / Stacked Layout & Tafseer */}
          {!loading && !loadError && (
            <div className="space-y-4">
              {ayahs.map((ayah, index) => {
                const isCurrent = currentPlayingAyahIndex === index;
                const isArabicPhase = isCurrent && currentAudioPhase === 'arabic';
                const isUrduPhase = isCurrent && currentAudioPhase === 'urdu';
                const isEnglishPhase = isCurrent && currentAudioPhase === 'english';
                const isInlineExpanded = expandedInlineAyah === ayah.numberInSurah;
                const isInlineLoading = inlineLoadingMap[ayah.numberInSurah];
                const inlineData = inlineTafsirMap[ayah.numberInSurah];

                return (
                  <div
                    key={ayah.numberInSurah}
                    id={`ayah-row-${ayah.numberInSurah}`}
                    className={`rounded-2xl p-5 sm:p-6 border transition-all duration-300 space-y-4 ${
                      isCurrent
                        ? 'bg-[#053d2f] border-amber-400 ring-2 ring-amber-400/40 shadow-2xl'
                        : 'bg-[#04281f] border-emerald-800/70 hover:border-emerald-700/90'
                    }`}
                  >
                    {/* Ayah Header Line */}
                    <div className="flex items-center justify-between text-xs text-emerald-400/80 pb-2 border-b border-emerald-900/60 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#021812] border border-amber-500/40 flex items-center justify-center text-amber-400 font-mono text-[11px] font-bold">
                          {ayah.numberInSurah}
                        </div>
                        <span className="font-mono text-[11px] text-amber-300/80">
                          Ayah {selectedSurah.number}:{ayah.numberInSurah}
                        </span>

                        {/* Active Recitation Status */}
                        {isCurrent && (
                          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-[10px] font-bold animate-pulse">
                            {isArabicPhase && (
                              <>
                                <Radio className="w-3 h-3 text-amber-400" />
                                <span>Reciting Arabic ({reciterId === 'sudais' ? 'Al-Sudais' : 'Al-Shuraim'})</span>
                              </>
                            )}
                            {isUrduPhase && (
                              <>
                                <Volume2 className="w-3 h-3 text-emerald-400" />
                                <span>Reciting: Fateh Muhammad Jalandhari Voice</span>
                              </>
                            )}
                            {isEnglishPhase && (
                              <>
                                <Volume2 className="w-3 h-3 text-amber-400" />
                                <span>Reciting English Translation</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons: Play + Jalandhari + Tafseer + Copy */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Play Recitation + Translation */}
                        <button
                          onClick={() => playAyahAt(index, 'arabic')}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                            isCurrent && isPlaying
                              ? 'bg-amber-500 text-emerald-950 font-bold'
                              : 'bg-emerald-900/60 hover:bg-emerald-800 text-amber-300 border border-emerald-700/60'
                          }`}
                          title="Play Arabic recitation with translation alongside"
                        >
                          {isCurrent && isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          <span className="hidden sm:inline">
                            {isCurrent && isPlaying ? 'Pause' : 'Recite + Translation'}
                          </span>
                        </button>

                        {/* Jalandhari Voice Translation Audio */}
                        <button
                          onClick={() => playAyahAt(index, 'urdu')}
                          className={`px-2 py-1 rounded-lg text-xs transition cursor-pointer border flex items-center gap-1 font-medium ${
                            isUrduPhase
                              ? 'bg-emerald-600 text-white border-amber-400 ring-1 ring-amber-400/50'
                              : 'bg-[#021812] text-emerald-300 hover:text-white border-emerald-800'
                          }`}
                          title="Listen to Maulana Fateh Muhammad Jalandhari Urdu voice translation"
                        >
                          <Volume2 className="w-3 h-3 text-amber-400" />
                          <span>Jalandhari Voice</span>
                        </button>

                        {/* Dedicated TAFSEER Button */}
                        <button
                          onClick={() => setSelectedTafsirAyah(ayah)}
                          className="px-2.5 py-1 rounded-lg text-xs bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 font-semibold flex items-center gap-1 cursor-pointer transition shadow-sm"
                          title="Open Dr. Israr Ahmed Tafseer & Commentary"
                        >
                          <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                          <span>📖 Tafseer</span>
                        </button>

                        {/* Quick Inline Tafseer Toggle */}
                        <button
                          onClick={() => toggleInlineTafsir(ayah)}
                          className="px-2 py-1 rounded-lg text-xs bg-[#021812] hover:bg-emerald-900 text-emerald-300 border border-emerald-800 flex items-center gap-1 cursor-pointer"
                          title="Toggle Quick Inline Tafseer"
                        >
                          <FileText className="w-3 h-3 text-emerald-400" />
                          <span className="hidden md:inline">Inline</span>
                          {isInlineExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        {/* Copy Button */}
                        <button
                          onClick={() => handleCopyAyah(ayah)}
                          className="p-1.5 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-900/60 transition cursor-pointer"
                          title="Copy verse and translations"
                        >
                          {copiedAyah === ayah.numberInSurah ? (
                            <Check className="w-3.5 h-3.5 text-emerald-300" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* CONTENT BODY: ALONGSIDE VIEW vs STACKED VIEW */}
                    {layoutMode === 'alongside' ? (
                      /* Alongside View: 2 Parallel Columns */
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                        
                        {/* LEFT COLUMN: Translation Alongside (Urdu + English) */}
                        <div className="lg:col-span-6 order-2 lg:order-1 space-y-3 flex flex-col justify-center">
                          <div className="flex items-center gap-2 text-[11px] text-amber-300/80 font-medium mb-1">
                            <Languages className="w-3 h-3 text-amber-400" />
                            <span>Translation Alongside Recitation:</span>
                          </div>

                          {/* URDU TRANSLATIONS (Dr. Israr Ahmed, Jalandhari, or Both) */}
                          {showUrdu && (
                            <div className="space-y-2">
                              {/* Option A: Dr. Israr Ahmed (Primary / Featured) */}
                              {(urduScholar === 'israr' || urduScholar === 'both') && (
                                <div
                                  onClick={() => playAyahAt(index, 'urdu')}
                                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                                    isUrduPhase && urduScholar === 'israr'
                                      ? 'bg-[#02291e] border-amber-400 shadow-md ring-1 ring-amber-400/50'
                                      : 'bg-[#021812]/90 border-emerald-800/80 hover:border-amber-500/40'
                                  }`}
                                  title="Dr. Israr Ahmed (Bayan-ul-Quran) Translation"
                                >
                                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                      <span>ڈاکٹر اسرار احمد (بیان القرآن)</span>
                                    </span>
                                    <span className="text-[10px] text-amber-400/80 hover:text-amber-300 flex items-center gap-1">
                                      <span>Dr. Israr Ahmed</span>
                                    </span>
                                  </div>
                                  <p className="text-sm sm:text-base text-emerald-50 leading-loose text-right font-medium" dir="rtl">
                                    {ayah.textUrduIsrar || ayah.textUrdu}
                                  </p>
                                </div>
                              )}

                              {/* Option B: Maulana Fateh Muhammad Jalandhari */}
                              {(urduScholar === 'jalandhari' || urduScholar === 'both') && (
                                <div
                                  onClick={() => playAyahAt(index, 'urdu')}
                                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                                    isUrduPhase && urduScholar === 'jalandhari'
                                      ? 'bg-[#02291e] border-amber-400 shadow-md ring-1 ring-amber-400/50'
                                      : 'bg-[#021812]/90 border-emerald-800/80 hover:border-emerald-700/60'
                                  }`}
                                  title="Maulana Fateh Muhammad Jalandhari Translation"
                                >
                                  <div className="flex items-center justify-between text-[11px] text-emerald-400/80 mb-1.5">
                                    <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                      <span>مولانا فتح محمد جالندھری (Jalandhari)</span>
                                    </span>
                                    {isUrduPhase ? (
                                      <span className="text-[10px] text-amber-400 animate-pulse font-mono flex items-center gap-1 font-bold">
                                        <Volume2 className="w-3 h-3" />
                                        <span>Reciting Voice</span>
                                      </span>
                                    ) : (
                                      <span className="text-[10px] text-emerald-400/60 hover:text-amber-300 flex items-center gap-1">
                                        <Volume2 className="w-2.5 h-2.5" />
                                        <span>Voice Audio</span>
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm sm:text-base text-emerald-50 leading-loose text-right font-medium" dir="rtl">
                                    {ayah.textUrdu}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* ENGLISH TRANSLATION CARD */}
                          {showEnglish && ayah.textEnglish && (
                            <div
                              onClick={() => playAyahAt(index, 'english')}
                              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                                isEnglishPhase
                                  ? 'bg-[#02291e] border-amber-400 shadow-md ring-1 ring-amber-400/50'
                                  : 'bg-[#021812]/90 border-emerald-900/70 hover:border-emerald-700/60'
                              }`}
                              title="Click to hear English translation audio"
                            >
                              <div className="flex items-center justify-between text-[11px] text-emerald-400/80 mb-1.5">
                                <span className="font-semibold text-amber-300">English (Sahih International / Dr. Israr Anjuman)</span>
                                {isEnglishPhase && (
                                  <span className="text-[10px] text-amber-400 animate-pulse font-mono flex items-center gap-1">
                                    <Volume2 className="w-3 h-3" />
                                    <span>Speaking Audio</span>
                                  </span>
                                )}
                              </div>
                              <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed italic">
                                "{ayah.textEnglish}"
                              </p>
                            </div>
                          )}
                        </div>

                        {/* RIGHT COLUMN: Sacred Arabic Scripture */}
                        <div className={`lg:col-span-6 order-1 lg:order-2 p-5 rounded-2xl flex flex-col justify-center border transition-all ${
                          isArabicPhase
                            ? 'bg-[#022b20] border-amber-400/70 shadow-lg'
                            : 'bg-[#021812]/70 border-emerald-900/50'
                        }`}>
                          <div className="flex items-center justify-between text-[11px] text-amber-400/80 mb-2">
                            <span>النص القرآني الكريم</span>
                            {isArabicPhase && (
                              <span className="text-[10px] text-amber-300 font-mono animate-pulse flex items-center gap-1">
                                <Radio className="w-3 h-3" />
                                <span>Recitation Playing</span>
                              </span>
                            )}
                          </div>

                          <div className="text-right">
                            <p
                              className={`font-arabic text-amber-100 select-text leading-[2.5] tracking-wide ${
                                arabicFontSize === 'normal'
                                  ? 'text-xl sm:text-2xl'
                                  : arabicFontSize === 'large'
                                  ? 'text-2xl sm:text-3xl'
                                  : 'text-3xl sm:text-4xl'
                              } ${isArabicPhase ? 'text-amber-200 font-bold' : ''}`}
                              dir="rtl"
                            >
                              {ayah.textArabic}
                              <span className="inline-block mx-2 text-amber-400 font-mono text-base font-normal">
                                ۝ {ayah.numberInSurah}
                              </span>
                            </p>
                          </div>
                        </div>

                      </div>
                    ) : (
                      /* Stacked View: Traditional Verse-by-Verse */
                      <div className="space-y-4">
                        {/* Arabic Text */}
                        <div className={`p-4 rounded-xl text-right border transition-all ${
                          isArabicPhase
                            ? 'bg-[#022b20] border-amber-400/70 shadow-lg'
                            : 'bg-transparent border-transparent'
                        }`}>
                          <p
                            className={`font-arabic text-amber-100 select-text leading-[2.5] ${
                              arabicFontSize === 'normal'
                                ? 'text-xl sm:text-2xl'
                                : arabicFontSize === 'large'
                                ? 'text-2xl sm:text-3xl'
                                : 'text-3xl sm:text-4xl'
                            } ${isArabicPhase ? 'text-amber-200 font-bold' : ''}`}
                            dir="rtl"
                          >
                            {ayah.textArabic}
                            <span className="inline-block mx-2 text-amber-400/80 font-mono text-base font-normal">
                              ۝ {ayah.numberInSurah}
                            </span>
                          </p>
                        </div>

                        {/* Urdu Translations */}
                        {showUrdu && (
                          <div className="space-y-2">
                            {(urduScholar === 'israr' || urduScholar === 'both') && (
                              <div
                                onClick={() => playAyahAt(index, 'urdu')}
                                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                                  isUrduPhase && urduScholar === 'israr'
                                    ? 'bg-[#02291e] border-amber-400 shadow-md ring-1 ring-amber-400/50'
                                    : 'bg-[#021812]/80 border-emerald-900/60 hover:border-amber-500/40'
                                }`}
                              >
                                <div className="flex items-center justify-between text-[11px] mb-1">
                                  <span className="font-semibold text-amber-300">ڈاکٹر اسرار احمد (بیان القرآن):</span>
                                  <span className="text-[10px] text-amber-400/80">Dr. Israr Ahmed</span>
                                </div>
                                <p className="text-sm sm:text-base text-emerald-50 leading-relaxed font-medium text-right" dir="rtl">
                                  {ayah.textUrduIsrar || ayah.textUrdu}
                                </p>
                              </div>
                            )}

                            {(urduScholar === 'jalandhari' || urduScholar === 'both') && (
                              <div
                                onClick={() => playAyahAt(index, 'urdu')}
                                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                                  isUrduPhase && urduScholar === 'jalandhari'
                                    ? 'bg-[#02291e] border-amber-400 shadow-md ring-1 ring-amber-400/50'
                                    : 'bg-[#021812]/80 border-emerald-900/60 hover:border-emerald-700/60'
                                }`}
                              >
                                <div className="flex items-center justify-between text-[11px] text-emerald-400/80 mb-1">
                                  <span className="font-semibold text-emerald-300">مولانا فتح محمد جالندھری:</span>
                                  <span className="text-[10px] text-emerald-400/60">Jalandhari Voice</span>
                                </div>
                                <p className="text-sm sm:text-base text-emerald-50 leading-relaxed font-medium text-right" dir="rtl">
                                  {ayah.textUrdu}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* English Translation */}
                        {showEnglish && ayah.textEnglish && (
                          <div
                            onClick={() => playAyahAt(index, 'english')}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                              isEnglishPhase
                                ? 'bg-[#02291e] border-amber-400 shadow-md ring-1 ring-amber-400/50'
                                : 'bg-[#021812]/80 border-emerald-900/60 hover:border-emerald-700/60'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[11px] text-emerald-400/80 mb-1">
                              <span className="font-semibold text-amber-300">English (Sahih International):</span>
                              {isEnglishPhase && (
                                <span className="text-[10px] text-amber-400 animate-pulse font-mono">Speaking Translation</span>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed italic">
                              "{ayah.textEnglish}"
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* INLINE TAFSEER EXPANSION CARD */}
                    {isInlineExpanded && (
                      <div className="mt-3 bg-[#021c15] border border-amber-500/40 rounded-2xl p-4 sm:p-5 space-y-3 animate-in fade-in-50 duration-200">
                        <div className="flex items-center justify-between pb-2 border-b border-emerald-800/80 flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-amber-400" />
                            <span className="font-bold text-xs text-amber-300">
                              تفسیر بیان القرآن از ڈاکٹر اسرار احمد · Ayah {selectedSurah.number}:{ayah.numberInSurah}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedTafsirAyah(ayah)}
                              className="text-[11px] text-amber-400 hover:text-white flex items-center gap-1 underline cursor-pointer"
                            >
                              <span>Open in Fullscreen Reader</span>
                              <Maximize2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setExpandedInlineAyah(null)}
                              className="text-emerald-400 hover:text-white cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {isInlineLoading ? (
                          <div className="py-6 text-center text-xs text-amber-300 flex items-center justify-center gap-2">
                            <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                            <span>Loading Dr. Israr Ahmed Tafseer commentary...</span>
                          </div>
                        ) : inlineData ? (
                          <div className="space-y-3">
                            <div
                              className="text-xs sm:text-sm text-emerald-50 leading-relaxed prose prose-invert max-w-none text-right font-medium"
                              dir="rtl"
                              dangerouslySetInnerHTML={{ __html: inlineData.text }}
                            />
                            <div className="text-[10px] text-emerald-400/80 pt-2 border-t border-emerald-900/60 flex items-center justify-between">
                              <span>مصدر: {inlineData.authorName} ({inlineData.resourceName})</span>
                              <span className="text-amber-400 font-semibold">تفسیر بیان القرآن</span>
                            </div>
                          </div>
                        ) : (
                          <div className="py-4 text-center text-xs text-emerald-400">
                            No Tafseer commentary loaded for this verse.
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}

          {/* STICKY BOTTOM AUDIO PLAYER WITH LIVE TRANSLATION ALONGSIDE */}
          {currentPlayingAyahIndex !== null && currentAyah && (
            <div className="fixed bottom-14 lg:bottom-4 left-3 right-3 max-w-4xl mx-auto z-40 bg-[#021812]/95 backdrop-blur-md border border-amber-500/50 rounded-2xl p-3 sm:p-4 shadow-2xl space-y-2 animate-in slide-in-from-bottom duration-200">
              
              {/* Top Row: Controls & Surah info */}
              <div className="flex items-center justify-between gap-3">
                
                {/* Play/Pause & Ayah Title */}
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={togglePlayPause}
                    className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shrink-0 shadow-md cursor-pointer transition"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white truncate">
                        {selectedSurah.englishName} : Ayah {currentAyah.numberInSurah}
                      </span>
                      
                      {/* Active Phase Pill */}
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40">
                        {currentAudioPhase === 'arabic' && `🎙️ Sheikh ${reciterId === 'sudais' ? 'Al-Sudais' : 'Al-Shuraim'}`}
                        {currentAudioPhase === 'urdu' && '🔊 Voice: Fateh Muhammad Jalandhari'}
                        {currentAudioPhase === 'english' && '🔊 Voice: Ibrahim Walk'}
                      </span>
                    </div>

                    {/* Preview of active text */}
                    <p className="text-[11px] text-emerald-300/80 truncate font-mono">
                      {currentAudioPhase === 'arabic'
                        ? currentAyah.textArabic
                        : currentAudioPhase === 'urdu'
                        ? (currentAyah.textUrduIsrar || currentAyah.textUrdu)
                        : currentAyah.textEnglish}
                    </p>
                  </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handlePrevAyah}
                    disabled={currentPlayingAyahIndex <= 0}
                    className="p-1.5 rounded-lg text-emerald-300 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Previous Ayah"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleNextAyah}
                    disabled={currentPlayingAyahIndex >= ayahs.length - 1}
                    className="p-1.5 rounded-lg text-emerald-300 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Next Ayah"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleSpeedChange(playbackSpeed === 1.0 ? 1.25 : playbackSpeed === 1.25 ? 0.75 : 1.0)}
                    className="px-2 py-1 rounded-md bg-emerald-900/60 border border-emerald-700 text-[10px] font-mono text-amber-300 hover:text-white cursor-pointer"
                    title="Playback speed"
                  >
                    {playbackSpeed}x
                  </button>

                  {/* Open Tafseer for current playing verse */}
                  <button
                    onClick={() => setSelectedTafsirAyah(currentAyah)}
                    className="p-1.5 rounded-lg text-amber-400 hover:text-white hover:bg-emerald-900 cursor-pointer"
                    title="View Tafseer for this verse"
                  >
                    <GraduationCap className="w-4 h-4" />
                  </button>

                  {/* Expand Fullscreen / Companion */}
                  <button
                    onClick={() => setIsCompanionModalOpen(true)}
                    className="p-1.5 rounded-lg text-amber-400 hover:text-white hover:bg-emerald-900 cursor-pointer"
                    title="Open Fullscreen Translation Companion"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={stopAudio}
                    className="p-1.5 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-900 cursor-pointer"
                    title="Close audio player"
                  >
                    <VolumeX className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Row inside player: Simultaneous Translation Alongside Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-emerald-900/70 text-xs">
                <div className="bg-[#03231a] px-3 py-1.5 rounded-lg border border-emerald-800/60 flex items-center justify-between text-right">
                  <span className="text-[10px] text-amber-400 font-semibold shrink-0">اردو (ڈاکٹر اسرار):</span>
                  <p className="text-xs text-emerald-100 truncate pr-2 font-medium" dir="rtl">
                    {currentAyah.textUrduIsrar || currentAyah.textUrdu}
                  </p>
                </div>

                <div className="bg-[#03231a] px-3 py-1.5 rounded-lg border border-emerald-800/60 flex items-center justify-between">
                  <span className="text-[10px] text-amber-400 font-semibold shrink-0">English:</span>
                  <p className="text-xs text-emerald-200/90 truncate pl-2 italic">
                    "{currentAyah.textEnglish}"
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* FLOATING DR. ISRAR AHMED BAYAN-UL-QURAN PLAYER BAR */}
          {showDrIsrarPlayerBar && selectedSurah && (
            <div className="fixed bottom-14 lg:bottom-4 left-3 right-3 max-w-3xl mx-auto z-40 bg-[#021812]/95 backdrop-blur-md border-2 border-amber-500/60 rounded-2xl p-3 sm:p-4 shadow-2xl space-y-2 animate-in slide-in-from-bottom duration-200">
              
              {/* Top Row: Track details & Controls */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={toggleDrIsrarAudio}
                    className="w-11 h-11 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 flex items-center justify-center font-bold shrink-0 shadow-md cursor-pointer hover:scale-105 transition"
                  >
                    {drIsrarLoading ? (
                      <RefreshCw className="w-5 h-5 animate-spin text-emerald-950" />
                    ) : isDrIsrarAudioPlaying ? (
                      <Pause className="w-5 h-5 fill-emerald-950" />
                    ) : (
                      <Play className="w-5 h-5 fill-emerald-950 ml-0.5" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white truncate">
                        Dr. Israr Bayan · Surah {selectedSurah.number}: {selectedSurah.englishName}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40">
                        🎙️ Audio Tafseer
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-300/80 truncate">
                      {selectedSurah.name} ({selectedSurah.englishNameTranslation})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleDrIsrarSkip(-15)}
                    className="px-2 py-1 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-[11px] font-mono font-bold text-emerald-200 cursor-pointer"
                    title="Rewind 15s"
                  >
                    -15s
                  </button>
                  <button
                    onClick={() => handleDrIsrarSkip(15)}
                    className="px-2 py-1 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-[11px] font-mono font-bold text-emerald-200 cursor-pointer"
                    title="Forward 15s"
                  >
                    +15s
                  </button>

                  <button
                    onClick={() => {
                      const next = drIsrarSpeed === 1.0 ? 1.25 : drIsrarSpeed === 1.25 ? 1.5 : drIsrarSpeed === 1.5 ? 0.75 : 1.0;
                      handleDrIsrarSpeedChange(next);
                    }}
                    className="px-2 py-1 rounded-md bg-emerald-900/60 border border-emerald-700 text-[10px] font-mono text-amber-300 hover:text-white cursor-pointer"
                    title="Playback Speed"
                  >
                    {drIsrarSpeed}x
                  </button>

                  <a
                    href={getDrIsrarSurahAudioUrl(selectedSurah.number)}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="p-1.5 rounded-lg text-emerald-300 hover:text-amber-300 hover:bg-emerald-900 cursor-pointer"
                    title="Download MP3"
                  >
                    <Download className="w-4 h-4" />
                  </a>

                  {onNavigateToIsrarHub && (
                    <button
                      onClick={() => {
                        closeDrIsrarPlayerBar();
                        onNavigateToIsrarHub(selectedSurah.number);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-[11px] font-bold text-amber-300 flex items-center gap-1 cursor-pointer transition"
                      title="Open Video Lecture & All Bayans in Dr. Israr Hub"
                    >
                      <Tv className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Video & Hub</span>
                    </button>
                  )}

                  <button
                    onClick={closeDrIsrarPlayerBar}
                    className="p-1.5 rounded-lg text-emerald-400 hover:text-red-300 hover:bg-emerald-900 cursor-pointer"
                    title="Close player"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrubber Range */}
              <div className="space-y-1">
                <input
                  type="range"
                  min={0}
                  max={drIsrarDuration || 100}
                  value={drIsrarCurrentTime}
                  onChange={handleDrIsrarSeek}
                  disabled={drIsrarDuration === 0}
                  className="w-full h-1.5 bg-[#01140e] rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400/80">
                  <span>{formatSeconds(drIsrarCurrentTime)}</span>
                  <span>{formatSeconds(drIsrarDuration)}</span>
                </div>
              </div>

            </div>
          )}

          {/* DEDICATED TAFSEER READER MODAL / DRAWER */}
          {selectedTafsirAyah && selectedSurah && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5">
              <div className="bg-[#021f18] border border-amber-500/60 rounded-3xl max-w-3xl w-full p-5 sm:p-7 space-y-5 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
                
                {/* Modal Top Header */}
                <div className="flex items-center justify-between pb-3 border-b border-emerald-800/80 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/40 font-mono font-bold flex items-center justify-center text-xs">
                      {selectedTafsirAyah.numberInSurah}
                    </div>
                    <div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <span>تفسیر قرآن کریم (Tafseer-ul-Quran)</span>
                        <span className="text-amber-400 text-xs font-mono font-normal">
                          · Surah {selectedSurah.englishName} ({selectedSurah.name})
                        </span>
                      </h3>
                      <p className="text-[11px] text-emerald-300">
                        Ayah {selectedSurah.number}:{selectedTafsirAyah.numberInSurah} of {selectedSurah.numberOfAyahs} ({selectedSurah.revelationType})
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTafsirAyah(null)}
                    className="p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 hover:text-white cursor-pointer transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tafseer Scholar Source Switcher Tabs */}
                <div className="flex items-center gap-2 bg-[#021610] p-1.5 rounded-2xl border border-emerald-800/80 shrink-0 overflow-x-auto">
                  {TAFSIR_SOURCES.map((source) => (
                    <button
                      key={source.id}
                      onClick={() => setActiveTafsirSource(source.id)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
                        activeTafsirSource === source.id
                          ? 'bg-amber-500 text-emerald-950 font-bold shadow-md'
                          : 'text-emerald-300 hover:text-white hover:bg-emerald-900/40'
                      }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{source.name}</span>
                      <span className="text-[10px] opacity-80">({source.language})</span>
                    </button>
                  ))}
                </div>

                {/* Scrollable Content Body */}
                <div className="space-y-5 overflow-y-auto pr-1 flex-1">
                  
                  {/* Sacred Arabic Verse Banner */}
                  <div className="bg-[#032e22] border border-amber-400/50 rounded-2xl p-5 text-center shadow-lg">
                    <p className="font-arabic text-2xl sm:text-3xl text-amber-100 leading-[2.4]" dir="rtl">
                      {selectedTafsirAyah.textArabic}
                      <span className="inline-block mx-2 text-amber-400 font-mono text-base">
                        ۝ {selectedTafsirAyah.numberInSurah}
                      </span>
                    </p>
                  </div>

                  {/* Translation Cards Banner (Urdu Dr. Israr + English) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-[#021812] border border-emerald-800/80 rounded-xl p-3.5 text-right">
                      <span className="text-[10px] font-bold text-amber-400 block mb-1">
                        اردو ترجمہ (ڈاکٹر اسرار احمد - بیان القرآن):
                      </span>
                      <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed" dir="rtl">
                        {selectedTafsirAyah.textUrduIsrar || selectedTafsirAyah.textUrdu}
                      </p>
                    </div>

                    <div className="bg-[#021812] border border-emerald-800/80 rounded-xl p-3.5">
                      <span className="text-[10px] font-bold text-amber-400 block mb-1">
                        English Translation (Sahih International):
                      </span>
                      <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed italic">
                        "{selectedTafsirAyah.textEnglish}"
                      </p>
                    </div>
                  </div>

                  {/* Dr. Israr Ahmed Audio Bayan-ul-Quran Player Widget inside Tafseer */}
                  <div className="bg-gradient-to-r from-[#03291e] to-[#043d2f] border border-amber-500/40 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-md">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={toggleDrIsrarAudio}
                        className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow-md cursor-pointer transition shrink-0"
                      >
                        {isDrIsrarAudioPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                      </button>
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>🎙️ Dr. Israr Ahmed Audio Bayan-ul-Quran</span>
                          {isDrIsrarAudioPlaying && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-400 text-emerald-950 font-mono font-bold animate-pulse">
                              Playing
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] text-emerald-300">
                          Complete audio commentary lecture for Surah {selectedSurah.englishName} ({selectedSurah.name})
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] text-amber-300 font-mono hidden sm:inline">
                      Archive.org High Quality MP3
                    </span>
                  </div>

                  {/* Tafseer Exegesis Text Content */}
                  <div className="bg-[#021812] border border-emerald-900 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-900/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs sm:text-sm font-bold text-amber-300">
                          {activeTafsirSource === 'israr' && 'تفسیر بیان القرآن (ڈاکٹر اسرار احمد رحمہ اللہ)'}
                          {activeTafsirSource === 'ibnkathir' && 'Tafsir Ibn Kathir (Abridged Commentary)'}
                          {activeTafsirSource === 'maarifulquran' && "Ma'arif al-Qur'an (Mufti Muhammad Shafi)"}
                        </h4>
                      </div>

                      <button
                        onClick={handleCopyTafsir}
                        className="text-xs text-emerald-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-800 cursor-pointer"
                      >
                        {copiedTafsir ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedTafsir ? 'Copied' : 'Copy Tafseer'}</span>
                      </button>
                    </div>

                    {tafsirLoading && (
                      <div className="py-12 text-center text-xs text-amber-300 space-y-2">
                        <RefreshCw className="w-6 h-6 animate-spin text-amber-400 mx-auto" />
                        <p>Loading Tafseer commentary from scholarship archives...</p>
                      </div>
                    )}

                    {tafsirError && (
                      <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-center space-y-2">
                        <p className="text-xs text-red-300">{tafsirError}</p>
                        <button
                          onClick={() => {
                            setTafsirLoading(true);
                            setTafsirError(null);
                            fetchAyahTafsir(selectedSurah.number, selectedTafsirAyah.numberInSurah, activeTafsirSource)
                              .then(data => { setTafsirData(data); setTafsirLoading(false); })
                              .catch(() => { setTafsirError('Retry failed.'); setTafsirLoading(false); });
                          }}
                          className="px-3 py-1 bg-red-900/60 text-white text-xs rounded-lg cursor-pointer"
                        >
                          Retry
                        </button>
                      </div>
                    )}

                    {!tafsirLoading && !tafsirError && tafsirData && (
                      <div
                        className={`text-xs sm:text-sm text-emerald-50 leading-relaxed font-sans prose prose-invert max-w-none space-y-3 ${
                          tafsirData.language === 'Urdu' ? 'text-right font-medium leading-loose' : 'text-left leading-relaxed'
                        }`}
                        dir={tafsirData.language === 'Urdu' ? 'rtl' : 'ltr'}
                        dangerouslySetInnerHTML={{ __html: tafsirData.text }}
                      />
                    )}
                  </div>

                </div>

                {/* Modal Footer: Prev / Next Ayah in Tafseer View */}
                <div className="pt-3 border-t border-emerald-900/80 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const currentIdx = ayahs.findIndex(a => a.numberInSurah === selectedTafsirAyah.numberInSurah);
                        if (currentIdx > 0) {
                          setSelectedTafsirAyah(ayahs[currentIdx - 1]);
                        }
                      }}
                      disabled={selectedTafsirAyah.numberInSurah <= 1}
                      className="px-3 py-1.5 rounded-xl bg-[#021812] border border-emerald-800 text-xs text-emerald-300 hover:text-white disabled:opacity-30 cursor-pointer flex items-center gap-1"
                    >
                      <SkipBack className="w-3.5 h-3.5" />
                      <span>Prev Ayah</span>
                    </button>

                    <button
                      onClick={() => {
                        const currentIdx = ayahs.findIndex(a => a.numberInSurah === selectedTafsirAyah.numberInSurah);
                        if (currentIdx >= 0 && currentIdx < ayahs.length - 1) {
                          setSelectedTafsirAyah(ayahs[currentIdx + 1]);
                        }
                      }}
                      disabled={selectedTafsirAyah.numberInSurah >= selectedSurah.numberOfAyahs}
                      className="px-3 py-1.5 rounded-xl bg-[#021812] border border-emerald-800 text-xs text-emerald-300 hover:text-white disabled:opacity-30 cursor-pointer flex items-center gap-1"
                    >
                      <span>Next Ayah</span>
                      <SkipForward className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedTafsirAyah(null)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs cursor-pointer shadow-md transition"
                  >
                    Close Tafseer
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* FULLSCREEN TRANSLATION ALONGSIDE COMPANION MODAL */}
          {isCompanionModalOpen && currentAyah && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
              <div className="bg-[#021e17] border border-amber-500/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-emerald-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
                      {currentAyah.numberInSurah}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-white">
                        {selectedSurah.englishName} ({selectedSurah.name})
                      </h3>
                      <p className="text-[11px] text-amber-300 font-mono">
                        Ayah {selectedSurah.number}:{currentAyah.numberInSurah} of {selectedSurah.numberOfAyahs}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCompanionModalOpen(false)}
                    className="p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Recitation Status Badge */}
                <div className="flex items-center justify-center">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/50 animate-pulse flex items-center gap-2">
                    {currentAudioPhase === 'arabic' && `🎙️ Sheikh ${reciterId === 'sudais' ? 'Abdul Rahman Al-Sudais' : 'Saud Al-Shuraim'} Reciting`}
                    {currentAudioPhase === 'urdu' && '🔊 Reciting Urdu Voice: Maulana Fateh Muhammad Jalandhari (فاتح محمد جالندھری)'}
                    {currentAudioPhase === 'english' && '🔊 Reciting English Translation (Ibrahim Walk)'}
                  </span>
                </div>

                {/* Sacred Arabic Text */}
                <div className={`p-6 rounded-2xl text-center border transition-all ${
                  currentAudioPhase === 'arabic'
                    ? 'bg-[#033125] border-amber-400 ring-2 ring-amber-400/30 shadow-lg'
                    : 'bg-[#021812] border-emerald-900'
                }`}>
                  <p className="font-arabic text-3xl sm:text-4xl text-amber-200 leading-[2.5]" dir="rtl">
                    {currentAyah.textArabic}
                    <span className="inline-block mx-2 text-amber-400 font-mono text-xl">
                      ۝ {currentAyah.numberInSurah}
                    </span>
                  </p>
                </div>

                {/* Urdu Translation Card Alongside (Dr. Israr Ahmed) */}
                <div className={`p-5 rounded-2xl border text-right transition-all ${
                  currentAudioPhase === 'urdu'
                    ? 'bg-[#033125] border-amber-400 ring-2 ring-amber-400/30 shadow-lg'
                    : 'bg-[#021812] border-emerald-900'
                }`}>
                  <span className="text-xs font-bold text-amber-400 block mb-1">
                    اردو ترجمہ (ڈاکٹر اسرار احمد - بیان القرآن):
                  </span>
                  <p className="text-base sm:text-lg text-emerald-50 leading-relaxed font-medium" dir="rtl">
                    {currentAyah.textUrduIsrar || currentAyah.textUrdu}
                  </p>
                </div>

                {/* English Translation Card Alongside */}
                <div className={`p-5 rounded-2xl border transition-all ${
                  currentAudioPhase === 'english'
                    ? 'bg-[#033125] border-amber-400 ring-2 ring-amber-400/30 shadow-lg'
                    : 'bg-[#021812] border-emerald-900'
                }`}>
                  <span className="text-xs font-bold text-amber-400 block mb-1">
                    English Translation (Sahih International):
                  </span>
                  <p className="text-sm sm:text-base text-emerald-200/90 leading-relaxed italic">
                    "{currentAyah.textEnglish}"
                  </p>
                </div>

                {/* Player Controls inside Modal */}
                <div className="pt-4 border-t border-emerald-900/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevAyah}
                      disabled={currentPlayingAyahIndex === null || currentPlayingAyahIndex <= 0}
                      className="p-2.5 rounded-xl bg-[#021812] border border-emerald-800 text-emerald-300 hover:text-white disabled:opacity-30 cursor-pointer"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>

                    <button
                      onClick={togglePlayPause}
                      className="w-12 h-12 rounded-2xl bg-amber-500 hover:bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow-lg cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                    </button>

                    <button
                      onClick={handleNextAyah}
                      disabled={currentPlayingAyahIndex === null || currentPlayingAyahIndex >= ayahs.length - 1}
                      className="p-2.5 rounded-xl bg-[#021812] border border-emerald-800 text-emerald-300 hover:text-white disabled:opacity-30 cursor-pointer"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyAyah(currentAyah)}
                      className="px-3.5 py-2 rounded-xl bg-[#021812] border border-emerald-800 text-xs text-emerald-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedAyah === currentAyah.numberInSurah ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Verse</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setIsCompanionModalOpen(false);
                        setSelectedTafsirAyah(currentAyah);
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-bold cursor-pointer"
                    >
                      📖 Tafseer
                    </button>

                    <button
                      onClick={() => setIsCompanionModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-xs font-bold text-amber-300 cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};
