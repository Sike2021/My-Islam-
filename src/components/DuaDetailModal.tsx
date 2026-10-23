import React, { useState, useEffect } from 'react';
import { DuaItem } from '../data/duas';
import {
  X,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Heart,
  Maximize2,
  RotateCcw,
  Sparkles,
  BookOpen,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DuaDetailModalProps {
  dua: DuaItem | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const DuaDetailModal: React.FC<DuaDetailModalProps> = ({
  dua,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'both'>('both');

  useEffect(() => {
    setCount(0);
    setActiveImageIndex(0);
    setIsZoomed(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, [dua]);

  if (!isOpen || !dua) return null;

  const handleCopy = () => {
    const textToCopy = `${dua.title}\n\nArabic:\n${dua.arabicText}\n\nTransliteration:\n${dua.transliteration}\n\nUrdu:\n${dua.urduTranslation}\n\nEnglish:\n${dua.englishTranslation}\n\nReference: ${dua.reference}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleIncrement = () => {
    const nextCount = count + 1;
    setCount(nextCount);

    // Haptic feedback
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(40);
    }

    // Celebrate when target reached
    if (nextCount === dua.recommendedCount) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#f59e0b', '#fbbf24', '#10b981', '#34d399'],
        });
      } catch {
        // silent fallback
      }
    }
  };

  const handleResetCount = () => {
    setCount(0);
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(dua.arabicText);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85; // slower, reverent recitation pace
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#03241b] border border-amber-500/30 text-white shadow-2xl overflow-hidden my-auto">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-800/60 bg-[#021a14]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-sm sm:text-base font-bold text-amber-100 truncate max-w-[240px] sm:max-w-md">
                {dua.title}
              </h2>
              <div className="text-[11px] text-emerald-300/80 font-medium">
                <span>{dua.category}</span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span>Target: {dua.recommendedCount}x</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(dua.id)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'text-emerald-300 hover:text-white hover:bg-emerald-900/50'
              }`}
              title="Bookmark this Dua"
            >
              <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900/50 transition-colors"
              title="Copy Arabic & Translations"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-900/50 transition-colors ml-1"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Switcher Controls (Text, Original Image, or Both) */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[#021f18] border-b border-emerald-900/80 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-300/70 mr-1 hidden sm:inline">View:</span>
            <button
              onClick={() => setActiveTab('both')}
              className={`px-3 py-1 rounded-md transition-all font-medium ${
                activeTab === 'both'
                  ? 'bg-amber-500 text-emerald-950 shadow-sm'
                  : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`px-3 py-1 rounded-md transition-all font-medium ${
                activeTab === 'text'
                  ? 'bg-amber-500 text-emerald-950 shadow-sm'
                  : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              Text & Audio
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`px-3 py-1 rounded-md transition-all font-medium ${
                activeTab === 'image'
                  ? 'bg-amber-500 text-emerald-950 shadow-sm'
                  : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              Original Source Sheet
            </button>
          </div>

          {/* Audio Recitation Trigger */}
          <button
            onClick={handleToggleSpeech}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                : 'text-emerald-200/90 hover:text-amber-300 bg-emerald-900/40'
            }`}
          >
            {isPlaying ? (
              <>
                <VolumeX className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                <span>Stop Recitation</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Listen Arabic</span>
              </>
            )}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className={`grid gap-6 ${activeTab === 'both' ? 'lg:grid-cols-12' : 'grid-cols-1'}`}>
            
            {/* Left/Main Column: Typography, Translations, Guidelines */}
            {(activeTab === 'both' || activeTab === 'text') && (
              <div className={activeTab === 'both' ? 'lg:col-span-7 space-y-5' : 'space-y-5'}>
                
                {/* Arabic Calligraphy Frame */}
                <div className="relative rounded-2xl bg-gradient-to-b from-[#021711] to-[#01140e] border border-amber-500/40 p-6 text-right shadow-inner">
                  <div className="text-right">
                    <p className="font-arabic text-2xl sm:text-3xl text-amber-200 leading-[2.4] select-text">
                      {dua.arabicText}
                    </p>
                  </div>
                  {dua.arabicTitle && (
                    <div className="mt-3 pt-3 border-t border-emerald-900/70 text-left">
                      <span className="text-xs text-amber-400/80 font-arabic">{dua.arabicTitle}</span>
                    </div>
                  )}
                </div>

                {/* Transliteration & Roman Urdu */}
                <div className="space-y-3 bg-[#021f18] rounded-xl p-4 border border-emerald-800/60">
                  <div>
                    <h4 className="text-xs font-semibold text-amber-300 mb-1">English Transliteration</h4>
                    <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-mono">
                      {dua.transliteration}
                    </p>
                  </div>

                  {dua.romanUrdu && (
                    <div className="pt-2 border-t border-emerald-900/50">
                      <h4 className="text-xs font-semibold text-amber-300 mb-1">Roman Urdu Tarjuma</h4>
                      <p className="text-xs sm:text-sm text-amber-100/90 italic leading-relaxed">
                        "{dua.romanUrdu}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Urdu Translation */}
                <div className="bg-[#021f18] rounded-xl p-4 border border-emerald-800/60 text-right">
                  <h4 className="text-xs font-semibold text-amber-300 mb-1 text-left">اردو ترجمہ (Urdu Translation)</h4>
                  <p className="text-sm sm:text-base text-emerald-50 leading-loose" dir="rtl">
                    {dua.urduTranslation}
                  </p>
                </div>

                {/* English Translation */}
                <div className="bg-[#021f18] rounded-xl p-4 border border-emerald-800/60">
                  <h4 className="text-xs font-semibold text-amber-300 mb-1">English Translation</h4>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    {dua.englishTranslation}
                  </p>
                </div>

                {/* Practical Guidance / "Kaise parhni hai" */}
                {dua.instructions && dua.instructions.length > 0 && (
                  <div className="bg-amber-950/20 rounded-xl p-4 border border-amber-500/30">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-2.5">
                      <Info className="w-4 h-4" />
                      <span>Kaise Parhni Hai (How to Recite & Practice):</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-emerald-100/90">
                      {dua.instructions.map((inst, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold shrink-0">•</span>
                          <span>{inst}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Reference & Virtues */}
                <div className="text-xs text-emerald-300/80 bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-900/60 space-y-1.5">
                  <p><strong className="text-amber-400">Reference:</strong> {dua.reference}</p>
                  <p><strong className="text-amber-400">Virtue / Hadith:</strong> {dua.virtue}</p>
                </div>
              </div>
            )}

            {/* Right Column: User's Original Source Images Lightbox */}
            {(activeTab === 'both' || activeTab === 'image') && (
              <div className={activeTab === 'both' ? 'lg:col-span-5 space-y-4' : 'space-y-4'}>
                <div className="rounded-2xl bg-[#021711] border border-amber-500/30 p-4">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-semibold text-amber-300">
                      Authentic Source Sheet ({activeImageIndex + 1}/{dua.images.length})
                    </span>
                    <button
                      onClick={() => setIsZoomed(!isZoomed)}
                      className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 p-1 rounded"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>{isZoomed ? 'Reset Zoom' : 'Full Preview'}</span>
                    </button>
                  </div>

                  {/* Primary Image View */}
                  <div className={`overflow-hidden rounded-xl bg-black border border-emerald-900 transition-all ${
                    isZoomed ? 'max-h-[600px] overflow-auto' : 'max-h-[380px]'
                  }`}>
                    <img
                      src={dua.images[activeImageIndex].src}
                      alt={dua.images[activeImageIndex].caption}
                      className={`w-full object-contain mx-auto ${isZoomed ? 'scale-125 origin-top' : ''}`}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Caption */}
                  <p className="mt-2.5 text-[11px] text-emerald-300/70 text-center italic">
                    {dua.images[activeImageIndex].caption}
                  </p>

                  {/* Thumbnails if multiple images */}
                  {dua.images.length > 1 && (
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-emerald-900/60">
                      {dua.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`h-14 w-20 rounded-lg overflow-hidden border transition-all ${
                            activeImageIndex === idx
                              ? 'border-amber-400 ring-2 ring-amber-400/30'
                              : 'border-emerald-800 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img.src}
                            alt=""
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom: Interactive Digital Tasbeeh / Repetition Counter */}
        <div className="px-6 py-4 bg-[#021812] border-t border-emerald-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-xs text-emerald-300/80 block">Current Recitation:</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono text-amber-400">{count}</span>
                <span className="text-xs text-emerald-400 font-mono">/ {dua.recommendedCount}</span>
              </div>
            </div>

            {count >= dua.recommendedCount && (
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Target Completed!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetCount}
              className="p-2 rounded-xl text-emerald-400 hover:text-white hover:bg-emerald-900/50 border border-emerald-800/60 transition"
              title="Reset Counter"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleIncrement}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold text-sm shadow-lg shadow-amber-950/40 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Tap to Count (+1)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
