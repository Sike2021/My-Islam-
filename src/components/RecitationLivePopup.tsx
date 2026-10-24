import React, { useState, useRef } from 'react';
import { Volume2, Sparkles, ChevronRight, Mic, SkipForward, Play, Pause } from 'lucide-react';
import { SurahMeta, OFFLINE_SURAHS, AyahItem } from '../data/quranMetadata';
import { Qari, getAyahUrduAudioUrl } from '../data/qaris';
import { ActivePhase } from '../hooks/useQuranAudio';

interface RecitationLivePopupProps {
  isPlaying: boolean;
  currentSurah: SurahMeta;
  currentAyahNumber: number;
  activePhase: ActivePhase;
  currentQari: Qari;
  onOpenReaderToAyah: (surahNumber: number, ayahNumber: number) => void;
  onTogglePlay?: () => void;
  onNextAyah?: () => void;
}

export const RecitationLivePopup: React.FC<RecitationLivePopupProps> = ({
  isPlaying,
  currentSurah,
  currentAyahNumber,
  activePhase,
  currentQari,
  onOpenReaderToAyah,
  onTogglePlay,
  onNextAyah,
}) => {
  if (!isPlaying) return null;

  // Retrieve current Ayah from offline cache or default
  const offlineList = OFFLINE_SURAHS[currentSurah.number] || [];
  const currentAyah = offlineList.find(a => a.numberInSurah === currentAyahNumber);

  const arabicText = currentAyah?.arabicText || `الْآيَةُ ${currentAyahNumber} مِنْ سُورَةِ ${currentSurah.nameArabic}`;
  const englishText = currentAyah?.translationEnglish || `[Reciting Ayah ${currentAyahNumber} of Surah ${currentSurah.nameEnglish} - ${currentSurah.nameTranslation}]`;
  const urduText = currentAyah?.translationUrdu || `سورة ${currentSurah.nameArabic} - آیت ${currentAyahNumber} کا اردو ترجمہ`;

  return (
    <div className="sticky top-14 z-30 px-3 pt-1 pb-2 transition-all duration-300 animate-in slide-in-from-top-2">
      <div
        onClick={() => onOpenReaderToAyah(currentSurah.number, currentAyahNumber)}
        className="rounded-2xl bg-gradient-to-r from-emerald-900/95 via-emerald-900/95 to-emerald-950/95 backdrop-blur-md border border-amber-500/40 p-3 shadow-xl cursor-pointer hover:border-amber-400 transition group"
      >
        {/* Top Header Row with Active Phase Indicator */}
        <div className="flex items-center justify-between text-[11px] mb-1.5 pb-1 border-b border-emerald-800/60">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
              {activePhase === 'arabic' ? '1. Arabic Recitation' : '2. Urdu Translation Voice'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[10px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
              <span>Surah {currentSurah.number}: {currentSurah.nameEnglish}</span>
              <span>&bull;</span>
              <span className="text-amber-300 font-mono font-bold">Ayah {currentAyahNumber}</span>
            </div>

            <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-semibold font-mono">
              Auto Hands-Free
            </span>
          </div>
        </div>

        {/* Exact Recited Arabic Calligraphy */}
        <div
          className={`font-arabic text-right text-lg sm:text-xl font-normal leading-relaxed drop-shadow transition-colors duration-300 ${
            activePhase === 'arabic'
              ? 'text-amber-300 font-bold'
              : 'text-emerald-100'
          }`}
        >
          {arabicText}
        </div>

        {/* BOTH TRANSLATIONS AT THE EXACT SAME TIME: Urdu + English */}
        <div className="mt-2 pt-1.5 border-t border-emerald-800/40 space-y-1">
          {/* Urdu Translation */}
          <div
            className={`text-xs text-right font-arabic leading-snug p-1.5 rounded-xl transition duration-300 ${
              activePhase === 'urdu'
                ? 'bg-amber-500/20 text-amber-200 border border-amber-400/50 font-bold'
                : 'text-amber-100/90'
            }`}
          >
            {urduText}
          </div>

          {/* English Translation */}
          <div className="text-[11px] text-emerald-200/90 font-sans leading-snug px-1">
            {englishText}
          </div>
        </div>

        {/* Footer info: Voice reciter & touch-free advancement notice */}
        <div className="mt-1.5 flex items-center justify-between text-[10px] text-emerald-400/80 pt-1 border-t border-emerald-900/50">
          <span>
            {activePhase === 'arabic' ? `Arabic: ${currentQari.name}` : 'Urdu Translation: Maulana Fateh Muhammad Jalandhri (مولانا فتح محمد جالندھری)'} &bull; advances automatically
          </span>
          <span className="flex items-center gap-0.5 text-amber-300 group-hover:underline">
            <span>Open in Reader</span>
            <ChevronRight size={11} />
          </span>
        </div>
      </div>
    </div>
  );
};
