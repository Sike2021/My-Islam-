import React from 'react';
import {
  DownloadCloud,
  Smartphone,
  Laptop,
  CheckCircle,
  HardDrive,
  ShieldCheck,
  Zap,
  ExternalLink,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAStatusCardProps {
  onOpenInstallModal: () => void;
}

export const PWAStatusCard: React.FC<PWAStatusCardProps> = ({ onOpenInstallModal }) => {
  const { isInstalled, isInstallable, isAndroid, isIOS, swRegistered, install } = usePWAInstall();

  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-900/90 via-emerald-950 to-emerald-950 border border-amber-500/30 p-5 shadow-xl text-left space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-emerald-950 font-bold shadow-md shadow-amber-500/20">
            <Smartphone size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white font-display">Installable Chrome & Android APK</h3>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30">
                PWA / WebAPK
              </span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">
              Run as a standalone app with background lockscreen playback
            </p>
          </div>
        </div>

        {isInstalled ? (
          <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 font-semibold">
            <CheckCircle size={12} />
            <span>Installed</span>
          </span>
        ) : (
          <button
            onClick={onOpenInstallModal}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-emerald-950 font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 active:scale-95 transition cursor-pointer shrink-0"
          >
            <DownloadCloud size={13} />
            <span>Install App</span>
          </button>
        )}
      </div>

      {/* Feature Pills */}
      <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
        <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800">
          <span className="text-emerald-400 block font-semibold">Mode</span>
          <span className="text-white font-bold mt-0.5 block truncate">
            {isInstalled ? 'Standalone APK' : 'Chrome Web'}
          </span>
        </div>

        <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800">
          <span className="text-emerald-400 block font-semibold">Service Worker</span>
          <span className="text-amber-300 font-bold mt-0.5 block truncate">
            {swRegistered ? 'Active & Caching' : 'Workbox Ready'}
          </span>
        </div>

        <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800">
          <span className="text-emerald-400 block font-semibold">Lockscreen Audio</span>
          <span className="text-white font-bold mt-0.5 block truncate">Supported</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-emerald-900/60 text-[11px]">
        <span className="text-emerald-400/80">
          {isAndroid
            ? 'Android creates a native WebAPK with app drawer icon'
            : isIOS
            ? 'Safari: Tap Share -> Add to Home Screen'
            : 'Chrome / Edge: Standalone desktop app window'}
        </span>

        <button
          onClick={onOpenInstallModal}
          className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 cursor-pointer shrink-0 ml-2"
        >
          View Guide
        </button>
      </div>
    </div>
  );
};
