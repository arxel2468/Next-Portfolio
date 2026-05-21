'use client';
import { useEffect, useRef } from 'react';
import s from './Cursor.module.css';

export default function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const lagged = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const raf = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    d.style.opacity = '1';
    r.style.opacity = '1';

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      d.style.left = `${e.clientX}px`;
      d.style.top  = `${e.clientY}px`;
    };

    const targets = document.querySelectorAll('a, button, [data-hover]');
    const over = () => { hovering.current = true; d.classList.add(s.over); r.classList.add(s.over); };
    const out  = () => { hovering.current = false; d.classList.remove(s.over); r.classList.remove(s.over); };
    targets.forEach(t => { t.addEventListener('mouseenter', over); t.addEventListener('mouseleave', out); });

    const tick = () => {
      const ease = 0.1;
      lagged.current.x += (mouse.current.x - lagged.current.x) * ease;
      lagged.current.y += (mouse.current.y - lagged.current.y) * ease;
      r.style.left = `${lagged.current.x}px`;
      r.style.top  = `${lagged.current.y}px`;
      raf.current = requestAnimationFrame(tick);
    };
    tick();

    document.addEventListener('mousemove', onMove);
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
      targets.forEach(t => { t.removeEventListener('mouseenter', over); t.removeEventListener('mouseleave', out); });
    };
  }, []);

  return (
    <>
      <div ref={dot}  className={s.dot}  aria-hidden="true" style={{ opacity: 0 }} />
      <div ref={ring} className={s.ring} aria-hidden="true" style={{ opacity: 0 }} />
    </>
  );
}