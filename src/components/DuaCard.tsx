import React from 'react';
import { DuaItem } from '../data/duas';
import { Volume2, Image as ImageIcon, Heart, ChevronRight } from 'lucide-react';

interface DuaCardProps {
  dua: DuaItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelect: (dua: DuaItem) => void;
  onQuickPlay: (dua: DuaItem, e: React.MouseEvent) => void;
}

export const DuaCard: React.FC<DuaCardProps> = ({
  dua,
  isBookmarked,
  onToggleBookmark,
  onSelect,
  onQuickPlay,
}) => {
  return (
    <div
      onClick={() => onSelect(dua)}
      className="group relative rounded-2xl bg-[#04271e] hover:bg-[#063529] border border-emerald-800/50 hover:border-amber-500/40 p-5 transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl hover:shadow-emerald-950/40 flex flex-col justify-between"
    >
      <div>
        {/* Top unboxed metadata line (Zero-Pill discipline) */}
        <div className="flex items-center justify-between gap-2 mb-3 text-xs text-amber-300/80">
          <div className="flex items-center gap-1.5 font-medium tracking-wide">
            <span>{dua.category}</span>
            <span aria-hidden="true">·</span>
            <span>{dua.recommendedCount}x Recitation</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => onToggleBookmark(dua.id, e)}
              className="p-1.5 rounded-lg text-emerald-400 hover:text-amber-400 hover:bg-emerald-900/50 transition-colors"
              title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
            >
              <Heart
                className={`w-4 h-4 ${
                  isBookmarked ? 'fill-amber-400 text-amber-400' : 'text-emerald-400'
                }`}
              />
            </button>
            <button
              onClick={(e) => onQuickPlay(dua, e)}
              className="p-1.5 rounded-lg text-emerald-400 hover:text-amber-400 hover:bg-emerald-900/50 transition-colors"
              title="Listen to recitation"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-base sm:text-lg font-bold text-amber-100 group-hover:text-amber-300 transition-colors mb-2 leading-snug">
          {dua.title}
        </h3>

        {/* Arabic Calligraphy Snippet */}
        <div className="bg-[#021812] rounded-xl p-3.5 mb-3.5 border border-emerald-900/80 text-right">
          <p className="font-arabic text-xl sm:text-2xl text-amber-200/90 leading-relaxed truncate">
            {dua.arabicText}
          </p>
        </div>

        {/* Roman Urdu / English Excerpt */}
        {dua.romanUrdu && (
          <p className="text-xs text-emerald-200/90 line-clamp-2 italic mb-2">
            "{dua.romanUrdu}"
          </p>
        )}
        <p className="text-xs text-emerald-300/70 line-clamp-2 leading-relaxed">
          {dua.urduTranslation}
        </p>
      </div>

      {/* Card Footer with Image thumbnail indicator and chevron */}
      <div className="mt-4 pt-3 border-t border-emerald-900/60 flex items-center justify-between text-xs text-emerald-400/80">
        <div className="flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-amber-400/80" />
          <span className="text-[11px] font-medium text-emerald-300/90">
            {dua.images.length} Original Source Sheet{dua.images.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex items-center gap-1 text-amber-400 font-medium group-hover:translate-x-1 transition-transform">
          <span>Read & Recite</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
