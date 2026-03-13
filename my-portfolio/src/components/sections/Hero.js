"use client";

import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { scrollTo } from '@/lib/utils';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scaleDown = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      {/* Ambient gradient */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-[0.025] dark:opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, var(--accent-color), transparent 65%)', filter: 'blur(100px)' }} />
        <div className="absolute bottom-[-30%] left-[-15%] w-[50vw] h-[50vw] rounded-full opacity-[0.02] dark:opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, var(--accent-color), transparent 65%)', filter: 'blur(100px)' }} />
      </div>

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <m.div style={{ scale: scaleDown, opacity: titleOpacity }}
          className="container-wide text-center relative z-10">
          <m.div style={{ y: titleY }}>
            <m.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-label mb-8">Product Engineer · Mumbai</m.p>

            <m.h1 className="font-display text-[clamp(3rem,12vw,10rem)] leading-[0.85]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 0.01 }}>
              {'I build'.split('').map((c, i) => (
                <m.span key={i} className="inline-block"
                  initial={{ y: 120, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2.5 + i * 0.04, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
                  {c === ' ' ? '\u00A0' : c}
                </m.span>
              ))}
              <br />
              {'products'.split('').map((c, i) => (
                <m.span key={`p${i}`} className="inline-block text-pop"
                  initial={{ y: 120, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2.8 + i * 0.04, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
                  {c}
                </m.span>
              ))}
            </m.h1>
          </m.div>

          <m.div style={{ y: subtitleY }}>
            <m.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.4, duration: 0.8 }}
              className="mt-10 text-[var(--text-secondary)] text-lg md:text-xl max-w-xl mx-auto font-serif italic leading-relaxed">
              106 sales in 6 days. An entire e-commerce business shipped from scratch.
            </m.p>

            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.8, duration: 0.8 }}
              className="mt-10 flex justify-center gap-4">
              <button onClick={() => scrollTo('work')}
                className="px-7 py-3.5 bg-[var(--text)] text-[var(--bg)] rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
                data-c="hover">View case study</button>
              <button onClick={() => scrollTo('contact')}
                className="px-7 py-3.5 rounded-full text-sm font-medium text-[var(--text-secondary)] border border-[var(--border-strong)] hover:text-[var(--text)] hover:border-[var(--text-muted)] transition-all"
                data-c="hover">Contact</button>
            </m.div>
          </m.div>
        </m.div>

        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <m.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[var(--text-muted)] to-transparent" />
        </m.div>
      </div>
    </section>
  );
}
