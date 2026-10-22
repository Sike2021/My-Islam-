import React, { useState } from 'react';
import {
  Play,
  Pause,
  Clock,
  Sparkles,
  RotateCcw,
  Volume2,
  Calendar,
  Sun,
  Plus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Mic,
  Repeat,
} from 'lucide-react';
import { PrayerTimeSchedule, addMinutesToTimeString } from '../utils/prayerTimes';
import { LastPosition, RecitationSequenceMode, ActivePhase } from '../hooks/useQuranAudio';
import { SURAHS_METADATA } from '../data/quranMetadata';

export interface RecitationAlarm {
  id: string;
  name: string;
  timeDisplay: string;
  durationMinutes: number;
  mode: 'always_start' | 'continue_last';
  linkedPrayer?: string;
  enabled: boolean;
}

interface AutoRecitationTimerProps {
  isPlaying: boolean;
  isTimerActive: boolean;
  timerTotalMinutes: number;
  timerRemainingSeconds: number;
  timerMode: 'always_start' | 'continue_last';
  sequenceMode: RecitationSequenceMode;
  activePhase: ActivePhase;
  currentAyahNumber: number;
  lastPosition: LastPosition;
  prayerTimes: PrayerTimeSchedule;
  qariName: string;
  onStartTimer: (minutes: number, mode: 'always_start' | 'continue_last') => void;
  onStopTimer: () => void;
  onToggleSequenceMode: () => void;
  onOpenQariModal: () => void;
}

