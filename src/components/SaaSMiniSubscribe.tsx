import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShieldCheck, Zap, ArrowRight, Loader2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { fireSubscribeConfetti } from '../utils/confetti';

export function SaaSMiniSubscribe() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const monthlyPrice = 29;
  const yearlyPrice = 24; // per month, billed annually

  const handleSubscribe = () => {
    if (isSubscribed) {
      setIsSubscribed(false);
      sound.playUnsubscribe();
      return;
    }

    setIsSubscribing(true);
    sound.playClick();

    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
      sound.playSubscribe();
      fireSubscribeConfetti();
    }, 500);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm text-left max-w-xl mx-auto flex flex-col justify-between">
      <div>
        {/* Header with Plan Info & Billing Switch */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Pro Membership
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Unlock Full Access
            </h3>
          </div>

          {/* Billing Switch */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setBillingCycle('monthly');
                sound.playClick();
              }}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => {
                setBillingCycle('yearly');
                sound.playClick();
              }}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition cursor-pointer flex items-center gap-1 ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Yearly</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-1 py-0.2 rounded">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing display */}
        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            ${billingCycle === 'yearly' ? yearlyPrice : monthlyPrice}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            / month {billingCycle === 'yearly' && '(billed $288 annually)'}
          </span>
        </div>

        {/* Feature List */}
        <ul className="mt-5 space-y-2 text-xs text-slate-600 dark:text-slate-300">
          <li className="flex items-center gap-2">
            <Check size={14} className="text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
            <span>Unlimited component library access & design token sync</span>
          </li>
          <li className="flex items-center gap-2">
            <Check size={14} className="text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
            <span>Real-time component updates & private community discord</span>
          </li>
          <li className="flex items-center gap-2">
            <Check size={14} className="text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
            <span>Priority GitHub support & commercial deployment license</span>
          </li>
        </ul>
      </div>

      {/* Button & Guarantee */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
        <motion.button
          type="button"
          onClick={handleSubscribe}
          disabled={isSubscribing}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
            isSubscribed
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
          }`}
        >
          <AnimatePresence mode="wait">
            {isSubscribing ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2"
              >
                <Loader2 size={16} className="animate-spin" />
                <span>Processing subscription...</span>
              </motion.span>
            ) : isSubscribed ? (
              <motion.span
                key="active"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="inline-flex items-center gap-2"
              >
                <Check size={16} className="stroke-[2.5]" />
                <span>Subscription Active (Click to cancel)</span>
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="inline-flex items-center gap-2"
              >
                <Zap size={16} className="fill-white/20" />
                <span>Subscribe to Pro</span>
                <ArrowRight size={15} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <ShieldCheck size={13} className="text-emerald-600 dark:text-emerald-400" />
          <span>14-day money-back guarantee · Cancel anytime</span>
        </div>
      </div>
    </div>
  );
}
