"use client";

import { motion } from 'framer-motion';
import { IconArrowDown, IconSparkles } from '@tabler/icons-react';
import { scrollToSection } from '@/lib/utils';

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="badge badge-success inline-flex">
              <span className="status-dot" style={{ width: 8, height: 8 }} />
              Available for new projects
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display mb-6"
          >
            I build products
            <br />
            <span className="text-gradient">fast.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg max-w-2xl mx-auto mb-10"
          >
            Full-stack engineer specializing in AI integration, automation, and shipping
            complete systems. I take ideas from zero to production — quickly.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-[var(--border-light)]"
          >
            {[
              { value: '4+', label: 'Projects Shipped' },
              { value: '106', label: 'Sales Generated' },
              { value: '7x', label: 'Best ROAS' },
              { value: '<1 day', label: 'Client Time Needed' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-small mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection('work')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <span className="text-label">Scroll</span>
          <IconArrowDown size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
}
