"use client";

import { useEffect, useState, useCallback } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  // 1. All hooks must be at the very top level
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  // Main cursor springs
  const springConfig = { stiffness: 300, damping: 28, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  // Trailing ring springs (Moved from JSX to top level to fix the error)
  const trailingX = useSpring(cursorX, { stiffness: 120, damping: 28 });
  const trailingY = useSpring(cursorY, { stiffness: 120, damping: 28 });

  const handleMouseMove = useCallback(
    (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    setIsPointerDevice(hasFinePointer);

    if (!hasFinePointer) return;

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    const refreshListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, input, textarea, [data-magnetic], [role="button"]'
      );
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    const observer = new MutationObserver(refreshListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    refreshListeners();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [handleMouseMove, handleMouseLeave]);

  // 2. Early return AFTER all hooks have been declared
  if (!isPointerDevice) return null;

  return (
    <>
      {/* Main cursor dot */}
      <m.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <m.div
          animate={{
            width: isHovering ? 48 : 16,
            height: isHovering ? 48 : 16,
            borderRadius: '50%',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          className="bg-white rounded-full"
          style={{
            marginLeft: isHovering ? -24 : -8,
            marginTop: isHovering ? -24 : -8,
          }}
        />
      </m.div>

      {/* Trailing ring */}
      <m.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: trailingX,
          y: trailingY,
          opacity: isVisible ? 0.3 : 0,
        }}
      >
        <m.div
          animate={{
            width: isHovering ? 64 : 32,
            height: isHovering ? 64 : 32,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="border border-white/50 rounded-full mix-blend-difference"
          style={{
            marginLeft: isHovering ? -32 : -16,
            marginTop: isHovering ? -32 : -16,
          }}
        />
      </m.div>
    </>
  );
}
