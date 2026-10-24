import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Maximize, RotateCcw, Volume2, VolumeX, Sparkles, ExternalLink, Youtube } from 'lucide-react';

interface UnifiedVideoWatchModalProps {
  isOpen: boolean;
  videoUrl?: string;
  title: string;
  subtitle?: string;
  onClose: () => void;
}

// Extract YouTube ID from multiple URL formats or bare IDs
function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  // Any local asset, mp4, blob, data url or slash path is a direct video, NOT YouTube
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('assets/') ||
    trimmed.endsWith('.mp4') ||
    trimmed.includes('.mp4') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('data:')
  ) {
    return null;
  }
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = trimmed.match(regExp);
  return match ? match[1] : null;
}

function extractYouTubePlaylistId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export const UnifiedVideoWatchModal: React.FC<UnifiedVideoWatchModalProps> = ({
  isOpen,
  videoUrl,
  title,
  subtitle,
  onClose,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const isDirectVideo = Boolean(
    videoUrl && (
      videoUrl.startsWith('/') ||
      videoUrl.startsWith('blob:') ||
      videoUrl.startsWith('data:') ||
      videoUrl.includes('.mp4') ||
      videoUrl.includes('.webm') ||
      videoUrl.includes('assets/')
    )
  );
  const rawYoutubeId = extractYouTubeId(videoUrl);
  const playlistId = extractYouTubePlaylistId(videoUrl);

  // If it's Dr Israr or not direct video, use Dr Israr or valid video
  const isIsrar = title.toLowerCase().includes('israr') || (subtitle && subtitle.toLowerCase().includes('israr'));
  const fallbackYoutubeId = isIsrar ? 'rBqp1cqFA20' : 'Cuqbrwzcy-s';
  const effectivePlaylistId = playlistId || (isIsrar ? 'PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv' : null);
  const youtubeId = rawYoutubeId || (!isDirectVideo && !effectivePlaylistId ? fallbackYoutubeId : rawYoutubeId);
  const effectiveSrc = isDirectVideo && videoUrl ? videoUrl : '';

  useEffect(() => {
    if (isOpen && videoRef.current && !youtubeId && isDirectVideo) {
      videoRef.current.currentTime = 0;
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [isOpen, videoUrl, youtubeId, isDirectVideo]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        videoRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-3xl bg-emerald-950 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-emerald-50 max-h-[95vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between p-3.5 bg-emerald-900/80 border-b border-emerald-800">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
            <div className="min-w-0">
              <h3 className="font-bold text-sm text-white truncate font-display">{title}</h3>
              {subtitle && <p className="text-[11px] text-amber-300 truncate font-arabic">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {youtubeId && (
              <a
                href={`https://www.youtube.com/watch?v=${youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-red-600/30 hover:bg-red-600/50 text-red-300 text-xs font-semibold border border-red-500/40 transition"
              >
                <Youtube size={14} className="text-red-400" />
                <span className="hidden sm:inline">YouTube</span>
                <ExternalLink size={11} />
              </a>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-emerald-950/80 text-emerald-300 hover:text-white flex items-center justify-center transition shrink-0 active:scale-90"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Video Player Canvas */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {youtubeId || effectivePlaylistId ? (
            <iframe
              src={
                youtubeId
                  ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1${effectivePlaylistId ? `&list=${effectivePlaylistId}` : ''}`
                  : `https://www.youtube-nocookie.com/embed/videoseries?list=${effectivePlaylistId}&autoplay=1&rel=0`
              }
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <>
              <video
                ref={videoRef}
                src={effectiveSrc}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                playsInline
                className="w-full h-full object-contain cursor-pointer"
                onClick={togglePlay}
              />

              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center shadow-2xl shadow-amber-400/40 group-hover:scale-110 transition active:scale-95 pl-1">
                    <Play size={28} fill="currentColor" />
                  </div>
                </button>
              )}
            </>
          )}
        </div>

        {/* Full YouTube Documentary Bar */}
        {youtubeId && (
          <div className="p-3 bg-emerald-950 border-t border-emerald-800 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-emerald-200 font-semibold">
                مکمل دستاویزی فلم (Full Documentary) • 1080p HD
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`https://www.youtube.com/watch?v=${youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition shadow-md shadow-red-600/30 active:scale-95"
              >
                <Youtube size={14} />
                <span>Watch on YouTube (یوٹیوب پر فل اسکرین)</span>
                <ExternalLink size={12} />
              </a>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' Urdu full documentary')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-700 transition"
              >
                <span>Search Documentaries</span>
              </a>
            </div>
          </div>
        )}

        {/* Controls Bar (Only for native video) */}
        {!youtubeId && (
          <div className="p-3 bg-emerald-900/60 border-t border-emerald-800 flex flex-col gap-2">
            {/* Seekbar */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-emerald-300 font-mono w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 accent-amber-400 h-1.5 rounded-full cursor-pointer bg-emerald-950"
              />
              <span className="text-[10px] text-emerald-400 font-mono w-10">
                {formatTime(duration)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center hover:bg-amber-300 transition active:scale-90"
                >
                  {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-xl bg-emerald-800 text-emerald-200 flex items-center justify-center hover:bg-emerald-700 transition"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 text-xs font-semibold transition"
                >
                  <Maximize size={14} />
                  <span>Fullscreen</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

