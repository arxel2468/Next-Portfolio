"use client";

import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { scrollTo, cn } from '@/lib/utils';
import MagneticButton from './ui/MagneticButton';

const NAV = ['work', 'projects', 'about', 'contact'];

export default function Navbar({ loading }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <m.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: loading ? 0 : 1, y: loading ? -30 : 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-[200] transition-all duration-500',
          scrolled && 'backdrop-blur-2xl border-b border-border/50'
        )}
        style={{
          background: scrolled ? 'hsla(var(--background), 0.7)' : 'transparent',
        }}
      >
        <div className="wrap-wide flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <MagneticButton strength={0.15}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="f-display text-2xl hover:text-accent transition-colors duration-300"
            >
              A<span className="text-accent">.</span>
            </button>
          </MagneticButton>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item, i) => (
              <MagneticButton key={item} strength={0.2}>
                <button
                  onClick={() => scrollTo(item)}
                  className="relative px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors capitalize group"
                >
                  {item}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-accent group-hover:w-1/2 transition-all duration-300" />
                </button>
              </MagneticButton>
            ))}

            <div className="w-px h-5 bg-border mx-3" />

            {/* Availability */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-card/50 mr-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-medium text-muted-foreground">Available</span>
            </div>

            {/* Theme */}
            {mounted && (
              <MagneticButton strength={0.3}>
                <button
                  onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                  className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/50 transition-all duration-300 mr-2"
                  aria-label="Toggle theme"
                >
                  <m.div
                    initial={false}
                    animate={{ rotate: resolvedTheme === 'dark' ? 0 : 180, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {resolvedTheme === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
                  </m.div>
                </button>
              </MagneticButton>
            )}

            {/* CTA */}
            <MagneticButton strength={0.15}>
              <button
                onClick={() => scrollTo('contact')}
                className="relative px-5 py-2.5 text-[12px] font-semibold text-white rounded-full overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-orange-500 group-hover:scale-105 transition-transform duration-300" />
                <span className="relative">Let&apos;s Talk</span>
              </button>
            </MagneticButton>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
            aria-label="Menu"
          >
            <m.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 4 : 0 }}
              className="w-5 h-[1.5px] bg-foreground block origin-center"
            />
            <m.span
              animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
              className="w-5 h-[1.5px] bg-foreground block"
            />
            <m.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -4 : 0 }}
              className="w-5 h-[1.5px] bg-foreground block origin-center"
            />
          </button>
        </div>
      </m.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[199] bg-background md:hidden"
          >
            <div className="flex flex-col items-start justify-center h-full px-8 gap-4">
              {NAV.map((item, i) => (
                <m.div
                  key={item}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => { scrollTo(item); setMobileOpen(false); }}
                    className="f-display text-5xl capitalize text-foreground hover:text-accent transition-colors py-2"
                  >
                    {item}
                  </button>
                </m.div>
              ))}

              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex items-center gap-4"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-muted-foreground">Available for work</span>
                </div>

                {mounted && (
                  <button
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground"
                  >
                    {resolvedTheme === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
                  </button>
                )}
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
