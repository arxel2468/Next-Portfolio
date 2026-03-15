"use client";

import { useEffect, useState, useCallback } from 'react';
import { m, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const [mode, setMode] = useState('default');
  const [label, setLabel] = useState('');
  const [ok, setOk] = useState(false);

  const sx = useSpring(x, { stiffness: 500, damping: 35, mass: .2 });
  const sy = useSpring(y, { stiffness: 500, damping: 35, mass: .2 });
  const rx = useSpring(x, { stiffness: 100, damping: 22, mass: .6 });
  const ry = useSpring(y, { stiffness: 100, damping: 22, mass: .6 });

  const onMove = useCallback(e => { x.set(e.clientX); y.set(e.clientY); }, [x, y]);

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    setOk(true);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', () => setMode('hidden'));
    document.addEventListener('mouseenter', () => setMode('default'));
    const bind = () => {
      document.querySelectorAll('[data-c]').forEach(el => {
        el.onmouseenter = () => { setMode(el.dataset.c); setLabel(el.dataset.cl || ''); };
        el.onmouseleave = () => { setMode('default'); setLabel(''); };
      });
    };
    bind();
    const o = new MutationObserver(bind);
    o.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener('mousemove', onMove); o.disconnect(); };
  }, [onMove]);

  if (!ok) return null;
  const isP = mode === 'project', isH = mode === 'hover', isDef = mode === 'default';

  return (
    <>
      <m.div className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ x: sx, y: sy }}>
        <m.div animate={{
          width: isP ? 90 : isH ? 0 : 8,
          height: isP ? 90 : isH ? 0 : 8,
          opacity: mode === 'hidden' ? 0 : isP ? .9 : isH ? 0 : .9,
          backgroundColor: isP ? 'var(--rose)' : 'var(--ink)',
        }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="rounded-full flex items-center justify-center"
          style={{ translateX: '-50%', translateY: '-50%', mixBlendMode: isP ? 'normal' : 'difference' }}>
          <AnimatePresence mode="wait">
            {isP && label && (
              <m.span key={label} initial={{ opacity: 0, scale: .5 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: .5 }}
                className="text-white text-[10px] font-semibold tracking-wider uppercase">{label}</m.span>
            )}
          </AnimatePresence>
        </m.div>
      </m.div>
      <m.div className="fixed top-0 left-0 pointer-events-none z-[9998]" style={{ x: rx, y: ry }}>
        <m.div animate={{
          width: isH ? 48 : isDef ? 36 : 0,
          height: isH ? 48 : isDef ? 36 : 0,
          opacity: mode === 'hidden' ? 0 : isH ? .5 : isDef ? .12 : 0,
          borderColor: isH ? 'var(--rose)' : 'var(--ink)',
          borderWidth: isH ? 1.5 : 1,
        }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="rounded-full"
          style={{ translateX: '-50%', translateY: '-50%', borderStyle: 'solid', mixBlendMode: isH ? 'normal' : 'difference' }} />
      </m.div>
    </>
  );
}
