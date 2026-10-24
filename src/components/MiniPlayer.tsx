import React from 'react';
import { Play, Pause, ChevronUp, Clock, Volume2, Sparkles, Mic, Video, Image as ImageIcon } from 'lucide-react';
import { useUnifiedPlayer } from '../context/UnifiedPlayerContext';

interface MiniPlayerProps {
  onOpenFullPlayer: () => void;
  onOpenImageEditor?: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({ onOpenFullPlayer, onOpenImageEditor }) => {
  const {
    activeTrack,
    isPlaying,
    currentTime,
    duration,
    isTimerActive,
    timerRemainingSeconds,
    effectiveCover,
    togglePlay,
  } = useUnifiedPlayer();

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

          {/* Left: Thumbnail & Name */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-amber-400/40 shrink-0 shadow-md">
              <img
                src={effectiveCover}
                alt={activeTrack.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-110' : ''}`}
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-xs font-bold text-white truncate font-display">
                  {activeTrack.title}
                </span>
                {activeTrack.arabicTitle && (
                  <span className="text-[11px] font-arabic text-amber-300 shrink-0">
                    {activeTrack.arabicTitle}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-emerald-300 truncate mt-0.5">
                <span className="truncate">{activeTrack.subtitle}</span>

                {/* Sleep Timer Indicator */}
                {isTimerActive && (
                  <span className="flex items-center gap-0.5 text-amber-300 font-mono font-bold bg-amber-400/10 px-1 rounded shrink-0">
                    <Clock size={9} />
                    {formatTimerMinSec(timerRemainingSeconds)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Quick Controls */}
          <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
            {/* Quick customize image button */}
            {onOpenImageEditor && (
              <button
                onClick={onOpenImageEditor}
                className="w-7 h-7 rounded-lg bg-emerald-950/80 hover:bg-emerald-950 text-amber-300 flex items-center justify-center border border-amber-400/20 transition active:scale-90"
                title="Customize Player Cover Image"
              >
                <ImageIcon size={13} />
              </button>
            )}

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 flex items-center justify-center shadow-lg shadow-amber-400/30 hover:scale-105 active:scale-95 transition"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={16} fill="currentColor" />
              ) : (
                <Play size={16} fill="currentColor" className="ml-0.5" />
              )}
            </button>

            {/* Expand Drawer Arrow */}
            <button
              onClick={onOpenFullPlayer}
              className="w-8 h-8 rounded-full text-emerald-300 hover:text-white flex items-center justify-center hover:bg-emerald-800/60 transition"
              title="Open Full Player"
            >
              <ChevronUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
