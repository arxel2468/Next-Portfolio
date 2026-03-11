"use client";

import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { IconSun, IconMoon, IconMenu2, IconX } from '@tabler/icons-react';
import { scrollToSection } from '@/lib/utils';
import MagneticButton from '@/components/ui/MagneticButton';

const navItems = [
  { label: 'Work', href: 'work' },
  { label: 'Projects', href: 'projects' },
  { label: 'Process', href: 'process' },
  { label: 'Contact', href: 'contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href) => {
    scrollToSection(href);
    setMobileOpen(false);
  };

  return (
    <>
      <m.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-[var(--border)]' : ''
        }`}
      >
        <div className="container h-[72px] flex items-center justify-between">
          {/* Logo */}
          <MagneticButton strength={0.15}>
            <Link
              href="/"
              className="font-serif text-xl tracking-tight hover:opacity-60 transition-opacity"
            >
              amit<span className="text-accent">.</span>
            </Link>
          </MagneticButton>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <MagneticButton key={item.href} strength={0.1}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg"
                  data-cursor="pointer"
                >
                  {item.label}
                </button>
              </MagneticButton>
            ))}

            <div className="w-px h-5 bg-[var(--border)] mx-2" />

            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors rounded-lg"
                aria-label="Toggle theme"
                data-cursor="pointer"
              >
                {resolvedTheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
              </button>
            )}

            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-[var(--border)]">
              <div className="flex items-center gap-2">
                <span className="status-indicator" />
                <span className="type-mono text-[0.625rem]">Available</span>
              </div>
              <MagneticButton strength={0.15}>
                <a
                  href="mailto:1amitpandit2468@gmail.com"
                  className="btn btn-primary text-sm px-5 py-2.5"
                  data-cursor="pointer"
                >
                  Let's Talk
                </a>
              </MagneticButton>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
          </button>
        </div>
      </m.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />
            <m.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-[var(--bg-secondary)] border-l border-[var(--border)] z-50 md:hidden p-8 pt-24"
              role="dialog"
              aria-modal="true"
            >
              <nav className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <m.button
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => handleNavClick(item.href)}
                    className="text-left text-lg font-medium py-3 px-4 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors"
                  >
                    {item.label}
                  </m.button>
                ))}
              </nav>

              <div className="divider my-6" />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="status-indicator" />
                  <span className="type-small">Available</span>
                </div>
                {mounted && (
                  <button
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)]"
                    aria-label="Toggle theme"
                  >
                    {resolvedTheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
                  </button>
                )}
              </div>

              <a href="mailto:1amitpandit2468@gmail.com" className="btn btn-primary w-full text-sm py-3">
                Let's Talk
              </a>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
