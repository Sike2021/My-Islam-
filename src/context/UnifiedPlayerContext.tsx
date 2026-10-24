import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Qari, QARIS, getAyahArabicAudioUrl, getAyahUrduAudioUrl } from '../data/qaris';
import { SURAHS_METADATA, SurahMeta } from '../data/quranMetadata';
import { IslamicStoryItem } from '../data/islamicStoriesData';

export type UnifiedMediaType = 'quran' | 'story' | 'bayan' | 'naat';
export type ActivePhase = 'arabic' | 'urdu';
export type SequenceMode = 'arabic_and_urdu' | 'arabic_only';

export interface UnifiedTrack {
  id: string;
  type: UnifiedMediaType;
  title: string;
  subtitle: string;
  arabicTitle?: string;
  urduTitle?: string;
  audioUrl: string;
  audioSources?: string[];
  currentSourceIndex?: number;
  videoUrl?: string;
  coverImage: string;
  categoryBadge?: string;
  details?: string;
  urduFullStory?: string;
  // Specific Quran metadata
  surahNumber?: number;
  ayahNumber?: number;
  phase?: ActivePhase;
}

export interface ListeningHistoryEntry {
  id: string;
  surahNumber: number;
  surahNameEnglish: string;
  surahNameArabic: string;
  durationSeconds: number;
  timestamp: number;
  qariName: string;
}

export interface LastPosition {
  surahNumber: number;
  ayahNumber: number;
  timestamp: number;
}

interface UnifiedPlayerContextType {
  activeTrack: UnifiedTrack;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  isLoading: boolean;
  sequenceMode: SequenceMode;
  activePhase: ActivePhase;
  currentQari: Qari;
  currentSurahMeta: SurahMeta;
  currentSurahNumber: number;
  currentAyahNumber: number;
  // Custom Player Cover
  customPlayerCover: string | null;
  effectiveCover: string;
  setCustomPlayerCover: (coverUrl: string | null) => void;
  // Sleep Timer
  isTimerActive: boolean;
  timerTotalMinutes: number;
  timerRemainingSeconds: number;
  timerMode: 'always_start' | 'continue_last';
  startTimer: (minutes: number, mode?: 'always_start' | 'continue_last') => void;
  stopTimer: () => void;
  // Playback commands
  togglePlay: () => void;
  playTrack: (track: UnifiedTrack) => void;
  playQuranSurahAyah: (surahNum: number, ayahNum?: number, phase?: ActivePhase) => void;
  playStoryTrack: (story: IslamicStoryItem) => void;
  playBayanTrack: (title: string, audioUrl: string, speaker: string, videoUrl?: string, cover?: string, audioSources?: string[]) => void;
  playNaatTrack: (title: string, audioUrl: string, artist: string, cover?: string) => void;
  seek: (seconds: number) => void;
  changeSpeed: (speed: number) => void;
  next: () => void;
  prev: () => void;
  setSequenceMode: React.Dispatch<React.SetStateAction<SequenceMode>>;
  changeQari: (qari: Qari) => void;
  // Video Watch Mode
  isVideoModalOpen: boolean;
  activeVideo: { url: string; title: string; subtitle?: string } | null;
  openVideoWatch: (url: string, title: string, subtitle?: string) => void;
  closeVideoWatch: () => void;
  // Tracker & History
  lastPosition: LastPosition;
  history: ListeningHistoryEntry[];
  clearHistory: () => void;
}

const DEFAULT_QURAN_TRACK: UnifiedTrack = {
  id: 'quran-1-1',
  type: 'quran',
  title: 'Al-Fatihah (The Opening)',
  subtitle: 'Reciter: Mishary Alafasy • Urdu: Miraj-ul-Din Khan',
  arabicTitle: 'الفاتحة',
  urduTitle: 'اردو ترجمہ: معراج الدین خان',
  audioUrl: getAyahArabicAudioUrl(1, 1),
  coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
  categoryBadge: 'Holy Quran',
  surahNumber: 1,
  ayahNumber: 1,
  phase: 'arabic',
};

