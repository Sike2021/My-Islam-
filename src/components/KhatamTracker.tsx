import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Flame,
  History,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import {
  SURAHS_METADATA,
  JUZ_DATA,
  TOTAL_QURAN_VERSES,
  TOTAL_QURAN_JUZ,
  formatKhatamStats,
} from '../data/quranMetadata';
import { LastPosition, ListeningHistoryEntry } from '../hooks/useQuranAudio';

interface KhatamTrackerProps {
  lastPosition: LastPosition;
  history: ListeningHistoryEntry[];
  onResumeListening: () => void;
  onSelectSurah: (surahNumber: number) => void;
  onClearHistory: () => void;
}

export const KhatamTracker: React.FC<KhatamTrackerProps> = ({
  lastPosition,
  history,
  onResumeListening,
  onSelectSurah,
  onClearHistory,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'juz_map' | 'history'>('overview');
  const [targetDays, setTargetDays] = useState<number>(30); // 30-day Ramadan or monthly Khatam

  const lastSurahMeta =
    SURAHS_METADATA.find(s => s.number === lastPosition.surahNumber) || SURAHS_METADATA[0];

  // Calculate live Khatam statistics
  const stats = formatKhatamStats(lastPosition.surahNumber, lastPosition.ayahNumber);

  // Calculate total listening time from history
  const totalSecondsListened = history.reduce((acc, cur) => acc + (cur.durationSeconds || 0), 0);
  const totalHours = (totalSecondsListened / 3600).toFixed(1);
  const totalMinutes = Math.round(totalSecondsListened / 60);

  // Daily target recommendation
  const versesRemaining = Math.max(0, TOTAL_QURAN_VERSES - stats.completedVerses);
  const versesPerDay = Math.ceil(versesRemaining / targetDays);
  const estimatedMinsPerDay = Math.ceil((versesPerDay * 0.45)); // ~27-30s per verse average

  // Format date for history items
  const formatHistoryDate = (timestamp: number) => {
    const d = new Date(timestamp);
    const isToday = new Date().toDateString() === d.toDateString();
    const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (isToday) return `Today at ${timeStr}`;
    return `${d.toLocaleDateString([], { month: 'short', day: 'numeric' })} at ${timeStr}`;
  };

  const formatDurationDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Primary Khatam Progress Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-950 border border-amber-500/30 p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30">
              <Award size={20} />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white font-display">Khatam Progress</h2>
              <p className="text-xs text-emerald-300/80">Track your journey through the Holy Quran</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {stats.percentage}%
          </span>
        </div>

        {/* Highlighted exact quote: "You listened to X Juz - Y% completed" */}
        <div className="bg-emerald-950/70 border border-amber-500/20 rounded-2xl p-4 mb-4 text-center">
          <div className="text-xs text-amber-400/90 uppercase tracking-widest font-mono font-semibold mb-1">
            Current Khatam Status
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight">
            &ldquo;{stats.summary}&rdquo;
          </div>
          <p className="text-xs text-emerald-300/70 mt-1">
            {stats.completedVerses.toLocaleString()} of {TOTAL_QURAN_VERSES.toLocaleString()} Ayahs listened
          </p>
        </div>

        {/* Progress Bar with Juz markers */}
        <div className="space-y-1.5 mb-5">
          <div className="h-3 w-full bg-emerald-950 rounded-full overflow-hidden p-0.5 border border-emerald-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500 shadow-sm transition-all duration-700 ease-out"
              style={{ width: `${Math.max(2, stats.percentage)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-emerald-400/80 font-mono">
            <span>Al-Fatihah (Juz 1)</span>
            <span>Juz 15 (Midway)</span>
            <span>An-Nas (Juz 30)</span>
          </div>
        </div>

        {/* Quick Resume Listening Card */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-emerald-800/50 to-emerald-900/60 border border-emerald-700/60 shadow-md">
          <div className="flex-1 pr-3">
            <div className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
              Saved Bookmark
            </div>
            <div className="text-sm font-bold text-white truncate">
              Surah {lastSurahMeta.number}. {lastSurahMeta.nameEnglish} ({lastSurahMeta.nameArabic})
            </div>
            <div className="text-xs text-emerald-300/80">
              Ayah {lastPosition.ayahNumber} of {lastSurahMeta.totalVerses} &bull; Juz {lastSurahMeta.startJuz}
            </div>
          </div>
          <button
            onClick={onResumeListening}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs shadow-md shadow-amber-500/20 active:scale-95 transition"
          >
            <Play size={14} fill="currentColor" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mini 3-col stats */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-emerald-900/60 text-center">
          <div className="p-2 rounded-xl bg-emerald-950/60">
            <div className="text-[10px] text-emerald-400">Juz Completed</div>
            <div className="text-base font-bold text-white font-mono">{stats.completedJuz} / 30</div>
          </div>
          <div className="p-2 rounded-xl bg-emerald-950/60">
            <div className="text-[10px] text-emerald-400">Total Time</div>
            <div className="text-base font-bold text-amber-300 font-mono">{totalMinutes}m</div>
          </div>
          <div className="p-2 rounded-xl bg-emerald-950/60">
            <div className="text-[10px] text-emerald-400">Sessions</div>
            <div className="text-base font-bold text-white font-mono">{history.length}</div>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex rounded-2xl bg-emerald-950 p-1 border border-emerald-800/80">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'overview'
              ? 'bg-amber-500 text-emerald-950 shadow font-bold'
              : 'text-emerald-300 hover:text-white'
          }`}
        >
          Khatam Goal
        </button>
        <button
          onClick={() => setActiveTab('juz_map')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'juz_map'
              ? 'bg-amber-500 text-emerald-950 shadow font-bold'
              : 'text-emerald-300 hover:text-white'
          }`}
        >
          30 Juz Map
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'history'
              ? 'bg-amber-500 text-emerald-950 shadow font-bold'
              : 'text-emerald-300 hover:text-white'
          }`}
        >
          Listening History ({history.length})
        </button>
      </div>

      {/* TAB 1: Khatam Goal Planner */}
      {activeTab === 'overview' && (
        <div className="rounded-3xl bg-emerald-900/40 border border-emerald-800/70 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="text-amber-400 w-5 h-5" />
              <h3 className="font-bold text-sm text-white font-display">Khatam Goal Planner</h3>
            </div>
            <div className="flex gap-1.5">
              {[15, 30, 60].map(days => (
                <button
                  key={days}
                  onClick={() => setTargetDays(days)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                    targetDays === days
                      ? 'bg-amber-500 text-emerald-950 font-bold'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {days}d
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 space-y-2">
            <div className="text-xs text-emerald-300">
              To complete your Khatam in <strong className="text-amber-300">{targetDays} days</strong>:
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-emerald-900/50 text-center border border-emerald-800/40">
                <div className="text-[11px] text-emerald-400">Daily Listening Target</div>
                <div className="text-lg font-bold text-amber-300 font-mono mt-0.5">
                  ~{estimatedMinsPerDay} mins/day
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-900/50 text-center border border-emerald-800/40">
                <div className="text-[11px] text-emerald-400">Daily Portion</div>
                <div className="text-lg font-bold text-white font-mono mt-0.5">
                  {(30 / targetDays).toFixed(1)} Juz/day
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-emerald-300/80 leading-relaxed">
            Tip: Setting the <span className="text-amber-300 font-medium">Auto Recitation Timer</span> to {Math.min(30, estimatedMinsPerDay)} minutes after Fajr and Maghrib allows you to effortlessly achieve your Khatam!
          </div>
        </div>
      )}

      {/* TAB 2: Interactive 30 Juz Map */}
      {activeTab === 'juz_map' && (
        <div className="rounded-3xl bg-emerald-900/40 border border-emerald-800/70 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white font-display">All 30 Juz Progress</h3>
            <span className="text-xs text-emerald-400">Tap to jump to Juz</span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {JUZ_DATA.map(juz => {
              const isPassed = stats.completedJuz >= juz.juzNumber;
              const isCurrent = Math.floor(stats.completedJuz) + 1 === juz.juzNumber;

              return (
                <button
                  key={juz.juzNumber}
                  onClick={() => onSelectSurah(juz.startSurah)}
                  className={`p-2.5 rounded-2xl border text-center transition active:scale-95 flex flex-col items-center justify-center ${
                    isPassed
                      ? 'bg-amber-500/20 border-amber-400/80 text-amber-300 shadow-sm'
                      : isCurrent
                      ? 'bg-emerald-800 border-amber-400 text-white animate-pulse'
                      : 'bg-emerald-950/60 border-emerald-800/60 text-emerald-400 hover:bg-emerald-900/60'
                  }`}
                >
                  <span className="text-xs font-mono font-bold">Juz {juz.juzNumber}</span>
                  <span className="text-[10px] font-arabic mt-0.5 opacity-90 truncate max-w-full">
                    {juz.nameArabic}
                  </span>
                  {isPassed ? (
                    <CheckCircle size={12} className="text-amber-400 mt-1" />
                  ) : (
                    <span className="text-[9px] text-emerald-400/70 mt-1 font-mono">
                      {juz.totalVerses}v
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Listening History */}
      {activeTab === 'history' && (
        <div className="rounded-3xl bg-emerald-900/40 border border-emerald-800/70 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <History className="text-amber-400 w-4 h-4" />
              <h3 className="font-bold text-sm text-white font-display">Listening History</h3>
            </div>
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="text-xs text-emerald-400 hover:text-red-400 flex items-center gap-1 transition"
              >
                <Trash2 size={12} />
                <span>Clear</span>
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="p-8 text-center text-xs text-emerald-400/70 bg-emerald-950/50 rounded-2xl border border-emerald-800/40">
              No listening sessions recorded yet. Start an Auto Recitation to begin tracking!
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {history.map(item => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-800/70 flex items-center justify-between hover:border-emerald-700 transition"
                >
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Surah {item.surahNumber}. {item.surahNameEnglish} ({item.surahNameArabic})
                    </div>
                    <div className="text-[11px] text-emerald-400/80 mt-0.5">
                      Reciter: <span className="text-amber-300">{item.qariName}</span> &bull; {formatHistoryDate(item.timestamp)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                      {formatDurationDisplay(item.durationSeconds)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