export const AutoRecitationTimer: React.FC<AutoRecitationTimerProps> = ({
  isPlaying,
  isTimerActive,
  timerTotalMinutes,
  timerRemainingSeconds,
  timerMode,
  sequenceMode,
  activePhase,
  currentAyahNumber,
  lastPosition,
  prayerTimes,
  qariName,
  onStartTimer,
  onStopTimer,
  onToggleSequenceMode,
  onOpenQariModal,
}) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(15);
  const [customDuration, setCustomDuration] = useState<string>('');
  const [startMode, setStartMode] = useState<'always_start' | 'continue_last'>('continue_last');

  const [alarms, setAlarms] = useState<RecitationAlarm[]>(() => {
    try {
      const saved = localStorage.getItem('easy_islam_recitation_alarms');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: '1',
        name: 'Morning Dhikr & Quran',
        timeDisplay: '06:00 AM',
        durationMinutes: 15,
        mode: 'continue_last',
        enabled: true,
      },
      {
        id: '2',
        name: 'After Fajr Reflection',
        timeDisplay: addMinutesToTimeString(prayerTimes.fajr, 15),
        durationMinutes: 20,
        mode: 'always_start',
        linkedPrayer: 'After Fajr (+15m)',
        enabled: true,
      },
      {
        id: '3',
        name: 'Night Bedtime Recitation',
        timeDisplay: '09:00 PM',
        durationMinutes: 30,
        mode: 'continue_last',
        enabled: true,
      },
    ];
  });

  const [showAddAlarm, setShowAddAlarm] = useState(false);
  const [newAlarmName, setNewAlarmName] = useState('');
  const [newAlarmTime, setNewAlarmTime] = useState('07:00 AM');
  const [newAlarmDuration, setNewAlarmDuration] = useState<number>(15);
  const [newAlarmMode, setNewAlarmMode] = useState<'always_start' | 'continue_last'>('continue_last');
  const [newAlarmPrayerLink, setNewAlarmPrayerLink] = useState<string>('none');

  const saveAlarms = (updated: RecitationAlarm[]) => {
    setAlarms(updated);
    try {
      localStorage.setItem('easy_islam_recitation_alarms', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const toggleAlarm = (id: string) => {
    const updated = alarms.map(a => (a.id === id ? { ...a, enabled: !a.enabled } : a));
    saveAlarms(updated);
  };

  const deleteAlarm = (id: string) => {
    const updated = alarms.filter(a => a.id !== id);
    saveAlarms(updated);
  };

  const handleCreateAlarm = () => {
    let finalTime = newAlarmTime;
    let prayerDesc: string | undefined = undefined;

    if (newAlarmPrayerLink === 'fajr_15') {
      finalTime = addMinutesToTimeString(prayerTimes.fajr, 15);
      prayerDesc = 'After Fajr (+15m)';
    } else if (newAlarmPrayerLink === 'maghrib_15') {
      finalTime = addMinutesToTimeString(prayerTimes.maghrib, 15);
      prayerDesc = 'After Maghrib (+15m)';
    } else if (newAlarmPrayerLink === 'isha_10') {
      finalTime = addMinutesToTimeString(prayerTimes.isha, 10);
      prayerDesc = 'After Isha (+10m)';
    }

    const item: RecitationAlarm = {
      id: Date.now().toString(),
      name: newAlarmName.trim() || 'Daily Quran Session',
      timeDisplay: finalTime,
      durationMinutes: newAlarmDuration,
      mode: newAlarmMode,
      linkedPrayer: prayerDesc,
      enabled: true,
    };

    saveAlarms([...alarms, item]);
    setShowAddAlarm(false);
    setNewAlarmName('');
  };

  const lastSurahMeta = SURAHS_METADATA.find(s => s.number === lastPosition.surahNumber) || SURAHS_METADATA[0];
  const durationOptions = [10, 15, 20, 30, 60];

  const formatTimerRemaining = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const timerProgress = isTimerActive && timerTotalMinutes > 0
    ? Math.min(100, Math.max(0, ((timerTotalMinutes * 60 - timerRemainingSeconds) / (timerTotalMinutes * 60)) * 100))
    : 0;

  const handleStartCustomOrPreset = () => {
    const finalMinutes = customDuration && parseInt(customDuration, 10) > 0
      ? parseInt(customDuration, 10)
      : selectedDuration;
    onStartTimer(finalMinutes, startMode);
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Active Live Timer Card or Hero Setup */}
      {isTimerActive ? (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-900 via-emerald-950 to-emerald-950 border border-amber-500/30 p-6 text-center shadow-2xl">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-4 border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Auto Recitation In Progress</span>
          </div>

          {/* Circular Countdown Ring */}
          <div className="relative w-44 h-44 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-emerald-900 fill-none"
                strokeWidth="7"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-amber-400 fill-none transition-all duration-1000 ease-linear"
                strokeWidth="7"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * timerProgress) / 100}
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-mono font-bold text-white tracking-wider">
                {formatTimerRemaining(timerRemainingSeconds)}
              </span>
              <span className="text-[11px] text-emerald-300/80 font-medium mt-0.5">
                of {timerTotalMinutes} mins
              </span>
            </div>
          </div>

          {/* Currently playing surah & active phase */}
          <div className="space-y-1.5 mb-5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-xs">
              <span className="text-emerald-400 font-mono">Surah {lastSurahMeta.number}: {lastSurahMeta.nameEnglish}</span>
              <span>&bull;</span>
              <span className="text-amber-300 font-mono font-bold">Ayah {currentAyahNumber}</span>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1">
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-mono transition ${
                  activePhase === 'arabic'
                    ? 'bg-amber-400 text-emerald-950 font-bold shadow'
                    : 'bg-emerald-950 text-emerald-500'
                }`}
              >
                1. Arabic Recitation
              </span>
              <span className="text-emerald-500 text-xs">&rarr;</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-mono transition ${
                  activePhase === 'urdu'
                    ? 'bg-amber-400 text-emerald-950 font-bold shadow'
                    : 'bg-emerald-950 text-emerald-500'
                }`}
              >
                2. Spoken Urdu Voice
              </span>
            </div>

            <p className="text-xs text-emerald-400/80">
              Plays each verse separately & advances automatically without touching!
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={onStopTimer}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/40 text-sm font-semibold transition active:scale-95"
            >
              <Pause size={16} />
              <span>Stop Recitation</span>
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-900/60 flex items-center justify-center gap-2 text-[11px] text-emerald-400/90">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Plays continuously even when phone is locked or app closed</span>
          </div>
        </div>
      ) : (
        /* Setup Timer Hero Card */
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-900/80 via-emerald-900/50 to-emerald-950/80 border border-emerald-800/80 p-5 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  <Clock size={18} />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-white font-display">Auto Recitation Timer</h2>
                  <p className="text-xs text-emerald-300/80">Each Ayah separately with Urdu voice &bull; hands-free</p>
                </div>
              </div>
            </div>
            <button
              onClick={onOpenQariModal}
              className="text-[11px] text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full flex items-center gap-1 hover:bg-amber-400/20 transition"
            >
              <Volume2 size={11} />
              <span>{qariName.split(' ')[0]}</span>
            </button>
          </div>

          {/* MASTER MODE: Hands-Free Arabic + Spoken Urdu Voice Each Ayat */}
          <div className="mb-4 bg-gradient-to-r from-amber-500/15 via-emerald-900/60 to-emerald-950/80 rounded-2xl p-3.5 border border-amber-500/40">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Mic size={15} />
                <span>Verse-by-Verse Playback Mode:</span>
              </div>
              <button
                onClick={onToggleSequenceMode}
                className="text-[10px] text-amber-300 underline font-semibold"
              >
                Toggle
              </button>
            </div>

            <button
              onClick={onToggleSequenceMode}
              className="w-full text-left p-2.5 rounded-xl bg-emerald-950/80 border border-amber-500/30 flex items-center justify-between transition hover:border-amber-400"
            >
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{sequenceMode === 'arabic_and_urdu' ? 'Arabic Recitation + Spoken Urdu Translation' : 'Arabic Only'}</span>
                  {sequenceMode === 'arabic_and_urdu' && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400 text-emerald-950 font-bold">
                      Hands-Free
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-emerald-300/80 mt-0.5">
                  {sequenceMode === 'arabic_and_urdu'
                    ? 'Plays each Ayat in Arabic, followed automatically by spoken Urdu voice, then advances without touching.'
                    : 'Plays continuous Arabic recitation verse-by-verse.'}
                </div>
              </div>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold shrink-0 ${sequenceMode === 'arabic_and_urdu' ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-900 text-emerald-400'}`}>
                <CheckCircle2 size={16} />
              </div>
            </button>
          </div>

          {/* Option: Start from beginning OR continue where stopped */}
          <div className="mb-4 bg-emerald-950/60 rounded-2xl p-3 border border-emerald-800/50">
            <label className="text-xs font-semibold text-emerald-200 block mb-2 flex items-center justify-between">
              <span>Recitation Starting Point:</span>
              <span className="text-[10px] text-emerald-400/80 uppercase tracking-wider font-mono">User Preference</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setStartMode('always_start')}
                className={`py-2.5 px-3 rounded-xl text-left border text-xs transition ${
                  startMode === 'always_start'
                    ? 'bg-amber-500/20 border-amber-400 text-white font-semibold shadow-sm'
                    : 'bg-emerald-900/40 border-emerald-800 text-emerald-300/80 hover:bg-emerald-900/70'
                }`}
              >
                <div className="font-semibold flex items-center justify-between">
                  <span>Start from Beginning</span>
                  {startMode === 'always_start' && <CheckCircle2 size={13} className="text-amber-400" />}
                </div>
                <div className="text-[10px] text-emerald-400/80 mt-0.5">Surah 1: Al-Fatihah</div>
              </button>

              <button
                onClick={() => setStartMode('continue_last')}
                className={`py-2.5 px-3 rounded-xl text-left border text-xs transition ${
                  startMode === 'continue_last'
                    ? 'bg-amber-500/20 border-amber-400 text-white font-semibold shadow-sm'
                    : 'bg-emerald-900/40 border-emerald-800 text-emerald-300/80 hover:bg-emerald-900/70'
                }`}
              >
                <div className="font-semibold flex items-center justify-between">
                  <span>Continue Last Stopped</span>
                  {startMode === 'continue_last' && <CheckCircle2 size={13} className="text-amber-400" />}
                </div>
                <div className="text-[10px] text-emerald-400/80 mt-0.5 truncate">
                  Surah {lastSurahMeta.number}: {lastSurahMeta.nameEnglish}
                </div>
              </button>
            </div>
          </div>

          {/* Duration Selector: 10 / 15 / 20 / 30 / 60 minutes */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="font-semibold text-emerald-200">Listening Duration:</span>
              <span className="text-amber-400 font-bold font-mono">
                {customDuration ? `${customDuration} min (custom)` : `${selectedDuration} minutes`}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5 mb-2">
              {durationOptions.map(min => (
                <button
                  key={min}
                  onClick={() => {
                    setSelectedDuration(min);
                    setCustomDuration('');
                  }}
                  className={`py-2 rounded-xl text-xs font-semibold transition text-center ${
                    selectedDuration === min && !customDuration
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-md shadow-amber-500/20 font-bold scale-[1.03]'
                      : 'bg-emerald-950/70 hover:bg-emerald-900 text-emerald-200 border border-emerald-800/80'
                  }`}
                >
                  {min}m
                </button>
              ))}
            </div>

            {/* Custom Minutes Input */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="180"
                value={customDuration}
                onChange={e => setCustomDuration(e.target.value)}
                placeholder="Or enter custom minutes (e.g. 45)..."
                className="flex-1 bg-emerald-950/80 border border-emerald-800/80 rounded-xl px-3 py-1.5 text-xs text-white placeholder-emerald-600 focus:outline-none focus:border-amber-400"
              />
              {customDuration && (
                <button
                  onClick={() => setCustomDuration('')}
                  className="text-xs text-emerald-400 hover:text-white px-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Big Start Auto Recitation Button */}
          <button
            onClick={handleStartCustomOrPreset}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-emerald-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 active:scale-98 transition"
          >
            <Play size={18} fill="currentColor" />
            <span>
              Start {customDuration ? `${customDuration} Min` : `${selectedDuration} Min`} Hands-Free Recitation
            </span>
          </button>

          {/* Feature Highlights Footer */}
          <div className="mt-3 pt-3 border-t border-emerald-800/50 grid grid-cols-2 gap-2 text-[11px] text-emerald-300/80">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-amber-400" />
              <span>Each Ayat Arabic &rarr; Urdu Voice</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Smartphone size={12} className="text-amber-400" />
              <span>Advances without touching</span>
            </div>
          </div>
        </div>
      )}

      {/* Linked Prayer Quick Presets */}
      <div className="rounded-3xl bg-emerald-900/40 border border-emerald-800/70 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sun className="text-amber-400 w-4 h-4" />
            <h3 className="font-semibold text-sm text-white font-display">Link Quran to Prayer Times</h3>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
            {prayerTimes.cityName}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onStartTimer(20, 'continue_last')}
            className="p-3 rounded-2xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-800/80 text-left transition group active:scale-95"
          >
            <div className="flex items-center justify-between text-xs text-amber-400 font-medium">
              <span>After Fajr</span>
              <Play size={12} className="opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="text-sm font-bold text-white mt-0.5 font-mono">{prayerTimes.fajr}</div>
            <div className="text-[10px] text-emerald-400 mt-1">+15 min Quran</div>
          </button>

          <button
            onClick={() => onStartTimer(15, 'continue_last')}
            className="p-3 rounded-2xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-800/80 text-left transition group active:scale-95"
          >
            <div className="flex items-center justify-between text-xs text-amber-400 font-medium">
              <span>After Maghrib</span>
              <Play size={12} className="opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="text-sm font-bold text-white mt-0.5 font-mono">{prayerTimes.maghrib}</div>
            <div className="text-[10px] text-emerald-400 mt-1">+15 min Quran</div>
          </button>

          <button
            onClick={() => onStartTimer(30, 'continue_last')}
            className="p-3 rounded-2xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-800/80 text-left transition group active:scale-95"
          >
            <div className="flex items-center justify-between text-xs text-amber-400 font-medium">
              <span>After Isha</span>
              <Play size={12} className="opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="text-sm font-bold text-white mt-0.5 font-mono">{prayerTimes.isha}</div>
            <div className="text-[10px] text-emerald-400 mt-1">+30 min Quran</div>
          </button>
        </div>
      </div>

      {/* Daily Fixed-Time Schedules */}
      <div className="rounded-3xl bg-emerald-900/40 border border-emerald-800/70 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="text-amber-400 w-4 h-4" />
            <h3 className="font-semibold text-sm text-white font-display">Daily Fixed-Time Schedules</h3>
          </div>
          <button
            onClick={() => setShowAddAlarm(true)}
            className="flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 bg-amber-400/10 px-2.5 py-1 rounded-xl border border-amber-400/20 active:scale-95 transition"
          >
            <Plus size={13} />
            <span>Add Schedule</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {alarms.map(alarm => (
            <div
              key={alarm.id}
              className={`p-3.5 rounded-2xl border transition flex items-center justify-between ${
                alarm.enabled
                  ? 'bg-emerald-950/80 border-emerald-700/70 shadow-sm'
                  : 'bg-emerald-950/40 border-emerald-900/60 opacity-60'
              }`}
            >
              <div className="flex-1 pr-3">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold font-mono text-white">{alarm.timeDisplay}</span>
                  {alarm.linkedPrayer && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200 font-medium">
                      {alarm.linkedPrayer}
                    </span>
                  )}
                </div>
                <div className="text-xs text-emerald-300 font-medium mt-0.5">{alarm.name}</div>
                <div className="text-[11px] text-emerald-400/70 mt-0.5">
                  {alarm.durationMinutes} minutes &bull; Arabic + Urdu Voice hands-free
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onStartTimer(alarm.durationMinutes, alarm.mode)}
                  className="w-8 h-8 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 flex items-center justify-center transition active:scale-90"
                  title="Recite Now"
                >
                  <Play size={14} fill="currentColor" />
                </button>

                <button
                  onClick={() => toggleAlarm(alarm.id)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    alarm.enabled ? 'bg-amber-500' : 'bg-emerald-900'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-emerald-950 shadow-md transition-transform transform ${
                      alarm.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>

                <button
                  onClick={() => deleteAlarm(alarm.id)}
                  className="text-emerald-500 hover:text-red-400 p-1 transition"
                  title="Delete schedule"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Alarm Modal */}
      {showAddAlarm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-emerald-900 border border-emerald-700 p-5 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base font-display">New Recitation Schedule</h3>
              <button
                onClick={() => setShowAddAlarm(false)}
                className="text-emerald-400 hover:text-white text-xs px-2 py-1"
              >
                Cancel
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-emerald-200 block mb-1">Schedule Name</label>
              <input
                type="text"
                placeholder="e.g. Bedtime Quran, Morning Dhikr"
                value={newAlarmName}
                onChange={e => setNewAlarmName(e.target.value)}
                className="w-full bg-emerald-950 border border-emerald-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-emerald-200 block mb-1">Time Mode</label>
              <select
                value={newAlarmPrayerLink}
                onChange={e => setNewAlarmPrayerLink(e.target.value)}
                className="w-full bg-emerald-950 border border-emerald-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="none">Fixed Clock Time</option>
                <option value="fajr_15">15 mins after Fajr ({addMinutesToTimeString(prayerTimes.fajr, 15)})</option>
                <option value="maghrib_15">15 mins after Maghrib ({addMinutesToTimeString(prayerTimes.maghrib, 15)})</option>
                <option value="isha_10">10 mins after Isha ({addMinutesToTimeString(prayerTimes.isha, 10)})</option>
              </select>
            </div>

            {newAlarmPrayerLink === 'none' && (
              <div>
                <label className="text-xs font-semibold text-emerald-200 block mb-1">Fixed Time</label>
                <input
                  type="text"
                  placeholder="e.g. 06:00 AM, 09:00 PM"
                  value={newAlarmTime}
                  onChange={e => setNewAlarmTime(e.target.value)}
                  className="w-full bg-emerald-950 border border-emerald-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-emerald-200 block mb-1">Duration (minutes)</label>
              <div className="grid grid-cols-4 gap-1.5">
                {[10, 15, 20, 30].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setNewAlarmDuration(m)}
                    className={`py-1.5 rounded-lg text-xs font-semibold ${
                      newAlarmDuration === m
                        ? 'bg-amber-500 text-emerald-950 font-bold'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCreateAlarm}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs shadow-md transition"
            >
              Save Schedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
