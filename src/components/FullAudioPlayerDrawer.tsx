import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Volume2,
  Clock,
  ChevronDown,
  Sparkles,
  Download,
  Share2,
  Sliders,
  Repeat,
  Mic,
} from 'lucide-react';
import { SurahMeta } from '../data/quranMetadata';
import { Qari } from '../data/qaris';
import { ActivePhase, RecitationSequenceMode } from '../hooks/useQuranAudio';

interface FullAudioPlayerDrawerProps {
  isOpen: boolean;
  currentSurah: SurahMeta;
  currentAyahNumber: number;
  activePhase: ActivePhase;
  sequenceMode: RecitationSequenceMode;
  currentQari: Qari;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  isAudioLoading: boolean;
  isTimerActive: boolean;
  timerTotalMinutes: number;
  timerRemainingSeconds: number;
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
  onNextAyah: () => void;
  onPrevAyah: () => void;
  onChangeSpeed: (speed: number) => void;
  onStartTimer: (minutes: number, mode: 'always_start' | 'continue_last') => void;
  onStopTimer: () => void;
  onOpenQariModal: () => void;
  onClose: () => void;
}

export const FullAudioPlayerDrawer: React.FC<FullAudioPlayerDrawerProps> = ({
  isOpen,
  currentSurah,
  currentAyahNumber,
  activePhase,
  sequenceMode,
  currentQari,
  isPlaying,
  currentTime,
  duration,
  playbackSpeed,
  isAudioLoading,
  isTimerActive,
  timerTotalMinutes,
  timerRemainingSeconds,
  onTogglePlay,
  onSeek,
  onNextAyah,
  onPrevAyah,
  onChangeSpeed,
  onStartTimer,
  onStopTimer,
  onOpenQariModal,
  onClose,
}) => {
  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(parseFloat(e.target.value));
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md mx-auto bg-gradient-to-b from-emerald-900 via-emerald-950 to-emerald-950 border-t border-emerald-700/80 rounded-t-3xl p-6 text-white shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Header / Dismiss Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-emerald-800/60">
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-emerald-950 text-emerald-400 hover:text-white"
            title="Minimize"
          >
            <ChevronDown size={20} />
          </button>
          <div className="text-center">
            <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-semibold">
              Hands-Free Verse Playback
            </span>
            <div className="text-xs font-semibold text-white">Arabic &bull; Urdu Voice</div>
          </div>
          <button
            onClick={onOpenQariModal}
            className="p-1.5 rounded-xl bg-emerald-950 text-amber-400 hover:text-amber-300"
            title="Switch Qari"
          >
            <Volume2 size={18} />
          </button>
        </div>

        {/* Center Artwork & Surah Calligraphy */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative w-48 h-48 rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl shadow-amber-500/10 group">
            <img
              src={currentQari.image}
              alt={currentQari.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-300 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-700">
                Ayah {currentAyahNumber} of {currentSurah.totalVerses}
              </span>
            </div>
          </div>

          <div>
            <div className="font-arabic text-3xl text-amber-300 font-normal mb-1">
              {currentSurah.nameArabic}
            </div>
            <h2 className="text-xl font-bold text-white font-display">
              {currentSurah.number}. {currentSurah.nameEnglish}
            </h2>
            <p className="text-xs text-emerald-300/80 mt-0.5">
              {currentSurah.nameTranslation} &bull; {currentSurah.totalVerses} Ayahs
            </p>
          </div>

          {/* Active Phase Pill (Arabic Recitation vs Urdu Voice) */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-xs">
            <span
              className={`px-3 py-1 rounded-xl font-mono font-bold transition ${
                activePhase === 'arabic'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'text-emerald-500'
              }`}
            >
              1. Arabic Recitation
            </span>
            <span className="text-emerald-600 font-bold">&rarr;</span>
            <span
              className={`px-3 py-1 rounded-xl font-mono font-bold transition ${
                activePhase === 'urdu'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'text-emerald-500'
              }`}
            >
              2. Spoken Urdu Voice
            </span>
          </div>

          <div className="text-[11px] text-emerald-400 font-medium">
            {activePhase === 'arabic'
              ? `Reciter: ${currentQari.name}`
              : 'Urdu Voice: Shamshad Ali Khan'}
          </div>
        </div>

        {/* Scrubber & Duration */}
        <div className="space-y-1.5">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleScrubberChange}
            className="w-full h-1.5 bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-[11px] font-mono text-emerald-400">
            <span>{formatTime(currentTime)}</span>
            <span>{isAudioLoading ? 'Buffering...' : formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-6">
          {/* Skip Back 10s */}
          <button
            onClick={() => onSeek(Math.max(0, currentTime - 10))}
            className="p-2.5 rounded-2xl bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 active:scale-95 transition"
            title="Rewind 10s"
          >
            <RotateCcw size={18} />
          </button>

          {/* Previous Ayah */}
          <button
            onClick={onPrevAyah}
            className="p-3 rounded-2xl bg-emerald-900 hover:bg-emerald-800 text-emerald-200 active:scale-95 transition"
            title="Previous Ayah"
          >
            <SkipBack size={20} />
          </button>

          {/* Play/Pause */}
          <button
            onClick={onTogglePlay}
            className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 flex items-center justify-center shadow-xl shadow-amber-500/25 active:scale-95 transition"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause size={28} fill="currentColor" />
            ) : (
              <Play size={28} fill="currentColor" className="ml-1" />
            )}
          </button>

          {/* Next Ayah */}
          <button
            onClick={onNextAyah}
            className="p-3 rounded-2xl bg-emerald-900 hover:bg-emerald-800 text-emerald-200 active:scale-95 transition"
            title="Next Ayah"
          >
            <SkipForward size={20} />
          </button>

          {/* Speed */}
          <button
            onClick={() => {
              const speeds = [0.75, 1, 1.25, 1.5];
              const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
              onChangeSpeed(speeds[nextIndex]);
            }}
            className="px-2.5 py-2 rounded-2xl bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 text-xs font-mono font-bold active:scale-95 transition"
            title="Playback Speed"
          >
            {playbackSpeed}x
          </button>
        </div>

        {/* Recitation Sleep Timer Bar */}
        <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-800/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-amber-400" />
            <div>
              <div className="font-semibold text-white">Auto Recitation Timer</div>
              <div className="text-[10px] text-emerald-400">
                {isTimerActive
                  ? `${Math.floor(timerRemainingSeconds / 60)}m ${timerRemainingSeconds % 60}s remaining`
                  : 'Auto-stops audio when timer completes'}
              </div>
            </div>
          </div>

          {isTimerActive ? (
            <button
              onClick={onStopTimer}
              className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-semibold hover:bg-red-500/30 transition"
            >
              Cancel Timer
            </button>
          ) : (
            <div className="flex gap-1.5">
              {[15, 30].map(mins => (
                <button
                  key={mins}
                  onClick={() => onStartTimer(mins, 'continue_last')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-900 hover:bg-amber-500 hover:text-emerald-950 text-emerald-300 font-semibold text-xs border border-emerald-800 transition"
                >
                  {mins}m
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
