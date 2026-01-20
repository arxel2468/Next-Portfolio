"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { IconSun, IconMoon, IconMenu2, IconX } from '@tabler/icons-react';
import { scrollToSection } from '@/lib/utils';

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

  const handleNavClick = (href) => {
    scrollToSection(href);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass border-b border-[var(--border-light)]' : ''
        }`}
      >
        <div className="container h-20 flex items-center justify-between">
          {/* Logo - Simple Text */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity"
          >
            amit<span className="text-gradient">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="btn-ghost text-sm"
              >
                {item.label}
              </button>
            ))}

            <div className="w-px h-6 bg-[var(--border-light)] mx-3" />

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="btn-ghost p-2.5 rounded-xl"
                aria-label="Toggle theme"
              >
                {resolvedTheme === 'dark' ? (
                  <IconSun size={20} />
                ) : (
                  <IconMoon size={20} />
                )}
              </button>
            )}

            {/* Status + CTA */}
            <div className="flex items-center gap-4 ml-3 pl-3 border-l border-[var(--border-light)]">
              <div className="flex items-center gap-2">
                <span className="status-dot" />
                <span className="text-xs font-medium text-[var(--text-muted)]">Available</span>
              </div>
              <a
                href="mailto:1amitpandit2468@gmail.com"
                className="btn btn-primary"
              >
                Let's Talk
              </a>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-[var(--bg-secondary)] border-l border-[var(--border-light)] z-50 md:hidden p-6 pt-24"
            >
              <nav className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(item.href)}
                    className="text-left text-lg font-medium py-3 px-4 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              <div className="divider my-6" />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="status-dot" />
                  <span className="text-small">Available for work</span>
                </div>
                {mounted && (
                  <button
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors"
                  >
                    {resolvedTheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
                  </button>
                )}
              </div>

              <a
                href="mailto:1amitpandit2468@gmail.com"
                className="btn btn-primary w-full"
              >
                Let's Talk
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
