import React, { useState } from 'react';
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
  Video,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import { useUnifiedPlayer } from '../context/UnifiedPlayerContext';

interface FullAudioPlayerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQariModal: () => void;
  onOpenImageEditor: () => void;
}

export const FullAudioPlayerDrawer: React.FC<FullAudioPlayerDrawerProps> = ({
  isOpen,
  onClose,
  onOpenQariModal,
  onOpenImageEditor,
}) => {
  const {
    activeTrack,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    isLoading,
    sequenceMode,
    activePhase,
    currentQari,
    effectiveCover,
    isTimerActive,
    timerTotalMinutes,
    timerRemainingSeconds,
    togglePlay,
    seek,
    changeSpeed,
    next,
    prev,
    startTimer,
    stopTimer,
    setSequenceMode,
    openVideoWatch,
  } = useUnifiedPlayer();

  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [isTimerPickerOpen, setIsTimerPickerOpen] = useState(false);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    seek(val);
  };

  const speeds = [0.75, 1, 1.25, 1.5, 2];
  const timerOptions = [10, 15, 20, 30, 45, 60];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md mx-auto bg-emerald-950 border-t-2 border-amber-500/40 rounded-t-3xl shadow-2xl p-5 pb-8 text-emerald-50 max-h-[92vh] overflow-y-auto no-scrollbar">
        {/* Drag Handle & Close */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-emerald-900/80 text-emerald-300 hover:text-white flex items-center justify-center transition active:scale-90"
          >
            <ChevronDown size={22} />
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-800 text-[11px] font-semibold text-amber-300">
            <Sparkles size={12} />
            <span>Unified Player • تمام میڈیا پلیئر</span>
          </div>

          {/* Quick Image Customizer Icon */}
          <button
            onClick={onOpenImageEditor}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-[11px] font-semibold transition active:scale-95"
            title="Edit Player Cover Image"
          >
            <ImageIcon size={14} />
            <span>Edit Cover</span>
          </button>
        </div>

        {/* Central Rotating Album Disc with Player Cover */}
        <div className="relative my-4 flex flex-col items-center">
          <div
            onClick={onOpenImageEditor}
            className="relative w-52 h-52 rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl shadow-amber-400/20 cursor-pointer group"
            title="Click to change player image"
          >
            <img
              src={effectiveCover}
              alt={activeTrack.title}
              className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : ''}`}
            />
            {/* Center vinyl spindle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-950 border-4 border-amber-400 shadow-inner" />

            {/* Hover Edit Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
              <ImageIcon size={28} className="text-amber-400 mb-1" />
              <span className="text-xs font-bold bg-emerald-950/90 px-3 py-1 rounded-full border border-amber-400/40">
                Change Cover Image
              </span>
            </div>

            {isLoading && (
              <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-sm flex items-center justify-center">
                <span className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
              </div>
            )}
          </div>

          {/* Track Category Badge */}
          <div className="mt-3 flex items-center gap-2">
            {activeTrack.categoryBadge && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                {activeTrack.categoryBadge}
              </span>
            )}

            {/* Watch Video Button if video available */}
            {activeTrack.videoUrl && (
              <button
                onClick={() => openVideoWatch(activeTrack.videoUrl!, activeTrack.title, activeTrack.subtitle)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold hover:bg-rose-500/30 transition active:scale-95"
              >
                <Video size={13} className="text-rose-400" />
                <span>Watch Video</span>
              </button>
            )}
          </div>
        </div>

        {/* Track Title & Urdu Subtitle */}
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-white font-display flex items-center justify-center gap-2">
            <span>{activeTrack.title}</span>
            {activeTrack.arabicTitle && (
              <span className="font-arabic text-amber-300 text-base">
                {activeTrack.arabicTitle}
              </span>
            )}
          </h2>

          <p className="text-xs text-emerald-300 mt-1">
            {activeTrack.subtitle}
          </p>

          {activeTrack.urduTitle && (
            <p className="text-xs text-amber-300 font-arabic mt-1">
              {activeTrack.urduTitle}
            </p>
          )}

          {/* Special Quran Voice Badge */}
          {activeTrack.type === 'quran' && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900 border border-emerald-800 text-[11px] text-emerald-200">
              <Mic size={12} className="text-amber-400" />
              <span>Urdu Audio: </span>
              <strong className="text-amber-300 font-medium">Miraj-ul-Din Khan (معراج الدین خان)</strong>
            </div>
          )}
        </div>

        {/* Progress Bar & Seek */}
        <div className="mb-4">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeekChange}
            className="w-full accent-amber-400 h-2 rounded-full cursor-pointer bg-emerald-900"
          />
          <div className="flex justify-between text-xs text-emerald-300 font-mono mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Controls Row: Prev, Rewind 15s, Play/Pause, Forward 15s, Next */}
        <div className="flex items-center justify-center gap-4 mb-5">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-emerald-900 text-emerald-200 hover:text-white hover:bg-emerald-800 flex items-center justify-center transition active:scale-90"
            title="Previous / Restart"
          >
            <SkipBack size={18} />
          </button>

          <button
            onClick={() => seek(Math.max(0, currentTime - 10))}
            className="w-10 h-10 rounded-full bg-emerald-900 text-emerald-300 hover:text-white flex items-center justify-center transition active:scale-90 text-xs font-bold font-mono"
            title="Rewind 10s"
          >
            -10s
          </button>

          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 flex items-center justify-center shadow-xl shadow-amber-400/40 hover:scale-105 active:scale-95 transition"
          >
            {isPlaying ? (
              <Pause size={28} fill="currentColor" />
            ) : (
              <Play size={28} fill="currentColor" className="ml-1" />
            )}
          </button>

          <button
            onClick={() => seek(Math.min(duration, currentTime + 10))}
            className="w-10 h-10 rounded-full bg-emerald-900 text-emerald-300 hover:text-white flex items-center justify-center transition active:scale-90 text-xs font-bold font-mono"
            title="Forward 10s"
          >
            +10s
          </button>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-emerald-900 text-emerald-200 hover:text-white hover:bg-emerald-800 flex items-center justify-center transition active:scale-90"
            title="Next"
          >
            <SkipForward size={18} />
          </button>
        </div>

        {/* Secondary Utility Controls */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-emerald-900">
          {/* Speed Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setIsSpeedMenuOpen(!isSpeedMenuOpen);
                setIsTimerPickerOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 text-xs font-semibold border border-emerald-800 transition active:scale-95"
            >
              <Sliders size={14} className="text-amber-400" />
              <span>{playbackSpeed}x Speed</span>
            </button>

            {isSpeedMenuOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-32 bg-emerald-900 border border-emerald-700 rounded-xl shadow-xl overflow-hidden p-1 z-20">
                {speeds.map(s => (
                  <button
                    key={s}
                    onClick={() => {
                      changeSpeed(s);
                      setIsSpeedMenuOpen(false);
                    }}
                    className={`w-full py-1.5 text-xs rounded-lg text-center transition ${
                      playbackSpeed === s ? 'bg-amber-400 text-emerald-950 font-bold' : 'text-emerald-200 hover:bg-emerald-800'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sleep Timer Button */}
          <div className="relative">
            <button
              onClick={() => {
                setIsTimerPickerOpen(!isTimerPickerOpen);
                setIsSpeedMenuOpen(false);
              }}
              className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition active:scale-95 ${
                isTimerActive
                  ? 'bg-amber-400 text-emerald-950 font-bold border-amber-400'
                  : 'bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 border-emerald-800'
              }`}
            >
              <Clock size={14} />
              <span>
                {isTimerActive
                  ? `${Math.floor(timerRemainingSeconds / 60)}m left`
                  : 'Sleep Timer'}
              </span>
            </button>

            {isTimerPickerOpen && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 bg-emerald-900 border border-emerald-700 rounded-xl shadow-xl p-2 z-20">
                <p className="text-[11px] font-bold text-amber-300 mb-1 text-center font-arabic">آٹو اسٹاپ ٹائمر</p>
                <div className="grid grid-cols-2 gap-1 mb-2">
                  {timerOptions.map(min => (
                    <button
                      key={min}
                      onClick={() => {
                        startTimer(min, 'continue_last');
                        setIsTimerPickerOpen(false);
                      }}
                      className="py-1 text-xs rounded-lg bg-emerald-950 text-emerald-200 hover:bg-emerald-800 text-center font-mono"
                    >
                      {min} Mins
                    </button>
                  ))}
                </div>
                {isTimerActive && (
                  <button
                    onClick={() => {
                      stopTimer();
                      setIsTimerPickerOpen(false);
                    }}
                    className="w-full py-1 text-[11px] font-bold text-rose-400 hover:bg-rose-500/10 rounded"
                  >
                    Cancel Timer
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Change Qari / Reciter */}
          <button
            onClick={onOpenQariModal}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 text-xs font-semibold border border-emerald-800 transition active:scale-95"
          >
            <Mic size={14} className="text-amber-400" />
            <span>Qaris</span>
          </button>
        </div>
      </div>
    </div>
  );
};
