"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [variant, setVariant] = useState('default');
  const [visible, setVisible] = useState(false);
  const [isFine, setIsFine] = useState(false);
  const rafRef = useRef(null);

  const springConfig = { stiffness: 500, damping: 35, mass: 0.3 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const ringSpring = { stiffness: 180, damping: 25, mass: 0.5 };
  const ringX = useSpring(cursorX, ringSpring);
  const ringY = useSpring(cursorY, ringSpring);

  const handleMouseMove = useCallback((e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!visible) setVisible(true);
  }, [cursorX, cursorY, visible]);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    setIsFine(fine);
    if (!fine) return;

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', () => setVisible(false));
    document.addEventListener('mouseenter', () => setVisible(true));

    const onEnter = (e) => {
      const el = e.target.closest('a, button, input, textarea, [data-cursor="pointer"]');
      if (el) setVariant('pointer');

      const text = e.target.closest('[data-cursor="text"]');
      if (text) setVariant('text');
    };

    const onLeave = () => setVariant('default');

    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, [handleMouseMove, visible]);

  if (!isFine) return null;

  const sizes = {
    default: { w: 12, h: 12, ring: 36 },
    pointer: { w: 40, h: 40, ring: 0 },
    text: { w: 2, h: 28, ring: 0 },
  };

  const s = sizes[variant];

  return (
    <>
      <m.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      >
        <m.div
          animate={{
            width: s.w,
            height: s.h,
            borderRadius: variant === 'text' ? 1 : 999,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          className="bg-[var(--text-primary)] mix-blend-difference"
          style={{
            marginLeft: -s.w / 2,
            marginTop: -s.h / 2,
          }}
        />
      </m.div>

      {variant === 'default' && (
        <m.div
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            x: ringX,
            y: ringY,
            opacity: visible ? 0.4 : 0,
          }}
        >
          <div
            className="border border-[var(--text-primary)] rounded-full mix-blend-difference"
            style={{
              width: s.ring,
              height: s.ring,
              marginLeft: -s.ring / 2,
              marginTop: -s.ring / 2,
            }}
          />
        </m.div>
      )}
    </>
  );
}
