import confetti from 'canvas-confetti';

export function fireSubscribeConfetti(targetEl?: HTMLElement | null) {
  try {
    let origin = { x: 0.5, y: 0.5 };
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      origin = {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      };
    }

    // Two rapid bursts with pleasant vibrant celebratory palette
    confetti({
      particleCount: 40,
      spread: 60,
      startVelocity: 28,
      origin,
      colors: ['#ef4444', '#f59e0b', '#10b981', '#6366f1', '#ec4899'],
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      confetti({
        particleCount: 25,
        angle: 60,
        spread: 55,
        origin,
        colors: ['#3b82f6', '#8b5cf6', '#f43f5e'],
        disableForReducedMotion: true,
      });
    }, 100);
  } catch {
    // Graceful fallback if canvas is restricted
  }
}
