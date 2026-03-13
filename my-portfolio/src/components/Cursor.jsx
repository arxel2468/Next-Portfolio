"use client";

import { useEffect, useState, useCallback } from 'react';
import { m, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [state, setState] = useState('default');
  const [label, setLabel] = useState('');
  const [fine, setFine] = useState(false);
  const [pressed, setPressed] = useState(false);

  const fast = { stiffness: 500, damping: 35, mass: 0.2 };
  const slow = { stiffness: 120, damping: 25, mass: 0.5 };
  const sx = useSpring(x, fast);
  const sy = useSpring(y, fast);
  const tx = useSpring(x, slow);
  const ty = useSpring(y, slow);

  const onMove = useCallback(e => { x.set(e.clientX); y.set(e.clientY); }, [x, y]);

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    setFine(true);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', () => setState('hidden'));
    document.addEventListener('mouseenter', () => setState('default'));
    window.addEventListener('mousedown', () => setPressed(true));
    window.addEventListener('mouseup', () => setPressed(false));

    const bind = () => {
      document.querySelectorAll('[data-c]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setState(el.getAttribute('data-c'));
          setLabel(el.getAttribute('data-c-label') || '');
        });
        el.addEventListener('mouseleave', () => { setState('default'); setLabel(''); });
      });
    };

    bind();
    const obs = new MutationObserver(bind);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener('mousemove', onMove); obs.disconnect(); };
  }, [onMove]);

  if (!fine) return null;

  // Cursor states:
  // default: small dot + trailing ring
  // hover (buttons/links): dot disappears, ring tightens around element
  // project (cards): large circle with label
  // hidden: invisible
  const isDefault = state === 'default';
  const isHover = state === 'hover';
  const isProject = state === 'project';
  const isHidden = state === 'hidden';

  return (
    <>
      {/* Main dot */}
      <m.div className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ x: sx, y: sy }}>
        <m.div
          animate={{
            width: isProject ? 90 : isHover ? 0 : pressed ? 6 : 8,
            height: isProject ? 90 : isHover ? 0 : pressed ? 6 : 8,
            opacity: isHidden ? 0 : isProject ? 0.85 : isHover ? 0 : 0.9,
            backgroundColor: isProject ? 'var(--accent-color)' : 'var(--text)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="rounded-full flex items-center justify-center"
          style={{ translateX: '-50%', translateY: '-50%', mixBlendMode: isProject ? 'normal' : 'difference' }}
        >
          <AnimatePresence mode="wait">
            {isProject && label && (
              <m.span key={label} initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
                className="text-white text-[10px] font-semibold tracking-wider uppercase">
                {label}
              </m.span>
            )}
          </AnimatePresence>
        </m.div>
      </m.div>

      {/* Trail ring */}
      <m.div className="fixed top-0 left-0 pointer-events-none z-[9998]" style={{ x: tx, y: ty }}>
        <m.div
          animate={{
            width: isHover ? 50 : isDefault ? 36 : 0,
            height: isHover ? 50 : isDefault ? 36 : 0,
            opacity: isHidden ? 0 : isHover ? 0.5 : isDefault ? 0.15 : 0,
            borderColor: isHover ? 'var(--accent-color)' : 'var(--text)',
            borderWidth: isHover ? 2 : 1,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="rounded-full"
          style={{ translateX: '-50%', translateY: '-50%', borderStyle: 'solid', mixBlendMode: isHover ? 'normal' : 'difference' }}
        />
      </m.div>
    </>
  );
}
