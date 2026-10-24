import React, { useState } from 'react';
import {
  ALL_ISLAMIC_STORIES,
  IslamicStoryItem,
  StoryCategory,
  searchAllStories,
  getCompleteStoriesByCategory,
} from '../data/islamicStoriesCatalog';
import {
  USER_UPLOADED_STORY_VIDEO,
  USER_UPLOADED_STORY_AUDIO,
} from '../data/islamicStoriesData';
import { useUnifiedPlayer } from '../context/UnifiedPlayerContext';
import {
  Search,
  BookOpen,
  Sparkles,
  Play,
  Pause,
  Video,
  Volume2,
  X,
  ExternalLink,
  ChevronRight,
  Shield,
  Heart,
  Award,
  Layers,
  ArrowRight,
  History,
  CheckCircle,
  Share2,
  Youtube,
} from 'lucide-react';

interface SahabaAndBibisViewProps {
  onBackToHome?: () => void;
  onNavigateToHasiTv?: () => void;
}

export const SahabaAndBibisView: React.FC<SahabaAndBibisViewProps> = ({
  onBackToHome,
  onNavigateToHasiTv,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingStory, setReadingStory] = useState<IslamicStoryItem | null>(null);
  const [readerLanguage, setReaderLanguage] = useState<'ur' | 'en' | 'both'>('ur');

  // Web Speech API Narrator State
  const [isNarrating, setIsNarrating] = useState(false);
  const [narratorLang, setNarratorLang] = useState<'ur' | 'en'>('ur');

  const stopNarration = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsNarrating(false);
  };

  const startNarration = (story: IslamicStoryItem, lang: 'ur' | 'en') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const textToSpeak = lang === 'ur'
      ? (story.urduFullStory || `${story.nameUrdu}. ${story.urduTitle}. ${story.urduBio}`)
      : `${story.nameEnglish}. ${story.shortBio}. ${story.fullStory}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = lang === 'ur' ? 'ur-PK' : 'en-US';
    utterance.rate = lang === 'ur' ? 0.9 : 1.0;

    utterance.onstart = () => {
      setIsNarrating(true);
      setNarratorLang(lang);
    };
    utterance.onend = () => setIsNarrating(false);
    utterance.onerror = () => setIsNarrating(false);

    window.speechSynthesis.speak(utterance);
  };

  // Hook into the single Unified Player
  const {
    activeTrack,
    isPlaying,
    playStoryTrack,
    togglePlay,
    openVideoWatch,
  } = useUnifiedPlayer();

  // Filter and search
  const displayedStories = searchQuery.trim()
    ? searchAllStories(searchQuery, selectedCategory)
    : getCompleteStoriesByCategory(selectedCategory);

  const categories = [
    { id: 'all' as StoryCategory, label: 'All Stories (100+)', urdu: 'تمام واقعات (۱۱۵+)', icon: '📖' },
    { id: 'prophets' as StoryCategory, label: 'All Nabis (26)', urdu: 'تمام انبیاءِ کرام', icon: '✨' },
    { id: 'sahaba' as StoryCategory, label: 'Sahaba (45+)', urdu: 'صحابہ کرام', icon: '🛡️' },
    { id: 'bibis' as StoryCategory, label: 'Bibis & Mothers (22+)', urdu: 'امہات المومنین و صحابیات', icon: '🌸' },
    { id: 'events' as StoryCategory, label: 'Islamic Events (18+)', urdu: 'تاریخی معرکے و واقعات', icon: '⚔️' },
  ];

  // Custom or Uploaded Story Video State
  const [activeStoryVideo, setActiveStoryVideo] = useState<string>(() => {
    try {
      return localStorage.getItem('easy_islam_custom_story_video') || USER_UPLOADED_STORY_VIDEO;
    } catch {
      return USER_UPLOADED_STORY_VIDEO;
    }
  });

  return (
    <div className="space-y-4 pb-20 animate-fade-in text-emerald-50">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-900 border border-amber-500/30 p-4 sm:p-5 shadow-2xl">
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Sparkles size={13} />
              100+ Islamic Stories Library • Read, Listen & Watch
            </span>
            <span className="text-xs font-arabic text-amber-300">مستند تاریخی کتب خانہ</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold font-display text-white tracking-wide">
            Stories of All Nabis, Sahaba, Bibis & Islamic Events
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed font-arabic text-right dir-rtl">
            تمام ۲۶ انبیاءِ کرام، ۴۵+ صحابہ کرام بشمول حضرت سعد بن ابی وقاص رضی اللہ عنہ و ان کے بیٹے عمر بن سعد کا کربلا واقعہ، امہات المومنین اور عظیم تاریخی معرکے۔
          </p>
        </div>
      </div>

      {/* User Uploaded Story Video Active Showcase */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-900/90 via-emerald-950 to-emerald-900/90 border-2 border-amber-400/50 shadow-xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
              Uploaded Video Vault (اختیاری شوکیس)
            </span>
          </div>
          <span className="text-[11px] text-emerald-300 font-arabic">آپ کی اپلوڈ کردہ ویڈیو کا محفوظ پلیئر</span>
        </div>

        <div className="flex items-start gap-3">
          <div
            onClick={() => openVideoWatch(activeStoryVideo, 'Uploaded Islamic Video', 'آپ کی محفوظ اپلوڈ کردہ ویڈیو')}
            className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-2xl overflow-hidden bg-black shrink-0 border border-amber-400/50 cursor-pointer group shadow-md"
          >
            <video
              src={activeStoryVideo}
              className="w-full h-full object-cover group-hover:scale-105 transition"
              muted
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/10 flex items-center justify-center transition">
              <div className="w-9 h-9 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center shadow-lg pl-0.5 group-hover:scale-110 transition active:scale-95">
                <Play size={16} fill="currentColor" />
              </div>
            </div>
            <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-amber-300 font-bold">
              MP4
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-xs sm:text-sm text-white">
              Facebook_4476167232699373_480P_SD__bc9af815.mp4
            </h4>
            <p className="text-[11px] text-emerald-200 mt-0.5 line-clamp-2">
              ہر کہانی اب یوٹیوب کی اصلی مکمل دستاویزی فلم سے منسلک ہے۔ آپ کی یہ ذاتی ویڈیو یہاں محفوظ ہے۔
            </p>

            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
              <button
                onClick={() => openVideoWatch(activeStoryVideo, 'Uploaded Islamic Video', 'آپ کی محفوظ اپلوڈ کردہ ویڈیو')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-emerald-950 text-xs font-bold shadow-md hover:bg-amber-300 transition active:scale-95"
              >
                <Video size={13} />
                <span>Watch Uploaded Video</span>
              </button>

              <button
                onClick={() => {
                  const firstStory = ALL_ISLAMIC_STORIES[0];
                  playStoryTrack(firstStory);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-amber-300 text-xs font-semibold border border-amber-400/40 transition active:scale-95"
              >
                <Volume2 size={13} />
                <span>Play Story Audio (No Quran)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured In-Depth Study: Sa'd ibn Abi Waqqas & Umar ibn Sa'd at Karbala */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/70 via-emerald-950 to-amber-950/70 border-2 border-amber-400/40 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/40">
            <Shield size={22} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">
                Special In-Depth Moral Study
              </span>
              <span className="text-xs font-arabic text-amber-300 font-bold">
                عبرت آموز تقابل: سعد بن ابی وقاص اور عمر بن سعد
              </span>
            </div>
            <h3 className="font-bold text-sm sm:text-base text-white mt-1">
              Hazrat Sa'd ibn Abi Waqqas (RA) & His Son Umar ibn Sa'd at Karbala
            </h3>
            <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
              Discover how the beloved uncle of the Prophet ﷺ strictly shunned civil fitnah, while his son fell victim to the lust for the governorship of Rayy at Karbala—an eternal lesson on parental lineage versus personal responsibility.
            </p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <button
                onClick={() => {
                  const item = ALL_ISLAMIC_STORIES.find(s => s.id === 'saad-bin-abi-waqqas');
                  if (item) setReadingStory(item);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold transition active:scale-95 shadow-md shadow-amber-400/20"
              >
                <BookOpen size={14} />
                <span>Read Full Study</span>
              </button>

              <button
                onClick={() => {
                  const item = ALL_ISLAMIC_STORIES.find(s => s.id === 'saad-bin-abi-waqqas');
                  if (item) playStoryTrack(item);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-emerald-100 text-xs font-semibold border border-emerald-700 transition active:scale-95"
              >
                <Volume2 size={14} className="text-amber-400" />
                <span>Listen Story Audio (پلیئر)</span>
              </button>

              <button
                onClick={() => {
                  const item = ALL_ISLAMIC_STORIES.find(s => s.id === 'saad-bin-abi-waqqas');
                  if (item) openVideoWatch(item.video?.videoUrl || 'Cuqbrwzcy-s', item.nameEnglish, 'HASI TV • واقعۂ کربلا اور سعد بن ابی وقاص');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold border border-red-500/40 transition active:scale-95 shadow-md shadow-red-600/30"
              >
                <Video size={14} />
                <span>Watch Full Documentary (HASI TV)</span>
              </button>

              {onNavigateToHasiTv && (
                <button
                  onClick={onNavigateToHasiTv}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950 hover:bg-red-900 text-red-300 text-xs font-semibold border border-red-500/40 transition active:scale-95"
                >
                  <span>📺 Hasi TV Hub (حسی ٹی وی)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search 100+ stories (e.g., Musa, Saad, Karbala, Aisha, Badr, موسیٰ, سعد)..."
          className="w-full bg-emerald-900/60 border border-emerald-700/80 rounded-2xl py-3 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-emerald-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-inner"
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400" size={16} />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category Pills (Android Touch-Friendly) */}
      <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 pb-1 -mx-1 px-1">
        {categories.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 active:scale-95 ${
                isSelected
                  ? 'bg-amber-400 text-emerald-950 font-bold shadow-md shadow-amber-400/20'
                  : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/80'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-75 font-arabic font-normal">({cat.urdu})</span>
            </button>
          );
        })}
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-emerald-300 px-1">
        <span>Showing {displayedStories.length} authentic Islamic stories</span>
        <span className="text-amber-300 font-arabic">ایک ہی پلیئر میں سب سنیں</span>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 gap-3.5">
        {displayedStories.map(story => {
          const isCurrentPlaying = isPlaying && activeTrack.id === `story-${story.id}`;

          return (
            <div
              key={story.id}
              className={`rounded-2xl p-4 transition-all duration-300 border ${
                story.isSpecialStudy
                  ? 'bg-gradient-to-br from-amber-950/40 via-emerald-950 to-emerald-900 border-amber-400/60 shadow-lg'
                  : 'bg-emerald-900/50 hover:bg-emerald-900/80 border-emerald-800/60'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Thumbnail */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-emerald-700/80 shrink-0 shadow-md">
                  <img
                    src={story.featuredImage}
                    alt={story.nameEnglish}
                    className="w-full h-full object-cover"
                  />
                  {isCurrentPlaying && (
                    <div className="absolute inset-0 bg-emerald-950/60 flex items-center justify-center">
                      <span className="w-4 h-4 rounded-full bg-amber-400 animate-ping" />
                    </div>
                  )}
                  <div className="absolute top-1 left-1 bg-emerald-950/80 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-amber-400/30">
                    {story.category === 'prophets' ? 'نبی' : story.category === 'sahaba' ? 'صحابی' : story.category === 'bibis' ? 'صحابیہ' : 'واقعہ'}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <span className="text-[10px] font-bold text-amber-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-amber-400/20">
                      {story.categoryLabel}
                    </span>
                    <span className="text-xs font-arabic text-amber-300 font-bold truncate">
                      {story.arabicName}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-white mt-1 leading-snug">
                    {story.nameEnglish}
                  </h3>

                  <p className="text-[11px] text-amber-200/90 font-arabic text-right dir-rtl mt-0.5 truncate">
                    {story.urduTitle}
                  </p>

                  <p className="text-xs text-emerald-200/90 line-clamp-2 mt-1 leading-relaxed">
                    {story.shortBio}
                  </p>

                  {/* Actions: READ, LISTEN, VOICE, WATCH */}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {/* READ Button */}
                    <button
                      onClick={() => setReadingStory(story)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition active:scale-95"
                    >
                      <BookOpen size={13} className="text-amber-300" />
                      <span>Read Story</span>
                    </button>

                    {/* LISTEN Button - Routes to Unified Master Player */}
                    <button
                      onClick={() => {
                        if (isCurrentPlaying) {
                          togglePlay();
                        } else {
                          playStoryTrack(story);
                        }
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 shadow-md ${
                        isCurrentPlaying
                          ? 'bg-amber-400 text-emerald-950 shadow-amber-400/30'
                          : 'bg-emerald-950 hover:bg-emerald-900 text-amber-300 border border-amber-400/40'
                      }`}
                    >
                      {isCurrentPlaying ? (
                        <>
                          <Pause size={13} fill="currentColor" />
                          <span>Playing</span>
                        </>
                      ) : (
                        <>
                          <Play size={13} fill="currentColor" />
                          <span>Listen (پلیئر)</span>
                        </>
                      )}
                    </button>

                    {/* Web Speech Voice Narrator Button */}
                    <button
                      onClick={() => {
                        if (isNarrating) {
                          stopNarration();
                        } else {
                          startNarration(story, 'ur');
                        }
                      }}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 border ${
                        isNarrating
                          ? 'bg-amber-400 text-emerald-950 border-amber-300 animate-pulse'
                          : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border-emerald-700'
                      }`}
                      title="Speak story out loud"
                    >
                      <Volume2 size={13} className={isNarrating ? 'text-emerald-950' : 'text-amber-300'} />
                      <span>{isNarrating ? 'Stop' : 'Voice (سنیں)'}</span>
                    </button>

                    {/* WATCH Button */}
                    <button
                      onClick={() => {
                        const targetVideo = story.video?.videoUrl || story.video?.youtubeQuery || 'Cuqbrwzcy-s';
                        openVideoWatch(
                          targetVideo,
                          story.nameEnglish,
                          `${story.video?.speaker || 'HASI TV'} • ${story.urduTitle}`
                        );
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/30 hover:bg-red-600/50 text-red-300 text-xs font-semibold border border-red-500/40 transition active:scale-95"
                    >
                      <Video size={13} className="text-red-400" />
                      <span>Watch Documentary</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* READ FULL STORY MODAL */}
      {readingStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-emerald-950 border border-amber-500/40 rounded-3xl shadow-2xl p-5 sm:p-6 text-emerald-50 max-h-[92vh] overflow-y-auto no-scrollbar">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-emerald-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
                  {readingStory.categoryLabel}
                </span>
                <span className="text-xs font-arabic text-amber-300">{readingStory.arabicName}</span>
                {readingStory.video?.speaker?.includes('HASI TV') && (
                  <span className="px-2 py-0.5 rounded-full bg-red-600/30 text-red-300 text-[10px] font-bold border border-red-500/40">
                    HASI TV Video
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  stopNarration();
                  setReadingStory(null);
                }}
                className="w-8 h-8 rounded-full bg-emerald-900 text-emerald-300 hover:text-white flex items-center justify-center transition active:scale-90"
              >
                <X size={18} />
              </button>
            </div>

            {/* Title & Banner */}
            <div className="my-4">
              <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                {readingStory.nameEnglish}
              </h2>
              <p className="text-sm font-arabic text-amber-300 font-bold text-right dir-rtl mt-1">
                {readingStory.urduTitle}
              </p>
            </div>

            {/* Quick Listen / Voice / Watch inside reader */}
            <div className="p-3.5 bg-emerald-900/60 rounded-2xl border border-emerald-800 flex flex-col gap-2.5 mb-5">
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-300">Voice / Audio:</span>
                  <strong className="text-amber-300">{readingStory.audio.speaker}</strong>
                </div>
                {isNarrating && (
                  <span className="text-amber-400 font-bold animate-pulse text-xs">
                    Speaking in {narratorLang === 'ur' ? 'Urdu (اردو)' : 'English'}...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Unified Audio Player */}
                <button
                  onClick={() => playStoryTrack(readingStory)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-emerald-950 text-xs font-bold transition active:scale-95 shadow-md shadow-amber-400/20"
                >
                  <Play size={13} fill="currentColor" />
                  <span>Listen in Unified Player</span>
                </button>

                {/* Web Speech Urdu Out-Loud */}
                <button
                  onClick={() => {
                    if (isNarrating && narratorLang === 'ur') {
                      stopNarration();
                    } else {
                      startNarration(readingStory, 'ur');
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition active:scale-95 ${
                    isNarrating && narratorLang === 'ur'
                      ? 'bg-amber-400 text-emerald-950 border-amber-300'
                      : 'bg-emerald-950 text-amber-300 border-amber-400/40 hover:bg-emerald-900'
                  }`}
                >
                  <Volume2 size={13} />
                  <span>{isNarrating && narratorLang === 'ur' ? 'Stop Urdu Voice' : 'اردو میں سنیں (Voice)'}</span>
                </button>

                {/* Web Speech English Out-Loud */}
                <button
                  onClick={() => {
                    if (isNarrating && narratorLang === 'en') {
                      stopNarration();
                    } else {
                      startNarration(readingStory, 'en');
                    }
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition active:scale-95 ${
                    isNarrating && narratorLang === 'en'
                      ? 'bg-amber-400 text-emerald-950 border-amber-300'
                      : 'bg-emerald-950 text-emerald-200 border-emerald-700 hover:bg-emerald-900'
                  }`}
                >
                  <Volume2 size={13} />
                  <span>{isNarrating && narratorLang === 'en' ? 'Stop English' : 'Voice (EN)'}</span>
                </button>

                {/* Watch Video (Modal) */}
                <button
                  onClick={() => {
                    const videoId = readingStory.video?.videoUrl || readingStory.video?.youtubeQuery || 'Cuqbrwzcy-s';
                    openVideoWatch(
                      videoId,
                      readingStory.nameEnglish,
                      `${readingStory.video?.speaker || 'HASI TV'} • ${readingStory.urduTitle}`
                    );
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/30 transition active:scale-95"
                >
                  <Video size={13} />
                  <span>Watch Documentary (مکمل دستاویزی فلم)</span>
                </button>

                <a
                  href={`https://www.youtube.com/watch?v=${readingStory.video?.videoUrl || 'Cuqbrwzcy-s'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-red-950 hover:bg-red-900 text-red-200 text-xs font-semibold border border-red-500/40 transition active:scale-95"
                >
                  <Youtube size={13} className="text-red-400" />
                  <span>YouTube App</span>
                  <ExternalLink size={11} />
                </a>

                {onNavigateToHasiTv && (
                  <button
                    onClick={() => {
                      stopNarration();
                      setReadingStory(null);
                      onNavigateToHasiTv();
                    }}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-950 text-red-300 text-xs font-semibold border border-red-500/40 hover:bg-red-900 transition"
                  >
                    <span>📺 Hasi TV Hub</span>
                  </button>
                )}
              </div>
            </div>

            {/* Language Switcher: Full Urdu, Full English, Both */}
            <div className="flex items-center justify-between gap-2 mb-4 bg-emerald-950/90 p-2 rounded-2xl border border-emerald-800 flex-wrap">
              <span className="text-xs font-bold text-amber-300 pl-1">زبان منتخب کریں (Language):</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setReaderLanguage('ur')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition active:scale-95 ${
                    readerLanguage === 'ur'
                      ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/30'
                      : 'bg-emerald-900/60 text-emerald-200 hover:text-white'
                  }`}
                >
                  🇵🇰 مکمل اردو تحریر (Full Urdu)
                </button>
                <button
                  onClick={() => setReaderLanguage('en')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition active:scale-95 ${
                    readerLanguage === 'en'
                      ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/30'
                      : 'bg-emerald-900/60 text-emerald-200 hover:text-white'
                  }`}
                >
                  🇬🇧 Full English Narrative
                </button>
                <button
                  onClick={() => setReaderLanguage('both')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition active:scale-95 ${
                    readerLanguage === 'both'
                      ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/30'
                      : 'bg-emerald-900/60 text-emerald-200 hover:text-white'
                  }`}
                >
                  📖 دونوں (Both)
                </button>
              </div>
            </div>

            {/* Full Written Urdu Story Section (Not Shorts) */}
            {(readerLanguage === 'ur' || readerLanguage === 'both') && (
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-900/40 border border-emerald-800 mb-5 text-right dir-rtl">
                <div className="flex items-center justify-between border-b border-emerald-800/80 pb-2.5 mb-3.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 font-arabic">
                    مفصل و مکمل اردو واقعہ (Full Story)
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-amber-300 font-arabic">
                    {readingStory.nameUrdu}
                  </h4>
                </div>
                <div className="text-xs sm:text-sm text-emerald-50 font-arabic leading-loose space-y-3 whitespace-pre-line text-right">
                  {readingStory.urduFullStory || readingStory.urduBio}
                </div>
              </div>
            )}

            {/* Full Written English Story Section (Not Shorts) */}
            {(readerLanguage === 'en' || readerLanguage === 'both') && (
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-900/30 border border-emerald-800 mb-5">
                <div className="flex items-center justify-between border-b border-emerald-800/80 pb-2.5 mb-3.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-800/60 text-emerald-200 text-xs font-bold border border-emerald-700">
                    Comprehensive English Narrative
                  </span>
                  <h4 className="text-xs font-bold text-emerald-300">
                    {readingStory.roleOrTitle}
                  </h4>
                </div>
                <div className="prose prose-invert max-w-none text-xs sm:text-sm text-emerald-100 leading-relaxed space-y-3">
                  {readingStory.fullStory.split('\n\n').map((paragraph: string, idx: number) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Key Milestones */}
            <div className="mb-5">
              <h4 className="text-xs font-bold text-amber-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle size={14} />
                Key Historical Milestones
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-200">
                {readingStory.keyEvents.map((evt: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 bg-emerald-900/30 p-2 rounded-xl">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{evt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Moral Lesson */}
            <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 mb-4">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles size={14} />
                Core Moral & Spiritual Lesson
              </h4>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                {readingStory.moralLesson}
              </p>
            </div>

            {/* Quran / Hadith Reference */}
            <div className="text-[11px] text-emerald-400 bg-emerald-950 p-2.5 rounded-xl border border-emerald-900 flex items-center justify-between">
              <span>Reference: {readingStory.quranOrHadithRef}</span>
              <span className="text-amber-300 font-arabic">حوالہ قرآن و حدیث</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
