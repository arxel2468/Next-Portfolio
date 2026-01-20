"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Smooth scroll handler
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 pb-16">
      <div className="container-wide">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Top Meta Line */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-12"
          >
            <div className="flex items-center gap-2">
              <span className="status-online" />
              <span className="label">Available for Work</span>
            </div>

            <span className="hidden sm:block w-px h-3" style={{ backgroundColor: 'var(--border)' }} />

            <span className="label">Mumbai, India</span>

            <span className="hidden sm:block w-px h-3" style={{ backgroundColor: 'var(--border)' }} />

            {mounted && (
              <span className="label font-mono tabular-nums">
                {time} IST
              </span>
            )}
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="text-display mb-8">
            <span className="block">Amit</span>
            <span className="block" style={{ color: 'var(--fg-muted)' }}>Pandit</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl leading-relaxed max-w-2xl mb-12"
            style={{ color: 'var(--fg-muted)' }}
          >
            Full-stack engineer building{' '}
            <span style={{ color: 'var(--fg)' }}>complete systems</span>.
            From{' '}
            <span style={{ color: 'var(--fg)' }}>AI-powered applications</span> to{' '}
            <span style={{ color: 'var(--fg)' }}>production e-commerce</span> —
            I ship end-to-end.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-16">
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, 'projects')}
              className="btn-primary"
            >
              View Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, 'contact')}
              className="btn-secondary"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Stats Grid - Honest stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <div>
              <span className="label block mb-2">Focus</span>
              <span className="text-xl font-semibold">AI × Web</span>
            </div>
            <div>
              <span className="label block mb-2">Approach</span>
              <span className="text-xl font-semibold">End-to-End</span>
            </div>
            <div>
              <span className="label block mb-2">Projects</span>
              <span className="text-xl font-semibold">15+ Shipped</span>
            </div>
            <div>
              <span className="label block mb-2">Stack</span>
              <span className="text-xl font-semibold">Full-Stack</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="label">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 rounded-full flex justify-center pt-1.5"
          style={{ borderColor: 'var(--border-strong)' }}
        >
          <div
            className="w-1 h-1.5 rounded-full"
            style={{ backgroundColor: 'var(--fg-muted)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
