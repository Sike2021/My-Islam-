import React, { useState } from 'react';
import { X, Image, Upload, Check, RotateCcw, Sparkles } from 'lucide-react';

export interface PresetCoverOption {
  id: string;
  name: string;
  urduName: string;
  url: string;
}

export const PRESET_PLAYER_COVERS: PresetCoverOption[] = [
  {
    id: 'kabah-night',
    name: 'Holy Ka\'bah at Dusk',
    urduName: 'کعبۃ اللہ مشرفہ',
    url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'nabawi-green-dome',
    name: 'Masjid an-Nabawi',
    urduName: 'مسجدِ نبوی و گنبدِ خضریٰ',
    url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'quran-gold-illumination',
    name: 'Sacred Gold Mushaf',
    urduName: 'سنہری مصحفِ شریف',
    url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'islamic-geometric-art',
    name: 'Emerald Arabesque Art',
    urduName: 'زمردی اسلامی نقوش',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'al-aqsa-sanctuary',
    name: 'Masjid Al-Aqsa Sanctuary',
    urduName: 'مسجدِ اقصیٰ قبلہ اول',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'spiritual-desert-night',
    name: 'Medina Starlit Night',
    urduName: 'شبِ مدینہ منورہ',
    url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=600&q=80',
  },
];

interface PlayerImageEditorModalProps {
  isOpen: boolean;
  currentCustomCover: string | null;
  defaultTrackCover: string;
  onSaveCustomCover: (url: string | null) => void;
  onClose: () => void;
}

export const PlayerImageEditorModal: React.FC<PlayerImageEditorModalProps> = ({
  isOpen,
  currentCustomCover,
  defaultTrackCover,
  onSaveCustomCover,
  onClose,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(currentCustomCover);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const activeDisplay = selectedImage || defaultTrackCover;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size is too large. Please select an image under 5MB.');
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedImage(reader.result);
        setIsUploading(false);
      }
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read image file. Please try another image.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleApply = () => {
    onSaveCustomCover(selectedImage);
    onClose();
  };

  const handleResetToDefault = () => {
    setSelectedImage(null);
    onSaveCustomCover(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-emerald-950 border border-amber-500/40 rounded-3xl shadow-2xl p-5 text-emerald-50 max-h-[92vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-800/80 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Image size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base text-white font-display">Player Image Editor</h3>
              <p className="text-xs text-amber-300 font-arabic">تبدیل تصویر پلیئر • اپنی پسندیدہ تصویر لگائیں</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-900/80 text-emerald-300 hover:text-white hover:bg-emerald-800 flex items-center justify-center transition active:scale-90"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Preview Disc */}
        <div className="flex flex-col items-center justify-center py-4 bg-emerald-900/40 rounded-2xl border border-emerald-800/60 mb-5 relative overflow-hidden">
          <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-amber-400/60 shadow-xl shadow-amber-400/10 group">
            <img
              src={activeDisplay}
              alt="Player Cover Preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent flex items-end justify-center pb-2">
              <span className="text-[11px] font-semibold bg-emerald-950/90 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                {selectedImage ? 'Custom Cover Active' : 'Default Track Cover'}
              </span>
            </div>
            {/* Center vinyl pin hole */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-emerald-950 border-2 border-amber-400" />
          </div>

          <p className="text-xs text-emerald-300 mt-3 text-center px-4">
            This image will be displayed on the Unified Player disc, mini-player, and notifications.
          </p>
        </div>

        {/* Upload Custom Image Option */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-emerald-200 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Upload size={14} className="text-amber-400" />
              Upload Image from Device (Android / PC)
            </span>
            <span className="text-[10px] text-amber-300 font-arabic">تصویر اپلوڈ کریں</span>
          </label>
          <label className="flex items-center justify-center gap-2.5 w-full py-3 px-4 border-2 border-dashed border-amber-400/40 hover:border-amber-400 rounded-2xl bg-emerald-900/40 hover:bg-emerald-900/60 cursor-pointer transition text-center group active:scale-98">
            <Upload size={18} className="text-amber-400 group-hover:animate-bounce" />
            <span className="text-xs font-semibold text-emerald-100">
              {isUploading ? 'Loading Image...' : 'Choose Photo / Capture with Camera'}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          {errorMessage && (
            <p className="text-xs text-rose-400 mt-1.5">{errorMessage}</p>
          )}
        </div>

        {/* Curated Islamic Artwork Presets */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles size={14} />
              Or Pick from Curated Islamic Art
            </span>
            <span className="text-[10px] text-emerald-300 font-arabic">اسلامی آرٹ کورز</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {PRESET_PLAYER_COVERS.map(preset => {
              const isSelected = selectedImage === preset.url;
              return (
                <button
                  key={preset.id}
                  onClick={() => setSelectedImage(preset.url)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition active:scale-95 group ${
                    isSelected
                      ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-lg'
                      : 'border-emerald-800/80 hover:border-emerald-700 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                    <span className="text-[10px] font-bold text-white truncate drop-shadow">
                      {preset.name}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center shadow">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-emerald-900">
          <button
            onClick={handleResetToDefault}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-emerald-300 text-xs font-semibold border border-emerald-800 transition shrink-0 active:scale-95"
            title="Reset to default track cover"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          <button
            onClick={handleApply}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-bold text-xs shadow-lg shadow-amber-400/20 flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <Check size={16} />
            <span>Apply to Unified Player</span>
          </button>
        </div>
      </div>
    </div>
  );
};
