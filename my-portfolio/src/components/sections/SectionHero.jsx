"use client";

import { useRef, lazy, Suspense } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { scrollTo } from '@/lib/utils';
import { CharReveal, FadeUp } from '../ui/TextReveal';
import MagneticButton from '../ui/MagneticButton';
import AnimatedCounter from '../ui/AnimatedCounter';

const HeroScene = lazy(() => import('../three/HeroScene'));

const STATS = [
  { value: '106', label: 'Sales shipped', suffix: '+' },
  { value: '46.4', label: 'Best ROAS', suffix: 'x' },
  { value: '24', label: 'Hrs to launch', prefix: '<' },
  { value: '4', label: 'Products built', suffix: '+' },
];

export default function SectionHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section ref={ref} className="min-h-screen relative flex items-center overflow-hidden">
      {/* 3D Background — behind everything */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Radial mask so 3D fades into bg */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, hsl(var(--background)) 75%)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to top, hsl(var(--background)), transparent)' }}
      />

      {/* Content — z-10 ensures it's above 3D */}
      <m.div style={{ opacity, y, scale }} className="wrap relative z-10 pt-32 pb-20">
        {/* Eyebrow */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex items-center gap-3 mb-12"
        >
          <m.span
            className="h-px"
            style={{ background: 'hsl(var(--accent))' }}
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          />
          <span className="f-mono tracking-[0.25em] text-[0.6rem]">
            Product Engineer · Mumbai
          </span>
        </m.div>

        {/* Main heading */}
        <div className="mb-8">
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
            <h1 className="f-display text-[clamp(3.5rem,13vw,11rem)] leading-[0.85] mb-2">
              <CharReveal text="I build" delay={1.6} />
            </h1>
          </m.div>
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
            <h1 className="f-display text-[clamp(3.5rem,13vw,11rem)] leading-[0.85] text-gradient">
              <CharReveal text="products." delay={1.9} />
            </h1>
          </m.div>
        </div>

        {/* Sub copy */}
        <FadeUp delay={2.6}>
          <p className="text-lg md:text-xl max-w-md leading-relaxed mb-12" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Not just code. Not just features.
            <br />
            <span className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>
              Entire businesses — brand to revenue.
            </span>
          </p>
        </FadeUp>

        {/* CTAs */}
        <FadeUp delay={2.9}>
          <div className="flex gap-4 flex-wrap mb-20 md:mb-28">
            <MagneticButton>
              <button
                onClick={() => scrollTo('work')}
                className="group relative px-8 py-4 text-sm font-semibold text-white rounded-full overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--accent))] to-orange-500" />
                <span className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--accent))] to-orange-500 blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  View case study
                  <m.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </m.span>
                </span>
              </button>
            </MagneticButton>

            <MagneticButton>
              <button
                onClick={() => scrollTo('contact')}
                className="px-8 py-4 text-sm font-medium rounded-full border transition-all duration-300"
                style={{
                  color: 'hsl(var(--muted-foreground))',
                  borderColor: 'hsl(var(--border))',
                }}
              >
                Get in touch
              </button>
            </MagneticButton>
          </div>
        </FadeUp>

        {/* Stats */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14 pt-10"
            style={{ borderTop: '1px solid hsla(var(--border), 0.5)' }}
          >
            {STATS.map((stat, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.4 + i * 0.1 }}
                className="group"
              >
                <span className="f-display text-3xl md:text-4xl group-hover:text-[hsl(var(--accent))] transition-colors duration-300">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </span>
                <p className="f-mono mt-2 text-[0.55rem]">{stat.label}</p>
              </m.div>
            ))}
          </div>
        </m.div>
      </m.div>

      {/* Scroll cue */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="f-mono text-[0.5rem]" style={{ color: 'hsla(var(--muted-foreground), 0.5)' }}>Scroll</span>
        <m.div className="w-px h-12 overflow-hidden">
          <m.div
            className="w-full h-full"
            style={{ background: 'linear-gradient(to bottom, hsl(var(--accent)), transparent)' }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </m.div>
      </m.div>
    </section>
  );
}
