import { useState } from 'react';
import { MasterSubscribeButton, BellTier } from './MasterSubscribeButton';
import { Copy, Check, Sliders, Code, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

export function ButtonCustomizer() {
  const [variant, setVariant] = useState<'youtube' | 'minimal' | 'dark' | 'brutalist' | 'emerald' | 'gradient'>('youtube');
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [shape, setShape] = useState<'pill' | 'rounded' | 'square'>('pill');
  const [showCount, setShowCount] = useState(true);
  const [showBell, setShowBell] = useState(true);
  const [enableConfetti, setEnableConfetti] = useState(true);
  const [enableSound, setEnableSound] = useState(true);
  const [label, setLabel] = useState('Subscribe');
  const [subscribedLabel, setSubscribedLabel] = useState('Subscribed');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const toggleSound = () => {
    const next = !enableSound;
    setEnableSound(next);
    sound.setMuted(!next);
  };

  const generateCode = () => {
    return `<MasterSubscribeButton
  variant="${variant}"
  size="${size}"
  shape="${shape}"
  showCount={${showCount}}
  showBell={${showBell}}
  enableConfetti={${enableConfetti}}
  enableSound={${enableSound}}
  label="${label}"
  subscribedLabel="${subscribedLabel}"
  channelName="Studio Design"
  onStateChange={(isSubscribed, bellTier) => {
    console.log('Subscribed:', isSubscribed, 'Bell:', bellTier);
  }}
/>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm text-left">
      {/* Studio Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sliders size={18} className="text-slate-700 dark:text-slate-300" />
          <h3 className="font-semibold text-slate-900 dark:text-white text-base">
            Subscribe Button Playground & Studio
          </h3>
        </div>

        {/* Tab switch between interactive stage and code export */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Interactive Stage
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code size={13} />
            <span>Export Code</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Interactive Canvas Viewport */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col items-center justify-center min-h-[340px] bg-slate-50/70 dark:bg-slate-950/40 relative border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />

          {activeTab === 'preview' ? (
            <div className="relative z-10 flex flex-col items-center gap-4">
              <MasterSubscribeButton
                key={`${variant}-${size}-${shape}-${showCount}-${showBell}`}
                variant={variant}
                size={size}
                shape={shape}
                showCount={showCount}
                showBell={showBell}
                enableConfetti={enableConfetti}
                enableSound={enableSound}
                label={label}
                subscribedLabel={subscribedLabel}
                channelName="Design Lab"
              />
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                Click button to trigger interactive state machine, bell menu, & audio/confetti
              </p>
            </div>
          ) : (
            <div className="relative z-10 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  MasterSubscribeButton.tsx
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-medium shadow-xs cursor-pointer hover:opacity-90"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? 'Copied to clipboard!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-900 dark:bg-black text-slate-200 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                <code>{generateCode()}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Right: Controls & Presets */}
        <div className="lg:col-span-5 p-6 space-y-5 bg-white dark:bg-slate-900">
          {/* Style Variant */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              Visual Theme Variant
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'youtube', label: 'YouTube Red' },
                  { id: 'minimal', label: 'Minimalist' },
                  { id: 'dark', label: 'Dark Obsidian' },
                  { id: 'emerald', label: 'Emerald' },
                  { id: 'gradient', label: 'Gradient' },
                  { id: 'brutalist', label: 'Neo-Brutalist' },
                ] as const
              ).map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    setVariant(v.id);
                    sound.playClick();
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border text-center transition cursor-pointer ${
                    variant === v.id
                      ? 'border-slate-900 dark:border-white bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size & Shape */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                Scale Size
              </label>
              <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
                {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s);
                      sound.playClick();
                    }}
                    className={`flex-1 py-1 text-xs font-medium uppercase rounded-md transition cursor-pointer ${
                      size === s
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                Corner Radius
              </label>
              <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
                {(['pill', 'rounded', 'square'] as const).map((sh) => (
                  <button
                    key={sh}
                    type="button"
                    onClick={() => {
                      setShape(sh);
                      sound.playClick();
                    }}
                    className={`flex-1 py-1 text-xs font-medium capitalize rounded-md transition cursor-pointer ${
                      shape === sh
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {sh}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              Features & Micro-Interactions
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 cursor-pointer p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <span>Display Subscriber Count</span>
                <input
                  type="checkbox"
                  checked={showCount}
                  onChange={(e) => {
                    setShowCount(e.target.checked);
                    sound.playClick();
                  }}
                  className="rounded text-slate-900 focus:ring-0 cursor-pointer w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 cursor-pointer p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <span>Notification Bell Dropdown</span>
                <input
                  type="checkbox"
                  checked={showBell}
                  onChange={(e) => {
                    setShowBell(e.target.checked);
                    sound.playClick();
                  }}
                  className="rounded text-slate-900 focus:ring-0 cursor-pointer w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 cursor-pointer p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Celebration Confetti Burst</span>
                </span>
                <input
                  type="checkbox"
                  checked={enableConfetti}
                  onChange={(e) => {
                    setEnableConfetti(e.target.checked);
                    sound.playClick();
                  }}
                  className="rounded text-slate-900 focus:ring-0 cursor-pointer w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 cursor-pointer p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <span className="flex items-center gap-1.5">
                  {enableSound ? (
                    <Volume2 size={14} className="text-indigo-500" />
                  ) : (
                    <VolumeX size={14} className="text-slate-400" />
                  )}
                  <span>Tactile Audio Feedback (Web Audio)</span>
                </span>
                <input
                  type="checkbox"
                  checked={enableSound}
                  onChange={toggleSound}
                  className="rounded text-slate-900 focus:ring-0 cursor-pointer w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Button Text Inputs */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1">
                Default Label
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1">
                Subscribed Label
              </label>
              <input
                type="text"
                value={subscribedLabel}
                onChange={(e) => setSubscribedLabel(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
