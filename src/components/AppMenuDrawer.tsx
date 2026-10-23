import React from 'react';
import { ActiveNavTab } from './BottomNav';
import {
  X,
  BookOpen,
  Search,
  Clock,
  Award,
  HardDrive,
  Users,
  GraduationCap,
  Music,
  Radio,
  Heart,
  Sparkles,
  ChevronRight,
  Compass,
  DownloadCloud,
  BookMarked,
} from 'lucide-react';

interface AppMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab) => void;
  onOpenCityModal?: () => void;
  onOpenInstallModal?: () => void;
}

export const AppMenuDrawer: React.FC<AppMenuDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  onOpenCityModal,
  onOpenInstallModal,
}) => {
  if (!isOpen) return null;

  const handleNav = (tab: ActiveNavTab) => {
    onSelectTab(tab);
    onClose();
  };

  const navItems: {
    tab: ActiveNavTab;
    label: string;
    urduLabel: string;
    icon: React.ReactNode;
    desc: string;
    badge?: string;
  }[] = [
    {
      tab: 'hadith',
      label: 'Hadith Library (Open Source)',
      urduLabel: 'کتب احادیث نبویہ',
      icon: <BookMarked className="w-5 h-5 text-amber-400" />,
      desc: 'Sahih Bukhari, Muslim, Tirmidhi, Abu Dawud, Nasai, Ibn Majah, 40 Nawawi & Riyad with Urdu/English translations, search & whole book offline download.',
      badge: 'کتب احادیث • ڈاؤنلوڈ',
    },
    {
      tab: 'duas',
      label: 'Duas & Azkar Sanctuary',
      urduLabel: 'الأدعية والأذكار',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      desc: 'Ayatul Kursi (2:255), Surah Baqarah last 2 ayats, the 4 Quls, and sacred Durood Sharif with translations and audio.',
      badge: '4 Quls & Durood',
    },
    {
      tab: 'reader',
      label: 'The Holy Quran (114 Surahs)',
      urduLabel: 'القرآن الكريم',
      icon: <BookOpen className="w-5 h-5 text-amber-400" />,
      desc: 'Complete 114 Surahs with verse-by-verse Arabic recitation and Fateh Muhammad Jalandhari Urdu voice.',
      badge: 'Urdu Audio',
    },
    {
      tab: 'search',
      label: 'Urdu Quran Topic Search',
      urduLabel: 'موضوعاتی تلاش',
      icon: <Search className="w-5 h-5 text-amber-400" />,
      desc: 'Instant Urdu keyword search for Namaz (نماز), Shirk (شرک), Bismillah (بسم اللہ), Sabr (صبر), Riba (سود), and Zakat.',
      badge: 'نماز • شرک',
    },
    {
      tab: 'ulama',
      label: 'Ulama Bayans & Tafseer Hub',
      urduLabel: 'مکتبۂ علمائے کرام',
      icon: <GraduationCap className="w-5 h-5 text-amber-400" />,
      desc: 'Maulana Maududi (complete 114 Surahs Tafheem), Maulana Ishaq Madani (Namaz, Hadith, Fiqh), and Dr. Israr Ahmed.',
      badge: 'مودودی • اسحاق',
    },
    {
      tab: 'israr',
      label: 'Dr. Israr Ahmed Bayans Hub',
      urduLabel: 'ڈاکٹر اسرار احمد',
      icon: <Radio className="w-5 h-5 text-amber-400" />,
      desc: 'Complete 114 Surahs Bayan-ul-Quran, Muntakhab Nisab, Seerat-un-Nabi, and landmark discourses.',
      badge: '114 Surahs',
    },
    {
      tab: 'naats',
      label: 'Qari Waheed Naats & Shukran Laka Rabbi',
      urduLabel: 'نعتیں و کلام',
      icon: <Music className="w-5 h-5 text-amber-400" />,
      desc: 'Faslon Ko Takalluf, Zahe Muqaddar, Shukran Laka Rabbi (wi1_1cJtMY4 YouTube & lyrics), and Qasmi Quran recitation.',
      badge: 'شکرًا لك ربي',
    },
    {
      tab: 'timer',
      label: 'Auto Recitation Timer',
      urduLabel: 'آٹو تلاوت ٹائمر',
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      desc: 'Hands-free bedtime and prayer-time Quran playback with auto-fade and sequence mode.',
      badge: 'Bedtime',
    },
    {
      tab: 'khatam',
      label: 'Khatam Tracker & Planner',
      urduLabel: 'ختم القرآن',
      icon: <Award className="w-5 h-5 text-amber-400" />,
      desc: 'Track daily Ayah listening progress, bookmark positions, and finish the Holy Quran.',
    },
    {
      tab: 'qaris',
      label: 'World Qaris Showcase',
      urduLabel: 'مشاہیر قراء',
      icon: <Users className="w-5 h-5 text-amber-400" />,
      desc: 'Sudais, Shuraim, Al-Afasy, Al-Ghamdi, Al-Husary, and Abdul Basit recitations.',
    },
    {
      tab: 'offline',
      label: 'Offline Manager & WebAPK',
      urduLabel: 'آف لائن مینیجر',
      icon: <HardDrive className="w-5 h-5 text-amber-400" />,
      desc: 'Listen without internet anywhere, manage cached Surahs, and install on Android.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex bg-black/80 backdrop-blur-md transition-opacity">
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-out Drawer Container */}
      <div className="relative w-full max-w-md bg-[#021812] border-l border-amber-500/30 text-white h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-emerald-900/80 bg-[#03231a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-emerald-950 font-bold font-serif text-xl shadow-lg">
              <span>إ</span>
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-amber-200">
                Easy Islam · Navigation Menu
              </h2>
              <p className="text-xs text-emerald-300/80">Complete Islamic Sanctuary & Media</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-400 hover:text-white hover:bg-emerald-900/50 transition cursor-pointer"
            title="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleNav(item.tab)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 group cursor-pointer ${
                  isActive
                    ? 'bg-[#053b2e] border-amber-400/80 shadow-md ring-1 ring-amber-400/30'
                    : 'bg-[#032219] border-emerald-900/60 hover:border-amber-500/40 hover:bg-[#042d22]'
                }`}
              >
                <div className={`p-2.5 rounded-xl border mt-0.5 shrink-0 transition-colors ${
                  isActive
                    ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                    : 'bg-emerald-950/70 border-emerald-800 text-emerald-400 group-hover:text-amber-400'
                }`}>
                  {item.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm font-bold tracking-tight truncate ${
                      isActive ? 'text-amber-300 font-display' : 'text-white group-hover:text-amber-200'
                    }`}>
                      {item.label}
                    </span>
                    <span className="font-arabic text-xs text-amber-400/80 shrink-0" dir="rtl">
                      {item.urduLabel}
                    </span>
                  </div>

                  <p className="text-xs text-emerald-300/70 line-clamp-2 mt-1 leading-relaxed">
                    {item.desc}
                  </p>

                  {item.badge && (
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 text-[10px] font-semibold border border-amber-400/25">
                      {item.badge}
                    </span>
                  )}
                </div>

                <ChevronRight className={`w-4 h-4 mt-1 transition-transform shrink-0 ${
                  isActive ? 'text-amber-400 translate-x-0.5' : 'text-emerald-500 group-hover:text-amber-400 group-hover:translate-x-0.5'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Drawer Bottom Actions */}
        <div className="p-4 border-t border-emerald-900/80 bg-[#01140e] space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            {onOpenCityModal && (
              <button
                onClick={() => {
                  onOpenCityModal();
                  onClose();
                }}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/60 text-xs font-semibold text-emerald-200 transition"
              >
                <Compass size={14} className="text-amber-400" />
                <span>Change City</span>
              </button>
            )}

            {onOpenInstallModal && (
              <button
                onClick={() => {
                  onOpenInstallModal();
                  onClose();
                }}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-xs font-semibold text-amber-300 transition"
              >
                <DownloadCloud size={14} className="text-amber-400" />
                <span>Install APK</span>
              </button>
            )}
          </div>

          <p className="text-[11px] text-emerald-400/60 text-center">
            PWA Offline Enabled · Free from Distractions
          </p>
        </div>

      </div>
    </div>
  );
};
