import React, { useState } from 'react';
import { SURAHS_DATA, SurahItem } from '../data/surahs';
import { Scroll, Sparkles, BookOpen, Volume2, VolumeX, Copy, Check, X, Maximize2, ChevronRight, Image as ImageIcon } from 'lucide-react';

export const SurahsView: React.FC = () => {
  const [selectedSurah, setSelectedSurah] = useState<SurahItem | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const filteredSurahs = selectedSurah ? [selectedSurah] : SURAHS_DATA.filter((s) => {
    if (filterType === 'all') return true;
    if (filterType === 'Meccan') return s.revelationType === 'Meccan';
    if (filterType === 'Medinan') return s.revelationType === 'Medinan';
    if (filterType === 'Protection') return s.id.includes('falaq') || s.id.includes('nas') || s.id.includes('kursi') || s.id.includes('baqarah');
    return true;
  });

  const handleOpenReader = (surah: SurahItem) => {
    setSelectedSurah(surah);
    setIsImageModalOpen(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleCloseReader = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
    setSelectedSurah(null);
  };

  const handleToggleAudio = () => {
    if (!selectedSurah || !('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(selectedSurah.keyPassageArabic);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleCopySurah = () => {
    if (!selectedSurah) return;
    const text = `${selectedSurah.nameEnglish} (${selectedSurah.nameArabic}) - ${selectedSurah.meaning}\n\nArabic:\n${selectedSurah.keyPassageArabic}\n\nUrdu:\n${selectedSurah.urduTranslation}\n\nEnglish:\n${selectedSurah.englishTranslation}\n\nVirtue: ${selectedSurah.virtue}\nFrom Sike's Perspective on Islam`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#033126] via-[#022119] to-[#01140e] border border-amber-500/35 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
            <Scroll className="w-4 h-4 text-amber-400" />
            <span>Sacred Surahs & Quranic Verses</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Surah Directory & Recitation Sanctuary
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/85 leading-relaxed">
            Read, reflect upon, and listen to foundational Surahs and Ayahs—including Ayat al-Kursi, Amanar-Rasool (Last 2 verses of Al-Baqarah), Surah Al-Mulk, Yasin, and the 3 Quls, accompanied by authentic Mushaf scripture sheets.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      {!selectedSurah && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer whitespace-nowrap shrink-0 ${
              filterType === 'all'
                ? 'bg-amber-500 text-emerald-950 font-semibold'
                : 'bg-[#032219] text-emerald-200/80 hover:text-white border border-emerald-800/60'
            }`}
          >
            All Surahs ({SURAHS_DATA.length})
          </button>
          <button
            onClick={() => setFilterType('Protection')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer whitespace-nowrap shrink-0 ${
              filterType === 'Protection'
                ? 'bg-amber-500 text-emerald-950 font-semibold'
                : 'bg-[#032219] text-emerald-200/80 hover:text-white border border-emerald-800/60'
            }`}
          >
            Protection & Night Recitations
          </button>
          <button
            onClick={() => setFilterType('Meccan')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer whitespace-nowrap shrink-0 ${
              filterType === 'Meccan'
                ? 'bg-amber-500 text-emerald-950 font-semibold'
                : 'bg-[#032219] text-emerald-200/80 hover:text-white border border-emerald-800/60'
            }`}
          >
            Meccan Surahs (مكية)
          </button>
          <button
            onClick={() => setFilterType('Medinan')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer whitespace-nowrap shrink-0 ${
              filterType === 'Medinan'
                ? 'bg-amber-500 text-emerald-950 font-semibold'
                : 'bg-[#032219] text-emerald-200/80 hover:text-white border border-emerald-800/60'
            }`}
          >
            Medinan Surahs (مدنية)
          </button>
        </div>
      )}

      {/* Grid of Surahs */}
      {!selectedSurah ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSurahs.map((surah) => (
            <div
              key={surah.id}
              onClick={() => handleOpenReader(surah)}
              className="group rounded-2xl bg-[#04271e] hover:bg-[#063529] border border-emerald-800/60 hover:border-amber-500/40 p-5 transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Unboxed Metadata */}
                <div className="flex items-center justify-between text-xs text-amber-300/80 mb-2 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-amber-400 font-bold">
                      {surah.number > 0 ? `Surah ${surah.number}` : 'Ayah'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{surah.revelationType}</span>
                    <span aria-hidden="true">·</span>
                    <span>{surah.versesCount} Ayahs</span>
                  </div>
                  <span className="font-arabic text-base text-amber-400 font-bold">
                    {surah.nameArabic}
                  </span>
                </div>

                {/* Name English & Meaning */}
                <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                  {surah.nameEnglish}
                </h3>
                <p className="text-xs text-emerald-300/70 italic mb-3">
                  "{surah.meaning}"
                </p>

                {/* Arabic Calligraphy Snippet */}
                <div className="bg-[#021812] rounded-xl p-3.5 mb-3 border border-emerald-900/80 text-right">
                  <p className="font-arabic text-xl text-amber-200/90 leading-relaxed truncate" dir="rtl">
                    {surah.keyPassageArabic}
                  </p>
                </div>

                {/* Virtue Summary */}
                <p className="text-xs text-emerald-200/80 line-clamp-2 leading-relaxed">
                  {surah.virtue}
                </p>
              </div>

              {/* Bottom footer */}
              <div className="mt-4 pt-3 border-t border-emerald-900/60 flex items-center justify-between text-xs text-emerald-400/80">
                <div className="flex items-center gap-1.5">
                  {surah.sourceImage && (
                    <span className="flex items-center gap-1 text-[11px] text-amber-400/90 font-medium">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Mushaf Print Sheet</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-amber-400 font-medium group-hover:translate-x-1 transition-transform">
                  <span>Read Full Surah</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Detailed Surah Reading Sanctuary */
        <div className="rounded-3xl bg-[#03231b] border border-amber-500/40 p-6 sm:p-8 space-y-6 shadow-2xl">
          
          {/* Top Reader Controls */}
          <div className="flex items-center justify-between pb-4 border-b border-emerald-800/80">
            <button
              onClick={handleCloseReader}
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-white bg-emerald-900/50 hover:bg-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-700/60 transition cursor-pointer"
            >
              <span>← Back to All Surahs</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleAudio}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  isPlaying
                    ? 'bg-amber-500 text-emerald-950 font-bold'
                    : 'bg-emerald-900/60 hover:bg-emerald-800 text-amber-300 border border-emerald-700/60'
                }`}
              >
                {isPlaying ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                    <span>Stop Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Listen Arabic Recitation</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopySurah}
                className="p-2 rounded-lg text-emerald-300 hover:text-white bg-emerald-900/40 hover:bg-emerald-900/80 transition cursor-pointer"
                title="Copy Surah Text"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Surah Header Block */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-amber-300 font-medium">
              <span>{selectedSurah.revelationType}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedSurah.versesCount} Ayahs</span>
              <span aria-hidden="true">·</span>
              <span>{selectedSurah.meaning}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
              {selectedSurah.nameEnglish}
            </h2>
            <p className="font-arabic text-3xl sm:text-5xl text-amber-300 py-1" dir="rtl">
              {selectedSurah.nameArabic}
            </p>
          </div>

          {/* Optional Mushaf Source Sheet Box */}
          {selectedSurah.sourceImage && (
            <div className="rounded-2xl bg-[#021711] border border-amber-500/30 p-4">
              <div className="flex items-center justify-between mb-3 text-xs text-amber-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>Original Mushaf Script Sheet</span>
                </span>
                <button
                  onClick={() => setIsImageModalOpen(!isImageModalOpen)}
                  className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 p-1 rounded"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{isImageModalOpen ? 'Shrink View' : 'Expand Mushaf Image'}</span>
                </button>
              </div>

              <div className={`overflow-hidden rounded-xl bg-black border border-emerald-900 ${
                isImageModalOpen ? 'max-h-[700px] overflow-auto' : 'max-h-[360px]'
              }`}>
                <img
                  src={selectedSurah.sourceImage}
                  alt={selectedSurah.nameEnglish}
                  className="w-full object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}

          {/* Large Arabic Mushaf Typography */}
          <div className="rounded-2xl bg-gradient-to-b from-[#021711] to-[#01140e] border border-amber-500/40 p-6 sm:p-8 text-right shadow-inner">
            <p className="font-arabic text-2xl sm:text-4xl text-amber-200 leading-[2.6] select-text" dir="rtl">
              {selectedSurah.keyPassageArabic}
            </p>
          </div>

          {/* Transliteration */}
          <div className="bg-[#021d16] rounded-xl p-4 border border-emerald-900/60">
            <h4 className="text-xs font-bold text-amber-400 mb-1">Transliteration</h4>
            <p className="text-xs sm:text-sm text-emerald-100 font-mono leading-relaxed">
              {selectedSurah.transliterationSnippet}
            </p>
          </div>

          {/* Urdu Translation */}
          <div className="bg-[#021d16] rounded-xl p-5 border border-emerald-900/60 text-right">
            <h4 className="text-xs font-bold text-amber-400 mb-1 text-left">اردو ترجمہ: مولانا فتح محمد جالندھری (Fateh Muhammad Jalandhari)</h4>
            <p className="text-sm sm:text-base text-emerald-50 leading-loose" dir="rtl">
              {selectedSurah.urduTranslation}
            </p>
          </div>

          {/* English Translation */}
          <div className="bg-[#021d16] rounded-xl p-5 border border-emerald-900/60">
            <h4 className="text-xs font-bold text-amber-400 mb-1">English Translation</h4>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed italic">
              "{selectedSurah.englishTranslation}"
            </p>
          </div>

          {/* Virtue & Hadith Reference */}
          <div className="bg-amber-950/20 rounded-xl p-4 border border-amber-500/30 space-y-1.5 text-xs">
            <h4 className="font-bold text-amber-300">Virtue & Prophetic Hadith:</h4>
            <p className="text-emerald-100/90 leading-relaxed">
              {selectedSurah.virtue}
            </p>
            <p className="text-emerald-400/80 pt-1">
              <strong className="text-amber-400">Recitation Tips:</strong> {selectedSurah.recitationTips}
            </p>
          </div>

        </div>
      )}
    </div>
  );
};
