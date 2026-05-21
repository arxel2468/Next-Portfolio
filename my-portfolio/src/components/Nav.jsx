'use client';
import { useEffect, useRef, useState } from 'react';
import s from './Nav.module.css';

const SECTIONS = [
  { id: 'hero',         label: 'Start'    },
  { id: 'stealstreet',  label: 'Work'     },
  { id: 'projects',     label: 'Projects' },
  { id: 'writing',      label: 'Writing'  },
  { id: 'contact',      label: 'Talk'     },
];

export default function Nav() {
  const [active, setActive] = useState('hero');
  const [show, setShow]     = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 2000);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35 }
    );
    SECTIONS.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
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
      <nav className={s.rail} style={{ opacity: show ? 1 : 0 }} aria-label="Navigation">
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
            <span className={s.railNub} aria-hidden="true" />
            <span className={s.railLabel}>{label}</span>
          </button>
        ))}
        <div className={s.railLine} aria-hidden="true" />
        <span className={s.railCity}>MUM</span>
      </nav>

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