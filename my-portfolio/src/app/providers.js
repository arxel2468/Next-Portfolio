'use client';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';

export function Providers({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}
