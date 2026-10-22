import React from 'react';
import { Check, Volume2, Sparkles, X } from 'lucide-react';
import { QARIS, Qari } from '../data/qaris';

interface QariSelectorModalProps {
  isOpen: boolean;
  currentQari: Qari;
  onSelectQari: (qari: Qari) => void;
  onClose: () => void;
}

export const QariSelectorModal: React.FC<QariSelectorModalProps> = ({
  isOpen,
  currentQari,
  onSelectQari,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl bg-emerald-950 border border-emerald-700 p-5 text-white shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-emerald-800">
          <div>
            <h3 className="font-bold text-base font-display">Select Reciter (Qari)</h3>
            <p className="text-xs text-emerald-300/80">World-renowned Quran reciters</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-emerald-900 text-emerald-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {QARIS.map(qari => {
            const isSelected = currentQari.id === qari.id;

            return (
              <button
                key={qari.id}
                onClick={() => {
                  onSelectQari(qari);
                  onClose();
                }}
                className={`w-full p-3 rounded-2xl border text-left transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400/80 shadow-md shadow-amber-500/10'
                    : 'bg-emerald-900/40 border-emerald-800/60 hover:bg-emerald-900/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={qari.image}
                    alt={qari.name}
                    className="w-11 h-11 rounded-xl object-cover border border-emerald-700 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{qari.name}</span>
                    </div>
                    <div className="font-arabic text-xs text-amber-300 font-normal">
                      {qari.arabicName}
                    </div>
                    <div className="text-[10px] text-emerald-400/80 mt-0.5">
                      {qari.style} &bull; {qari.country}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">
                    <Check size={14} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
