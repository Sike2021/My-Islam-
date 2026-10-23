import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share, X, CheckCircle } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  // If already installed and running standalone, hide button
  if (isInstalled) {
    return null;
  }

  const handleInstall = async () => {
    const success = await install();
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => setInstallSuccess(false), 4000);
    }
  };

  return (
    <>
      {isInstallable && (
        <button
          onClick={handleInstall}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-emerald-950 font-semibold px-3.5 py-1.5 text-xs transition-all shadow-md shadow-amber-900/20 active:scale-95 whitespace-nowrap shrink-0"
          title="Install as Chrome/Desktop App or Mobile PWA"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install App</span>
        </button>
      )}

      {isIOS && (
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-emerald-950/60 hover:bg-emerald-900 text-amber-300 px-3 py-1.5 text-xs font-medium transition whitespace-nowrap shrink-0"
        >
          <Share className="w-3.5 h-3.5" />
          <span>Install on iOS</span>
        </button>
      )}

      {/* iOS Safari Guided Install Sheet */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#032b21] border border-amber-500/30 p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 text-emerald-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Share className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-amber-200">Install on iPhone / iPad</h3>
                <p className="text-xs text-emerald-300">Run offline as a native app</p>
              </div>
            </div>
            <ol className="space-y-3 text-xs text-emerald-100/90 leading-relaxed mb-6 bg-emerald-950/80 p-3.5 rounded-xl border border-emerald-800/60">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                <span>Tap the <strong>Share</strong> button <Share className="w-3 h-3 inline text-amber-400 mx-0.5" /> in Safari’s bottom toolbar.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                <span>Scroll down and select <strong>Add to Home Screen</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                <span>Tap <strong>Add</strong> in the top-right corner to finish.</span>
              </li>
            </ol>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full rounded-xl bg-amber-500 text-emerald-950 font-semibold py-2.5 text-xs hover:bg-amber-400 transition"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Success notification */}
      {installSuccess && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-800 border border-amber-400/50 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs">
          <CheckCircle className="w-4 h-4 text-amber-400" />
          <span>App installed successfully! Accessible offline anytime.</span>
        </div>
      )}
    </>
  );
};
