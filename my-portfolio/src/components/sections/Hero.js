"use client";

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center pt-20">
      <div className="container-wide">

        {/* Decorative Code Line */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-mono text-sm text-[var(--accents-4)] mb-8 flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse" />
          <span>system_ready.init()</span>
        </motion.div>

        {/* Massive Headline */}
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-none mb-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="block"
          >
            AMIT
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="block text-[var(--accents-3)]"
          >
            PANDIT
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl"
        >
          <p className="text-xl md:text-2xl text-[var(--accents-5)] leading-relaxed">
            Full-stack engineer building high-performance systems.
            <br className="hidden md:block" />
            Specialized in <span className="text-[var(--fg)]">AI integration</span> and <span className="text-[var(--fg)]">scalable architecture</span>.
          </p>
        </motion.div>

        {/* Technical Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-wrap gap-12 border-t border-[var(--accents-2)] pt-8"
        >
          <div>
            <span className="mono-micro block mb-1">Location</span>
            <span className="font-medium">Mumbai, IN</span>
          </div>
          <div>
            <span className="mono-micro block mb-1">Availability</span>
            <span className="font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Open for Projects
            </span>
          </div>
          <div>
            <span className="mono-micro block mb-1">Stack</span>
            <span className="font-medium">Next.js / Python / AI</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
