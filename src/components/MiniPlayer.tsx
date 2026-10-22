import React from 'react';
import { Play, Pause, ChevronUp, Clock, Volume2, Sparkles, Mic } from 'lucide-react';
import { SurahMeta } from '../data/quranMetadata';
import { Qari } from '../data/qaris';
import { ActivePhase } from '../hooks/useQuranAudio';

interface MiniPlayerProps {
  currentSurah: SurahMeta;
  currentAyahNumber: number;
  activePhase: ActivePhase;
  currentQari: Qari;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isTimerActive: boolean;
  timerRemainingSeconds: number;
  onTogglePlay: () => void;
  onOpenFullPlayer: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  currentSurah,
  currentAyahNumber,
  activePhase,
  currentQari,
  isPlaying,
  currentTime,
  duration,
  isTimerActive,
  timerRemainingSeconds,
  onTogglePlay,
  onOpenFullPlayer,
}) => {
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTimerMinSec = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-16 left-0 right-0 z-30 px-3 pb-1 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <div
          onClick={onOpenFullPlayer}
          className="relative overflow-hidden rounded-2xl bg-emerald-900/95 backdrop-blur-lg border border-amber-500/30 p-2.5 shadow-2xl flex items-center justify-between cursor-pointer hover:bg-emerald-900 transition group"
        >
          {/* Audio progress bar thin line at the top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-950">
            <div
              className="h-full bg-amber-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Left: Thumbnail & Surah Name */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-emerald-700 shrink-0">
              <img
                src={currentQari.image}
                alt={currentQari.name}
                className="w-full h-full object-cover"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-xs font-bold text-white truncate font-display">
                  {currentSurah.number}. {currentSurah.nameEnglish}
                </span>
                <span className="text-xs font-arabic text-amber-300 shrink-0">
                  {currentSurah.nameArabic}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-300/80 truncate mt-0.5">
                <span className="font-mono text-amber-400 font-semibold">Ayah {currentAyahNumber}</span>
                <span>&bull;</span>
                <span className={`px-1.5 py-0.2 rounded-full font-semibold ${activePhase === 'arabic' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-800 text-emerald-200'}`}>
                  {activePhase === 'arabic' ? 'Arabic' : 'Urdu Voice'}
                </span>
                <span>&bull;</span>
                <span className="truncate">{activePhase === 'arabic' ? currentQari.name : 'Shamshad Ali Khan'}</span>
              </div>
            </div>
          </div>

          {/* Right: Timer pill & Play button */}
          <div className="flex items-center gap-2 shrink-0">
            {isTimerActive && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/30">
                <Clock size={10} />
                <span>{formatTimerMinSec(timerRemainingSeconds)}</span>
              </div>
            )}

            <button
              onClick={e => {
                e.stopPropagation();
                onTogglePlay();
              }}
              className="w-9 h-9 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 flex items-center justify-center shadow-md shadow-amber-500/20 active:scale-90 transition"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>

            <button
              onClick={onOpenFullPlayer}
              className="text-emerald-400 hover:text-white p-1"
              title="Expand Player"
            >
              <ChevronUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
