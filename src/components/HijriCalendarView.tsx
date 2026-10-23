import React, { useState } from 'react';
import { getHijriDate, MAJOR_ISLAMIC_EVENTS, ISLAMIC_MONTHS } from '../data/calendar';
import { Calendar as CalendarIcon, Moon, ChevronLeft, ChevronRight, Star, Clock } from 'lucide-react';

export const HijriCalendarView: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);

  const today = new Date();
  const currentHijri = getHijriDate(today, offset);

  // Check if today is a Sunnah fast day
  const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, 4 is Thursday
  const isMondayOrThursday = dayOfWeek === 1 || dayOfWeek === 4;
  const isWhiteDay = currentHijri.day >= 13 && currentHijri.day <= 15;
  const isSunnahFastToday = isMondayOrThursday || isWhiteDay || currentHijri.month === 9;

  return (
    <div className="space-y-8">
      {/* Current Hijri Date Focal Hero Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#032d22] via-[#022119] to-[#01140e] border border-amber-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Celestial Moon Glow */}
        <div className="absolute top-4 right-4 text-amber-400/20 pointer-events-none">
          <Moon className="w-32 h-32" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
              <Moon className="w-4 h-4 text-amber-400" />
              <span>Umm al-Qura Hijri Calendar</span>
              {currentHijri.isSacredMonth && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-400 font-semibold">Sacred Month (شهر حرام)</span>
                </>
              )}
            </div>

            {/* Arabic Big Date Display */}
            <div className="flex flex-col">
              <h2 className="font-arabic text-3xl sm:text-5xl text-amber-200 leading-normal" dir="rtl">
                {currentHijri.day} {currentHijri.arabicMonthName} {currentHijri.year} هـ
              </h2>
              <p className="font-display text-lg sm:text-2xl font-bold text-white tracking-wide mt-1">
                {currentHijri.day} {currentHijri.monthName} {currentHijri.year} AH
              </p>
              <p className="text-xs text-emerald-300/80 mt-1">
                Gregorian: {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Fasting Recommendation Banner */}
            {isSunnahFastToday && (
              <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/40 px-3.5 py-1.5 rounded-xl text-xs text-amber-200 font-medium">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {currentHijri.month === 9
                    ? 'Blessed Ramadan: Fard Obligatory Fast Today'
                    : isWhiteDay
                    ? `Ayyam al-Beed (White Days Fast): Day ${currentHijri.day} of the lunar month`
                    : `Sunnah Fasting: Today is ${dayOfWeek === 1 ? 'Monday' : 'Thursday'}`}
                </span>
              </div>
            )}
          </div>

          {/* Moon Sighting Adjuster */}
          <div className="bg-[#021812] border border-emerald-800/80 p-4 rounded-2xl flex flex-col justify-center space-y-2 shrink-0 md:min-w-[220px]">
            <div className="flex items-center justify-between text-xs text-emerald-300">
              <span className="font-medium">Local Moon Sighting:</span>
              <span className="text-amber-400 font-mono font-bold">
                {offset === 0 ? 'Exact (0)' : offset > 0 ? `+${offset} Day` : `${offset} Day`}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setOffset(prev => Math.max(prev - 1, -2))}
                className="flex-1 py-1 px-2 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-xs font-semibold text-emerald-200 flex items-center justify-center transition"
                title="Subtract 1 day for local sighting"
              >
                <ChevronLeft className="w-3.5 h-3.5 mr-0.5" /> -1d
              </button>
              <button
                onClick={() => setOffset(0)}
                className="py-1 px-2.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-xs text-emerald-300 transition"
                title="Reset to default"
              >
                Reset
              </button>
              <button
                onClick={() => setOffset(prev => Math.min(prev + 1, 2))}
                className="flex-1 py-1 px-2 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-xs font-semibold text-emerald-200 flex items-center justify-center transition"
                title="Add 1 day for local sighting"
              >
                +1d <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
            <p className="text-[10px] text-emerald-400/60 leading-tight">
              Adjust if your local crescent moon announcement differs by a day.
            </p>
          </div>
        </div>
      </div>

      {/* Islamic Months Reference Ribbon */}
      <div className="space-y-3">
        <h3 className="font-display text-base sm:text-lg font-bold text-amber-100 flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-amber-400" />
          <span>The Twelve Sacred Lunar Months</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {ISLAMIC_MONTHS.map((m) => {
            const isCurrent = m.index === currentHijri.month;
            return (
              <div
                key={m.index}
                className={`rounded-xl p-3 border transition-all text-center ${
                  isCurrent
                    ? 'bg-amber-500/20 border-amber-400 shadow-md ring-1 ring-amber-400/40'
                    : 'bg-[#04271e] border-emerald-800/60 hover:border-emerald-700'
                }`}
              >
                <span className="text-[10px] text-emerald-400 block font-mono">
                  {m.index < 10 ? `0${m.index}` : m.index}
                </span>
                <p className="font-arabic text-base sm:text-lg text-amber-200 mt-0.5">
                  {m.arabic}
                </p>
                <p className="text-xs font-semibold text-white truncate mt-0.5">
                  {m.name}
                </p>
                {m.isSacred && (
                  <span className="text-[9px] text-amber-300 font-medium block mt-1">
                    Sacred (حرام)
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Blessed Milestones & Historical Events */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-base sm:text-lg font-bold text-amber-100 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" />
            <span>Notable Islamic Occasions & Milestones</span>
          </h3>
          <span className="text-xs text-emerald-300/80">Annual Lunar Observances</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MAJOR_ISLAMIC_EVENTS.map((event, index) => {
            const isEventCurrentMonth = event.hijriMonth === currentHijri.month;
            return (
              <div
                key={index}
                className={`rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                  isEventCurrentMonth
                    ? 'bg-[#053b2e] border-amber-400/60 shadow-lg ring-1 ring-amber-400/20'
                    : 'bg-[#04271e] border-emerald-800/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-amber-300/90 font-medium mb-1.5">
                    <span className="font-mono">
                      {event.hijriDay} {event.monthName}
                    </span>
                    <span className="font-arabic text-sm text-amber-400">{event.arabicTitle}</span>
                  </div>

                  <h4 className="font-display text-sm font-bold text-white mb-1.5">
                    {event.title}
                  </h4>

                  <p className="text-xs text-emerald-200/80 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {event.isFastingRecommended && (
                  <div className="mt-3 pt-2.5 border-t border-emerald-900/60 flex items-center gap-1.5 text-[11px] text-amber-300 font-medium">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>Recommended Sunnah / Prescribed Fasting</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
