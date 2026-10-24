import React from 'react';
import {
  BookOpen,
  Radio,
  GraduationCap,
  Sparkles,
  Menu,
} from 'lucide-react';

export type ActiveNavTab =
  | 'timer'
  | 'reader'
  | 'duas'
  | 'ulama'
  | 'hadith'
  | 'search'
  | 'naats'
  | 'israr'
  | 'khatam'
  | 'offline'
  | 'qaris';

interface BottomNavProps {
  activeTab: ActiveNavTab;
  onTabChange: (tab: ActiveNavTab) => void;
  onOpenMenu: () => void;
  isTimerRunning: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  onOpenMenu,
  isTimerRunning,
}) => {
  const isMenuSectionActive =
    activeTab === 'hadith' ||
    activeTab === 'timer' ||
    activeTab === 'search' ||
    activeTab === 'naats' ||
    activeTab === 'khatam' ||
    activeTab === 'offline' ||
    activeTab === 'qaris';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-emerald-950/95 backdrop-blur-xl border-t border-emerald-900/80 px-2 py-1 safe-area-pb shadow-2xl">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center gap-1">
        {/* Tab 1: Holy Quran (Reader & Recitation with Fateh Muhammad Jalandhri translation) */}
        <button
          onClick={() => onTabChange('reader')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition active:scale-95 touch-manipulation cursor-pointer ${
            activeTab === 'reader'
              ? 'text-amber-400 font-bold bg-emerald-900/40'
              : 'text-emerald-400/80 hover:text-emerald-200'
          }`}
          title="Holy Quran with Fateh Muhammad Jalandhari Urdu Translation"
        >
          <BookOpen
            size={19}
            className={`transition-transform duration-200 ${
              activeTab === 'reader' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'
            }`}
          />
          <span className="text-[10px] mt-0.5 tracking-tight font-sans truncate">
            Quran
          </span>
          {activeTab === 'reader' && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5" />
          )}
        </button>

        {/* Tab 2: Dr. Israr Ahmed Bayan-ul-Quran */}
        <button
          onClick={() => onTabChange('israr')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition active:scale-95 touch-manipulation cursor-pointer ${
            activeTab === 'israr'
              ? 'text-amber-400 font-bold bg-emerald-900/40'
              : 'text-emerald-400/80 hover:text-emerald-200'
          }`}
          title="Dr. Israr Ahmed Complete Bayan-ul-Quran"
        >
          <Radio
            size={19}
            className={`transition-transform duration-200 ${
              activeTab === 'israr' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'
            }`}
          />
          <span className="text-[10px] mt-0.5 tracking-tight font-sans truncate">
            Dr. Israr
          </span>
          {activeTab === 'israr' && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5" />
          )}
        </button>

        {/* Tab 3: Maulana Maududi Tafheem-ul-Quran */}
        <button
          onClick={() => onTabChange('ulama')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition active:scale-95 touch-manipulation cursor-pointer ${
            activeTab === 'ulama'
              ? 'text-amber-400 font-bold bg-emerald-900/40'
              : 'text-emerald-400/80 hover:text-emerald-200'
          }`}
          title="Maulana Maududi Tafheem-ul-Quran Audio & Surah Bayanat"
        >
          <GraduationCap
            size={19}
            className={`transition-transform duration-200 ${
              activeTab === 'ulama' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'
            }`}
          />
          <span className="text-[10px] mt-0.5 tracking-tight font-sans truncate">
            Maududi
          </span>
          {activeTab === 'ulama' && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5" />
          )}
        </button>

        {/* Tab 4: Duas Sanctuary & 4 Quls */}
        <button
          onClick={() => onTabChange('duas')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition active:scale-95 touch-manipulation cursor-pointer ${
            activeTab === 'duas'
              ? 'text-amber-400 font-bold bg-emerald-900/40'
              : 'text-emerald-400/80 hover:text-emerald-200'
          }`}
          title="Duas Sanctuary: Ayatul Kursi, Baqarah last 2, 4 Quls, Durood Sharif"
        >
          <Sparkles
            size={19}
            className={`transition-transform duration-200 ${
              activeTab === 'duas' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'
            }`}
          />
          <span className="text-[10px] mt-0.5 tracking-tight font-sans truncate">
            Duas & Quls
          </span>
          {activeTab === 'duas' && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5" />
          )}
        </button>

        {/* Tab 5: Menu Drawer */}
        <button
          onClick={onOpenMenu}
          className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition active:scale-95 touch-manipulation cursor-pointer ${
            isMenuSectionActive
              ? 'text-amber-400 font-bold bg-emerald-900/40'
              : 'text-emerald-400/80 hover:text-emerald-200'
          }`}
          title="Open Full Menu: Hadith Library, Qari Waheed Naats, Auto Timer, Khatam"
        >
          <div className="relative">
            <Menu
              size={19}
              className={`transition-transform duration-200 ${
                isMenuSectionActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'
              }`}
            />
            {isTimerRunning && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-sans truncate">
            Menu
          </span>
          {isMenuSectionActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5" />
          )}
        </button>
      </div>
    </nav>
  );
};

