'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export function Providers({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: t => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });
    window.__lenis = lenis;
    let raf;
    const tick = (t) => { lenis.raf(t); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}