const UnifiedPlayerContext = createContext<UnifiedPlayerContextType | null>(null);

export const UnifiedPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQari, setCurrentQari] = useState<Qari>(() => {
    try {
      const saved = localStorage.getItem('easy_islam_qari');
      if (saved) {
        const found = QARIS.find(q => q.id === saved);
        if (found) return found;
      }
    } catch {
      // ignore
    }
    return QARIS[0]; // Mishary
  });

  const [activeTrack, setActiveTrack] = useState<UnifiedTrack>(DEFAULT_QURAN_TRACK);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Quran Verse-by-verse states
  const [sequenceMode, setSequenceMode] = useState<SequenceMode>('arabic_and_urdu');
  const [activePhase, setActivePhase] = useState<ActivePhase>('arabic');

  // Player Cover Customizer State
  const [customPlayerCover, setCustomPlayerCoverState] = useState<string | null>(() => {
    try {
      return localStorage.getItem('easy_islam_player_custom_cover');
    } catch {
      return null;
    }
  });

  const setCustomPlayerCover = (url: string | null) => {
    setCustomPlayerCoverState(url);
    try {
      if (url) {
        localStorage.setItem('easy_islam_player_custom_cover', url);
      } else {
        localStorage.removeItem('easy_islam_player_custom_cover');
      }
    } catch {
      // ignore
    }
  };

  const effectiveCover = customPlayerCover || activeTrack.coverImage;

  // Video Watch Modal State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

  const openVideoWatch = (url: string, title: string, subtitle?: string) => {
    setActiveVideo({ url, title, subtitle });
    setIsVideoModalOpen(true);
    // Pause audio when starting video
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const closeVideoWatch = () => {
    setIsVideoModalOpen(false);
    setActiveVideo(null);
  };

  // Timer states
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timerTotalMinutes, setTimerTotalMinutes] = useState<number>(15);
  const [timerRemainingSeconds, setTimerRemainingSeconds] = useState<number>(0);
  const [timerMode, setTimerMode] = useState<'always_start' | 'continue_last'>('continue_last');
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Last position & history
  const [lastPosition, setLastPosition] = useState<LastPosition>(() => {
    try {
      const saved = localStorage.getItem('easy_islam_last_position');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return { surahNumber: 1, ayahNumber: 1, timestamp: Date.now() };
  });

  const [history, setHistory] = useState<ListeningHistoryEntry[]>(() => {
    try {
      const saved = localStorage.getItem('easy_islam_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Single HTML5 Audio Engine
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sessionStartTimeRef = useRef<number | null>(null);

  // Current active Surah metadata
  const currentSurahNumber = activeTrack.surahNumber || 1;
  const currentAyahNumber = activeTrack.ayahNumber || 1;
  const currentSurahMeta = SURAHS_METADATA.find(s => s.number === currentSurahNumber) || SURAHS_METADATA[0];

  // Helper to save history
  const recordHistory = useCallback((surahNum: number, durationSecs: number) => {
    if (durationSecs < 10) return;
    const meta = SURAHS_METADATA.find(s => s.number === surahNum);
    if (!meta) return;

    const newEntry: ListeningHistoryEntry = {
      id: `${surahNum}-${Date.now()}`,
      surahNumber: surahNum,
      surahNameEnglish: meta.nameEnglish,
      surahNameArabic: meta.nameArabic,
      durationSeconds: Math.floor(durationSecs),
      timestamp: Date.now(),
      qariName: currentQari.name,
    };

    setHistory(prev => {
      const updated = [newEntry, ...prev.slice(0, 49)];
      try {
        localStorage.setItem('easy_islam_history', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, [currentQari.name]);

  // Audio loading & event binding
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      if (!isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setIsLoading(false);
      // Auto-failover to next audio source if available (at least 3-4 sources)
      setActiveTrack(prev => {
        if (!prev.audioSources || prev.audioSources.length <= 1) return prev;
        const nextIndex = ((prev.currentSourceIndex || 0) + 1);
        if (nextIndex < prev.audioSources.length) {
          const nextUrl = prev.audioSources[nextIndex];
          if (audioRef.current && nextUrl && !nextUrl.startsWith('speech://')) {
            audioRef.current.src = nextUrl;
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
          }
          return {
            ...prev,
            audioUrl: nextUrl,
            currentSourceIndex: nextIndex,
          };
        }
        return prev;
      });
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Update playback speed whenever changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Play any generic track in the unified player
  const playTrack = useCallback((track: UnifiedTrack) => {
    if (!audioRef.current) return;
    setActiveTrack(track);
    setIsLoading(true);

    audioRef.current.src = track.audioUrl;
    audioRef.current.playbackRate = playbackSpeed;
    audioRef.current.currentTime = 0;
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [playbackSpeed]);

  // Play a Story track (Exclusively Story Audio - NEVER Quran Recitation, with 4-tier Failover)
  const playStoryTrack = useCallback((story: IslamicStoryItem) => {
    // Strictly guard: stories must never play Quran recitation
    const candidateSources = story.audio.audioSources && story.audio.audioSources.length > 0
      ? story.audio.audioSources
      : [story.audio.audioUrl, '/assets/aistudio/user_story_audio.mp3'];

    // Filter out any Quran recitation URLs
    const safeSources = candidateSources.filter(url =>
      !url.includes('mp3quran.net') && !url.includes('everyayah.com')
    );
    if (safeSources.length === 0) {
      safeSources.push('/assets/aistudio/user_story_audio.mp3');
    }

    const safeAudioUrl = safeSources[0];
    const safeVideoUrl = story.video.videoUrl || story.video.youtubeQuery || 'Cuqbrwzcy-s';

    const track: UnifiedTrack = {
      id: `story-${story.id}`,
      type: 'story',
      title: story.nameEnglish,
      subtitle: `${story.categoryLabel} • Spoken Story Audio`,
      arabicTitle: story.arabicName,
      urduTitle: story.urduTitle,
      audioUrl: safeAudioUrl,
      audioSources: safeSources,
      currentSourceIndex: 0,
      videoUrl: safeVideoUrl,
      coverImage: story.featuredImage,
      categoryBadge: story.categoryLabel,
      details: story.shortBio,
      urduFullStory: story.urduFullStory,
    };
    playTrack(track);
  }, [playTrack]);

  // Play a Dr. Israr Bayan track
  const playBayanTrack = useCallback((title: string, audioUrl: string, speaker: string, videoUrl?: string, cover?: string, audioSources?: string[]) => {
    const sources = audioSources && audioSources.length > 0 ? audioSources : [audioUrl];
    const track: UnifiedTrack = {
      id: `bayan-${Date.now()}`,
      type: 'bayan',
      title,
      subtitle: `Bayan by ${speaker}`,
      arabicTitle: 'بیان القرآن • ڈاکٹر اسرار احمد',
      urduTitle: title,
      audioUrl: sources[0],
      audioSources: sources,
      currentSourceIndex: 0,
      videoUrl,
      coverImage: cover || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
      categoryBadge: 'Dr. Israr Bayan',
    };
    playTrack(track);
  }, [playTrack]);

  // Play a Naat track
  const playNaatTrack = useCallback((title: string, audioUrl: string, artist: string, cover?: string) => {
    const track: UnifiedTrack = {
      id: `naat-${Date.now()}`,
      type: 'naat',
      title,
      subtitle: `Recited by ${artist}`,
      arabicTitle: 'نعتِ رسولِ مقبول ﷺ',
      urduTitle: title,
      audioUrl,
      coverImage: cover || 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=400&q=80',
      categoryBadge: 'Qari Waheed Naat',
    };
    playTrack(track);
  }, [playTrack]);

  // Quran Playback Engine with Verse-by-Verse Sequencing (Arabic + Miraj-ul-Din Khan Urdu Translation)
  const playQuranSurahAyah = useCallback((surahNum: number, ayahNum: number = 1, phase: ActivePhase = 'arabic') => {
    const sMeta = SURAHS_METADATA.find(s => s.number === surahNum) || SURAHS_METADATA[0];
    const safeAyah = Math.min(Math.max(1, ayahNum), sMeta.totalVerses);

    let audioUrl = '';
    let subtitleText = '';
    let urduText = '';

    if (phase === 'arabic') {
      audioUrl = getAyahArabicAudioUrl(surahNum, safeAyah);
      subtitleText = `Ayah ${safeAyah}/${sMeta.totalVerses} • Reciter: ${currentQari.name}`;
      urduText = `عربی تلاوت: آیت ${safeAyah}`;
    } else {
      // Strictly Miraj-ul-Din Khan
      audioUrl = getAyahUrduAudioUrl(surahNum, safeAyah);
      subtitleText = `Ayah ${safeAyah}/${sMeta.totalVerses} • Urdu Audio: Miraj-ul-Din Khan`;
      urduText = `اردو ترجمہ آواز: معراج الدین خان (آیت ${safeAyah})`;
    }

    const quranTrack: UnifiedTrack = {
      id: `quran-${surahNum}-${safeAyah}-${phase}`,
      type: 'quran',
      title: `${surahNum}. ${sMeta.nameEnglish}`,
      subtitle: subtitleText,
      arabicTitle: sMeta.nameArabic,
      urduTitle: urduText,
      audioUrl,
      coverImage: currentQari.image,
      categoryBadge: `Ayah ${safeAyah} • ${phase === 'arabic' ? 'Arabic' : 'Urdu (Miraj-ul-Din Khan)'}`,
      surahNumber: surahNum,
      ayahNumber: safeAyah,
      phase,
    };

    setActivePhase(phase);
    playTrack(quranTrack);

    // Update last position
    const newPos: LastPosition = {
      surahNumber: surahNum,
      ayahNumber: safeAyah,
      timestamp: Date.now(),
    };
    setLastPosition(newPos);
    try {
      localStorage.setItem('easy_islam_last_position', JSON.stringify(newPos));
    } catch {
      // ignore
    }
  }, [currentQari, playTrack]);

  // Track end handler - Handles sequential auto-advancement
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (activeTrack.type === 'quran' && activeTrack.surahNumber && activeTrack.ayahNumber) {
        const sNum = activeTrack.surahNumber;
        const aNum = activeTrack.ayahNumber;
        const sMeta = SURAHS_METADATA.find(s => s.number === sNum) || SURAHS_METADATA[0];

        if (sequenceMode === 'arabic_and_urdu') {
          if (activePhase === 'arabic') {
            // Switch to Urdu translation by Miraj-ul-Din Khan for this same ayah
            playQuranSurahAyah(sNum, aNum, 'urdu');
            return;
          } else {
            // Urdu just finished, advance to next ayah in Arabic
            if (aNum < sMeta.totalVerses) {
              playQuranSurahAyah(sNum, aNum + 1, 'arabic');
            } else {
              // Surah ended, advance to next surah
              const nextSurahNum = sNum < 114 ? sNum + 1 : 1;
              playQuranSurahAyah(nextSurahNum, 1, 'arabic');
            }
            return;
          }
        } else {
          // Arabic only mode
          if (aNum < sMeta.totalVerses) {
            playQuranSurahAyah(sNum, aNum + 1, 'arabic');
          } else {
            const nextSurahNum = sNum < 114 ? sNum + 1 : 1;
            playQuranSurahAyah(nextSurahNum, 1, 'arabic');
          }
        }
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [activeTrack, activePhase, sequenceMode, playQuranSurahAyah]);

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (sessionStartTimeRef.current && activeTrack.surahNumber) {
        const elapsed = (Date.now() - sessionStartTimeRef.current) / 1000;
        recordHistory(activeTrack.surahNumber, elapsed);
        sessionStartTimeRef.current = null;
      }
    } else {
      sessionStartTimeRef.current = Date.now();
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying, activeTrack.surahNumber, recordHistory]);

  const seek = useCallback((seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  }, []);

  const changeSpeed = useCallback((speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, []);

  const next = useCallback(() => {
    if (activeTrack.type === 'quran' && activeTrack.surahNumber) {
      const sMeta = currentSurahMeta;
      const aNum = activeTrack.ayahNumber || 1;
      if (aNum < sMeta.totalVerses) {
        playQuranSurahAyah(activeTrack.surahNumber, aNum + 1, 'arabic');
      } else {
        const nS = activeTrack.surahNumber < 114 ? activeTrack.surahNumber + 1 : 1;
        playQuranSurahAyah(nS, 1, 'arabic');
      }
    } else {
      // Seek forward 15 seconds
      seek(Math.min(duration, currentTime + 15));
    }
  }, [activeTrack, currentSurahMeta, playQuranSurahAyah, seek, duration, currentTime]);

  const prev = useCallback(() => {
    if (activeTrack.type === 'quran' && activeTrack.surahNumber) {
      const aNum = activeTrack.ayahNumber || 1;
      if (aNum > 1) {
        playQuranSurahAyah(activeTrack.surahNumber, aNum - 1, 'arabic');
      } else {
        const pS = activeTrack.surahNumber > 1 ? activeTrack.surahNumber - 1 : 114;
        playQuranSurahAyah(pS, 1, 'arabic');
      }
    } else {
      // Seek back 15 seconds
      seek(Math.max(0, currentTime - 15));
    }
  }, [activeTrack, playQuranSurahAyah, seek, currentTime]);

  const changeQari = useCallback((qari: Qari) => {
    setCurrentQari(qari);
    try {
      localStorage.setItem('easy_islam_qari', qari.id);
    } catch {
      // ignore
    }
  }, []);

  // Sleep Timer logic
  const startTimer = useCallback((minutes: number, mode: 'always_start' | 'continue_last' = 'continue_last') => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    setTimerTotalMinutes(minutes);
    setTimerMode(mode);
    setTimerRemainingSeconds(minutes * 60);
    setIsTimerActive(true);

    if (mode === 'always_start') {
      playQuranSurahAyah(1, 1, 'arabic');
    } else {
      playQuranSurahAyah(lastPosition.surahNumber, lastPosition.ayahNumber, 'arabic');
    }

    timerIntervalRef.current = setInterval(() => {
      setTimerRemainingSeconds(prev => {
        if (prev <= 1) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          setIsTimerActive(false);
          if (audioRef.current) audioRef.current.pause();
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [playQuranSurahAyah, lastPosition]);

  const stopTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setIsTimerActive(false);
    setTimerRemainingSeconds(0);
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem('easy_islam_history');
    } catch {
      // ignore
    }
  }, []);

  return (
    <UnifiedPlayerContext.Provider
      value={{
        activeTrack,
        isPlaying,
        currentTime,
        duration,
        playbackSpeed,
        isLoading,
        sequenceMode,
        activePhase,
        currentQari,
        currentSurahMeta,
        currentSurahNumber,
        currentAyahNumber,
        customPlayerCover,
        effectiveCover,
        setCustomPlayerCover,
        isTimerActive,
        timerTotalMinutes,
        timerRemainingSeconds,
        timerMode,
        startTimer,
        stopTimer,
        togglePlay,
        playTrack,
        playQuranSurahAyah,
        playStoryTrack,
        playBayanTrack,
        playNaatTrack,
        seek,
        changeSpeed,
        next,
        prev,
        setSequenceMode,
        changeQari,
        isVideoModalOpen,
        activeVideo,
        openVideoWatch,
        closeVideoWatch,
        lastPosition,
        history,
        clearHistory,
      }}
    >
      {children}
    </UnifiedPlayerContext.Provider>
  );
};

export const useUnifiedPlayer = () => {
  const context = useContext(UnifiedPlayerContext);
  if (!context) {
    throw new Error('useUnifiedPlayer must be used within a UnifiedPlayerProvider');
  }
  return context;
};
