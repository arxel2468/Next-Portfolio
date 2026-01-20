"use client";

import { ThemeProvider } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    // Initialize Lenis smooth scroll
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis to window for navigation
    window.lenis = lenisRef.current;

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}
