'use client';
import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFloat({ children, containerClassName = '', textClassName = '', animationDuration = 1, ease = 'back.inOut(2)', scrollStart = 'center bottom+=50%', scrollEnd = 'bottom bottom-=40%', stagger = 0.03 }) {
  const containerRef = useRef(null);
  const splitText = useMemo(() => {
    const t = typeof children === 'string' ? children : '';
    return t.split('').map((c, i) => <span className="inline-block word" key={i}>{c === ' ' ? '\u00A0' : c}</span>);
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const chars = el.querySelectorAll('.inline-block');
    gsap.fromTo(chars, { willChange: 'opacity, transform', opacity: 0, yPercent: 120, scaleY: 2.3, scaleX: 0.7, transformOrigin: '50% 0%' }, {
      duration: animationDuration, ease, opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1, stagger,
      scrollTrigger: { trigger: el, start: scrollStart, end: scrollEnd, scrub: true }
    });
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${containerClassName}`}>
      <span className={`inline-block ${textClassName}`}>{splitText}</span>
    </div>
  );
}
