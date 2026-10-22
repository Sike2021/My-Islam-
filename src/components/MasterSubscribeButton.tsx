import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, BellRing, BellOff, Check, Loader2, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';
import { fireSubscribeConfetti } from '../utils/confetti';

export type BellTier = 'all' | 'personalized' | 'none';

export interface MasterSubscribeButtonProps {
  variant?: 'youtube' | 'minimal' | 'dark' | 'brutalist' | 'emerald' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'rounded' | 'pill' | 'square';
  showCount?: boolean;
  showBell?: boolean;
  enableConfetti?: boolean;
  enableSound?: boolean;
  initialSubscribed?: boolean;
  initialCount?: number;
  label?: string;
  subscribedLabel?: string;
  channelName?: string;
  onStateChange?: (isSubscribed: boolean, bellTier: BellTier) => void;
  className?: string;
}

export function MasterSubscribeButton({
  variant = 'youtube',
  size = 'md',
  shape = 'pill',
  showCount = true,
  showBell = true,
  enableConfetti = true,
  enableSound = true,
  initialSubscribed = false,
  initialCount = 142800,
  label = 'Subscribe',
  subscribedLabel = 'Subscribed',
  channelName = 'Design Studio',
  onStateChange,
  className = '',
}: MasterSubscribeButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
  const [isLoading, setIsLoading] = useState(false);
  const [subscribers, setSubscribers] = useState(initialCount);
  const [bellTier, setBellTier] = useState<BellTier>('all');
  const [isBellMenuOpen, setIsBellMenuOpen] = useState(false);
  const [showConfirmUnsub, setShowConfirmUnsub] = useState(false);
  const [bellAnimating, setBellAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsBellMenuOpen(false);
        setShowConfirmUnsub(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatSubscribers = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const handleSubscribeToggle = () => {
    if (isLoading) return;

    if (isSubscribed) {
      // Prompt confirm or unsubscribe
      setShowConfirmUnsub(true);
      if (enableSound) sound.playClick();
      return;
    }

    // Subscribe flow
    setIsLoading(true);
    if (enableSound) sound.playClick();

    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setSubscribers((prev) => prev + 1);

      if (enableSound) sound.playSubscribe();
      if (enableConfetti) fireSubscribeConfetti(buttonRef.current);

      onStateChange?.(true, bellTier);
    }, 450);
  };

  const handleConfirmUnsubscribe = () => {
    setIsSubscribed(false);
    setSubscribers((prev) => Math.max(0, prev - 1));
    setShowConfirmUnsub(false);
    setIsBellMenuOpen(false);
    if (enableSound) sound.playUnsubscribe();
    onStateChange?.(false, bellTier);
  };

  const handleBellTierSelect = (tier: BellTier) => {
    setBellTier(tier);
    setIsBellMenuOpen(false);
    setBellAnimating(true);
    if (enableSound) sound.playBell();
    setTimeout(() => setBellAnimating(false), 600);
    onStateChange?.(isSubscribed, tier);
  };

  // Size styling maps
  const sizeConfig = {
    sm: {
      btn: 'px-3 py-1.5 text-xs gap-1.5',
      count: 'px-2 py-1.5 text-xs',
      iconSize: 13,
      bellBtn: 'p-1.5',
    },
    md: {
      btn: 'px-4.5 py-2.5 text-sm gap-2',
      count: 'px-3 py-2.5 text-xs',
      iconSize: 15,
      bellBtn: 'p-2.5',
    },
    lg: {
      btn: 'px-6 py-3.5 text-base font-semibold gap-2.5',
      count: 'px-4 py-3.5 text-sm',
      iconSize: 18,
      bellBtn: 'p-3.5',
    },
    xl: {
      btn: 'px-7 py-4 text-lg font-bold gap-3',
      count: 'px-5 py-4 text-base',
      iconSize: 20,
      bellBtn: 'p-4',
    },
  }[size];

  // Shape classes
  const shapeClass = {
    rounded: 'rounded-xl',
    pill: 'rounded-full',
    square: 'rounded-md',
  }[shape];

  // Variants styling
  const getVariantStyles = () => {
    switch (variant) {
      case 'youtube':
        return {
          unsubBg: 'bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-600/20 active:bg-red-800',
          subBg: 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700',
          countBg: 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 border-l border-red-200/60 dark:border-red-900/60',
          subCountBg: 'bg-slate-50 text-slate-600 dark:bg-slate-800/60 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700',
        };
      case 'dark':
        return {
          unsubBg: 'bg-slate-950 hover:bg-black text-white shadow-md active:scale-95 border border-slate-800',
          subBg: 'bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-700',
          countBg: 'bg-slate-900 text-slate-300 border-l border-slate-800',
          subCountBg: 'bg-slate-900 text-slate-400 border-l border-slate-800',
        };
      case 'emerald':
        return {
          unsubBg: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/25',
          subBg: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
          countBg: 'bg-emerald-700 text-emerald-100 border-l border-emerald-500/40',
          subCountBg: 'bg-emerald-100/70 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-l border-emerald-200 dark:border-emerald-800',
        };
      case 'gradient':
        return {
          unsubBg: 'bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 hover:opacity-95 text-white shadow-md shadow-indigo-500/25',
          subBg: 'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white border border-slate-200 dark:border-slate-700',
          countBg: 'bg-indigo-950/40 text-white border-l border-white/20',
          subCountBg: 'bg-slate-200/70 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border-l border-slate-300 dark:border-slate-600',
        };
      case 'brutalist':
        return {
          unsubBg: 'bg-black text-white hover:translate-x-0.5 hover:translate-y-0.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black active:shadow-none',
          subBg: 'bg-yellow-300 text-black hover:translate-x-0.5 hover:translate-y-0.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black active:shadow-none',
          countBg: 'bg-white text-black font-mono border-l-2 border-black',
          subCountBg: 'bg-white text-black font-mono border-l-2 border-black',
        };
      case 'minimal':
      default:
        return {
          unsubBg: 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900',
          subBg: 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700',
          countBg: 'bg-slate-800 text-slate-300 border-l border-slate-700',
          subCountBg: 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400 border-l border-slate-300 dark:border-slate-600',
        };
    }
  };

  const vStyles = getVariantStyles();

  return (
    <div ref={containerRef} className={`relative inline-flex items-center ${className}`}>
      {/* Main Button Group */}
      <div className={`inline-flex items-stretch overflow-hidden select-none transition-shadow ${shapeClass}`}>
        {/* Subscribe Trigger Button */}
        <motion.button
          ref={buttonRef}
          type="button"
          onClick={handleSubscribeToggle}
          whileTap={{ scale: 0.97 }}
          className={`relative inline-flex items-center justify-center font-medium whitespace-nowrap cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 ${
            sizeConfig.btn
          } ${isSubscribed ? vStyles.subBg : vStyles.unsubBg}`}
          aria-label={isSubscribed ? `Subscribed to ${channelName}. Click to unsubscribe.` : `Subscribe to ${channelName}`}
        >
          {/* Subtle shine or state indicators */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1.5"
              >
                <Loader2 size={sizeConfig.iconSize} className="animate-spin" />
                <span>Joining...</span>
              </motion.span>
            ) : isSubscribed ? (
              <motion.span
                key="subscribed"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="inline-flex items-center gap-1.5"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.25, 1] }}
                  transition={{ duration: 0.25 }}
                >
                  <Check size={sizeConfig.iconSize} className="stroke-[2.5]" />
                </motion.span>
                <span>{subscribedLabel}</span>
              </motion.span>
            ) : (
              <motion.span
                key="subscribe"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="inline-flex items-center gap-1.5"
              >
                <Sparkles size={sizeConfig.iconSize} className="opacity-80" />
                <span>{label}</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Subscriber Count Display (Optional) */}
        {showCount && (
          <div
            className={`inline-flex items-center justify-center font-mono font-medium tabular-nums select-none ${
              sizeConfig.count
            } ${isSubscribed ? vStyles.subCountBg : vStyles.countBg}`}
            title={`${subscribers.toLocaleString()} subscribers`}
          >
            <motion.span
              key={subscribers}
              initial={{ opacity: 0.4, y: isSubscribed ? -4 : 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {formatSubscribers(subscribers)}
            </motion.span>
          </div>
        )}

        {/* Notification Bell Selector (Visible when subscribed) */}
        {showBell && isSubscribed && (
          <div className="relative inline-flex items-center">
            <button
              type="button"
              onClick={() => {
                setIsBellMenuOpen(!isBellMenuOpen);
                setShowConfirmUnsub(false);
                if (enableSound) sound.playClick();
              }}
              className={`inline-flex items-center justify-center border-l border-slate-200/70 dark:border-slate-700/80 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer ${
                sizeConfig.bellBtn
              } ${vStyles.subBg}`}
              aria-label={`Notification preferences: ${bellTier}`}
              title="Notification settings"
            >
              <motion.div
                animate={bellAnimating ? { rotate: [-15, 15, -10, 10, -5, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {bellTier === 'all' && (
                  <BellRing size={sizeConfig.iconSize} className="text-amber-500 fill-amber-400/30" />
                )}
                {bellTier === 'personalized' && (
                  <Bell size={sizeConfig.iconSize} className="text-slate-600 dark:text-slate-300" />
                )}
                {bellTier === 'none' && (
                  <BellOff size={sizeConfig.iconSize} className="text-slate-400 dark:text-slate-500" />
                )}
              </motion.div>
            </button>
          </div>
        )}
      </div>

      {/* Bell Notification Options Dropdown */}
      <AnimatePresence>
        {isBellMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1.5 z-50 text-left"
          >
            <div className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Notification Settings
            </div>

            <button
              type="button"
              onClick={() => handleBellTierSelect('all')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                bellTier === 'all'
                  ? 'bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
            >
              <BellRing size={16} className={bellTier === 'all' ? 'text-amber-500' : 'text-slate-400'} />
              <div className="flex-1">
                <div className="font-semibold">All Notifications</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Receive all new updates</div>
              </div>
              {bellTier === 'all' && <Check size={14} className="text-amber-600 dark:text-amber-400" />}
            </button>

            <button
              type="button"
              onClick={() => handleBellTierSelect('personalized')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                bellTier === 'personalized'
                  ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
            >
              <Bell size={16} className={bellTier === 'personalized' ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400'} />
              <div className="flex-1">
                <div className="font-semibold">Personalized</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Occasional tailored highlights</div>
              </div>
              {bellTier === 'personalized' && <Check size={14} className="text-slate-700 dark:text-slate-300" />}
            </button>

            <button
              type="button"
              onClick={() => handleBellTierSelect('none')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                bellTier === 'none'
                  ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
            >
              <BellOff size={16} className={bellTier === 'none' ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400'} />
              <div className="flex-1">
                <div className="font-semibold">None</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Turn off all notifications</div>
              </div>
              {bellTier === 'none' && <Check size={14} className="text-slate-700 dark:text-slate-300" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unsubscribe Confirmation Popover */}
      <AnimatePresence>
        {showConfirmUnsub && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-4 z-50 text-left"
          >
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              Unsubscribe from {channelName}?
            </h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              You will no longer receive alerts or feed updates from this channel.
            </p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowConfirmUnsub(false)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmUnsubscribe}
                className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Unsubscribe
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
