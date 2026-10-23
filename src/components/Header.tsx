import React, { useState } from 'react';
import { Volume2, Wifi, WifiOff, DownloadCloud, Sparkles, Compass, Menu } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { Qari } from '../data/qaris';

interface HeaderProps {
  currentQari: Qari;
  onOpenQariModal: () => void;
  onOpenCityModal: () => void;
  onOpenInstallModal?: () => void;
  onOpenMenu?: () => void;
  cityName: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentQari,
  onOpenQariModal,
  onOpenCityModal,
  onOpenInstallModal,
  onOpenMenu,
  cityName,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const isOnline = useOnlineStatus();

  // Today's date
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <>
      <header className="sticky top-0 z-40 bg-emerald-950/90 backdrop-blur-md border-b border-emerald-900/60 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {/* Logo & App Brand */}
          <div className="flex items-center gap-2.5">
            {onOpenMenu && (
              <button
                onClick={onOpenMenu}
                className="w-9 h-9 rounded-xl bg-emerald-900/70 hover:bg-emerald-800 border border-emerald-700/60 text-amber-400 flex items-center justify-center transition active:scale-95 cursor-pointer shadow-sm"
                title="Open Navigation Menu"
              >
                <Menu size={18} />
              </button>
            )}

            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-emerald-950 font-bold font-serif text-lg">
              <span>إ</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-base tracking-tight text-white font-display">Easy Islam</h1>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  Auto Quran
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-emerald-400/80">
                <span>{dateFormatted}</span>
                <span>•</span>
                <button
                  onClick={onOpenCityModal}
                  className="flex items-center gap-1 hover:text-amber-300 transition underline-offset-2 underline"
                >
                  <Compass size={11} />
                  <span>{cityName}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* PWA / Chrome App / APK Install Button */}
            {!isInstalled && (
              <button
                onClick={() => {
                  if (isInstallable) {
                    install();
                  } else if (onOpenInstallModal) {
                    onOpenInstallModal();
                  }
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold text-xs shadow-md shadow-amber-500/20 active:scale-95 transition cursor-pointer"
                title="Install Easy Islam App (Chrome / Android WebAPK)"
              >
                <DownloadCloud size={13} />
                <span>Install APK</span>
              </button>
            )}

            {/* Qari selector trigger pill */}
            <button
              onClick={onOpenQariModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-800/80 text-emerald-200 text-xs font-medium transition active:scale-95"
              title="Select Qari"
            >
              <Volume2 size={13} className="text-amber-400" />
              <span className="max-w-[75px] truncate">{currentQari.name.split(' ')[0]}</span>
            </button>

            {/* Online / Offline indicator */}
            <div
              className={`flex items-center justify-center w-7 h-7 rounded-lg border text-xs transition ${
                isOnline
                  ? 'bg-emerald-900/40 border-emerald-700/40 text-emerald-400'
                  : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
              }`}
              title={isOnline ? 'Online mode' : 'Offline mode'}
            >
              {isOnline ? <Wifi size={13} /> : <WifiOff size={13} />}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
