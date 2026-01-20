"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { IconSun, IconMoon, IconMenu2, IconX } from '@tabler/icons-react';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-border' : ''
        }`}
      >
        <div className="container h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-lg font-semibold tracking-tight">
            amit<span className="text-accent">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="btn-ghost text-sm"
              >
                {item.label}
              </button>
            ))}

            <div className="w-px h-5 bg-border mx-2" />

            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="btn-ghost p-2"
                aria-label="Toggle theme"
              >
                {resolvedTheme === 'dark' ? (
                  <IconSun size={18} />
                ) : (
                  <IconMoon size={18} />
                )}
              </button>
            )}

            <div className="flex items-center gap-2 ml-2 pl-4 border-l border-border">
              <span className="status-dot" />
              <span className="text-xs font-medium text-muted">Available</span>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            aria-label="Menu"
          >
            {mobileOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-bg/95 backdrop-blur-sm" />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-bg-elevated border-l border-border p-6 pt-24"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className="text-left text-lg py-3 border-b border-border"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="status-dot" />
                  <span className="text-sm text-muted">Available for work</span>
                </div>
                {mounted && (
                  <button
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    className="p-2"
                  >
                    {resolvedTheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
                  </button>
                )}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
