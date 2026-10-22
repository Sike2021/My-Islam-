import React from 'react';
import { POPULAR_CITIES, CityOption } from '../utils/prayerTimes';
import { MapPin, X, Check } from 'lucide-react';

interface CitySelectorModalProps {
  isOpen: boolean;
  selectedCity: CityOption;
  onSelectCity: (city: CityOption) => void;
  onClose: () => void;
}

export const CitySelectorModal: React.FC<CitySelectorModalProps> = ({
  isOpen,
  selectedCity,
  onSelectCity,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl bg-emerald-950 border border-emerald-700 p-5 text-white shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-emerald-800">
          <div className="flex items-center gap-2">
            <MapPin className="text-amber-400 w-5 h-5" />
            <div>
              <h3 className="font-bold text-base font-display">Select Location</h3>
              <p className="text-xs text-emerald-300/80">For accurate Fajr & prayer-linked recitation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-emerald-900 text-emerald-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
          {POPULAR_CITIES.map(city => {
            const isSelected = selectedCity.name === city.name;
            return (
              <button
                key={city.name}
                onClick={() => {
                  onSelectCity(city);
                  onClose();
                }}
                className={`w-full p-3 rounded-2xl border text-left transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-white font-semibold'
                    : 'bg-emerald-900/40 border-emerald-800/60 hover:bg-emerald-900/80 text-emerald-200'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white">{city.name}</div>
                  <div className="text-[11px] text-emerald-400/80">{city.country}</div>
                </div>
                {isSelected && (
                  <Check size={16} className="text-amber-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
