"use client";

import { ThemeProvider } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Lenis from 'lenis';

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const lenis = new Lenis({ autoRaf: true, duration: 1.6, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    window.lenis = lenis;
    return () => lenis.destroy();
  }, []);

  return (
    <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease' }}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <LazyMotion features={domAnimation} strict>
          {children}
        </LazyMotion>
      </ThemeProvider>
    </div>
  );
}
