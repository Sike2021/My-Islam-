import React, { useState } from 'react';
import { DUAS_DATA, DuaItem } from '../data/duas';
import { DuaCard } from './DuaCard';
import { DuaDetailModal } from './DuaDetailModal';
import { Search, Heart, Sparkles, BookOpen, Shield, Flame, Check } from 'lucide-react';

interface DuasSanctuaryViewProps {
  onOpenSurahReader?: (surahNumber: number) => void;
}

export const DuasSanctuaryView: React.FC<DuasSanctuaryViewProps> = ({ onOpenSurahReader }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDua, setSelectedDua] = useState<DuaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('easy_islam_dua_bookmarks');
      return saved ? JSON.parse(saved) : ['ayat-al-kursi', 'surah-baqarah-last-2-ayahs', 'durood-e-ibrahimi', '4-quls-surah-ikhlas'];
    } catch {
      return ['ayat-al-kursi', 'surah-baqarah-last-2-ayahs', 'durood-e-ibrahimi', '4-quls-surah-ikhlas'];
    }
  });

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('easy_islam_dua_bookmarks', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleSelectDua = (dua: DuaItem) => {
    setSelectedDua(dua);
    setIsModalOpen(true);
  };

  const handleQuickPlay = (dua: DuaItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(dua.arabicText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const categories = [
    { id: 'All', label: 'All Duas', urdu: 'تمام دعائیں' },
    { id: 'Quranic Ayats', label: 'Ayatul Kursi & 4 Quls', urdu: 'آیت الکرسی و چار قل' },
    { id: 'Durood Sharif', label: 'Durood Sharif', urdu: 'درود شریف' },
    { id: 'Protection', label: 'Protection & Shield', urdu: 'حفاظت و پناہ' },
    { id: 'Forgiveness', label: 'Forgiveness & Istighfar', urdu: 'استغفار و توبہ' },
    { id: 'Decisions', label: 'Istikhara & Decisions', urdu: 'استخارہ' },
    { id: 'Parents', label: 'Parents & Family', urdu: 'والدین' },
  ];

  const filteredDuas = DUAS_DATA.filter(dua => {
    if (onlyBookmarks && !bookmarkedIds.includes(dua.id)) return false;

    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Durood Sharif') {
        if (!dua.id.includes('durood')) return false;
      } else if (selectedCategory === 'Quranic Ayats') {
        if (dua.category !== 'Quranic Ayats' && !dua.id.includes('qul') && dua.id !== 'ayat-al-kursi') {
          return false;
        }
      } else if (dua.category !== selectedCategory) {
        return false;
      }
    }

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      dua.title.toLowerCase().includes(q) ||
      dua.urduTranslation.includes(q) ||
      dua.englishTranslation.toLowerCase().includes(q) ||
      dua.arabicText.includes(q) ||
      dua.transliteration.toLowerCase().includes(q) ||
      (dua.romanUrdu && dua.romanUrdu.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-5 pb-8">
      {/* Hero Header */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-950 border border-amber-500/35 p-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center">
                <Sparkles size={16} />
              </span>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Sanctuary of Masnoon Duas & Ayats
              </span>
            </div>

            <button
              onClick={() => setOnlyBookmarks(!onlyBookmarks)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                onlyBookmarks
                  ? 'bg-amber-400 text-emerald-950 font-bold shadow-md'
                  : 'bg-emerald-900/60 text-emerald-300 border border-emerald-800'
              }`}
            >
              <Heart size={13} className={onlyBookmarks ? 'fill-emerald-950' : 'text-amber-400'} />
              <span>Saved ({bookmarkedIds.length})</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            Duas, 4 Quls & Durood Sharif
          </h1>

          <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed max-w-xl">
            Authentic Quranic Ayats, Ayatul Kursi (2:255), the last two verses of Surah Al-Baqarah (Amanar-Rasool), the 4 Quls, sacred Durood Sharif, and daily morning/evening protection supplications.
          </p>

          {/* Quick Highlight Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              onClick={() => {
                const item = DUAS_DATA.find(d => d.id === 'ayat-al-kursi');
                if (item) handleSelectDua(item);
              }}
              className="p-2.5 rounded-xl bg-[#021812]/90 border border-amber-500/40 text-left hover:border-amber-400 transition"
            >
              <div className="text-[10px] text-amber-400 font-bold uppercase">Greatest Verse</div>
              <div className="text-xs font-bold text-white truncate">Ayatul Kursi (2:255)</div>
            </button>

            <button
              onClick={() => {
                const item = DUAS_DATA.find(d => d.id === 'surah-baqarah-last-2-ayahs');
                if (item) handleSelectDua(item);
              }}
              className="p-2.5 rounded-xl bg-[#021812]/90 border border-amber-500/40 text-left hover:border-amber-400 transition"
            >
              <div className="text-[10px] text-amber-400 font-bold uppercase">Night Shield</div>
              <div className="text-xs font-bold text-white truncate">Baqarah Last 2 (285-6)</div>
            </button>

            <button
              onClick={() => {
                const item = DUAS_DATA.find(d => d.id === 'durood-e-ibrahimi');
                if (item) handleSelectDua(item);
              }}
              className="p-2.5 rounded-xl bg-[#021812]/90 border border-amber-500/40 text-left hover:border-amber-400 transition"
            >
              <div className="text-[10px] text-amber-400 font-bold uppercase">Salawat</div>
              <div className="text-xs font-bold text-white truncate">Durood-e-Ibrahimi</div>
            </button>

            <button
              onClick={() => {
                const item = DUAS_DATA.find(d => d.id === '4-quls-surah-ikhlas');
                if (item) handleSelectDua(item);
              }}
              className="p-2.5 rounded-xl bg-[#021812]/90 border border-amber-500/40 text-left hover:border-amber-400 transition"
            >
              <div className="text-[10px] text-amber-400 font-bold uppercase">Pure Tawheed</div>
              <div className="text-xs font-bold text-white truncate">4 Quls Protection</div>
            </button>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search Ayatul Kursi, Baqarah, 4 Quls, Durood Sharif, Istighfar..."
          className="w-full bg-[#021812] border border-emerald-800 rounded-2xl pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder-emerald-500 focus:outline-none focus:border-amber-400 transition"
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

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {categories.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 active:scale-95 ${
                isActive
                  ? 'bg-amber-400 text-emerald-950 font-bold shadow-md'
                  : 'bg-emerald-950/80 text-emerald-300 hover:bg-emerald-900 border border-emerald-800/80'
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] ml-1 opacity-75 font-arabic font-normal">{cat.urdu}</span>
            </button>
          );
        })}
      </div>

      {/* Duas Grid */}
      {filteredDuas.length === 0 ? (
        <div className="p-8 text-center bg-[#021812] rounded-2xl border border-emerald-800 text-emerald-300 text-xs sm:text-sm">
          No supplications found matching "{searchQuery}". Try searching for "Baqarah", "Kursi", "Qul", or "Durood".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDuas.map(dua => (
            <DuaCard
              key={dua.id}
              dua={dua}
              isBookmarked={bookmarkedIds.includes(dua.id)}
              onToggleBookmark={(id, e) => toggleBookmark(id, e)}
              onSelect={handleSelectDua}
              onQuickPlay={handleQuickPlay}
            />
          ))}
        </div>
      )}

      {/* Dua Detail Modal */}
      <DuaDetailModal
        dua={selectedDua}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDua(null);
        }}
        isBookmarked={selectedDua ? bookmarkedIds.includes(selectedDua.id) : false}
        onToggleBookmark={id => toggleBookmark(id)}
      />
    </div>
  );
};
