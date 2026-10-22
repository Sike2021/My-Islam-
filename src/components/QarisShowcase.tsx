import React from 'react';
import { Volume2, Play, Pause, Check, Globe, Sparkles } from 'lucide-react';
import { QARIS, Qari } from '../data/qaris';

interface QarisShowcaseProps {
  currentQari: Qari;
  isPlaying: boolean;
  onSelectQari: (qari: Qari) => void;
  onTogglePlay: () => void;
}

export const QarisShowcase: React.FC<QarisShowcaseProps> = ({
  currentQari,
  isPlaying,
  onSelectQari,
  onTogglePlay,
}) => {
  return (
    <div className="space-y-4 pb-6">
      <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-950 border border-emerald-800 p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30">
            <Volume2 size={18} />
          </div>
          <div>
            <h2 className="font-bold text-base text-white font-display">Renowned Quran Qaris</h2>
            <p className="text-xs text-emerald-300/80">Crystal-clear Murattal recitations</p>
          </div>
        </div>
        <p className="text-xs text-emerald-300/90 leading-relaxed">
          Select any Qari to listen to their recitation throughout the Auto Timer, Quran Reader, and Offline Mode.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {QARIS.map(qari => {
          const isSelected = currentQari.id === qari.id;

          return (
            <div
              key={qari.id}
              className={`p-4 rounded-3xl border transition flex items-center justify-between ${
                isSelected
                  ? 'bg-emerald-900/80 border-amber-400/80 shadow-lg shadow-amber-500/10'
                  : 'bg-emerald-900/30 border-emerald-800/60 hover:bg-emerald-900/50'
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 pr-3">
                <img
                  src={qari.image}
                  alt={qari.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-emerald-700 shadow-md shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white">{qari.name}</h3>
                    {isSelected && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-emerald-950 font-bold">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="font-arabic text-sm text-amber-300 font-normal mt-0.5">
                    {qari.arabicName}
                  </div>
                  <div className="text-[11px] text-emerald-300/80 mt-1 flex items-center gap-2">
                    <span>{qari.style}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Globe size={10} />
                      {qari.country}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                {isSelected ? (
                  <button
                    onClick={onTogglePlay}
                    className="w-10 h-10 rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20 active:scale-90 transition"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectQari(qari)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-950 hover:bg-amber-500 hover:text-emerald-950 border border-emerald-700 text-emerald-200 text-xs font-semibold active:scale-95 transition"
                  >
                    Select
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
