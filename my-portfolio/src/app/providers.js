"use client";

import { ThemeProvider } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Lenis from 'lenis';

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    lenisRef.current = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    window.lenis = lenisRef.current;

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <div
      style={{
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    >
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <LazyMotion features={domAnimation} strict>
          {children}
        </LazyMotion>
      </ThemeProvider>
    </div>
  );
}
