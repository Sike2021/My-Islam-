import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { BottomNav, ActiveNavTab } from './components/BottomNav';
import { AutoRecitationTimer } from './components/AutoRecitationTimer';
import { KhatamTracker } from './components/KhatamTracker';
import { QuranReader } from './components/QuranReader';
import { DrIsrarPlayerView } from './components/DrIsrarPlayerView';
import { QariWaheedAndNaatsView } from './components/QariWaheedAndNaatsView';
import { UlamaBayansView } from './components/UlamaBayansView';
import { QuranTopicSearch } from './components/QuranTopicSearch';
import { DuasSanctuaryView } from './components/DuasSanctuaryView';
import { AppMenuDrawer } from './components/AppMenuDrawer';
import { HadithView } from './components/HadithView';
import { OfflineManager } from './components/OfflineManager';
import { QarisShowcase } from './components/QarisShowcase';
import { MiniPlayer } from './components/MiniPlayer';
import { FullAudioPlayerDrawer } from './components/FullAudioPlayerDrawer';
import { QariSelectorModal } from './components/QariSelectorModal';
import { CitySelectorModal } from './components/CitySelectorModal';
import { RecitationLivePopup } from './components/RecitationLivePopup';
import { PWAInstallModal } from './components/PWAInstallModal';
import { OfflineChromeBanner } from './components/OfflineChromeBanner';
import { OfflineIndicator } from './components/OfflineIndicator';
import { useQuranAudio, ActivePhase } from './hooks/useQuranAudio';
import { POPULAR_CITIES, CityOption, calculatePrayerTimes } from './utils/prayerTimes';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('timer');
  const [selectedReaderSurah, setSelectedReaderSurah] = useState<number>(1);
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);
  const [isQariModalOpen, setIsQariModalOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // City preference for prayer times
  const [selectedCity, setSelectedCity] = useState<CityOption>(() => {
    try {
      const saved = localStorage.getItem('easy_islam_city');
      if (saved) {
        const found = POPULAR_CITIES.find(c => c.name === saved);
        if (found) return found;
      }
    } catch {
      // ignore
    }
    return POPULAR_CITIES[0]; // Mecca
  });

  const handleCitySelect = (city: CityOption) => {
    setSelectedCity(city);
    try {
      localStorage.setItem('easy_islam_city', city.name);
    } catch {
      // ignore
    }
  };

  // Prayer times calculation for today
  const prayerTimes = useMemo(() => {
    return calculatePrayerTimes(selectedCity);
  }, [selectedCity]);

  // Quran Audio Engine
  const {
    currentQari,
    currentSurahNumber,
    currentAyahNumber,
    currentSurahMeta,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    isAudioLoading,
    sequenceMode,
    activePhase,
    setSequenceMode,
    isTimerActive,
    timerTotalMinutes,
    timerRemainingSeconds,
    timerMode,
    lastPosition,
    history,
    playSurah,
    playAyahAudioStep,
    pauseAudio,
    resumeAudio,
    togglePlay,
    seek,
    changeSpeed,
    nextSurah,
    prevSurah,
    startAutoRecitation,
    stopAutoRecitation,
    changeQari,
    clearHistory,
  } = useQuranAudio();

  const handleSelectSurahFromReader = (surahNum: number) => {
    setSelectedReaderSurah(surahNum);
  };

  const handlePlayAyah = (surahNum: number, ayahNum: number, phase: ActivePhase = 'arabic') => {
    playAyahAudioStep(surahNum, ayahNum, phase);
    setSelectedReaderSurah(surahNum);
  };

  const handleResumeListening = () => {
    playAyahAudioStep(lastPosition.surahNumber, lastPosition.ayahNumber, 'arabic');
    setSelectedReaderSurah(lastPosition.surahNumber);
  };

  const handleOpenReaderToAyah = (surahNum: number, ayahNum: number = 1) => {
    setSelectedReaderSurah(surahNum);
    setActiveTab('reader');
  };

  const handleToggleSequenceMode = () => {
    setSequenceMode(prev => (prev === 'arabic_and_urdu' ? 'arabic_only' : 'arabic_and_urdu'));
  };

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50 flex flex-col font-sans pb-28 selection:bg-amber-400 selection:text-emerald-950">
      {/* Top App Header */}
      <Header
        currentQari={currentQari}
        onOpenQariModal={() => setIsQariModalOpen(true)}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        cityName={selectedCity.name}
      />

      {/* Floating Offline Status Indicator */}
      <OfflineIndicator />

      {/* Dismissible Chrome App / Android APK Install Banner */}
      <OfflineChromeBanner onOpenInstallModal={() => setIsInstallModalOpen(true)} />

      {/* Real-time Recitation Live Popup: Pops up exact currently reciting phrase with simultaneous Arabic + Urdu + English */}
      <RecitationLivePopup
        isPlaying={isPlaying}
        currentSurah={currentSurahMeta}
        currentAyahNumber={currentAyahNumber}
        activePhase={activePhase}
        currentQari={currentQari}
        onOpenReaderToAyah={handleOpenReaderToAyah}
        onTogglePlay={togglePlay}
        onNextAyah={nextSurah}
      />

      {/* Main Container / Mobile Viewport */}
      <main className="w-full max-w-md mx-auto flex-1 px-4 pt-2">
        {/* Quick Access Horizontal Pills (Android Touch Friendly) */}
        <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 pb-2.5 mb-2 -mx-1 px-1">
          <button
            onClick={() => setActiveTab('hadith')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 active:scale-95 ${
              activeTab === 'hadith'
                ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/60'
            }`}
          >
            <span>📚</span>
            <span>Hadith Library</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-950/60 text-amber-300 font-arabic font-normal">کتب احادیث • ڈاؤنلوڈ</span>
          </button>

          <button
            onClick={() => setActiveTab('duas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 active:scale-95 ${
              activeTab === 'duas'
                ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/60'
            }`}
          >
            <span>🤲</span>
            <span>Duas & 4 Quls</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-950/60 text-amber-300 font-arabic font-normal">آیت الکرسی • درود</span>
          </button>

          <button
            onClick={() => setActiveTab('reader')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 active:scale-95 ${
              activeTab === 'reader'
                ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/60'
            }`}
          >
            <span>📖</span>
            <span>Read Quran</span>
          </button>

          <button
            onClick={() => setActiveTab('ulama')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 active:scale-95 ${
              activeTab === 'ulama'
                ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/60'
            }`}
          >
            <span>🎓</span>
            <span>Ulama Bayans</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-950/60 text-amber-300 font-arabic font-normal">مودودی • اسحاق</span>
          </button>

          <button
            onClick={() => setActiveTab('israr')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 active:scale-95 ${
              activeTab === 'israr'
                ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/60'
            }`}
          >
            <span>🎙️</span>
            <span>Dr. Israr</span>
          </button>

          <button
            onClick={() => setActiveTab('naats')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 active:scale-95 ${
              activeTab === 'naats'
                ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/60'
            }`}
          >
            <span>🎵</span>
            <span>Qari Waheed Naats</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-950/60 text-amber-300 font-arabic font-normal">شکرًا لك ربي</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 active:scale-95 ${
              activeTab === 'search'
                ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/60'
            }`}
          >
            <span>🔍</span>
            <span>Urdu Search</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-950/60 text-amber-300 font-arabic font-normal">نماز • شرک</span>
          </button>

          <button
            onClick={() => setActiveTab('timer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 active:scale-95 ${
              activeTab === 'timer'
                ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/60'
            }`}
          >
            <span>⏱️</span>
            <span>Timer</span>
          </button>
        </div>

        {activeTab === 'hadith' && (
          <HadithView
            onOpenSurahReader={handleOpenReaderToAyah}
          />
        )}

        {activeTab === 'duas' && (
          <DuasSanctuaryView
            onOpenSurahReader={handleOpenReaderToAyah}
          />
        )}

        {activeTab === 'timer' && (
          <AutoRecitationTimer
            isPlaying={isPlaying}
            isTimerActive={isTimerActive}
            timerTotalMinutes={timerTotalMinutes}
            timerRemainingSeconds={timerRemainingSeconds}
            timerMode={timerMode}
            sequenceMode={sequenceMode}
            activePhase={activePhase}
            currentAyahNumber={currentAyahNumber}
            lastPosition={lastPosition}
            prayerTimes={prayerTimes}
            qariName={currentQari.name}
            onStartTimer={startAutoRecitation}
            onStopTimer={stopAutoRecitation}
            onToggleSequenceMode={handleToggleSequenceMode}
            onOpenQariModal={() => setIsQariModalOpen(true)}
          />
        )}

        {activeTab === 'reader' && (
          <QuranReader
            selectedSurahNumber={selectedReaderSurah}
            currentPlayingSurah={currentSurahNumber}
            currentPlayingAyah={currentAyahNumber}
            activePhase={activePhase}
            sequenceMode={sequenceMode}
            isPlaying={isPlaying}
            onSelectSurah={handleSelectSurahFromReader}
            onPlayAyah={handlePlayAyah}
            onTogglePlay={togglePlay}
            onOpenSearchTopic={() => setActiveTab('search')}
          />
        )}

        {activeTab === 'search' && (
          <QuranTopicSearch
            onOpenSurahReader={surahNum => {
              setSelectedReaderSurah(surahNum);
              setActiveTab('reader');
            }}
          />
        )}

        {activeTab === 'naats' && (
          <QariWaheedAndNaatsView
            onOpenSurahReader={surahNum => {
              setSelectedReaderSurah(surahNum);
              setActiveTab('reader');
            }}
          />
        )}

        {activeTab === 'ulama' && (
          <UlamaBayansView
            onOpenSurahReader={surahNum => {
              setSelectedReaderSurah(surahNum);
              setActiveTab('reader');
            }}
            onNavigateToIsrar={() => setActiveTab('israr')}
          />
        )}

        {activeTab === 'khatam' && (
          <KhatamTracker
            lastPosition={lastPosition}
            history={history}
            onResumeListening={handleResumeListening}
            onSelectSurah={surahNum => {
              setSelectedReaderSurah(surahNum);
              setActiveTab('reader');
              playAyahAudioStep(surahNum, 1, 'arabic');
            }}
            onClearHistory={clearHistory}
          />
        )}

        {activeTab === 'israr' && (
          <DrIsrarPlayerView />
        )}

        {activeTab === 'offline' && (
          <OfflineManager
            currentQari={currentQari}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
            onPlaySurah={surahNum => {
              playAyahAudioStep(surahNum, 1, 'arabic');
              setSelectedReaderSurah(surahNum);
            }}
          />
        )}

        {activeTab === 'qaris' && (
          <QarisShowcase
            currentQari={currentQari}
            isPlaying={isPlaying}
            onSelectQari={changeQari}
            onTogglePlay={togglePlay}
          />
        )}
      </main>

      {/* Floating Mini Player (visible above the bottom navigation bar) */}
      <MiniPlayer
        currentSurah={currentSurahMeta}
        currentAyahNumber={currentAyahNumber}
        activePhase={activePhase}
        currentQari={currentQari}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        isTimerActive={isTimerActive}
        timerRemainingSeconds={timerRemainingSeconds}
        onTogglePlay={togglePlay}
        onOpenFullPlayer={() => setIsFullPlayerOpen(true)}
      />

      {/* Bottom Android Navigation Bar (Fixed 5-Tab Layout) */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={tab => setActiveTab(tab)}
        onOpenMenu={() => setIsMenuOpen(true)}
        isTimerRunning={isTimerActive}
      />

      {/* App Navigation Directory Menu Drawer */}
      <AppMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeTab={activeTab}
        onSelectTab={tab => setActiveTab(tab)}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Full Audio Player Drawer (Expandable) */}
      <FullAudioPlayerDrawer
        isOpen={isFullPlayerOpen}
        currentSurah={currentSurahMeta}
        currentAyahNumber={currentAyahNumber}
        activePhase={activePhase}
        sequenceMode={sequenceMode}
        currentQari={currentQari}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        playbackSpeed={playbackSpeed}
        isAudioLoading={isAudioLoading}
        isTimerActive={isTimerActive}
        timerTotalMinutes={timerTotalMinutes}
        timerRemainingSeconds={timerRemainingSeconds}
        onTogglePlay={togglePlay}
        onSeek={seek}
        onNextAyah={nextSurah}
        onPrevAyah={prevSurah}
        onChangeSpeed={changeSpeed}
        onStartTimer={startAutoRecitation}
        onStopTimer={stopAutoRecitation}
        onOpenQariModal={() => setIsQariModalOpen(true)}
        onClose={() => setIsFullPlayerOpen(false)}
      />

      {/* Qari Selection Modal */}
      <QariSelectorModal
        isOpen={isQariModalOpen}
        currentQari={currentQari}
        onSelectQari={changeQari}
        onClose={() => setIsQariModalOpen(false)}
      />

      {/* City Location Selection Modal */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        selectedCity={selectedCity}
        onSelectCity={handleCitySelect}
        onClose={() => setIsCityModalOpen(false)}
      />

      {/* PWA / Chrome App / Android WebAPK Installation Modal */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </div>
  );
}
