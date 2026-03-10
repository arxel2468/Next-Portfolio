"use client";

import { m } from 'framer-motion';
import { IconArrowDown, IconSparkles } from '@tabler/icons-react';
import { scrollToSection } from '@/lib/utils';
import { TextReveal } from '@/components/ui/TextReveal';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';

const stats = [
  { value: '4+', label: 'Projects Shipped' },
  { value: '106', label: 'Sales Generated' },
  { value: '7x', label: 'Best ROAS' },
  { value: '<1 day', label: 'Client Time Needed' },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-20">
      {/* Background Elements */}
      <div className="gradient-blob gradient-blob-1" />
      <div className="gradient-blob gradient-blob-2" />
      <div className="grid-pattern" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Availability Badge */}
          <m.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="badge badge-success inline-flex">
              <span className="status-dot" style={{ width: 8, height: 8 }} />
              Available for new projects
            </span>
          </m.div>

          {/* Main Headline with TextReveal */}
          <h1 className="text-display mb-6">
            <TextReveal delay={0.2}>I build products</TextReveal>
            <br />
            <span className="text-gradient">
              <TextReveal delay={0.5}>fast.</TextReveal>
            </span>
          </h1>

          {/* Subheadline */}
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-body-lg mx-auto mb-10"
          >
            Full-stack engineer specializing in AI integration, automation, and shipping
            complete systems. I take ideas from zero to production — quickly.
          </m.p>

          {/* CTAs */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-wrap justify-center gap-4 mb-20"
          >
            <button
              onClick={() => scrollToSection('work')}
              className="btn btn-primary"
            >
              <IconSparkles size={18} />
              See my work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn btn-secondary"
            >
              Get in touch
            </button>
          </m.div>

          {/* Animated Stats */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-[var(--border-light)]"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-gradient">
                  <AnimatedNumber value={stat.value} />
                </div>
                <div className="text-small mt-1">{stat.label}</div>
              </div>
            ))}
          </m.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <m.button
          onClick={() => scrollToSection('work')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Scroll to work section"
        >
          <span className="text-label">Scroll</span>
          <IconArrowDown size={20} />
        </m.button>
      </m.div>
    </section>
  );
}
