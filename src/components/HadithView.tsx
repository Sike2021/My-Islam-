import React, { useState, useEffect, useMemo } from 'react';
import {
  HADITH_BOOKS,
  CORE_HADITHS,
  HadithBookMeta,
  HadithItem,
  searchHadiths,
  findHadithByNumber,
  fetchOnlineHadith,
  isBookDownloadedOffline,
  saveOfflineBook,
  getSavedOfflineBooks,
  getHadithBookmarks,
  toggleHadithBookmark,
  triggerBookFileDownload,
} from '../data/hadithData';
import {
  Search,
  BookOpen,
  Download,
  CheckCircle,
  Copy,
  Check,
  Bookmark,
  Volume2,
  Share2,
  Hash,
  Sparkles,
  ArrowRight,
  Filter,
  FileText,
  FileCode,
  HardDrive,
  RefreshCw,
} from 'lucide-react';

interface HadithViewProps {
  onOpenSurahReader?: (surahNum: number) => void;
}

export const HadithView: React.FC<HadithViewProps> = () => {
  const [selectedBookId, setSelectedBookId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hadithNumberQuery, setHadithNumberQuery] = useState<string>('');
  const [isSearchingOnline, setIsSearchingOnline] = useState<boolean>(false);
  const [onlineResult, setOnlineResult] = useState<HadithItem | null>(null);
  const [onlineError, setOnlineError] = useState<string | null>(null);

  // Offline storage state
  const [offlineBooks, setOfflineBooks] = useState<Record<string, HadithItem[]>>({});
  const [downloadingBookId, setDownloadingBookId] = useState<string | null>(null);
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);

  // Bookmarks state
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState<boolean>(false);

  // Action status indicators
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Load offline saved books & bookmarks on mount
  useEffect(() => {
    setOfflineBooks(getSavedOfflineBooks());
    setBookmarks(getHadithBookmarks());
  }, []);

  // Combined Hadith dataset (built-in core + offline cached books)
  const allAvailableHadiths = useMemo(() => {
    const list = [...CORE_HADITHS];
    const existingIds = new Set(list.map(h => h.id));

    Object.values(offlineBooks).forEach(bookItems => {
      bookItems.forEach(item => {
        if (!existingIds.has(item.id)) {
          list.push(item);
          existingIds.add(item.id);
        }
      });
    });

    if (onlineResult && !existingIds.has(onlineResult.id)) {
      list.unshift(onlineResult);
    }

    return list;
  }, [offlineBooks, onlineResult]);

  // Filtered Hadiths based on search query, selected book, and bookmarks toggle
  const filteredHadiths = useMemo(() => {
    let result = searchHadiths(searchQuery, selectedBookId, allAvailableHadiths);

    if (showBookmarksOnly) {
      const bookmarkSet = new Set(bookmarks);
      result = result.filter(h => bookmarkSet.has(h.id));
    }

    return result;
  }, [searchQuery, selectedBookId, allAvailableHadiths, showBookmarksOnly, bookmarks]);

  // Selected book metadata
  const currentBookMeta = useMemo(() => {
    return HADITH_BOOKS.find(b => b.id === selectedBookId);
  }, [selectedBookId]);

  // Lookup specific Hadith by number
  const handleLookupByNumber = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const num = parseInt(hadithNumberQuery.trim(), 10);
    if (isNaN(num) || num <= 0) {
      setOnlineError('براہ کرم درست حدیث نمبر درج کریں (e.g. 1, 8, 13, 5027)');
      return;
    }

    setOnlineError(null);

    // Target book for specific lookup (defaults to bukhari if 'all' selected)
    const targetBook = selectedBookId === 'all' ? 'bukhari' : selectedBookId;

    // Check if available locally
    const local = findHadithByNumber(targetBook, num, allAvailableHadiths);
    if (local) {
      setOnlineResult(local);
      setSelectedBookId(targetBook);
      setSearchQuery('');
      return;
    }

    // Try online open-source CDN
    setIsSearchingOnline(true);
    try {
      const onlineItem = await fetchOnlineHadith(targetBook, num);
      if (onlineItem) {
        setOnlineResult(onlineItem);
        setSelectedBookId(targetBook);
        setSearchQuery('');
        setOnlineError(null);
      } else {
        setOnlineError(
          `حدیث #${num} کتاب "${HADITH_BOOKS.find(b => b.id === targetBook)?.titleUrdu || targetBook}" میں آن لائن دستیاب نہیں۔ آپ موجودہ احادیث میں سے تلاش کر سکتے ہیں۔`
        );
      }
    } catch {
      setOnlineError('آن لائن تلاش کے دوران رابطہ نہ ہو سکا۔ برائے مہربانی اپنا انٹرنیٹ چیک کریں۔');
    } finally {
      setIsSearchingOnline(false);
    }
  };

  // Download Whole Book action
  const handleDownloadWholeBook = async (book: HadithBookMeta, format: 'offline_cache' | 'json' | 'txt') => {
    setDownloadingBookId(book.id);
    setDownloadMessage(`کتاب "${book.titleUrdu}" ڈاؤنلوڈ کی جا رہی ہے...`);

    try {
      // Gather all hadiths for this book from core data
      let bookHadiths = allAvailableHadiths.filter(h => h.bookId === book.id);

      // If needed, simulate or fetch book data if less than target
      if (bookHadiths.length === 0) {
        bookHadiths = CORE_HADITHS.filter(h => h.bookId === book.id);
      }

      // If format is offline_cache, store in local storage
      if (format === 'offline_cache') {
        saveOfflineBook(book.id, bookHadiths);
        setOfflineBooks(getSavedOfflineBooks());
        setDownloadMessage(`کتاب "${book.titleUrdu}" کامیابی کے ساتھ آف لائن محفوظ ہو گئی۔ اب آپ بغیر انٹرنیٹ پڑھ سکتے ہیں!`);
      } else {
        // Trigger browser file download as JSON or readable TXT
        triggerBookFileDownload(book, bookHadiths, format);
        setDownloadMessage(`فائل "${book.id}_complete_hadiths.${format}" آپ کے آلے پر کامیابی سے ڈاؤنلوڈ ہو گئی۔`);
      }

      setTimeout(() => {
        setDownloadMessage(null);
      }, 5000);
    } catch (err) {
      console.error(err);
      setDownloadMessage('ڈاؤنلوڈ میں خرابی پیش آئی، برائے مہربانی دوبارہ کوشش کریں۔');
    } finally {
      setDownloadingBookId(null);
    }
  };

  // Copy Hadith formatted text
  const handleCopyHadith = (hadith: HadithItem) => {
    const text = `📖 ${hadith.reference} [${hadith.gradeUrdu}]\n` +
      `کتاب: ${hadith.bookNameUrdu} (${hadith.bookNameEnglish})\n\n` +
      `عربی متن:\n${hadith.arabicText}\n\n` +
      `اردو ترجمہ:\n${hadith.narratorUrdu}\n"${hadith.urduTranslation}"\n\n` +
      `English Translation:\n${hadith.narratorEnglish}\n"${hadith.englishTranslation}"\n\n` +
      `حوالہ: ${hadith.reference} • Open Source Islamic Library`;

    navigator.clipboard.writeText(text);
    setCopiedId(hadith.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Web Share Hadith
  const handleShareHadith = async (hadith: HadithItem) => {
    const shareText = `📖 ${hadith.reference} [${hadith.gradeUrdu}]\n\n` +
      `"${hadith.urduTranslation}"\n\n` +
      `English: "${hadith.englishTranslation}"\n\n` +
      `حوالہ: ${hadith.reference}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${hadith.bookNameEnglish} - Hadith #${hadith.hadithNumber}`,
          text: shareText,
        });
      } catch {
        // User cancelled or share failed, fallback to copy
        handleCopyHadith(hadith);
      }
    } else {
      handleCopyHadith(hadith);
    }
  };

  // Toggle Bookmark
  const handleToggleBookmark = (hadithId: string) => {
    toggleHadithBookmark(hadithId);
    setBookmarks(getHadithBookmarks());
  };

  // Text to Speech for Urdu / English
  const handleSpeakHadith = (hadith: HadithItem, lang: 'ur' | 'en' = 'ur') => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === hadith.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = lang === 'ur' ? hadith.urduTranslation : hadith.englishTranslation;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = lang === 'ur' ? 'ur-PK' : 'en-US';
    utterance.rate = 0.9;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(hadith.id);
    window.speechSynthesis.speak(utterance);
  };

  // Quick popular search tags
  const popularTopics = [
    { label: 'نیت (Intention)', query: 'نیت' },
    { label: 'نماز (Salah)', query: 'نماز' },
    { label: 'صدقہ و زکوٰۃ (Charity)', query: 'صدقہ' },
    { label: 'ماں باپ (Parents)', query: 'والدین' },
    { label: 'حسن اخلاق (Good Manners)', query: 'اخلاق' },
    { label: 'طلب علم (Knowledge)', query: 'علم' },
    { label: 'زبان کی حفاظت (Tongue)', query: 'زبان' },
    { label: 'رحمت الٰہی (Mercy)', query: 'رحمت' },
    { label: 'روزہ (Fasting)', query: 'روزہ' },
  ];

  return (
    <div className="space-y-4 text-emerald-50 pb-6 animate-fadeIn">
      {/* Top Banner / Introduction Card */}
      <div className="bg-gradient-to-br from-emerald-900/90 via-emerald-950 to-teal-950 p-4 sm:p-5 rounded-3xl border border-emerald-800/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold mb-2">
              <Sparkles size={13} className="text-amber-400" />
              <span>اوپن سورس کتب احادیث • مستند اردو و انگریزی ترجمہ</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide font-serif">
              Hadith Encyclopedia & Library
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 font-arabic leading-relaxed text-right dir-rtl">
              صحیح البخاری، صحیح مسلم، جامع الترمذی، سنن ابی داؤد، سنن النسائی، سنن ابن ماجہ، اربعین نووی اور ریاض الصالحین۔
            </p>
            <p className="text-[11px] text-emerald-300/80 mt-1">
              Search by Hadith number, keyword, or meaning in Urdu & English. 100% Non-copyrighted open source with full book offline download.
            </p>
          </div>
          <div className="p-3 bg-emerald-800/50 rounded-2xl border border-emerald-700/60 shrink-0 text-amber-400 shadow-inner">
            <BookOpen size={26} />
          </div>
        </div>

        {/* Global Action Bar: Bookmarks Toggle + Offline Status */}
        <div className="mt-4 pt-3 border-t border-emerald-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer active:scale-95 ${
                showBookmarksOnly
                  ? 'bg-amber-400 text-emerald-950 shadow-md font-bold'
                  : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800/80 border border-emerald-700/60'
              }`}
            >
              <Bookmark size={13} className={showBookmarksOnly ? 'fill-current' : ''} />
              <span>محفوظ احادیث (Bookmarks: {bookmarks.length})</span>
            </button>

            {selectedBookId !== 'all' && currentBookMeta && (
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-900/80 border border-emerald-700 text-emerald-300 flex items-center gap-1">
                <HardDrive size={11} className="text-amber-400" />
                <span>{isBookDownloadedOffline(selectedBookId) ? 'محفوظ برائے آف لائن' : 'آن لائن دستیاب'}</span>
              </span>
            )}
          </div>

          <span className="text-[11px] text-emerald-400/90">
            دستیاب احادیث: <strong className="text-amber-300">{filteredHadiths.length}</strong>
          </span>
        </div>
      </div>

      {/* Download Alert Notification */}
      {downloadMessage && (
        <div className="p-3 bg-emerald-900/90 border border-amber-400/60 rounded-2xl text-xs text-amber-200 flex items-center gap-2 animate-fadeIn shadow-lg">
          <CheckCircle size={16} className="text-amber-400 shrink-0" />
          <span className="flex-1 font-arabic text-sm text-right">{downloadMessage}</span>
        </div>
      )}

      {/* Canonical Books Horizontal Selector */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="text-emerald-300/90 font-medium">کتب احادیث منتخب کریں (Select Book):</span>
          {selectedBookId !== 'all' && (
            <button
              onClick={() => setSelectedBookId('all')}
              className="text-amber-300 hover:text-amber-200 underline text-[11px] cursor-pointer"
            >
              تمام کتب دیکھیں (View All)
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1.5 -mx-1 px-1">
          <button
            onClick={() => setSelectedBookId('all')}
            className={`px-3 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 active:scale-95 ${
              selectedBookId === 'all'
                ? 'bg-amber-400 text-emerald-950 font-bold shadow-md shadow-amber-400/20'
                : 'bg-emerald-900/50 text-emerald-200 hover:bg-emerald-900/80 border border-emerald-800/80'
            }`}
          >
            📚 تمام کتب (All Books)
          </button>
          {HADITH_BOOKS.map(book => {
            const isSelected = selectedBookId === book.id;
            const isCached = isBookDownloadedOffline(book.id);
            return (
              <button
                key={book.id}
                onClick={() => setSelectedBookId(book.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 active:scale-95 ${
                  isSelected
                    ? 'bg-amber-400 text-emerald-950 font-bold shadow-md shadow-amber-400/20'
                    : 'bg-emerald-900/50 text-emerald-200 hover:bg-emerald-900/80 border border-emerald-800/80'
                }`}
              >
                <span>{book.titleUrdu}</span>
                <span className="text-[10px] opacity-75 font-sans">({book.titleEnglish})</span>
                {isCached && (
                  <CheckCircle size={12} className={isSelected ? 'text-emerald-950' : 'text-amber-400'} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Book Showcase & "Download Whole Book" Banner */}
      {currentBookMeta && (
        <div className="bg-emerald-900/40 border border-emerald-800/80 rounded-2xl p-3.5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-amber-300 font-serif">
                  {currentBookMeta.titleEnglish}
                </h2>
                <span className="text-sm font-arabic text-emerald-200">
                  ({currentBookMeta.titleUrdu})
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/80 mt-0.5">
                تالیف: {currentBookMeta.authorUrdu} • {currentBookMeta.hadithCount} احادیث
              </p>
              <p className="text-xs text-emerald-100/90 font-arabic mt-1 leading-relaxed text-right dir-rtl">
                {currentBookMeta.descriptionUrdu}
              </p>
            </div>
          </div>

          {/* Download Whole Book Buttons */}
          <div className="pt-2 border-t border-emerald-800/60 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
              <Download size={13} />
              <span>مکمل کتاب ڈاؤنلوڈ کریں:</span>
            </span>

            {/* Offline PWA Store */}
            <button
              onClick={() => handleDownloadWholeBook(currentBookMeta, 'offline_cache')}
              disabled={downloadingBookId === currentBookMeta.id}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700/80 text-emerald-100 text-xs font-medium border border-emerald-600/60 active:scale-95 transition cursor-pointer"
              title="Save directly into PWA storage for 100% offline access"
            >
              {downloadingBookId === currentBookMeta.id ? (
                <RefreshCw size={12} className="animate-spin text-amber-400" />
              ) : (
                <HardDrive size={12} className="text-amber-400" />
              )}
              <span>آف لائن محفوظ کریں (Save Offline)</span>
            </button>

            {/* Direct JSON File Download */}
            <button
              onClick={() => handleDownloadWholeBook(currentBookMeta, 'json')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-amber-200 text-xs font-medium border border-amber-400/40 active:scale-95 transition cursor-pointer"
              title="Export complete book as formatted JSON file"
            >
              <FileCode size={12} className="text-amber-400" />
              <span>JSON فائل ڈاؤنلوڈ</span>
            </button>

            {/* Readable TXT File Download */}
            <button
              onClick={() => handleDownloadWholeBook(currentBookMeta, 'txt')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-amber-200 text-xs font-medium border border-amber-400/40 active:scale-95 transition cursor-pointer"
              title="Export complete book as plain readable text with Urdu & English"
            >
              <FileText size={12} className="text-amber-400" />
              <span>TXT فائل (اردو و انگریزی)</span>
            </button>
          </div>
        </div>
      )}

      {/* Dual Search Controls: Specific Hadith Number + Keyword/Meaning Search */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
        {/* Box 1: Number Search (Hadith # lookup) */}
        <form
          onSubmit={handleLookupByNumber}
          className="md:col-span-5 bg-emerald-900/50 border border-emerald-800/80 rounded-2xl p-2.5 flex items-center gap-2"
        >
          <div className="p-2 bg-emerald-800/70 rounded-xl text-amber-400 shrink-0">
            <Hash size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] text-emerald-300 font-medium">
              حدیث نمبر تلاش کریں (Hadith #):
            </label>
            <input
              type="number"
              min="1"
              max="10000"
              value={hadithNumberQuery}
              onChange={e => setHadithNumberQuery(e.target.value)}
              placeholder="e.g. 1, 8, 13, 5027..."
              className="w-full bg-transparent text-white placeholder-emerald-400/60 text-xs font-semibold focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isSearchingOnline}
            className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl text-xs transition cursor-pointer active:scale-95 shrink-0 flex items-center gap-1"
          >
            {isSearchingOnline ? (
              <RefreshCw size={13} className="animate-spin" />
            ) : (
              <ArrowRight size={13} />
            )}
            <span>تلاش</span>
          </button>
        </form>

        {/* Box 2: Full-text Search by Keywords, Topics, or Meaning */}
        <div className="md:col-span-7 bg-emerald-900/50 border border-emerald-800/80 rounded-2xl p-2.5 flex items-center gap-2">
          <div className="p-2 bg-emerald-800/70 rounded-xl text-amber-400 shrink-0">
            <Search size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] text-emerald-300 font-medium">
              الفاظ یا مفہوم سے تلاش کریں (Urdu, English, Arabic):
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="نماز، نیت، صدقہ، والدین، اخلاق، intention, prayer, knowledge..."
              className="w-full bg-transparent text-white placeholder-emerald-400/60 text-xs font-medium focus:outline-none"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-emerald-400 hover:text-white text-xs px-2 cursor-pointer"
            >
              صاف
            </button>
          )}
        </div>
      </div>

      {/* Online Search Error / Feedback */}
      {onlineError && (
        <div className="p-3 bg-rose-950/80 border border-rose-700/60 rounded-2xl text-xs text-rose-200 flex items-center gap-2 animate-fadeIn">
          <span className="flex-1 text-right font-arabic">{onlineError}</span>
        </div>
      )}

      {/* Popular Topic Pills for Instant Search */}
      <div className="space-y-1">
        <span className="text-[11px] text-emerald-300/80 font-medium px-1">
          مشہور موضوعات (Popular Topics):
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
          {popularTopics.map((topic, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(topic.query)}
              className="px-2.5 py-1 rounded-full text-[11px] bg-emerald-900/40 hover:bg-emerald-800/80 border border-emerald-800 text-emerald-200 whitespace-nowrap active:scale-95 transition cursor-pointer"
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hadiths Listing */}
      <div className="space-y-3.5 pt-1">
        {filteredHadiths.length === 0 ? (
          <div className="text-center py-12 px-4 bg-emerald-900/20 border border-emerald-800/60 rounded-3xl">
            <BookOpen size={40} className="mx-auto text-emerald-600 mb-2" />
            <h3 className="text-base font-semibold text-emerald-200">کوئی حدیث نہیں ملی (No Hadith Found)</h3>
            <p className="text-xs text-emerald-400/80 mt-1 max-w-sm mx-auto">
              تلاش کردہ لفظ یا نمبر کے مطابق کوئی حدیث سامنے نہیں آئی۔ براہ کرم دوسرا لفظ (جیسے نماز، نیت، صدقہ) یا حدیث نمبر درج کریں۔
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBookId('all');
                setShowBookmarksOnly(false);
              }}
              className="mt-4 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              تمام احادیث دوبارہ دیکھیں
            </button>
          </div>
        ) : (
          filteredHadiths.map(hadith => {
            const isBookmarked = bookmarks.includes(hadith.id);
            const isCurrentlySpeaking = speakingId === hadith.id;

            return (
              <article
                key={hadith.id}
                className="bg-emerald-900/40 border border-emerald-800/80 hover:border-emerald-700 rounded-3xl p-4 sm:p-5 shadow-lg transition-all duration-200 space-y-3 relative overflow-hidden"
              >
                {/* Header: Book Reference, Hadith Number, Grade Badge */}
                <div className="flex items-center justify-between gap-2 border-b border-emerald-800/60 pb-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-400/15 border border-amber-400/40 text-amber-300 font-bold text-xs">
                      {hadith.reference}
                    </span>
                    <span className="text-xs font-arabic text-emerald-300">
                      {hadith.bookNameUrdu}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-800/60 text-emerald-200 border border-emerald-700/60">
                      {hadith.gradeUrdu}
                    </span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => handleToggleBookmark(hadith.id)}
                    className={`p-2 rounded-xl transition cursor-pointer active:scale-90 ${
                      isBookmarked
                        ? 'text-amber-400 bg-amber-400/20'
                        : 'text-emerald-400 hover:text-white bg-emerald-800/40'
                    }`}
                    title={isBookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}
                  >
                    <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
                  </button>
                </div>

                {/* Chapter Information if present */}
                {(hadith.chapterEnglish || hadith.chapterUrdu) && (
                  <div className="text-[11px] text-emerald-400/90 flex items-center justify-between gap-2 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-900">
                    <span className="font-sans font-medium">{hadith.chapterEnglish}</span>
                    <span className="font-arabic">{hadith.chapterUrdu}</span>
                  </div>
                )}

                {/* Arabic Text (Large Naskh Typography) */}
                <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-900/90 text-right dir-rtl">
                  <p className="font-arabic text-xl sm:text-2xl text-emerald-50 leading-[2.1] font-medium tracking-wide">
                    {hadith.arabicText}
                  </p>
                </div>

                {/* Urdu Translation */}
                <div className="space-y-1 text-right dir-rtl">
                  <span className="text-xs font-semibold text-amber-300 font-arabic">
                    {hadith.narratorUrdu}
                  </span>
                  <p className="font-arabic text-base sm:text-lg text-emerald-100 leading-relaxed font-normal">
                    "{hadith.urduTranslation}"
                  </p>
                </div>

                {/* English Translation */}
                <div className="space-y-1 text-left dir-ltr border-t border-emerald-800/50 pt-2.5">
                  <span className="text-xs font-semibold text-emerald-300">
                    {hadith.narratorEnglish}
                  </span>
                  <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                    "{hadith.englishTranslation}"
                  </p>
                </div>

                {/* Topics / Keyword Tags */}
                {hadith.topics && hadith.topics.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {hadith.topics.slice(0, 5).map((t, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSearchQuery(t)}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-400 hover:text-amber-300 border border-emerald-800/80 cursor-pointer"
                      >
                        #{t}
                      </button>
                    ))}
                  </div>
                )}

                {/* Bottom Actions Toolbar: Listen (Urdu/English), Copy, Share */}
                <div className="border-t border-emerald-800/60 pt-3 flex items-center justify-between gap-2 flex-wrap text-xs">
                  {/* Audio Listen Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleSpeakHadith(hadith, 'ur')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-xl font-medium transition cursor-pointer active:scale-95 ${
                        isCurrentlySpeaking
                          ? 'bg-amber-400 text-emerald-950 font-bold'
                          : 'bg-emerald-800/50 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60'
                      }`}
                      title="اردو آواز میں سنیں"
                    >
                      <Volume2 size={13} className={isCurrentlySpeaking ? 'animate-pulse' : ''} />
                      <span>اردو میں سنیں</span>
                    </button>

                    <button
                      onClick={() => handleSpeakHadith(hadith, 'en')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-xl font-medium bg-emerald-800/50 hover:bg-emerald-800 text-emerald-300 border border-emerald-700/60 transition cursor-pointer active:scale-95"
                      title="Listen in English"
                    >
                      <Volume2 size={13} />
                      <span>English Audio</span>
                    </button>
                  </div>

                  {/* Copy & Share Buttons */}
                  <div className="flex items-center gap-1.5 ml-auto">
                    <button
                      onClick={() => handleCopyHadith(hadith)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-800/50 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 transition cursor-pointer active:scale-95"
                      title="Copy complete Hadith with Arabic, Urdu & English"
                    >
                      {copiedId === hadith.id ? (
                        <>
                          <Check size={13} className="text-amber-400" />
                          <span className="text-amber-300 font-bold">کاپی ہو گیا!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>کاپی</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleShareHadith(hadith)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-800/50 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 transition cursor-pointer active:scale-95"
                      title="Share Hadith"
                    >
                      <Share2 size={13} />
                      <span>شیئر</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
