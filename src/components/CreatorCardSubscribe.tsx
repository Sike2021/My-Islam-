import { useState } from 'react';
import { MasterSubscribeButton, BellTier } from './MasterSubscribeButton';
import { Play, Eye, Clock, CheckCircle } from 'lucide-react';

export function CreatorCardSubscribe() {
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleStateChange = (isSubscribed: boolean, bellTier: BellTier) => {
    if (isSubscribed) {
      setLastAction(`Subscribed with ${bellTier} notifications.`);
    } else {
      setLastAction('Unsubscribed.');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm text-left max-w-xl mx-auto">
      {/* Channel Header Banner */}
      <div className="h-28 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 relative">
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Profile & Subscribe Bar */}
      <div className="px-6 pb-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10 mb-5">
          {/* Avatar & Channel Details */}
          <div className="flex items-end gap-3.5">
            <div className="w-20 h-20 rounded-2xl bg-slate-900 dark:bg-slate-800 border-4 border-white dark:border-slate-900 flex items-center justify-center text-white text-2xl font-black shadow-md overflow-hidden relative">
              <span className="bg-gradient-to-tr from-rose-500 to-amber-400 bg-clip-text text-transparent">
                DS
              </span>
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-1.5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Design Systems Lab
                </h3>
                <CheckCircle size={15} className="text-red-500 fill-red-500/20" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">@designsystemslab · 214 videos</p>
            </div>
          </div>

          {/* Master Subscribe Button */}
          <div className="shrink-0 self-start sm:self-end">
            <MasterSubscribeButton
              variant="youtube"
              size="md"
              shape="pill"
              channelName="Design Systems Lab"
              initialCount={142800}
              onStateChange={handleStateChange}
            />
          </div>
        </div>

        {/* Channel Description */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Deep-dives into component ergonomics, micro-interactions, CSS architecture, and design tokens. New breakdowns every Tuesday.
        </p>

        {/* Featured Latest Video Card */}
        <div className="mt-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3.5 hover:bg-slate-100/70 dark:hover:bg-slate-800 transition">
          <div className="w-24 h-15 rounded-lg bg-slate-900 relative flex items-center justify-center text-white shrink-0 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 opacity-90" />
            <Play size={18} className="relative text-white fill-white/80" />
            <span className="absolute bottom-1 right-1 px-1 py-0.2 bg-black/80 rounded text-[9px] font-mono">
              12:44
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <span>Latest Episode</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1"><Clock size={11} /> 2 days ago</span>
            </div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white truncate mt-0.5">
              Anatomy of the Perfect Subscribe Button (State Machine & Physics)
            </h4>
            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              <span className="flex items-center gap-1"><Eye size={11} /> 38.4K views</span>
            </div>
          </div>
        </div>

        {lastAction && (
          <div className="mt-3 text-[11px] font-medium text-slate-500 dark:text-slate-400 text-right">
            Action: {lastAction}
          </div>
        )}
      </div>
    </div>
  );
}
