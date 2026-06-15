// src/components/Cursor.jsx
'use client';
import { useEffect, useRef } from 'react';
import s from './Cursor.module.css';

export default function Cursor() {
  const cursorRef = useRef(null);
  const pos       = useRef({ x: -100, y: -100 });
  const current   = useRef({ x: -100, y: -100 });
  const rafRef    = useRef(null);
  const visible   = useRef(true);
  const hovering  = useRef(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const el = cursorRef.current;
    if (!el) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!hovering.current) el.style.opacity = '1';
    };

    const onLeave  = () => { el.style.opacity = '0'; };
    const onEnter  = () => { el.style.opacity = '1'; };

    const onInteractEnter = () => {
      hovering.current = true;
      el.classList.add(s.active);
    };
    const onInteractLeave = () => {
      hovering.current = false;
      el.classList.remove(s.active);
    };

    const attachToTargets = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach((t) => {
        t.addEventListener('mouseenter', onInteractEnter);
        t.addEventListener('mouseleave', onInteractLeave);
      });
    };
    attachToTargets();

    const onVisibility = () => {
      visible.current = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    // Smooth lerp follow
    const tick = () => {
      if (visible.current) {
        current.current.x += (pos.current.x - current.current.x) * 0.12;
        current.current.y += (pos.current.y - current.current.y) * 0.12;
        el.style.transform =
          `translate(${current.current.x}px, ${current.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('visibilitychange', onVisibility);
      document.querySelectorAll('a, button, [data-hover]').forEach((t) => {
        t.removeEventListener('mouseenter', onInteractEnter);
        t.removeEventListener('mouseleave', onInteractLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={s.cursor}
      aria-hidden="true"
      style={{ opacity: 0 }}
    />
  );
}