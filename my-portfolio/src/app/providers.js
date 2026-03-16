"use client";

import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Lenis from 'lenis';

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    window.lenis = lenis;
    return () => lenis.destroy();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LazyMotion features={domAnimation} strict>
        <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          {children}
        </div>
      </LazyMotion>
    </ThemeProvider>
  );
}
