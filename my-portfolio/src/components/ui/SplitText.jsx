'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}) {
  const ref = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  useEffect(() => {
    if (!ref.current || !text || !fontsLoaded || hasAnimated.current) return;

    const el = ref.current;
    const chars = el.querySelectorAll('.split-char');
    if (!chars.length) return;

    gsap.set(chars, { ...from });

    const startPct = (1 - threshold) * 100;

    gsap.to(chars, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      scrollTrigger: {
        trigger: el,
        start: `top ${startPct}%`,
        once: true,
      },
      onComplete: () => {
        hasAnimated.current = true;
        onLetterAnimationComplete?.();
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [text, fontsLoaded, delay, duration, ease, from, to, threshold, rootMargin, onLetterAnimationComplete]);

  return (
    <span ref={ref} className={`inline-block ${className}`} style={{ textAlign }}>
      {text.split('').map((char, i) => (
        <span key={i} className="split-char inline-block" style={{ opacity: 0 }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
