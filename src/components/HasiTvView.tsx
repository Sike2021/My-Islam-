import React, { useState, useMemo } from 'react';
import {
  HASI_TV_VIDEOS,
  HASI_TV_CHANNEL_INFO,
  HasiTvVideo,
  HasiTvCategory,
} from '../data/hasiTvData';
import { useUnifiedPlayer } from '../context/UnifiedPlayerContext';
import {
  Youtube,
  Play,
  Pause,
  ExternalLink,
  Search,
  Sparkles,
  Shield,
  Film,
  Volume2,
  Tv,
  CheckCircle,
  Eye,
  Clock,
  Share2,
  Bookmark,
  X,
} from 'lucide-react';

interface HasiTvViewProps {
  onBackToHome?: () => void;
}

export const HasiTvView: React.FC<HasiTvViewProps> = ({ onBackToHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<HasiTvCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredVideoId, setFeaturedVideoId] = useState<string | null>(null);

  // Hook into the single Unified Player
  const {
    activeTrack,
    isPlaying,
    playTrack,
    togglePlay,
    openVideoWatch,
  } = useUnifiedPlayer();

  const categories: { id: HasiTvCategory; label: string; urdu: string; icon: string }[] = [
    { id: 'all', label: 'All Episodes', urdu: 'تمام اقساط', icon: '📺' },
    { id: 'karbala', label: 'Karbala Series', urdu: 'کربلا و اہل بیت', icon: '⚔️' },
    { id: 'sahaba', label: 'Sahaba Stories', urdu: 'قصص الصحابہ', icon: '🛡️' },
    { id: 'prophets', label: 'Prophets & Relics', urdu: 'قصص الانبیاء', icon: '✨' },
    { id: 'history', label: 'Islamic History', urdu: 'اسلامی تاریخ', icon: '📜' },
    { id: 'endtimes', label: 'End Times & Dajjal', urdu: 'علامات قیامت', icon: '⏳' },
    { id: 'mysteries', label: 'Unseen & Mysteries', urdu: 'عالمِ غیب و اسرار', icon: '🌌' },
  ];

  const filteredVideos = useMemo(() => {
    return HASI_TV_VIDEOS.filter(video => {
      const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        video.title.toLowerCase().includes(q) ||
        video.urduTitle.toLowerCase().includes(q) ||
        video.description.toLowerCase().includes(q) ||
        video.urduDescription.toLowerCase().includes(q) ||
        video.tags.some(t => t.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  // Play audio in the Single Unified Master Player
  const handlePlayAudio = (video: HasiTvVideo) => {
    // If currently playing this audio track, toggle play
    if (activeTrack.id === `hasitv-${video.id}` && isPlaying) {
      togglePlay();
      return;
    }

    playTrack({
      id: `hasitv-${video.id}`,
      type: 'story',
      title: video.title,
      subtitle: `Hasi TV • ${HASI_TV_CHANNEL_INFO.creator} (${video.categoryLabel})`,
      arabicTitle: 'حسی ٹی وی دستاویزی سیریز',
      urduTitle: video.urduTitle,
      // Uses authentic story audio
      audioUrl: video.audioFallbackUrl || '/assets/aistudio/user_story_audio.mp3',
      videoUrl: video.youtubeId,
      coverImage: video.thumbnail,
      categoryBadge: `Hasi TV • ${video.categoryLabel}`,
      details: video.urduDescription,
    });
  };

  return (
    <div className="space-y-4 pb-24 animate-fade-in text-emerald-50">
      {/* Official Hasi TV Channel Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-950 via-emerald-950 to-neutral-950 border border-red-500/40 p-4 sm:p-5 shadow-2xl">
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/30 text-red-300 text-xs font-bold border border-red-500/50">
                <Tv size={14} className="text-red-400" />
                <span>HASI TV OFFICIAL HUB</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-semibold border border-amber-400/30">
                {HASI_TV_CHANNEL_INFO.subscribers} Subscribers
              </span>
            </div>

            <a
              href={HASI_TV_CHANNEL_INFO.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition active:scale-95 shadow-md shadow-red-600/30"
            >
              <Youtube size={14} />
              <span>Visit YouTube</span>
              <ExternalLink size={11} />
            </a>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 p-0.5 shadow-xl shrink-0">
              <div className="w-full h-full bg-neutral-950 rounded-[14px] flex flex-col items-center justify-center text-center p-1">
                <span className="text-lg font-black text-red-500 font-display tracking-tight leading-none">HASI</span>
                <span className="text-[10px] font-bold text-amber-400 tracking-widest leading-none mt-0.5">TV</span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-2xl font-bold font-display text-white tracking-wide">
                  {HASI_TV_CHANNEL_INFO.name} • {HASI_TV_CHANNEL_INFO.creator}
                </h1>
                <CheckCircle size={16} className="text-amber-400 fill-amber-400/20 shrink-0" />
              </div>
              <p className="text-xs sm:text-sm font-arabic text-amber-300 font-bold dir-rtl text-right mt-0.5">
                حسی ٹی وی - حسیب شفقت (مستند اسلامی تاریخ، کربلا، صحابہ اور سائنسی حقائق)
              </p>
              <p className="text-xs text-emerald-200/90 mt-1 leading-relaxed line-clamp-2">
                {HASI_TV_CHANNEL_INFO.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Cinema Player (When a video is actively selected inline) */}
      {featuredVideoId && (
        <div className="relative rounded-3xl overflow-hidden bg-black border border-amber-400/40 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between p-3 bg-neutral-900 border-b border-neutral-800">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Film size={14} className="text-red-400" />
              Playing Hasi TV Documentary
            </span>
            <button
              onClick={() => setFeaturedVideoId(null)}
              className="w-7 h-7 rounded-full bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center active:scale-90"
            >
              <X size={15} />
            </button>
          </div>
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${featuredVideoId}?autoplay=1&rel=0`}
              title="Hasi TV Documentary"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search Hasi TV (e.g. Karbala, Saad, Umar, Dajjal, Taboot, یونس, کربلا)..."
          className="w-full bg-emerald-900/60 border border-emerald-700/80 rounded-2xl py-3 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-emerald-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 shadow-inner"
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

      {/* Category Pills (Android Touch Friendly) */}
      <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 pb-1 -mx-1 px-1">
        {categories.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 active:scale-95 ${
                isSelected
                  ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/30'
                  : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/80'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-80 font-arabic font-normal">({cat.urdu})</span>
            </button>
          );
        })}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-emerald-300 px-1">
        <span>Found {filteredVideos.length} documentary investigations</span>
        <span className="text-amber-300 font-arabic">ویڈیو دیکھیں اور آڈیو سنیں</span>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 gap-3.5">
        {filteredVideos.map(video => {
          const isCurrentAudioPlaying = isPlaying && activeTrack.id === `hasitv-${video.id}`;

          return (
            <div
              key={video.id}
              className="bg-emerald-900/50 hover:bg-emerald-900/80 border border-emerald-800/70 rounded-2xl p-3.5 sm:p-4 transition-all duration-300 shadow-lg flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                {/* Video Thumbnail */}
                <div
                  onClick={() => openVideoWatch(video.youtubeId, video.title, video.urduTitle)}
                  className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden bg-black shrink-0 border border-red-500/30 cursor-pointer group shadow-md"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Play overlay button */}
                  <div className="absolute inset-0 bg-black/35 group-hover:bg-black/10 flex items-center justify-center transition">
                    <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition active:scale-95 pl-0.5">
                      <Play size={16} fill="currentColor" />
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/85 text-[10px] font-mono font-bold text-white">
                    {video.duration}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <span className="text-[10px] font-bold text-red-300 bg-red-950/80 px-2 py-0.5 rounded-full border border-red-500/30">
                      {video.categoryLabel}
                    </span>
                    <span className="text-[11px] text-amber-300 font-mono flex items-center gap-1">
                      <Eye size={12} />
                      {video.viewsEstimate} views
                    </span>
                  </div>

                  <h3
                    onClick={() => openVideoWatch(video.youtubeId, video.title, video.urduTitle)}
                    className="font-bold text-xs sm:text-sm text-white mt-1 leading-snug line-clamp-2 hover:text-amber-300 cursor-pointer transition"
                  >
                    {video.title}
                  </h3>

                  <p className="text-[11px] text-amber-200/90 font-arabic text-right dir-rtl mt-0.5 truncate">
                    {video.urduTitle}
                  </p>

                  <p className="text-[11px] text-emerald-200/80 line-clamp-2 mt-1 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Watch Video, Play Audio in Unified Player, Watch on YouTube */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-emerald-800/60 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Watch Video (Modal or Inline) */}
                  <button
                    onClick={() => openVideoWatch(video.youtubeId, video.title, video.urduTitle)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition active:scale-95 shadow-md shadow-red-600/20"
                  >
                    <Play size={13} fill="currentColor" />
                    <span>Watch Video</span>
                  </button>

                  {/* Inline Cinema mode */}
                  <button
                    onClick={() => setFeaturedVideoId(video.youtubeId)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold border border-neutral-700 transition active:scale-95"
                    title="Play inline on page"
                  >
                    <Film size={13} className="text-amber-400" />
                    <span>Cinema Mode</span>
                  </button>

                  {/* Listen in Unified Player */}
                  <button
                    onClick={() => handlePlayAudio(video)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 shadow-md ${
                      isCurrentAudioPlaying
                        ? 'bg-amber-400 text-emerald-950 shadow-amber-400/30'
                        : 'bg-emerald-950 hover:bg-emerald-900 text-amber-300 border border-amber-400/40'
                    }`}
                  >
                    {isCurrentAudioPlaying ? (
                      <>
                        <Pause size={13} fill="currentColor" />
                        <span>Playing Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 size={13} className="text-amber-400" />
                        <span>Listen Audio (پلیئر)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Link to YouTube */}
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-red-300 hover:text-white transition py-1"
                >
                  <Youtube size={13} />
                  <span>YouTube</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
