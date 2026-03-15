"use client";

import { useRef, useEffect, useState } from 'react';
import { m, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { IconSun, IconMoon } from '@tabler/icons-react';
import Cursor from './Cursor';
import PanelHero from './panels/PanelHero';
import PanelCase from './panels/PanelCase';
import PanelProjects from './panels/PanelProjects';
import PanelAbout from './panels/PanelAbout';
import PanelContact from './panels/PanelContact';

const PANELS = 5;

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) { clearInterval(interval); setTimeout(() => setLoading(false), 500); return 100; }
        return prev + Math.floor(Math.random() * 6) + 3;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(PANELS - 1) * 100}%`]);

  return (
    <>
      <Cursor />

      {/* Loader */}
      <AnimatePresence>
        {loading && (
          <m.div exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: .9, ease: [.76, 0, .24, 1] }}
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[var(--bg)]">
            <m.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              className="f-label tracking-[.3em] mb-6">Amit Pandit</m.p>
            <div className="w-48 h-[2px] bg-[var(--line2)] rounded-full overflow-hidden mb-4">
              <m.div className="h-full bg-[var(--rose)] rounded-full"
                animate={{ width: `${Math.min(count, 100)}%` }} />
            </div>
            <p className="f-label tabular-nums" style={{ color: 'var(--rose)' }}>{Math.min(count, 100)}</p>
          </m.div>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <m.div initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }}
        transition={{ delay: .3, duration: .6 }}
        className="fixed top-0 left-0 right-0 z-[200] pointer-events-none">
        <div className="flex items-center justify-between px-6 md:px-10 h-16">
          <span className="f-display text-lg pointer-events-auto" data-c="hover"
            style={{ cursor: 'pointer' }}>
            A<span style={{ color: 'var(--rose)' }}>.</span>
          </span>
          <div className="pointer-events-auto flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--line)]"
              style={{ background: 'color-mix(in srgb, var(--bg) 60%, transparent)', backdropFilter: 'blur(12px)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="f-label" style={{ fontSize: '.5rem' }}>Open to work</span>
            </div>
            {mounted && (
              <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                data-c="hover"
                className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center"
                style={{ color: 'var(--ink3)', background: 'color-mix(in srgb, var(--bg) 60%, transparent)', backdropFilter: 'blur(12px)' }}>
                {resolvedTheme === 'dark' ? <IconSun size={13} /> : <IconMoon size={13} />}
              </button>
            )}
          </div>
        </div>
      </m.div>

      {/* Progress bar */}
      <m.div initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[201]">
        <m.div className="h-full bg-[var(--rose)] origin-left"
          style={{ scaleX: scrollYProgress }} />
      </m.div>

      {/* Panel indicators */}
      {!isMobile && (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-[200] hidden md:flex flex-col gap-2">
          {['Intro', 'Work', 'Projects', 'About', 'Contact'].map((label, i) => (
            <PanelDot key={label} index={i} total={PANELS} progress={scrollYProgress} label={label} />
          ))}
        </m.div>
      )}

      {/* Main content */}
      <m.div initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }}
        transition={{ delay: .4, duration: .8 }}>

        {isMobile ? (
          /* Mobile: vertical scroll */
          <div>
            <div className="h-screen"><PanelHero /></div>
            <div id="work"><PanelCase /></div>
            <div id="projects"><PanelProjects /></div>
            <div id="about"><PanelAbout /></div>
            <div id="contact"><PanelContact /></div>
          </div>
        ) : (
          /* Desktop: horizontal scroll */
          <div ref={containerRef} style={{ height: `${PANELS * 100}vh` }}>
            <div className="sticky top-0 h-screen overflow-hidden">
              <m.div style={{ x }} className="flex h-full">
                <Panel id="hero"><PanelHero /></Panel>
                <Panel id="work"><PanelCase /></Panel>
                <Panel id="projects"><PanelProjects /></Panel>
                <Panel id="about"><PanelAbout /></Panel>
                <Panel id="contact"><PanelContact /></Panel>
              </m.div>
            </div>
          </div>
        )}
      </m.div>
    </>
  );
}

function Panel({ children, id }) {
  return (
    <div id={id} className="w-screen h-screen shrink-0 relative overflow-hidden">
      {children}
    </div>
  );
}

function PanelDot({ index, total, progress, label }) {
  const start = index / total;
  const end = (index + 1) / total;
  const dotProgress = useTransform(progress, [start, end], [0, 1]);
  const isActive = useTransform(progress, v => {
    const current = v * total;
    return current >= index - 0.3 && current < index + 1.3;
  });

  return (
    <m.div className="group flex items-center gap-3 justify-end" data-c="hover"
      whileHover={{ x: -4 }}>
      <span className="f-label text-[.5rem] opacity-0 group-hover:opacity-100 transition-opacity">{label}</span>
      <m.div className="rounded-full transition-all duration-300"
        style={{
          width: useTransform(isActive, v => v ? 24 : 6),
          height: 6,
          backgroundColor: useTransform(isActive, v => v ? 'var(--rose)' : 'var(--line2)'),
        }} />
    </m.div>
  );
}
