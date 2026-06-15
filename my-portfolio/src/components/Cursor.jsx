// src/components/Cursor.jsx
'use client';
import { useEffect, useRef } from 'react';
import s from './Cursor.module.css';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -100, y: -100 });
  const lagged  = useRef({ x: -100, y: -100 });
  const rafRef  = useRef(null);
  const active  = useRef(true); // visibility guard

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.opacity  = '1';
    ring.style.opacity = '1';

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top  = `${e.clientY}px`;
    };

    // Hover state for interactive elements
    const targets = () => document.querySelectorAll('a, button, [data-hover]');
    const over = () => { dot.classList.add(s.over);  ring.classList.add(s.over);  };
    const out  = () => { dot.classList.remove(s.over); ring.classList.remove(s.over); };

    const attachListeners = () => {
      targets().forEach(t => {
        t.addEventListener('mouseenter', over);
        t.addEventListener('mouseleave', out);
      });
    };
    attachListeners();

    // Visibility guard — stops RAF when tab is hidden
    const onVisibility = () => {
      active.current = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibility);

    const tick = () => {
      if (active.current) {
        lagged.current.x += (mouse.current.x - lagged.current.x) * 0.1;
        lagged.current.y += (mouse.current.y - lagged.current.y) * 0.1;
        ring.style.left = `${lagged.current.x}px`;
        ring.style.top  = `${lagged.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    document.addEventListener('mousemove', onMove);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(rafRef.current);
      targets().forEach(t => {
        t.removeEventListener('mouseenter', over);
        t.removeEventListener('mouseleave', out);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className={s.dot}  aria-hidden="true" style={{ opacity: 0 }} />
      <div ref={ringRef} className={s.ring} aria-hidden="true" style={{ opacity: 0 }} />
    </>
  );
}