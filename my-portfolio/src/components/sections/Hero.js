"use client";

import { motion } from 'framer-motion';
import { IconArrowDown, IconMail } from '@tabler/icons-react';

export default function Hero() {
  const scrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="container">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="badge badge-success">
              <span className="status-dot" style={{ width: 6, height: 6 }} />
              Available for work
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h1 mb-6"
          >
            I build products fast.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="body-lg mb-10 max-w-xl"
          >
            AI integration, automation, full-stack systems — from zero to shipped.
            I take ideas offline and bring them online, fast.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button onClick={scrollToWork} className="btn btn-primary">
              See my work
              <IconArrowDown size={18} />
            </button>
            <a href="mailto:1amitpandit2468@gmail.com" className="btn btn-secondary">
              <IconMail size={18} />
              Get in touch
            </a>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-20 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '4+', label: 'Projects Shipped' },
              { value: '106', label: 'Purchases Driven' },
              { value: '7x', label: 'Best ROAS' },
              { value: 'Fast', label: 'Ship Speed' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-fg">{stat.value}</div>
                <div className="text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
