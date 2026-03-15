"use client";
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Lenis from 'lenis';

export function Providers({ children }) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(true);
    const l = new Lenis({ autoRaf: true, duration: 1.6, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    window.lenis = l;
    return () => l.destroy();
  }, []);
  return (
    <div style={{ opacity: ok ? 1 : 0, transition: 'opacity .5s' }}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <LazyMotion features={domAnimation} strict>{children}</LazyMotion>
      </ThemeProvider>
    </div>
  );
}
