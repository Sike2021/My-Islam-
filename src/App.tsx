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
import { PlayerImageEditorModal } from './components/PlayerImageEditorModal';
import { UnifiedVideoWatchModal } from './components/UnifiedVideoWatchModal';
import { QariSelectorModal } from './components/QariSelectorModal';
import { CitySelectorModal } from './components/CitySelectorModal';
import { RecitationLivePopup } from './components/RecitationLivePopup';
import { PWAInstallModal } from './components/PWAInstallModal';
import { OfflineChromeBanner } from './components/OfflineChromeBanner';
import { OfflineIndicator } from './components/OfflineIndicator';
import { UnifiedPlayerProvider, useUnifiedPlayer, ActivePhase } from './context/UnifiedPlayerContext';
import { POPULAR_CITIES, CityOption, calculatePrayerTimes } from './utils/prayerTimes';

function AppContent() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('reader');
  const [selectedReaderSurah, setSelectedReaderSurah] = useState<number>(1);
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);
  const [isPlayerImageEditorOpen, setIsPlayerImageEditorOpen] = useState(false);
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

  // Master Unified Player Engine
  const {
    activeTrack,
    currentQari,
    currentSurahNumber,
    currentAyahNumber,
    currentSurahMeta,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    isLoading: isAudioLoading,
    sequenceMode,
    activePhase,
    setSequenceMode,
    isTimerActive,
    timerTotalMinutes,
    timerRemainingSeconds,
    timerMode,
    lastPosition,
    history,
    togglePlay,
    seek,
    changeSpeed,
    next,
    prev,
    startTimer,
    stopTimer,
    changeQari,
    clearHistory,
    playQuranSurahAyah,
    customPlayerCover,
    setCustomPlayerCover,
    isVideoModalOpen,
    activeVideo,
    closeVideoWatch,
  } = useUnifiedPlayer();

  const handleSelectSurahFromReader = (surahNum: number) => {
    setSelectedReaderSurah(surahNum);
  };

  const handlePlayAyah = (surahNum: number, ayahNum: number, phase: ActivePhase = 'arabic') => {
    playQuranSurahAyah(surahNum, ayahNum, phase);
    setSelectedReaderSurah(surahNum);
  };

  const handleResumeListening = () => {
    playQuranSurahAyah(lastPosition.surahNumber, lastPosition.ayahNumber, 'arabic');
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

      {/* Real-time Recitation Live Popup: Exact verse with simultaneous Arabic + Urdu (Miraj-ul-Din Khan) + English */}
      {activeTrack.type === 'quran' && isPlaying && (
        <RecitationLivePopup
          isPlaying={isPlaying}
          currentSurah={currentSurahMeta}
          currentAyahNumber={currentAyahNumber}
          activePhase={activePhase}
          currentQari={currentQari}
          onOpenReaderToAyah={handleOpenReaderToAyah}
          onTogglePlay={togglePlay}
          onNextAyah={next}
        />
      )}

      {/* Main Container / Android Touch Viewport */}
      <main className={`w-full ${activeTab === 'hadith' || activeTab === 'israr' || activeTab === 'ulama' ? 'max-w-2xl' : 'max-w-md'} mx-auto flex-1 px-3 sm:px-4 pt-2`}>
        {/* Quick Access Horizontal Pills (Android Touch Friendly) */}
        <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 pb-2.5 mb-2 -mx-1 px-1">
          {/* 1. Holy Quran */}
          <button
            onClick={() => setActiveTab('reader')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 active:scale-95 ${
              activeTab === 'reader'
                ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/60'
            }`}
          >
            <span>📖</span>
            <span>Quran</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/70 text-amber-300 font-arabic font-normal">فتح محمد جالندھری</span>
          </button>

          {/* 2. Dr. Israr Ahmed */}
          <button
            onClick={() => setActiveTab('israr')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 active:scale-95 ${
              activeTab === 'israr'
                ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/60'
            }`}
          >
            <span>🎙️</span>
            <span>Dr. Israr</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/70 text-amber-300 font-arabic font-normal">بیان القرآن</span>
          </button>

          {/* 3. Maulana Maududi */}
          <button
            onClick={() => setActiveTab('ulama')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 active:scale-95 ${
              activeTab === 'ulama'
                ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/60'
            }`}
          >
            <span>📜</span>
            <span>Maududi</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/70 text-amber-300 font-arabic font-normal">تفہیم القرآن</span>
          </button>

          {/* 4. Duas & 4 Quls */}
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
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/70 text-amber-300 font-arabic font-normal">آیت الکرسی • درود</span>
          </button>

          {/* 5. Hadith Library */}
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
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/70 text-amber-300 font-arabic font-normal">کتب احادیث</span>
          </button>

          {/* 6. Qari Waheed Naats */}
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
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/70 text-amber-300 font-arabic font-normal">شکرًا لك ربي</span>
          </button>

          {/* 7. Auto Timer */}
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

          {/* 8. Urdu Quran Topic Search */}
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
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/70 text-amber-300 font-arabic font-normal">نماز • شرک</span>
          </button>

          {/* 9. Khatam Tracker */}
          <button
            onClick={() => setActiveTab('khatam')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 active:scale-95 ${
              activeTab === 'khatam'
                ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-800/60'
            }`}
          >
            <span>📿</span>
            <span>Khatam</span>
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
            onStartTimer={startTimer}
            onStopTimer={stopTimer}
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
              playQuranSurahAyah(surahNum, 1, 'arabic');
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
              playQuranSurahAyah(surahNum, 1, 'arabic');
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

      {/* Floating Unified Mini Player (visible above the bottom navigation bar) */}
      <MiniPlayer
        onOpenFullPlayer={() => setIsFullPlayerOpen(true)}
        onOpenImageEditor={() => setIsPlayerImageEditorOpen(true)}
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
        onClose={() => setIsFullPlayerOpen(false)}
        onOpenQariModal={() => setIsQariModalOpen(true)}
        onOpenImageEditor={() => setIsPlayerImageEditorOpen(true)}
      />

      {/* Player Image / Cover Editor Modal ("First Player Editor Have an Image of Player then We Can Change It") */}
      <PlayerImageEditorModal
        isOpen={isPlayerImageEditorOpen}
        currentCustomCover={customPlayerCover}
        defaultTrackCover={activeTrack.coverImage}
        onSaveCustomCover={setCustomPlayerCover}
        onClose={() => setIsPlayerImageEditorOpen(false)}
      />

      {/* Unified Video Watch Modal */}
      <UnifiedVideoWatchModal
        isOpen={isVideoModalOpen}
        videoUrl={activeVideo?.url}
        title={activeVideo?.title || 'Islamic Video Lecture'}
        subtitle={activeVideo?.subtitle}
        onClose={closeVideoWatch}
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

export default function App() {
  return (
    <UnifiedPlayerProvider>
      <AppContent />
    </UnifiedPlayerProvider>
  );
}
