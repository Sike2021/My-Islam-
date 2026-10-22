import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Check, Loader2, ArrowRight, X } from 'lucide-react';
import { sound } from '../utils/sound';
import { fireSubscribeConfetti } from '../utils/confetti';

export function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'weekly' | 'daily' | 'editions'>('weekly');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [subscribersCount, setSubscribersCount] = useState(48210);

  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      setStatus('error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');
    sound.playClick();

    setTimeout(() => {
      setStatus('success');
      setSubscribersCount((prev) => prev + 1);
      sound.playSubscribe();
      fireSubscribeConfetti(btnRef.current);
    }, 600);
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    setErrorMessage('');
    sound.playUnsubscribe();
  };

  return (
    <div
      ref={containerRef}
      className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-left max-w-xl mx-auto"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Engineering & Design Dispatch</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums font-medium text-slate-700 dark:text-slate-300">
              {subscribersCount.toLocaleString()} readers
            </span>
          </div>
          <h3 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Curated frontend craftsmanship
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            One concise email featuring production-grade UI components, micro-interactions, and design systems.
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success-box"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check size={18} className="stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-950 dark:text-emerald-200">
                    You're officially subscribed!
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                    We just sent a welcome note to <strong className="font-medium">{email}</strong>.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-emerald-700 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-200 font-medium underline cursor-pointer"
                title="Manage or reset demo"
              >
                Reset
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubscribe}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-3"
          >
            {/* Input with Integrated Button */}
            <div className="relative flex flex-col sm:flex-row items-stretch gap-2">
              <div className="relative flex-1">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition"
                  disabled={status === 'loading'}
                />
              </div>

              <motion.button
                ref={btnRef}
                type="submit"
                disabled={status === 'loading'}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-medium text-sm inline-flex items-center justify-center gap-2 transition shadow-sm cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </motion.button>
            </div>

            {/* Error notice */}
            {status === 'error' && (
              <p className="text-xs font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <X size={13} />
                <span>{errorMessage}</span>
              </p>
            )}

            {/* Delivery cadence preference */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-slate-700 dark:text-slate-300">Cadence:</span>
                <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5">
                  {(['weekly', 'daily', 'editions'] as const).map((cadence) => (
                    <button
                      key={cadence}
                      type="button"
                      onClick={() => {
                        setFrequency(cadence);
                        sound.playClick();
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition cursor-pointer ${
                        frequency === cadence
                          ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {cadence}
                    </button>
                  ))}
                </div>
              </div>

              <span>No spam · Unsubscribe in 1-click</span>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
