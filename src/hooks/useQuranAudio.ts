import { useState, useEffect, useRef, useCallback } from 'react';
import { Qari, QARIS, getSurahAudioUrl, getAyahArabicAudioUrl, getAyahUrduAudioUrl } from '../data/qaris';
import { SURAHS_METADATA, SurahMeta } from '../data/quranMetadata';
import { getOfflineAudioUrl, isSurahOffline } from '../utils/offlineStorage';

export type RecitationSequenceMode = 'arabic_and_urdu' | 'arabic_only';
export type ActivePhase = 'arabic' | 'urdu';

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

export function useQuranAudio() {
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
    return QARIS[0]; // Mishary by default
  });

  const [currentSurahNumber, setCurrentSurahNumber] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('easy_islam_last_position');
      if (saved) {
        const parsed: LastPosition = JSON.parse(saved);
        if (parsed.surahNumber >= 1 && parsed.surahNumber <= 114) {
          return parsed.surahNumber;
        }
      }
    } catch {
      // ignore
    }
    return 1; // Al-Fatihah
  });

  const [currentAyahNumber, setCurrentAyahNumber] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isAudioLoading, setIsAudioLoading] = useState<boolean>(false);
  const [isOfflineSource, setIsOfflineSource] = useState<boolean>(false);

  // Verse-by-verse Arabic + Urdu Voice sequencing (DEFAULT: 'arabic_and_urdu')
  const [sequenceMode, setSequenceMode] = useState<RecitationSequenceMode>('arabic_and_urdu');
  const [activePhase, setActivePhase] = useState<ActivePhase>('arabic');

  // Timer states
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timerTotalMinutes, setTimerTotalMinutes] = useState<number>(15);
  const [timerRemainingSeconds, setTimerRemainingSeconds] = useState<number>(0);
  const [timerMode, setTimerMode] = useState<'always_start' | 'continue_last'>('continue_last');

  // History & Last position
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

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sessionStartTimeRef = useRef<number | null>(null);
  const sessionSurahRef = useRef<number>(1);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // References to keep event handlers fresh without re-binding audio element
  const currentSurahRef = useRef<number>(currentSurahNumber);
  const currentAyahRef = useRef<number>(currentAyahNumber);
  const sequenceModeRef = useRef<RecitationSequenceMode>(sequenceMode);
  const activePhaseRef = useRef<ActivePhase>(activePhase);
  const isPlayingRef = useRef<boolean>(isPlaying);

  useEffect(() => {
    currentSurahRef.current = currentSurahNumber;
  }, [currentSurahNumber]);

  useEffect(() => {
    currentAyahRef.current = currentAyahNumber;
  }, [currentAyahNumber]);

  useEffect(() => {
    sequenceModeRef.current = sequenceMode;
  }, [sequenceMode]);

  useEffect(() => {
    activePhaseRef.current = activePhase;
  }, [activePhase]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Save last position
  const savePosition = useCallback((surah: number, ayah: number) => {
    const pos: LastPosition = { surahNumber: surah, ayahNumber: ayah, timestamp: Date.now() };
    setLastPosition(pos);
    try {
      localStorage.setItem('easy_islam_last_position', JSON.stringify(pos));
    } catch {
      // ignore
    }
  }, []);

  // Record history
  const recordHistory = useCallback((surahNum: number, durationSec: number) => {
    if (durationSec < 15) return;
    const surah = SURAHS_METADATA.find(s => s.number === surahNum);
    const newEntry: ListeningHistoryEntry = {
      id: `${Date.now()}_${surahNum}`,
      surahNumber: surahNum,
      surahNameEnglish: surah?.nameEnglish || `Surah ${surahNum}`,
      surahNameArabic: surah?.nameArabic || '',
      durationSeconds: Math.round(durationSec),
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

  // Update MediaSession
  const updateMediaSession = useCallback((surah: SurahMeta, ayahNum: number, phase: ActivePhase) => {
    if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
      const phaseLabel = phase === 'arabic' ? 'Arabic Recitation' : 'Urdu Translation Voice';
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `${surah.number}. ${surah.nameEnglish} : Ayah ${ayahNum} [${phaseLabel}]`,
        artist: phase === 'arabic' ? currentQari.name : 'Shamshad Ali Khan (Urdu Voice)',
        album: 'Easy Islam • Arabic + Urdu Recitation',
        artwork: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: currentQari.image, sizes: '400x400', type: 'image/jpeg' },
        ],
      });
    }
  }, [currentQari]);

  // CORE ENGINE: Play an Ayah phase (Arabic or Urdu) hands-free
  const playAyahAudioStep = useCallback(async (surahNum: number, ayahNum: number, phase: ActivePhase) => {
    const meta = SURAHS_METADATA.find(s => s.number === surahNum) || SURAHS_METADATA[0];
    const totalAyahs = meta.totalVerses;

    // Constrain ayah
    const validAyah = Math.max(1, Math.min(totalAyahs, ayahNum));

    setCurrentSurahNumber(surahNum);
    setCurrentAyahNumber(validAyah);
    setActivePhase(phase);
    savePosition(surahNum, validAyah);

    currentSurahRef.current = surahNum;
    currentAyahRef.current = validAyah;
    activePhaseRef.current = phase;

    let targetUrl: string;
    if (phase === 'arabic') {
      targetUrl = getAyahArabicAudioUrl(surahNum, validAyah);
    } else {
      targetUrl = getAyahUrduAudioUrl(surahNum, validAyah);
    }

    if (!audioRef.current) return;

    setIsAudioLoading(true);
    audioRef.current.src = targetUrl;
    audioRef.current.playbackRate = playbackSpeed;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      isPlayingRef.current = true;
      updateMediaSession(meta, validAyah, phase);
    } catch (err) {
      console.warn('Ayah playback error:', err);
      // Auto-fallback advance to next step if audio fails
      setTimeout(() => {
        if (isPlayingRef.current) {
          handleStepEnded();
        }
      }, 1000);
    } finally {
      setIsAudioLoading(false);
    }
  }, [playbackSpeed, savePosition, updateMediaSession]);

  // Handles moving to next step when an audio finishes playing
  const handleStepEnded = useCallback(() => {
    const surahNum = currentSurahRef.current;
    const ayahNum = currentAyahRef.current;
    const mode = sequenceModeRef.current;
    const phase = activePhaseRef.current;

    const meta = SURAHS_METADATA.find(s => s.number === surahNum) || SURAHS_METADATA[0];
    const totalAyahs = meta.totalVerses;

    if (mode === 'arabic_and_urdu') {
      if (phase === 'arabic') {
        // Step 1 finished (Arabic) -> Play Step 2 (Urdu Translation Voice) for SAME Ayah!
        playAyahAudioStep(surahNum, ayahNum, 'urdu');
      } else {
        // Step 2 finished (Urdu) -> Advance to NEXT Ayah's Arabic!
        if (ayahNum < totalAyahs) {
          playAyahAudioStep(surahNum, ayahNum + 1, 'arabic');
        } else {
          // Surah finished! Advance to next Surah Ayah 1!
          const nextSurah = surahNum < 114 ? surahNum + 1 : 1;
          playAyahAudioStep(nextSurah, 1, 'arabic');
        }
      }
    } else {
      // Arabic only mode: advance directly to next Ayah Arabic
      if (ayahNum < totalAyahs) {
        playAyahAudioStep(surahNum, ayahNum + 1, 'arabic');
      } else {
        const nextSurah = surahNum < 114 ? surahNum + 1 : 1;
        playAyahAudioStep(nextSurah, 1, 'arabic');
      }
    }
  }, [playAyahAudioStep]);

  // Initialize Audio element
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsAudioLoading(true);
    const onCanPlay = () => setIsAudioLoading(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onEnded = () => handleStepEnded();
    const onError = () => {
      console.warn('Audio element error, advancing step...');
      setTimeout(() => handleStepEnded(), 1200);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    // MediaSession global actions
    if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => audio.play());
      navigator.mediaSession.setActionHandler('pause', () => audio.pause());
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        const surah = currentSurahRef.current;
        const ayah = currentAyahRef.current;
        const meta = SURAHS_METADATA.find(s => s.number === surah);
        if (meta && ayah < meta.totalVerses) {
          playAyahAudioStep(surah, ayah + 1, 'arabic');
        } else {
          playAyahAudioStep(surah < 114 ? surah + 1 : 1, 1, 'arabic');
        }
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        const surah = currentSurahRef.current;
        const ayah = currentAyahRef.current;
        if (ayah > 1) {
          playAyahAudioStep(surah, ayah - 1, 'arabic');
        } else {
          const prevSurah = surah > 1 ? surah - 1 : 114;
          playAyahAudioStep(prevSurah, 1, 'arabic');
        }
      });
    }

    return () => {
      audio.pause();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [handleStepEnded, playAyahAudioStep]);

  // Master Play: Start playing from specific Ayah and phase
  const playSurah = useCallback((surahNum: number, startAyah: number = 1, forceQari?: Qari) => {
    if (sessionStartTimeRef.current) {
      const elapsed = (Date.now() - sessionStartTimeRef.current) / 1000;
      recordHistory(sessionSurahRef.current, elapsed);
    }
    sessionSurahRef.current = surahNum;
    sessionStartTimeRef.current = Date.now();

    if (forceQari) {
      setCurrentQari(forceQari);
    }

    // Start with Arabic phase for that Ayah
    playAyahAudioStep(surahNum, startAyah, 'arabic');
  }, [playAyahAudioStep, recordHistory]);

  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      isPlayingRef.current = false;
    }
    if (sessionStartTimeRef.current) {
      const elapsed = (Date.now() - sessionStartTimeRef.current) / 1000;
      recordHistory(sessionSurahRef.current, elapsed);
      sessionStartTimeRef.current = null;
    }
  }, [recordHistory]);

  const resumeAudio = useCallback(async () => {
    if (audioRef.current && audioRef.current.src) {
      sessionStartTimeRef.current = Date.now();
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        isPlayingRef.current = true;
      } catch (err) {
        console.error('Resume error:', err);
        playAyahAudioStep(currentSurahNumber, currentAyahNumber, activePhase);
      }
    } else {
      playSurah(currentSurahNumber, currentAyahNumber);
    }
  }, [currentSurahNumber, currentAyahNumber, activePhase, playSurah, playAyahAudioStep]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      resumeAudio();
    }
  }, [isPlaying, pauseAudio, resumeAudio]);

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

  const handleNextAyah = useCallback(() => {
    const meta = SURAHS_METADATA.find(s => s.number === currentSurahNumber);
    if (meta && currentAyahNumber < meta.totalVerses) {
      playAyahAudioStep(currentSurahNumber, currentAyahNumber + 1, 'arabic');
    } else {
      const nxt = currentSurahNumber < 114 ? currentSurahNumber + 1 : 1;
      playAyahAudioStep(nxt, 1, 'arabic');
    }
  }, [currentSurahNumber, currentAyahNumber, playAyahAudioStep]);

  const handlePrevAyah = useCallback(() => {
    if (currentAyahNumber > 1) {
      playAyahAudioStep(currentSurahNumber, currentAyahNumber - 1, 'arabic');
    } else {
      const prev = currentSurahNumber > 1 ? currentSurahNumber - 1 : 114;
      playAyahAudioStep(prev, 1, 'arabic');
    }
  }, [currentSurahNumber, currentAyahNumber, playAyahAudioStep]);

  // Start Auto Recitation Timer
  const startAutoRecitation = useCallback((minutes: number, mode: 'always_start' | 'continue_last') => {
    setTimerTotalMinutes(minutes);
    setTimerMode(mode);
    setTimerRemainingSeconds(minutes * 60);
    setIsTimerActive(true);

    const startSurah = mode === 'always_start' ? 1 : lastPosition.surahNumber;
    const startAyah = mode === 'always_start' ? 1 : lastPosition.ayahNumber;

    playSurah(startSurah, startAyah);
  }, [lastPosition, playSurah]);

  // Stop Auto Recitation Timer
  const stopAutoRecitation = useCallback(() => {
    setIsTimerActive(false);
    setTimerRemainingSeconds(0);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    pauseAudio();
  }, [pauseAudio]);

  // Sleep timer ticker
  useEffect(() => {
    if (isTimerActive && isPlaying) {
      timerIntervalRef.current = setInterval(() => {
        setTimerRemainingSeconds(prev => {
          if (prev <= 1) {
            stopAutoRecitation();
            return 0;
          }
          if (prev <= 10 && audioRef.current) {
            audioRef.current.volume = Math.max(0.1, prev / 10);
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [isTimerActive, isPlaying, stopAutoRecitation]);

  const changeQari = useCallback((qari: Qari) => {
    setCurrentQari(qari);
    if (isPlaying) {
      playAyahAudioStep(currentSurahNumber, currentAyahNumber, activePhase);
    }
  }, [isPlaying, currentSurahNumber, currentAyahNumber, activePhase, playAyahAudioStep]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem('easy_islam_history');
    } catch {
      // ignore
    }
  }, []);

  return {
    currentQari,
    currentSurahNumber,
    currentAyahNumber,
    currentSurahMeta: SURAHS_METADATA.find(s => s.number === currentSurahNumber) || SURAHS_METADATA[0],
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    isAudioLoading,
    isOfflineSource,
    sequenceMode,
    activePhase,
    setSequenceMode,
    isTimerActive,
    timerTotalMinutes,
    timerRemainingSeconds,
    timerMode,
    lastPosition,
    history,
    playSurah,
    playAyahAudioStep,
    pauseAudio,
    resumeAudio,
    togglePlay,
    seek,
    changeSpeed,
    nextSurah: handleNextAyah,
    prevSurah: handlePrevAyah,
    startAutoRecitation,
    stopAutoRecitation,
    changeQari,
    clearHistory,
  };
}
