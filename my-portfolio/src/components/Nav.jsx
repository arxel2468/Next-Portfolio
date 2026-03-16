"use client";

import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > last && y > 100);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const navigate = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <m.header
        animate={{ y: hidden && !mobileOpen ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,11,0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        }}
      >
        <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
          {/* Logo */}
          <m.a
            href="#"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <svg width="36" height="41" viewBox="0 0 84 96" fill="none">
              <path d="M42 3L78 24V72L42 93L6 72V24L42 3Z" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="42" y="58" textAnchor="middle" fill="var(--accent)" fontFamily="var(--font-dm-serif)" fontSize="34">A</text>
            </svg>
          </m.a>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((l, i) => (
              <m.button
                key={l.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                onClick={() => navigate(l.href)}
                className="px-4 py-2 text-[13px] font-mono transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >
                <span style={{ color: 'var(--accent)', marginRight: 4 }}>0{i + 1}.</span>
                {l.label}
              </m.button>
            ))}
            <m.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              onClick={() => navigate('#contact')}
              className="ml-3 px-5 py-2 text-[13px] font-mono rounded transition-all"
              style={{ color: 'var(--accent)', border: '1px solid var(--accent)' }}
              onMouseEnter={e => e.target.style.background = 'var(--accent-dim)'}
              onMouseLeave={e => e.target.style.background = 'transparent'}
            >
              Let&apos;s Talk
            </m.button>
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 flex flex-col items-end justify-center gap-[5px] z-[60]"
            aria-label="Menu"
          >
            <span className="block h-[1.5px] transition-all duration-300"
              style={{
                width: mobileOpen ? 24 : 24,
                background: 'var(--accent)',
                transform: mobileOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
                transformOrigin: 'center',
              }}
            />
            <span className="block h-[1.5px] transition-all duration-200"
              style={{
                width: mobileOpen ? 0 : 16,
                background: 'var(--accent)',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span className="block h-[1.5px] transition-all duration-300"
              style={{
                width: mobileOpen ? 24 : 20,
                background: 'var(--accent)',
                transform: mobileOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
                transformOrigin: 'center',
              }}
            />
          </button>
        </div>
      </m.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />
            <m.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 w-[70vw] max-w-[320px] z-[45] flex flex-col items-center justify-center gap-8 md:hidden"
              style={{ background: 'var(--bg-elevated)' }}
            >
              {LINKS.map((l, i) => (
                <button
                  key={l.label}
                  onClick={() => navigate(l.href)}
                  className="font-mono text-base"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span className="block text-xs mb-1 text-center" style={{ color: 'var(--accent)' }}>0{i + 1}.</span>
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => navigate('#contact')}
                className="mt-4 px-8 py-3 font-mono text-sm rounded"
                style={{ color: 'var(--accent)', border: '1px solid var(--accent)' }}
              >
                Let&apos;s Talk
              </button>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
