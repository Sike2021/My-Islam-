import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  BookOpen,
  Volume2,
  Bookmark,
  ChevronDown,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Languages,
  Check,
  Eye,
  Video,
  Mic,
  VolumeX,
  FastForward,
} from 'lucide-react';
import {
  SURAHS_METADATA,
  OFFLINE_SURAHS,
  AyahItem,
} from '../data/quranMetadata';
import { ActivePhase, RecitationSequenceMode } from '../hooks/useQuranAudio';

interface QuranReaderProps {
  selectedSurahNumber: number;
  currentPlayingSurah: number;
  currentPlayingAyah: number;
  activePhase: ActivePhase;
  sequenceMode: RecitationSequenceMode;
  isPlaying: boolean;
  onSelectSurah: (surahNumber: number) => void;
  onPlayAyah: (surahNumber: number, ayahNumber: number, phase?: ActivePhase) => void;
  onTogglePlay: () => void;
  onOpenSearchTopic?: () => void;
}

export const QuranReader: React.FC<QuranReaderProps> = ({
  selectedSurahNumber,
  currentPlayingSurah,
  currentPlayingAyah,
  activePhase,
  sequenceMode,
  isPlaying,
  onSelectSurah,
  onPlayAyah,
  onTogglePlay,
  onOpenSearchTopic,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSurahModalOpen, setIsSurahModalOpen] = useState(false);
  const [arabicFontSize, setArabicFontSize] = useState<number>(24);
  const [selectedLanguage, setSelectedLanguage] = useState<'both' | 'english' | 'urdu'>('both');
  const [surahAyahs, setSurahAyahs] = useState<AyahItem[]>([]);
  const [isLoadingAyahs, setIsLoadingAyahs] = useState(false);
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('easy_islam_ayah_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState<boolean>(false);
  const activeAyahRef = useRef<HTMLDivElement | null>(null);

  const currentMeta =
    SURAHS_METADATA.find(s => s.number === selectedSurahNumber) || SURAHS_METADATA[0];

  // Auto-scroll to active reciting ayah hands-free
  useEffect(() => {
    if (isPlaying && currentPlayingSurah === selectedSurahNumber && activeAyahRef.current) {
      activeAyahRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentPlayingAyah, currentPlayingSurah, isPlaying, selectedSurahNumber]);

  // Load verses with Arabic, Urdu, and English
  useEffect(() => {
    let isCancelled = false;

    const loadAyahs = async () => {
      if (OFFLINE_SURAHS[selectedSurahNumber]) {
        setSurahAyahs(OFFLINE_SURAHS[selectedSurahNumber]);
        return;
      }

      const cacheKey = `easy_islam_surah_text_${selectedSurahNumber}`;
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          setSurahAyahs(JSON.parse(cached));
          return;
        }
      } catch {
        // ignore
      }

      setIsLoadingAyahs(true);

      try {
        const [arabicRes, englishRes, urduRes] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/surah/${selectedSurahNumber}/quran-uthmani`),
          fetch(`https://api.alquran.cloud/v1/surah/${selectedSurahNumber}/en.sahih`),
          fetch(`https://api.alquran.cloud/v1/surah/${selectedSurahNumber}/ur.jalandhry`),
        ]);

        if (!arabicRes.ok || !englishRes.ok) {
          throw new Error('Network error fetching Quran text');
        }

        const arabicData = await arabicRes.json();
        const englishData = await englishRes.json();
        const urduData = urduRes.ok ? await urduRes.json() : null;

        const combined: AyahItem[] = arabicData.data.ayahs.map(
          (item: { numberInSurah: number; number: number; text: string; juz: number }, index: number) => ({
            numberInSurah: item.numberInSurah,
            numberInQuran: item.number,
            arabicText: item.text,
            translationEnglish: englishData.data.ayahs[index]?.text || '',
            translationUrdu:
              urduData?.data?.ayahs[index]?.text ||
              `ترجمہ سورة ${currentMeta.nameArabic} - آیت ${item.numberInSurah}`,
            juz: item.juz,
          })
        );

        if (!isCancelled) {
          setSurahAyahs(combined);
          try {
            localStorage.setItem(cacheKey, JSON.stringify(combined));
          } catch {
            // storage may be full
          }
        }
      } catch (err) {
        console.warn('Fallback generating verses:', err);
        const fallbackList: AyahItem[] = Array.from(
          { length: currentMeta.totalVerses },
          (_, i) => ({
            numberInSurah: i + 1,
            numberInQuran: 0,
            arabicText: `الْآيَةُ ${i + 1} مِنْ سُورَةِ ${currentMeta.nameArabic}`,
            translationEnglish: `Verse ${i + 1} of Surah ${currentMeta.nameEnglish} (${currentMeta.nameTranslation}).`,
            translationUrdu: `سورة ${currentMeta.nameArabic} کی آیت نمبر ${i + 1}`,
            juz: currentMeta.startJuz,
          })
        );
        if (!isCancelled) {
          setSurahAyahs(fallbackList);
        }
      } finally {
        if (!isCancelled) setIsLoadingAyahs(false);
      }
    };

    loadAyahs();

    return () => {
      isCancelled = true;
    };
  }, [selectedSurahNumber, currentMeta]);

  const toggleBookmark = (ayahNum: number) => {
    const key = `${selectedSurahNumber}:${ayahNum}`;
    setBookmarkedAyahs(prev => {
      const updated = prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key];
      try {
        localStorage.setItem('easy_islam_ayah_bookmarks', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const filteredSurahs = SURAHS_METADATA.filter(
    s =>
      s.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameArabic.includes(searchQuery) ||
      s.number.toString() === searchQuery
  );

  return (
    <div className="space-y-4 pb-6">
      {/* Top Header Card: Surah Selector & Hands-Free Audio Play */}
      <div className="rounded-3xl bg-emerald-900/40 border border-emerald-800/70 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSurahModalOpen(true)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-left transition active:scale-95 flex-1 mr-2"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 font-bold font-mono flex items-center justify-center text-xs border border-amber-500/30">
              {currentMeta.number}
            </div>
            <div className="flex-1 truncate">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{currentMeta.nameEnglish}</span>
                <span className="text-xs font-arabic text-amber-300">{currentMeta.nameArabic}</span>
              </div>
              <div className="text-[11px] text-emerald-400/80">
                {currentMeta.nameTranslation} &bull; {currentMeta.totalVerses} Ayahs
              </div>
            </div>
            <ChevronDown size={16} className="text-emerald-400" />
          </button>

          {/* Master Hands-Free Play Button (Arabic + Urdu Voice Each Ayat) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {onOpenSearchTopic && (
              <button
                onClick={onOpenSearchTopic}
                className="py-2.5 px-2.5 rounded-2xl bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 border border-emerald-700/60 font-semibold text-xs active:scale-95 transition flex items-center gap-1"
                title="Search Quran by Urdu topics (نماز, شرک, صبر, والدین...)"
              >
                <Search size={13} />
                <span className="hidden sm:inline">Search</span>
              </button>
            )}
            <button
              onClick={() => onPlayAyah(currentMeta.number, 1, 'arabic')}
              className="py-2.5 px-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-emerald-950 font-bold text-xs shadow-md shadow-amber-500/20 active:scale-90 transition flex items-center gap-1.5"
              title="Play Arabic + Urdu Translation Voice Hands-Free"
            >
              <Play size={14} fill="currentColor" />
              <span className="font-sans">Play All</span>
            </button>
          </div>
        </div>

        {/* Translation Mode & Font Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-emerald-900/60 text-xs">
          <div className="flex items-center gap-1 bg-emerald-950/80 p-1 rounded-xl border border-emerald-800/60">
            <button
              onClick={() => setSelectedLanguage('both')}
              className={`px-2 py-0.5 rounded-lg font-medium transition ${
                selectedLanguage === 'both'
                  ? 'bg-amber-500 text-emerald-950 font-bold'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              Both (Arabic + Urdu + English)
            </button>
            <button
              onClick={() => setSelectedLanguage('urdu')}
              className={`px-2 py-0.5 rounded-lg font-medium transition ${
                selectedLanguage === 'urdu'
                  ? 'bg-amber-500 text-emerald-950 font-bold'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              Urdu
            </button>
            <button
              onClick={() => setSelectedLanguage('english')}
              className={`px-2 py-0.5 rounded-lg font-medium transition ${
                selectedLanguage === 'english'
                  ? 'bg-amber-500 text-emerald-950 font-bold'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              English
            </button>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950/80 px-2 py-1 rounded-xl border border-emerald-800/60">
            <button
              onClick={() => setArabicFontSize(prev => Math.max(18, prev - 2))}
              className="px-1.5 py-0.5 text-emerald-300 hover:text-white font-bold"
              title="Decrease Font Size"
            >
              A-
            </button>
            <span className="text-[11px] font-mono text-emerald-400">{arabicFontSize}px</span>
            <button
              onClick={() => setArabicFontSize(prev => Math.min(36, prev + 2))}
              className="px-1.5 py-0.5 text-emerald-300 hover:text-white font-bold"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>
        </div>

        {/* Hands-Free Sequential Notice */}
        <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-amber-300">
            <Mic size={14} className="animate-pulse" />
            <span className="font-medium">
              Plays each verse in Arabic &rarr; Spoken Urdu Voice &rarr; Next verse automatically without touching!
            </span>
          </div>
        </div>
      </div>

      {/* Default Translator & Video/Audio Bayan Section: Maulana Fateh Muhammad Jalandhri */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-[#03231a] to-emerald-950 border border-amber-500/40 p-4 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
              <BookOpen size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30">
                  Default Urdu Translator
                </span>
                <span className="text-[10px] text-emerald-300/80 font-arabic">
                  مولانا فتح محمد جالندھری رحمہ اللہ
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-0.5">
                Surah {currentMeta.nameEnglish} &bull; تلاوت مع اردو ترجمہ
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* Audio Play Button */}
            <button
              onClick={() => onPlayAyah(currentMeta.number, 1, 'urdu')}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-900/90 hover:bg-emerald-800 text-amber-300 border border-amber-400/30 text-xs font-semibold shadow-sm transition active:scale-95 cursor-pointer"
              title="Play Urdu translation audio by Maulana Fateh Muhammad Jalandhri"
            >
              <Volume2 size={14} />
              <span>Listen Audio</span>
            </button>

            {/* Optional Toggle to Watch Video (as requested) */}
            <button
              onClick={() => setIsVideoPlayerOpen(prev => !prev)}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs shadow-md transition active:scale-95 cursor-pointer ${
                isVideoPlayerOpen
                  ? 'bg-amber-400 text-emerald-950 border border-amber-300'
                  : 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white border border-amber-400/40'
              }`}
              title="Toggle to watch video translation"
            >
              <Video size={14} />
              <span>{isVideoPlayerOpen ? 'Hide Video' : 'Watch Video'}</span>
            </button>
          </div>
        </div>

        {/* Video Player Display (Toggled on demand) */}
        {isVideoPlayerOpen && (
          <div className="pt-2 border-t border-emerald-900/80 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-amber-300/90">
              <span className="font-medium">
                Fateh Muhammad Jalandhri Video Translation Playlist (سلسلہ ترجمہ قرآن)
              </span>
              <a
                href="https://youtube.com/playlist?list=PLjMdlvowxr_0XqrqKSvbvcKd4562mnonS&si=lPFRawyHvx2DAOnE"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>YouTube Playlist</span>
                <span className="text-[10px]">&nearr;</span>
              </a>
            </div>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-amber-500/40 bg-black shadow-2xl">
              <iframe
                src="https://www.youtube-nocookie.com/embed/videoseries?list=PLjMdlvowxr_0XqrqKSvbvcKd4562mnonS&enablejsapi=1"
                title="Fateh Muhammad Jalandhri Quran Video Translation Playlist"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="text-[10px] text-emerald-400/80 text-center">
              Watch verse-by-verse Urdu translation or toggle &ldquo;Hide Video&rdquo; to return to audio only.
            </p>
          </div>
        )}
      </div>

      {/* Active Reciting Ayah Alert Banner if Playing this Surah */}
      {isPlaying && currentPlayingSurah === selectedSurahNumber && (
        <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-400/50 flex items-center justify-between shadow-lg shadow-amber-500/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-semibold text-amber-300 font-mono">
              Ayah {currentPlayingAyah} of {currentMeta.totalVerses} &bull;{' '}
              {activePhase === 'arabic' ? 'Reciting Arabic...' : 'Speaking Urdu Translation Voice...'}
            </span>
          </div>
          <span className="text-[10px] text-amber-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800 font-mono">
            Touch-Free
          </span>
        </div>
      )}

      {/* Bismillah */}
      {selectedSurahNumber !== 9 && (
        <div className="text-center py-4 bg-emerald-900/30 rounded-2xl border border-emerald-800/40">
          <p className="font-arabic text-2xl text-amber-300 drop-shadow">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <div className="space-y-0.5 mt-1.5">
            <p className="text-xs text-amber-200/90 font-arabic">
              شروع کرتا ہوں اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے
            </p>
            <p className="text-[11px] text-emerald-300/80 font-sans">
              In the name of Allah, the Entirely Merciful, the Especially Merciful.
            </p>
          </div>
        </div>
      )}

      {/* Verses List with BOTH Arabic AND Spoken Urdu Voice Translation Alongside */}
      {isLoadingAyahs ? (
        <div className="text-center py-12 text-emerald-400 text-xs flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span>Loading Holy Quran verses...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {surahAyahs.map(ayah => {
            const isPlayingThisAyah =
              isPlaying &&
              currentPlayingSurah === selectedSurahNumber &&
              currentPlayingAyah === ayah.numberInSurah;
            const isRecitingArabic = isPlayingThisAyah && activePhase === 'arabic';
            const isSpeakingUrdu = isPlayingThisAyah && activePhase === 'urdu';
            const isBookmarked = bookmarkedAyahs.includes(
              `${selectedSurahNumber}:${ayah.numberInSurah}`
            );

            return (
              <div
                key={ayah.numberInSurah}
                ref={isPlayingThisAyah ? activeAyahRef : null}
                className={`p-4 rounded-3xl border transition-all duration-300 ${
                  isPlayingThisAyah
                    ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/20'
                    : 'bg-emerald-900/30 border-emerald-800/60 hover:border-emerald-700'
                }`}
              >
                {/* Ayah Header Bar */}
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-emerald-900/60">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-xl text-xs font-mono font-bold flex items-center justify-center border transition ${
                        isPlayingThisAyah
                          ? 'bg-amber-400 text-emerald-950 font-bold border-amber-300'
                          : 'bg-emerald-950 text-amber-400 border-emerald-800'
                      }`}
                    >
                      {ayah.numberInSurah}
                    </span>
                    <span className="text-[10px] text-emerald-400/80 font-mono">
                      Juz {ayah.juz || currentMeta.startJuz}
                    </span>
                    {isRecitingArabic && (
                      <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/40 animate-pulse font-semibold">
                        Reciting Arabic
                      </span>
                    )}
                    {isSpeakingUrdu && (
                      <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/40 animate-pulse font-semibold">
                        Urdu (Miraj-ul-Din Khan)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Play Arabic Audio Hands-Free from here */}
                    <button
                      onClick={() => onPlayAyah(selectedSurahNumber, ayah.numberInSurah, 'arabic')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium transition ${
                        isRecitingArabic
                          ? 'bg-amber-400 text-emerald-950 font-bold shadow'
                          : 'bg-emerald-950 border border-emerald-800 text-emerald-300 hover:text-amber-300'
                      }`}
                      title="Play Arabic first, then Urdu voice automatically"
                    >
                      <Play size={12} fill={isRecitingArabic ? 'currentColor' : 'none'} />
                      <span>تلاوت</span>
                    </button>

                    {/* PLAY SPOKEN URDU TRANSLATION VOICE BUTTON ALONGSIDE EACH AYAT */}
                    <button
                      onClick={() => onPlayAyah(selectedSurahNumber, ayah.numberInSurah, 'urdu')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium transition active:scale-95 ${
                        isSpeakingUrdu
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-bold shadow-md'
                          : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                      title="Play Spoken Urdu Translation Voice directly"
                    >
                      <Volume2 size={12} className={isSpeakingUrdu ? 'animate-bounce' : ''} />
                      <span>سنیں اردو</span>
                    </button>

                    {/* Bookmark */}
                    <button
                      onClick={() => toggleBookmark(ayah.numberInSurah)}
                      className={`p-1.5 rounded-lg transition ${
                        isBookmarked
                          ? 'text-amber-400'
                          : 'text-emerald-500 hover:text-emerald-300'
                      }`}
                      title="Bookmark Ayah"
                    >
                      <Bookmark size={13} fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                {/* 1. ARABIC CALLIGRAPHY TEXT */}
                <div
                  className={`font-arabic text-right leading-loose mb-3 selection:bg-amber-400 selection:text-emerald-950 transition-colors ${
                    isRecitingArabic ? 'text-amber-300 font-bold drop-shadow' : 'text-emerald-50'
                  }`}
                  style={{ fontSize: `${arabicFontSize}px` }}
                >
                  {ayah.arabicText}
                </div>

                {/* 2. URDU TRANSLATION (Shown simultaneously) */}
                {(selectedLanguage === 'urdu' || selectedLanguage === 'both') && (
                  <div
                    className={`p-3 rounded-2xl border mb-2 transition ${
                      isSpeakingUrdu
                        ? 'bg-amber-500/20 border-amber-400/80 shadow-md ring-1 ring-amber-400/30'
                        : 'bg-emerald-950/60 border-emerald-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-amber-400 font-mono font-semibold uppercase tracking-wider">
                        اردو ترجمہ (Spoken Voice):
                      </span>
                      {isSpeakingUrdu && (
                        <span className="text-[10px] text-amber-300 animate-pulse font-mono font-bold">
                          Urdu Voice Playing &rarr; will advance to next Ayah
                        </span>
                      )}
                    </div>
                    <p className={`text-base text-right leading-relaxed font-arabic ${isSpeakingUrdu ? 'text-amber-200 font-bold' : 'text-amber-100'}`}>
                      {ayah.translationUrdu}
                    </p>
                  </div>
                )}

                {/* 3. ENGLISH TRANSLATION (Shown simultaneously) */}
                {(selectedLanguage === 'english' || selectedLanguage === 'both') && (
                  <div className="p-2.5 rounded-2xl bg-emerald-950/30 border border-emerald-900/60">
                    <div className="text-[10px] text-emerald-400 font-mono font-semibold uppercase tracking-wider mb-0.5">
                      English (Sahih International):
                    </div>
                    <p className="text-xs text-emerald-200/95 leading-relaxed font-sans">
                      {ayah.translationEnglish}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Video Reel Modal for User's Attached Video */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-emerald-950 border border-emerald-700 p-4 text-white shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-800">
              <div>
                <h3 className="font-bold text-sm font-display">Surah Al-Jinn (72:23)</h3>
                <p className="text-[11px] text-emerald-300/80">Recitation with Urdu Voice & Cinematic Visual</p>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-xs px-2 py-1 rounded-lg bg-emerald-900 text-emerald-300 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-[9/16] bg-black max-h-[60vh] flex items-center justify-center">
              <video
                src="/assets/aistudio/Facebook_4476167232699373_480P_SD__bc9af815.mp4"
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-center pt-1">
              <p className="text-[11px] text-amber-200 font-arabic">
                البتہ جس چیز پر مجھے اختیار دیا گیا ہے وہ اللہ کی طرف سے بات پہنچا دینا اور اس کے پیغامات ہیں۔
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Surah Selection Modal */}
      {isSurahModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md h-[80vh] rounded-3xl bg-emerald-900 border border-emerald-700 flex flex-col text-white shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-emerald-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base font-display">Select Surah (114)</h3>
                <button
                  onClick={() => setIsSurahModalOpen(false)}
                  className="text-xs text-emerald-300 hover:text-white px-2 py-1 rounded-lg bg-emerald-950"
                >
                  Close
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-emerald-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, number, or Arabic..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-emerald-950 border border-emerald-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-emerald-600 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
              {filteredSurahs.map(surah => (
                <button
                  key={surah.number}
                  onClick={() => {
                    onSelectSurah(surah.number);
                    onPlayAyah(surah.number, 1, 'arabic');
                    setIsSurahModalOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-2xl flex items-center justify-between transition text-left ${
                    selectedSurahNumber === surah.number
                      ? 'bg-amber-500/20 border border-amber-400/80 text-white'
                      : 'hover:bg-emerald-950/60 text-emerald-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-emerald-950 text-[11px] font-mono font-bold text-amber-400 flex items-center justify-center border border-emerald-800">
                      {surah.number}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white">{surah.nameEnglish}</div>
                      <div className="text-[10px] text-emerald-400">
                        {surah.nameTranslation} &bull; {surah.totalVerses} Ayahs
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-arabic text-base text-amber-300">{surah.nameArabic}</div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                      {surah.revelationType}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
