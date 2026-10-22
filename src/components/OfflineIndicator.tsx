import React from 'react';
import { WifiOff, AlertTriangle } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-bounce-subtle">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/90 backdrop-blur-md text-emerald-950 font-bold text-xs shadow-xl border border-amber-300">
        <WifiOff size={14} className="stroke-[2.5]" />
        <span>Offline Mode — Playing from Cached Audio</span>
      </div>
    </div>
  );
};
