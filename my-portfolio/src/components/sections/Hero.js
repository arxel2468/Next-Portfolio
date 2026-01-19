"use client";

import Aurora from '@/components/ui/Aurora';
import SplitText from '@/components/ui/SplitText';
import BlurText from '@/components/ui/BlurText';
import MagneticButton from '@/components/ui/MagneticButton';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Aurora Background */}
      <Aurora />

      {/* Content */}
      <div className="relative z-10 max-w-content text-center">
        {/* Eyebrow */}
        <motion.p
          className="text-sm font-mono text-[var(--text-muted)] mb-6 tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          ENGINEER
        </motion.p>

        {/* Name */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
          <SplitText delay={0.3}>
            Amit Pandit
          </SplitText>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-lg mx-auto mb-4">
          <BlurText delay={0.6} duration={0.8}>
            I build complete systems.
          </BlurText>
        </p>

        <p className="text-base md:text-lg text-[var(--text-muted)] max-w-md mx-auto mb-10">
          <BlurText delay={0.8} duration={0.8}>
            AI, web, automation — end to end.
          </BlurText>
        </p>

        {/* CTAs */}
        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <MagneticButton strength={0.2}>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text-primary)] text-[var(--bg)] text-sm font-medium rounded-full hover:opacity-90 transition-all duration-300"
            >
              View Work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </MagneticButton>

          <MagneticButton strength={0.2}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-sm font-medium rounded-full hover:border-[var(--text-muted)] hover:bg-[var(--surface)] transition-all duration-300"
            >
              Get in Touch
            </a>
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-[var(--border)] rounded-full flex justify-center"
          >
            <motion.div
              className="w-1 h-2 bg-[var(--text-muted)] rounded-full mt-1.5"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
