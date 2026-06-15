// src/components/Nav.jsx
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import s from './Nav.module.css';

const SECTIONS = [
  { id: 'hero',        label: 'Start'    },
  { id: 'stealstreet', label: 'Work'     },
  { id: 'projects',    label: 'Projects' },
  { id: 'writing',     label: 'Writing'  },
  { id: 'contact',     label: 'Talk'     },
];

export default function Nav() {
  const [active, setActive] = useState('hero');
  const [show, setShow]     = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { threshold: 0.35 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.3 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop — left rail */}
      <AnimatePresence>
        {show && (
          <motion.nav
            className={s.rail}
            aria-label="Navigation"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={s.railMark}>AP</span>
            <div className={s.railLine} aria-hidden="true" />

            {SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                className={`${s.railBtn} ${active === id ? s.railBtnActive : ''}`}
                onClick={() => go(id)}
                aria-label={label}
                aria-current={active === id ? 'true' : undefined}
              >
                {/* Shared layout indicator — slides between active items */}
                {active === id && (
                  <motion.span
                    className={s.railIndicator}
                    layoutId="nav-indicator"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className={s.railNub} aria-hidden="true" />
                <span className={s.railLabel}>{label}</span>
              </button>
            ))}

            <div className={s.railLine} aria-hidden="true" />
            <span className={s.railCity}>MUM</span>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile — bottom strip */}
      <nav className={s.strip} aria-label="Navigation">
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            className={`${s.stripBtn} ${active === id ? s.stripBtnActive : ''}`}
            onClick={() => go(id)}
          >
            {label}
          </button>
        ))}
      </nav>
    </>
  );
}