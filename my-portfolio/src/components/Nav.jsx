// src/components/Nav.jsx
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import s from './Nav.module.css';

const SECTIONS = [
  { id: 'opening', label: 'Start',    num: '01' },
  { id: 'work',    label: 'Work',     num: '02' },
  { id: 'index',   label: 'Projects', num: '03' },
  { id: 'archive', label: 'Writing',  num: '04' },
  { id: 'contact', label: 'Contact',  num: '05' },
];

const overlayVariants = {
  closed: { opacity: 0, pointerEvents: 'none' },
  open:   { opacity: 1, pointerEvents: 'auto' },
};

const itemVariants = {
  closed: { opacity: 0, y: 24 },
  open:   (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.05 + i * 0.07,
    },
  }),
};

export default function Nav() {
  const [open,   setOpen]   = useState(false);
  const [active, setActive] = useState('opening');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { threshold: 0.4 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  // Lock body scroll when nav open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.2 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* Monogram — always visible, top left */}
      <div className={s.monogram}>
        <button
          className={s.monogramBtn}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          data-hover
        >
          <span className={s.monogramText}>AP</span>
          <span className={s.monogramSub}>
            {open ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Full-screen overlay nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={s.overlay}
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={() => setOpen(false)}
          >
            {/* Backdrop blur layer */}
            <div className={s.overlayBg} />

            {/* Nav items — stop propagation so clicking items doesn't close via backdrop */}
            <nav
              className={s.overlayNav}
              aria-label="Site navigation"
              onClick={(e) => e.stopPropagation()}
            >
              {SECTIONS.map(({ id, label, num }, i) => (
                <motion.button
                  key={id}
                  className={`${s.navItem} ${active === id ? s.navItemActive : ''}`}
                  variants={itemVariants}
                  custom={i}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  onClick={() => go(id)}
                  data-hover
                >
                  <span className={s.navNum}>{num}</span>
                  <span className={s.navLabel}>{label}</span>
                  {active === id && (
                    <motion.span
                      className={s.navDot}
                      layoutId="nav-active"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Bottom strip — social links */}
            <motion.div
              className={s.overlayFoot}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a href="https://github.com/arxel2468"
                 target="_blank" rel="noopener noreferrer"
                 data-hover>GitHub</a>
              <a href="https://amitpandit.substack.com"
                 target="_blank" rel="noopener noreferrer"
                 data-hover>Substack</a>
              <a href="https://linkedin.com/in/amitpandit2468"
                 target="_blank" rel="noopener noreferrer"
                 data-hover>LinkedIn</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}