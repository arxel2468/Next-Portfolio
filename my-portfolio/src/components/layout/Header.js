"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'Work', href: '#applied' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    setMobileOpen(false);
  };

  // Determine current theme for icon display
  const currentTheme = mounted ? resolvedTheme : 'light';

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled
            ? (currentTheme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)')
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? `1px solid ${currentTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
            : '1px solid transparent',
        }}
      >
        <div className="container-wide py-4 flex items-center justify-between">
          {/* Logo - Clean text "amit." */}
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight hover:opacity-70 transition-opacity"
          >
            amit<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative text-sm font-medium transition-colors group"
                style={{ color: 'var(--fg-muted)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--fg)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--fg-muted)'}
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
              </a>
            ))}

            {/* Divider */}
            <div
              className="w-px h-4"
              style={{ backgroundColor: 'var(--border)' }}
            />

            {/* Theme Toggle - More visible */}
            {mounted && (
              <button
                onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: currentTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  color: 'var(--fg)'
                }}
                aria-label="Toggle theme"
              >
                {currentTheme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}

            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              <span className="status-online" />
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: 'var(--fg-subtle)' }}
              >
                Available
              </span>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5"
              style={{ backgroundColor: 'var(--fg)' }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5"
              style={{ backgroundColor: 'var(--fg)' }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5"
              style={{ backgroundColor: 'var(--fg)' }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 md:hidden"
            style={{
              backgroundColor: currentTheme === 'dark' ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(12px)',
              borderBottom: `1px solid ${currentTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
            }}
          >
            <nav className="container-wide py-6 flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block text-lg font-medium py-2"
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}

              <div className="divider my-4" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="status-online" />
                  <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                    Available for work
                  </span>
                </div>

                {mounted && (
                  <button
                    onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
                    className="px-3 py-1 rounded text-sm font-mono"
                    style={{
                      backgroundColor: currentTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      color: 'var(--fg)'
                    }}
                  >
                    {currentTheme === 'dark' ? '☀ Light' : '☾ Dark'}
                  </button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
