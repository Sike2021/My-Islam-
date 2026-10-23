import React, { useState } from 'react';
import { QURANIC_TOPICS, QuranicWordProblem } from '../data/quranTopics';
import { Search, Volume2, VolumeX, Copy, Check, Sparkles, BookOpen, Compass, Lightbulb, Filter } from 'lucide-react';

interface QuranTopicSearchProps {
  onOpenSurahReader?: (surahNumber: number) => void;
}

export const QuranTopicSearch: React.FC<QuranTopicSearchProps> = ({ onOpenSurahReader }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Worship',
    'Rules & Ethics',
    'Anxiety & Grief',
    'Sustenance & Debt',
    'Family & Parents',
    'Anger & Forgiveness',
    'Healing & Health',
    'Repentance & Hope',
  ];

  const quickUrduSearches = [
    { labelUrdu: 'نماز', labelEng: 'Namaz / Salah', query: 'نماز' },
    { labelUrdu: 'شرک', labelEng: 'Shirk & Tawheed', query: 'شرک' },
    { labelUrdu: 'بسم اللہ', labelEng: 'Bismillah', query: 'بسم اللہ' },
    { labelUrdu: 'صبر', labelEng: 'Patience / Sabr', query: 'صبر' },
    { labelUrdu: 'سود', labelEng: 'Riba / Usury', query: 'سود' },
    { labelUrdu: 'زکوٰۃ', labelEng: 'Zakat & Infaq', query: 'زکوٰۃ' },
    { labelUrdu: 'والدین', labelEng: 'Parents', query: 'والدین' },
    { labelUrdu: 'توبہ', labelEng: 'Tawbah & Hope', query: 'توبہ' },
    { labelUrdu: 'دجال', labelEng: 'Dajjal / Surah Kahf', query: 'دجال' },
  ];

  const filteredTopics = QURANIC_TOPICS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      item.problemOrTopic.toLowerCase().includes(q) ||
      item.surahName.toLowerCase().includes(q) ||
      item.ayahNumber.includes(q) ||
      item.englishKeywords.some(k => k.toLowerCase().includes(q)) ||
      item.urduKeywords.some(k => k.includes(q)) ||
      item.arabicKeywords.some(k => k.includes(q)) ||
      item.englishTranslation.toLowerCase().includes(q) ||
      item.urduTranslation.includes(q) ||
      item.quranicGuidance.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const handleCopy = (item: QuranicWordProblem) => {
    const text = `${item.problemOrTopic}\n\nArabic:\n${item.arabicAyah}\n\nUrdu:\n${item.urduTranslation}\n\nEnglish:\n${item.englishTranslation}\n\n[${item.surahName} ${item.ayahNumber}]\nGuidance: ${item.quranicGuidance}\n\nFrom Sike's Perspective on Islam`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleToggleSpeech = (item: QuranicWordProblem) => {
    if (!('speechSynthesis' in window)) return;

    if (playingId === item.id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.arabicAyah);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
      setPlayingId(item.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#032f24] via-[#022119] to-[#01140e] border border-amber-500/35 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Quranic Solution & Keyword Finder</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Search Quran By Life Need, Problem & Rules
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/85 leading-relaxed">
            Search sacred Quranic verses and root concepts by what you are experiencing right now—whether seeking rules on worship, justice, and financial ethics, or finding remedies for anxiety, sadness, family trials, and poverty.
          </p>
        </div>
      </div>

      {/* Search Controls & Category Filters */}
      <div className="bg-[#03231b] p-4 sm:p-5 rounded-2xl border border-emerald-800/60 shadow-md space-y-3.5">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search in Urdu or English: نماز, شرک, بسم اللہ, صبر, سود, والدین, زکوٰۃ, توبہ, prayer, shirk..."
            className="w-full bg-[#021812] border border-emerald-700/80 rounded-xl pl-9 pr-12 py-3 text-xs sm:text-sm text-white placeholder-emerald-500 focus:outline-none focus:border-amber-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-emerald-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Urdu Searches Row */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>فوری تلاش / Quick Urdu Quran Topics:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {quickUrduSearches.map((item) => (
              <button
                key={item.labelUrdu}
                onClick={() => setSearchQuery(item.query)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  searchQuery === item.query
                    ? 'bg-amber-500 text-emerald-950 font-extrabold shadow-sm'
                    : 'bg-[#021812] text-emerald-200 hover:text-white hover:bg-emerald-900 border border-emerald-800'
                }`}
              >
                <span className="font-arabic text-amber-300 text-xs font-bold">{item.labelUrdu}</span>
                <span className="text-[10px] text-emerald-400 font-normal">({item.labelEng})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills Bar (Functional Button Controls) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-emerald-300/80">
            <span className="flex items-center gap-1 font-medium">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Browse by Category:</span>
            </span>
            <span className="font-mono text-[11px]">
              {filteredTopics.length} Quranic Guideline{filteredTopics.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-emerald-950 font-semibold shadow-sm'
                    : 'bg-[#021812] text-emerald-200/80 hover:text-white hover:bg-[#063529] border border-emerald-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results List */}
      {filteredTopics.length === 0 ? (
        <div className="rounded-2xl bg-[#04271e] border border-emerald-800/60 p-12 text-center space-y-2">
          <BookOpen className="w-10 h-10 text-emerald-500/60 mx-auto mb-2" />
          <h3 className="text-base font-semibold text-white">No Quranic Verses Found for "{searchQuery}"</h3>
          <p className="text-xs text-emerald-300/70 max-w-sm mx-auto">
            Try searching for broader themes such as "worship", "rules", "peace", "anxiety", "debt", "parents", or "forgiveness".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-xs text-amber-300 rounded-lg border border-emerald-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredTopics.map((item) => {
            const isSpeaking = playingId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-3xl bg-[#03241b] border border-emerald-800/70 hover:border-amber-500/40 p-6 sm:p-7 shadow-lg transition-all space-y-5"
              >
                {/* Top unboxed metadata line */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-amber-300/90 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-400">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.surahName} ({item.ayahNumber})</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-2.5 py-0.5 rounded-md font-mono text-[11px]">
                      Root: {item.quranicRootWord}
                    </span>
                  </div>
                </div>

                {/* Problem or Topic Title */}
                <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                  {item.problemOrTopic}
                </h3>

                {/* Arabic Ayah Panel */}
                <div className="bg-[#021711] rounded-2xl p-5 sm:p-6 border border-amber-500/30 text-right shadow-inner">
                  <p className="font-arabic text-2xl sm:text-3xl text-amber-200 leading-[2.3] select-text" dir="rtl">
                    {item.arabicAyah}
                  </p>
                </div>

                {/* English Transliteration */}
                <div className="bg-[#021d16] rounded-xl p-3.5 border border-emerald-900/60">
                  <p className="text-xs sm:text-sm text-emerald-100/90 font-mono leading-relaxed">
                    {item.transliteration}
                  </p>
                </div>

                {/* Urdu Translation */}
                <div className="bg-[#021d16] rounded-xl p-4 border border-emerald-900/60 text-right">
                  <h4 className="text-xs font-semibold text-amber-400 mb-1 text-left">اردو ترجمہ</h4>
                  <p className="text-sm sm:text-base text-emerald-50 leading-loose" dir="rtl">
                    {item.urduTranslation}
                  </p>
                </div>

                {/* English Translation */}
                <div className="bg-[#021d16] rounded-xl p-4 border border-emerald-900/60">
                  <h4 className="text-xs font-semibold text-amber-400 mb-1">English Translation</h4>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed italic">
                    "{item.englishTranslation}"
                  </p>
                </div>

                {/* Quranic Remedy & Practical Guidance */}
                <div className="bg-amber-950/25 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-300 mb-1">
                      Quranic Prescriptive Guidance:
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                      {item.quranicGuidance}
                    </p>
                  </div>
                </div>

                {/* Action Toolbar */}
                <div className="flex items-center justify-between pt-3 border-t border-emerald-900/80">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleSpeech(item)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        isSpeaking
                          ? 'bg-amber-500 text-emerald-950 font-bold'
                          : 'bg-emerald-900/50 hover:bg-emerald-800 text-amber-300 border border-emerald-700/60'
                      }`}
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 animate-pulse" />
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

                  <div className="flex items-center gap-2">
                    {onOpenSurahReader && (
                      <button
                        onClick={() => {
                          const parts = item.ayahNumber.split(':');
                          const num = parseInt(parts[0], 10);
                          if (!isNaN(num)) onOpenSurahReader(num);
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#01140e] hover:bg-emerald-900 border border-amber-500/40 text-amber-300 transition cursor-pointer"
                        title="Read full Surah and Tafseer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read in Quran</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleCopy(item)}
                      className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 p-1.5 rounded cursor-pointer"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === item.id ? 'Copied' : 'Share Ayah'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
