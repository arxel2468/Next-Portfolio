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
      el.style.opacity = '1';
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

    const attachTargets = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach((t) => {
        t.addEventListener('mouseenter', onInteractEnter);
        t.addEventListener('mouseleave', onInteractLeave);
      });
    };
    attachTargets();

    const onVisibility = () => {
      visible.current = document.visibilityState === 'visible';
    };

    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    const tick = () => {
      if (visible.current) {
        // 0.18 — noticeably snappier, still smoothed
        current.current.x += (pos.current.x - current.current.x) * 0.18;
        current.current.y += (pos.current.y - current.current.y) * 0.18;

        // Offset by half the cursor size (8px) so crosshair center = pointer
        el.style.transform = `translate(${current.current.x - 8}px, ${current.current.y - 8}px)`;
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