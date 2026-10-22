import React, { useState } from 'react';
import {
  DownloadCloud,
  CheckCircle,
  Smartphone,
  Laptop,
  Apple,
  X,
  WifiOff,
  ShieldCheck,
  Zap,
  Info,
  ExternalLink,
  HardDrive,
  Sparkles,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, isChrome, swRegistered, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'android' | 'chrome' | 'ios' | 'offline'>(
    isAndroid ? 'android' : isIOS ? 'ios' : 'chrome'
  );
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2500);
      }
    } else {
      // If prompt is not available (e.g. running in an iframe or unsupported environment),
      // we show guided feedback
      alert(
        'To install Easy Islam: Tap your browser menu (⋮ in Chrome or Share in Safari) and select "Install app" or "Add to Home screen".'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-lg bg-emerald-950 border border-emerald-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative px-6 pt-6 pb-4 bg-gradient-to-b from-emerald-900/80 to-emerald-950 border-b border-emerald-800/80">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            title="Close"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-emerald-950 font-bold font-serif text-2xl shadow-lg shadow-amber-500/25 shrink-0">
              <span>إ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-display">Install Easy Islam</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Chrome / WebAPK
                </span>
              </div>
              <p className="text-xs text-emerald-300/80 mt-0.5">
                Install as a standalone native app on Android, Chrome, or iOS
              </p>
            </div>
          </div>

          {/* Quick Install Action Banner */}
          <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-emerald-800/40 to-emerald-900/40 border border-amber-400/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <Sparkles size={16} className="text-amber-400 shrink-0" />
              <span className="text-emerald-100 font-medium">
                {isInstalled
                  ? 'App is already installed in Standalone mode!'
                  : 'Fast 1-click install · Works 100% offline'}
              </span>
            </div>

            {!isInstalled && (
              <button
                onClick={handleInstallClick}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition active:scale-95 cursor-pointer shrink-0"
              >
                <DownloadCloud size={14} />
                <span>{isInstallable ? 'Install App' : 'Add to Device'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Platform Selection Tabs */}
        <div className="px-6 pt-3 pb-2 flex gap-2 border-b border-emerald-900/80 bg-emerald-950 overflow-x-auto">
          <button
            onClick={() => setActiveTab('android')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'android'
                ? 'bg-amber-400 text-emerald-950 shadow-sm font-bold'
                : 'text-emerald-300 hover:bg-emerald-900/60'
            }`}
          >
            <Smartphone size={13} />
            <span>Android APK</span>
          </button>

          <button
            onClick={() => setActiveTab('chrome')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'chrome'
                ? 'bg-amber-400 text-emerald-950 shadow-sm font-bold'
                : 'text-emerald-300 hover:bg-emerald-900/60'
            }`}
          >
            <Laptop size={13} />
            <span>Chrome Desktop</span>
          </button>

          <button
            onClick={() => setActiveTab('ios')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'ios'
                ? 'bg-amber-400 text-emerald-950 shadow-sm font-bold'
                : 'text-emerald-300 hover:bg-emerald-900/60'
            }`}
          >
            <Apple size={13} />
            <span>iPhone / iPad</span>
          </button>

          <button
            onClick={() => setActiveTab('offline')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'offline'
                ? 'bg-amber-400 text-emerald-950 shadow-sm font-bold'
                : 'text-emerald-300 hover:bg-emerald-900/60'
            }`}
          >
            <WifiOff size={13} />
            <span>Offline Engine</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-emerald-200 leading-relaxed">
          {installSuccess && (
            <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-400/60 text-amber-200 flex items-center gap-3">
              <CheckCircle size={20} className="text-amber-400 shrink-0" />
              <div>
                <strong className="block text-sm font-bold text-white">Installation Successful!</strong>
                <span>Easy Islam has been installed to your device launcher.</span>
              </div>
            </div>
          )}

          {/* Android Tab */}
          {activeTab === 'android' && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-800/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-white">
                  <Smartphone className="text-amber-400" size={16} />
                  <span>Native Android WebAPK Integration</span>
                </div>
                <p className="text-emerald-300/90 text-xs">
                  When installed from Google Chrome on Android, Chrome creates a genuine signed <strong>WebAPK</strong> registered directly with Android's Package Manager.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white text-xs">How to install on Android:</h4>
                <ol className="space-y-2 list-decimal list-inside text-emerald-300 pl-1">
                  <li>
                    Tap the <strong className="text-white">"Install App"</strong> button above, or tap the <strong className="text-white">three dots (⋮)</strong> menu in Chrome.
                  </li>
                  <li>
                    Select <strong className="text-white">"Install app"</strong> or <strong className="text-white">"Add to Home screen"</strong>.
                  </li>
                  <li>
                    Android will generate a native WebAPK with the Easy Islam icon in your app drawer.
                  </li>
                  <li>
                    Enjoy full-screen Quran recitation with lockscreen playback and background audio!
                  </li>
                </ol>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center gap-3">
                <ShieldCheck size={18} className="text-amber-400 shrink-0" />
                <div className="text-[11px] text-emerald-300">
                  <span className="font-semibold text-white">Direct APK Package:</span> Supports Trusted Web Activity (TWA) and offline Workbox precaching without requiring Google Play Store.
                </div>
              </div>
            </div>
          )}

          {/* Chrome Desktop Tab */}
          {activeTab === 'chrome' && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-800/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-white">
                  <Laptop className="text-amber-400" size={16} />
                  <span>Desktop Chrome & Edge PWA App</span>
                </div>
                <p className="text-emerald-300/90 text-xs">
                  Install Easy Islam as a standalone desktop window on Windows, macOS, Linux, or Chromebooks with dedicated taskbar pin.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white text-xs">Installation Steps:</h4>
                <ol className="space-y-2 list-decimal list-inside text-emerald-300 pl-1">
                  <li>
                    Click the <strong className="text-white">Install icon (⊕)</strong> located in the right side of Chrome's address bar.
                  </li>
                  <li>
                    Click <strong className="text-white">"Install"</strong> in the prompt dialog.
                  </li>
                  <li>
                    The app launches in an isolated frameless window without browser tabs or address bar.
                  </li>
                  <li>
                    Pin Easy Islam to your Windows Taskbar or macOS Dock for 1-click access anytime.
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* iOS Tab */}
          {activeTab === 'ios' && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-800/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-white">
                  <Apple className="text-amber-400" size={16} />
                  <span>iPhone & iPad Home Screen App</span>
                </div>
                <p className="text-emerald-300/90 text-xs">
                  Apple Safari allows running Easy Islam in standalone mode with full-screen experience and offline cache.
                </p>
              </div>

              <div className="space-y-2.5">
                <h4 className="font-semibold text-white text-xs">2 Simple Steps in Safari:</h4>
                <div className="p-3 rounded-xl bg-emerald-900/50 border border-emerald-800 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-emerald-950 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <span className="font-semibold text-white">Tap the Share Button</span>
                    <p className="text-[11px] text-emerald-300 mt-0.5">
                      At the bottom of your Safari screen, tap the share icon (square with upward arrow).
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-900/50 border border-emerald-800 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-emerald-950 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <span className="font-semibold text-white">Select "Add to Home Screen"</span>
                    <p className="text-[11px] text-emerald-300 mt-0.5">
                      Scroll down in the share sheet and tap <strong>"Add to Home Screen"</strong>, then tap <strong>Add</strong> in the top right.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Offline Engine Tab */}
          {activeTab === 'offline' && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-800/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-white">
                  <HardDrive className="text-amber-400" size={16} />
                  <span>Workbox Service Worker & Cache API</span>
                </div>
                <p className="text-emerald-300/90 text-xs">
                  Easy Islam uses Vite PWA Workbox to precache the application shell, Arabic and Urdu Quran fonts, and user-downloaded Surah audios.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800">
                  <span className="text-[10px] text-emerald-400 uppercase font-semibold">Service Worker</span>
                  <div className="text-sm font-bold text-white mt-0.5 flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-emerald-400" />
                    <span>{swRegistered ? 'Active & Ready' : 'Supported'}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800">
                  <span className="text-[10px] text-emerald-400 uppercase font-semibold">Audio Storage</span>
                  <div className="text-sm font-bold text-white mt-0.5 flex items-center gap-1.5">
                    <HardDrive size={14} className="text-amber-400" />
                    <span>Cache Storage API</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-emerald-400/90">
                You can download individual Surahs or the Essential Surahs bundle from the <strong>Offline Tab</strong> to recite and listen without any WiFi or cellular data.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-emerald-950 border-t border-emerald-900/80 flex items-center justify-between">
          <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
            <Zap size={13} className="text-amber-400" />
            <span>Standalone PWA with Background Audio</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-850 text-emerald-200 text-xs font-semibold transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
