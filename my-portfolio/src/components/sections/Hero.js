"use client";

import { m } from 'framer-motion';
import { IconArrowDown } from '@tabler/icons-react';
import { scrollToSection } from '@/lib/utils';
import { TextReveal } from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import dynamic from 'next/dynamic';

const FloatingShape = dynamic(() => import('@/components/ui/FloatingShape'), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background Element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-60">
        <FloatingShape className="w-full h-full" />
      </div>

      <div className="container relative z-10 pt-32 pb-24">
        <div className="max-w-3xl">
          {/* Label */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="status-indicator" />
            <span className="type-mono">Product Engineer · Mumbai</span>
          </m.div>

          {/* Headline */}
          <h1 className="type-display mb-8" data-cursor="text">
            <TextReveal delay={2.3}>I build products,</TextReveal>
            <br />
            <TextReveal delay={2.5} className="text-accent">
              not just code.
            </TextReveal>
          </h1>

          {/* Subtitle */}
          <m.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.9 }}
            className="type-subtitle mb-12 max-w-xl"
          >
            I shipped an entire e-commerce business — brand, store, logistics, ads — that
            generated 106 sales in 6 days. All self-taught. All from scratch.
          </m.p>

          {/* CTAs */}
          <m.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 3.1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton strength={0.15}>
              <button
                onClick={() => scrollToSection('work')}
                className="btn btn-primary"
                data-cursor="pointer"
              >
                See the case study
              </button>
            </MagneticButton>

            <MagneticButton strength={0.15}>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn btn-text"
                data-cursor="pointer"
              >
                Get in touch →
              </button>
            </MagneticButton>
          </m.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <m.button
          onClick={() => scrollToSection('work')}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Scroll to work"
          data-cursor="pointer"
        >
          <span className="type-mono text-[0.625rem]">Scroll</span>
          <IconArrowDown size={16} />
        </m.button>
      </m.div>
    </section>
  );
}
