"use client";

import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { scrollTo } from '@/lib/utils';

const links = [
  { label: 'Work', id: 'work' },
  { label: 'Projects', id: 'projects' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

export default function Nav() {
  const [show, setShow] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fn = () => setShow(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* Floating pill nav — desktop only, appears after hero */}
      <AnimatePresence>
        {show && (
          <m.nav
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] hidden md:flex"
          >
            <div className="flex items-center gap-0.5 px-1.5 py-1.5 rounded-full backdrop-blur-2xl border border-[var(--border-strong)]"
              style={{ background: 'color-mix(in srgb, var(--bg) 80%, transparent)' }}>
              {links.map(l => (
                <button key={l.id} onClick={() => scrollTo(l.id)}
                  className="px-4 py-2 text-[12px] font-medium text-[var(--text-muted)] hover:text-[var(--text)] rounded-full hover:bg-[var(--border)] transition-all duration-200"
                  data-c="hover">{l.label}</button>
              ))}
              <div className="w-px h-4 bg-[var(--border-strong)] mx-1" />
              {mounted && (
                <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                  className="p-2 text-[var(--text-muted)] hover:text-[var(--text)] rounded-full hover:bg-[var(--border)] transition-all"
                  data-c="hover">
                  <m.div key={resolvedTheme} initial={{ rotate: -20, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}>
                    {resolvedTheme === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
                  </m.div>
                </button>
              )}
              <button onClick={() => scrollTo('contact')}
                className="ml-0.5 px-4 py-2 text-[12px] font-medium bg-[var(--text)] text-[var(--bg)] rounded-full hover:opacity-80 transition-opacity"
                data-c="hover">
                Let's Talk
              </button>
            </div>
          </m.nav>
        )}
      </AnimatePresence>

      {/* Top bar — minimal, no background */}
      <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
        <div className="container-wide h-20 flex items-center justify-between">
          <m.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-xl pointer-events-auto" data-c="hover">
            amit<span className="text-pop">.</span>
          </m.button>

          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
            className="pointer-events-auto flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)]"
              style={{ background: 'color-mix(in srgb, var(--bg) 60%, transparent)', backdropFilter: 'blur(12px)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-label text-[0.5625rem]">Available</span>
            </div>
          </m.div>
        </div>
      </div>

      {/* Mobile fab */}
      <div className="md:hidden fixed bottom-6 right-6 z-[100]">
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="w-12 h-12 rounded-full bg-[var(--text)] text-[var(--bg)] flex items-center justify-center shadow-lg"
          data-c="hover">
          <m.div animate={{ rotate: menuOpen ? 45 : 0 }} className="text-lg font-light">+</m.div>
        </button>

        <AnimatePresence>
          {menuOpen && (
            <m.div initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-16 right-0 w-48 py-2 rounded-2xl border border-[var(--border-strong)] shadow-2xl overflow-hidden backdrop-blur-xl"
              style={{ background: 'color-mix(in srgb, var(--bg) 90%, transparent)' }}>
              {links.map(l => (
                <button key={l.id} onClick={() => { scrollTo(l.id); setMenuOpen(false); }}
                  className="w-full text-left px-5 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--border)] transition-colors">
                  {l.label}
                </button>
              ))}
              {mounted && (
                <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                  className="w-full text-left px-5 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--border)] transition-colors flex items-center gap-2">
                  {resolvedTheme === 'dark' ? <><IconSun size={14}/>Light</> : <><IconMoon size={14}/>Dark</>}
                </button>
              )}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
