import React, { useState, useEffect } from 'react';
import { DownloadCloud, Smartphone, X, Sparkles, ChevronRight } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface OfflineChromeBannerProps {
  onOpenInstallModal: () => void;
}

export const OfflineChromeBanner: React.FC<OfflineChromeBannerProps> = ({
  onOpenInstallModal,
}) => {
  const { isInstalled, isInstallable, install, isAndroid } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem('easy_islam_pwa_banner_dismissed');
      if (isDismissed === 'true') {
        setDismissed(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('easy_islam_pwa_banner_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  // If already installed as PWA or user dismissed in this session, do not render
  if (isInstalled || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-emerald-850 to-emerald-950 border-b border-amber-500/30 px-3 py-2 text-xs transition">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        <button
          onClick={onOpenInstallModal}
          className="flex-1 flex items-center gap-2 text-left hover:opacity-95 transition cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-amber-400 text-emerald-950 font-bold flex items-center justify-center shrink-0 shadow-sm">
            <Smartphone size={15} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-[11px] truncate">
                {isAndroid ? 'Install Android WebAPK' : 'Install Chrome App'}
              </span>
              <span className="text-[9px] px-1 py-0.2 rounded-full bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30">
                Offline
              </span>
            </div>
            <p className="text-[10px] text-emerald-300 truncate">
              Play Surahs & Bayans anytime with zero internet
            </p>
          </div>
        </button>

        <div className="flex items-center gap-1.5 shrink-0">
          {isInstallable ? (
            <button
              onClick={install}
              className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-emerald-950 font-bold text-[11px] shadow-sm flex items-center gap-1 transition active:scale-95 cursor-pointer"
            >
              <DownloadCloud size={12} />
              <span>Install</span>
            </button>
          ) : (
            <button
              onClick={onOpenInstallModal}
              className="px-2.5 py-1 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 border border-amber-500/30 font-semibold text-[11px] flex items-center gap-0.5 transition cursor-pointer"
            >
              <span>Get APK</span>
              <ChevronRight size={12} />
            </button>
          )}

          <button
            onClick={handleDismiss}
            className="p-1 text-emerald-400 hover:text-white rounded-lg hover:bg-emerald-800/60 transition cursor-pointer"
            title="Dismiss banner"
            aria-label="Dismiss banner"
          >
            <X size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
