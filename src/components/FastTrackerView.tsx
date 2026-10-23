import React, { useState, useEffect } from 'react';
import { getHijriDate } from '../data/calendar';
import { CheckCircle2, Flame, Heart, Moon, Sun, Calendar, Plus, Trash2, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FastLog {
  id: string;
  dateStr: string;
  type: 'Sunnah Monday/Thursday' | 'White Days (Ayyam al-Beed)' | 'Ramadan' | 'Qada (Make-up)' | 'Voluntary (Nafl)';
  notes?: string;
  completedAt: string;
}

export const FastTrackerView: React.FC = () => {
  const [logs, setLogs] = useState<FastLog[]>(() => {
    try {
      const saved = localStorage.getItem('sike_fast_logs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [fastType, setFastType] = useState<FastLog['type']>('Sunnah Monday/Thursday');
  const [notes, setNotes] = useState('');
  const [showLogForm, setShowLogForm] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('sike_fast_logs', JSON.stringify(logs));
    } catch {
      // ignore
    }
  }, [logs]);

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const hijriToday = getHijriDate(today);

  const isFastingToday = logs.some(log => log.dateStr === todayStr);

  const handleToggleFastToday = () => {
    if (isFastingToday) {
      // Remove today's fast
      setLogs(logs.filter(log => log.dateStr !== todayStr));
    } else {
      // Add today's fast
      const newLog: FastLog = {
        id: Date.now().toString(),
        dateStr: todayStr,
        type: hijriToday.month === 9 ? 'Ramadan' : fastType,
        completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setLogs([newLog, ...logs]);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#34d399', '#fef08a'],
        });
      } catch {
        // silent
      }
    }
  };

  const handleAddManualLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: FastLog = {
      id: Date.now().toString(),
      dateStr: todayStr,
      type: fastType,
      notes: notes.trim() || undefined,
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setLogs([newLog, ...logs]);
    setNotes('');
    setShowLogForm(false);
  };

  const handleDeleteLog = (id: string) => {
    setLogs(logs.filter(l => l.id !== id));
  };

  // Calculate current streak
  const totalFasts = logs.length;
  const ramadanFasts = logs.filter(l => l.type === 'Ramadan').length;
  const sunnahFasts = logs.filter(l => l.type.includes('Sunnah') || l.type.includes('White Days')).length;

  return (
    <div className="space-y-8">
      {/* Today Fasting Action Hero Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#032f24] via-[#022119] to-[#01140e] border border-amber-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
              <Moon className="w-4 h-4 text-amber-400" />
              <span>Sawm (Fasting) Sanctuary</span>
              <span aria-hidden="true">·</span>
              <span>{hijriToday.day} {hijriToday.monthName} {hijriToday.year} AH</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {isFastingToday ? 'You are Fasting Today' : 'Log Today’s Fast'}
            </h2>

            <p className="text-xs sm:text-sm text-emerald-200/80 max-w-md leading-relaxed">
              {isFastingToday
                ? 'May Allah accept your devotion, forgive your shortcomings, and grant you ease until Iftar.'
                : 'Cultivate the prophetic tradition of fasting Mondays, Thursdays, and White Days (13th, 14th, 15th).'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleFastToday}
              className={`px-6 py-3.5 rounded-2xl font-bold text-sm shadow-xl transition-all flex items-center gap-2.5 cursor-pointer ${
                isFastingToday
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-400'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 border border-amber-300 shadow-amber-950/40'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{isFastingToday ? 'Completed / Active Fast' : 'Check-in Fast Today'}</span>
            </button>
          </div>
        </div>

        {/* Essential Fasting Prayers (Niyyah & Iftar) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-800/60">
          {/* Suhur / Niyyah */}
          <div className="bg-[#021812] rounded-2xl p-4 border border-emerald-900/80 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
              <Sun className="w-3.5 h-3.5" />
              <span>Suhur / Intention for Fasting (Niyyah):</span>
            </div>
            <p className="font-arabic text-lg text-amber-200 text-right leading-relaxed" dir="rtl">
              وَبِصَوْمِ غَدٍ نَوَيْتُ مِنْ شَهْرِ رَمَضَانَ / نَوَيْتُ صَوْمَ هٰذَا الْيَوْمِ لِلّٰهِ تَعَالَىٰ
            </p>
            <p className="text-xs text-emerald-200/80 italic">
              "I intend to fast this day sincerely for Allah the Exalted."
            </p>
          </div>

          {/* Iftar Dua */}
          <div className="bg-[#021812] rounded-2xl p-4 border border-emerald-900/80 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
              <Moon className="w-3.5 h-3.5" />
              <span>Sunnah Dua upon Breaking Fast (Iftar):</span>
            </div>
            <p className="font-arabic text-lg text-amber-200 text-right leading-relaxed" dir="rtl">
              ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ
            </p>
            <p className="text-xs text-emerald-200/80 italic">
              "The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills." (Abu Dawud)
            </p>
          </div>
        </div>
      </div>

      {/* Progress & Milestone Metrics (Tabular figures, zero-pill discipline) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-[#04271e] border border-emerald-800/60 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-emerald-300/80 block">Total Fasts Logged</span>
            <span className="text-2xl font-bold font-mono text-white tabular-nums">{totalFasts}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-[#04271e] border border-emerald-800/60 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-emerald-300/80 block">Sunnah / Nafl Fasts</span>
            <span className="text-2xl font-bold font-mono text-white tabular-nums">{sunnahFasts}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-[#04271e] border border-emerald-800/60 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-emerald-300/80 block">Ramadan Fasts</span>
            <span className="text-2xl font-bold font-mono text-white tabular-nums">{ramadanFasts}</span>
          </div>
        </div>
      </div>

      {/* Fasting History & Custom Log Form */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <h3 className="font-display text-base sm:text-lg font-bold text-amber-100">
              Fasting History & Records
            </h3>
          </div>
          <button
            onClick={() => setShowLogForm(!showLogForm)}
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 bg-emerald-900/40 hover:bg-emerald-900/70 border border-emerald-800/80 px-3 py-1.5 rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showLogForm ? 'Close Form' : 'Log Specific Fast'}</span>
          </button>
        </div>

        {/* Custom Fast Log Form */}
        {showLogForm && (
          <form
            onSubmit={handleAddManualLog}
            className="rounded-2xl bg-[#03231b] border border-amber-500/30 p-5 space-y-4"
          >
            <h4 className="text-xs font-bold text-amber-300">Record a Completed Fast:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-emerald-200 block mb-1">Fast Type</label>
                <select
                  value={fastType}
                  onChange={(e) => setFastType(e.target.value as FastLog['type'])}
                  className="w-full bg-[#021812] border border-emerald-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Sunnah Monday/Thursday">Sunnah Monday/Thursday</option>
                  <option value="White Days (Ayyam al-Beed)">White Days (13, 14, 15 Hijri)</option>
                  <option value="Ramadan">Ramadan (Fard)</option>
                  <option value="Qada (Make-up)">Qada (Make-up Fast)</option>
                  <option value="Voluntary (Nafl)">Voluntary (Nafl)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-emerald-200 block mb-1">Notes / Intentions (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Fasted with family, peaceful day"
                  className="w-full bg-[#021812] border border-emerald-700 rounded-xl px-3 py-2 text-xs text-white placeholder-emerald-600 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-semibold text-xs transition cursor-pointer"
            >
              Save to Fast Log
            </button>
          </form>
        )}

        {/* Log List */}
        {logs.length === 0 ? (
          <div className="rounded-2xl bg-[#04271e] border border-emerald-800/60 p-8 text-center text-xs text-emerald-300/70">
            No fasts logged yet. Tap "Check-in Fast Today" to begin your spiritual streak.
          </div>
        ) : (
          <div className="space-y-2.5">
            {logs.map((log) => (
              <div
                key={log.id}
                className="rounded-xl bg-[#04271e] border border-emerald-800/60 p-3.5 sm:px-5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-900 border border-emerald-700/60 flex items-center justify-center text-amber-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">{log.type}</span>
                    <span className="text-[11px] text-emerald-300/70 font-mono">
                      {log.dateStr} {log.notes ? `· ${log.notes}` : ''}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-emerald-400/70 hidden sm:inline">
                    Logged at {log.completedAt}
                  </span>
                  <button
                    onClick={() => handleDeleteLog(log.id)}
                    className="p-1.5 rounded-lg text-emerald-500 hover:text-red-400 hover:bg-emerald-900/40 transition"
                    title="Delete log entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
