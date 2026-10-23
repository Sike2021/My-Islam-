import React, { useState } from 'react';
import { REFLECTIONS_DATA, ReflectionItem } from '../data/reflections';
import { BookOpen, Copy, Check, Quote, Compass } from 'lucide-react';

export const ReflectionsView: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const themes = ['all', 'Tawakkul', 'Sabr & Hope', 'Kindness', 'Repentance', 'Gratitude', 'Dhikr'];

  const filteredReflections = selectedTheme === 'all'
    ? REFLECTIONS_DATA
    : REFLECTIONS_DATA.filter(r => r.theme === selectedTheme);

  const featured = REFLECTIONS_DATA[0];

  const handleCopy = (item: ReflectionItem) => {
    const quote = `"${item.englishTranslation}"\n\nUrdu: ${item.urduTranslation}\n\n— ${item.source}\nReflected from Sike's Perspective on Islam`;
    navigator.clipboard.writeText(quote);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Featured Daily Reflection Card */}
      <section className="relative rounded-3xl bg-gradient-to-br from-[#032d22] via-[#022119] to-[#011711] border border-amber-500/40 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Subtle geometric background watermark */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-amber-300">
          <Quote className="w-48 h-48 -mr-12 -mt-12" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between text-xs text-amber-300 font-medium">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Daily Quran & Hadith Sanctuary</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{featured.theme}</span>
            </div>
            <span>{featured.source}</span>
          </div>

          {/* Arabic Core */}
          <div className="bg-[#021711]/90 rounded-2xl p-5 border border-amber-500/20 text-right">
            <p className="font-arabic text-xl sm:text-2xl text-amber-200 leading-[2.3]" dir="rtl">
              {featured.arabic}
            </p>
          </div>

          {/* Urdu Translation */}
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed text-right font-medium" dir="rtl">
            {featured.urduTranslation}
          </p>

          {/* English Translation */}
          <blockquote className="text-xs sm:text-sm text-emerald-200/90 border-l-2 border-amber-500/50 pl-3.5 italic leading-relaxed">
            "{featured.englishTranslation}"
          </blockquote>

          {/* Heart Reflection Takeaway */}
          <div className="pt-3 border-t border-emerald-800/60 bg-[#021d16]/70 p-4 rounded-xl">
            <h4 className="text-xs font-bold text-amber-300 mb-1">Spiritual Takeaway:</h4>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              {featured.takeaway}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-emerald-400/80">
              {featured.contextNarrator || 'Authentic Islamic Tradition'}
            </span>
            <button
              onClick={() => handleCopy(featured)}
              className="flex items-center gap-1.5 text-xs font-medium text-amber-300 hover:text-white bg-emerald-900/60 hover:bg-emerald-800/80 px-3 py-1.5 rounded-lg border border-emerald-700/60 transition"
            >
              {copiedId === featured.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Share Reflection</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Theme Filter Bar (functional buttons) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-amber-100">
            Sacred Wisdom Collection
          </h3>
          <span className="text-xs text-emerald-300/80 font-mono">
            {filteredReflections.length} Reflection{filteredReflections.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedTheme === theme
                  ? 'bg-amber-500 text-emerald-950 font-semibold shadow-md'
                  : 'bg-[#04281f] text-emerald-200/80 hover:text-white hover:bg-[#063529] border border-emerald-800/50'
              }`}
            >
              {theme === 'all' ? 'All Wisdom' : theme}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Reflections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredReflections.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-[#04271e] border border-emerald-800/60 hover:border-amber-500/40 p-5 flex flex-col justify-between transition-all shadow-md hover:shadow-lg space-y-4"
          >
            <div>
              {/* Unboxed Metadata Header */}
              <div className="flex items-center justify-between text-xs text-amber-300/80 mb-2 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="uppercase tracking-wider text-[11px] font-bold text-amber-400">
                    {item.type === 'hadith' ? 'Hadith Sharif' : 'Noble Quran'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{item.theme}</span>
                </div>
                <span className="text-[11px] text-emerald-400/80">{item.source}</span>
              </div>

              {/* Arabic */}
              <div className="bg-[#021812] rounded-xl p-4 border border-emerald-900/80 mb-3 text-right">
                <p className="font-arabic text-lg sm:text-xl text-amber-200/90 leading-loose line-clamp-3" dir="rtl">
                  {item.arabic}
                </p>
              </div>

              {/* Urdu Translation */}
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed text-right mb-2 font-medium" dir="rtl">
                {item.urduTranslation}
              </p>

              {/* English */}
              <p className="text-xs text-emerald-300/80 italic leading-relaxed mb-3">
                "{item.englishTranslation}"
              </p>

              {/* Takeaway */}
              <div className="bg-emerald-950/60 p-3 rounded-lg border border-emerald-900/60">
                <p className="text-xs text-emerald-200/90 leading-normal">
                  <strong className="text-amber-400">Reflection:</strong> {item.takeaway}
                </p>
              </div>
            </div>

            {/* Bottom Card Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-emerald-900/60">
              <span className="text-[11px] text-emerald-400/70 truncate max-w-[200px]">
                {item.contextNarrator || item.source}
              </span>
              <button
                onClick={() => handleCopy(item)}
                className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 p-1 rounded"
              >
                {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
