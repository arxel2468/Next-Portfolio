"use client";

import ScrollReveal from '@/components/ui/ScrollReveal';
import { motion } from 'framer-motion';

const techStack = [
  { name: 'Python', category: 'language' },
  { name: 'JavaScript', category: 'language' },
  { name: 'TypeScript', category: 'language' },
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'FastAPI', category: 'backend' },
  { name: 'TensorFlow', category: 'ml' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'Shopify', category: 'platform' },
];

export default function About() {
  return (
    <section id="about" className="section px-6">
      <div className="max-w-wide mx-auto">
        <ScrollReveal>
          <p className="section-header">About</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Main content */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={0.1}>
              <div className="space-y-6 text-lg text-[var(--text-secondary)] leading-relaxed">
                <p>
                  I'm Amit Pandit. I build things that work.
                </p>

                <p>
                  My focus is on complete systems — not just the interesting parts.
                  That means writing the API, setting up the infrastructure, handling
                  the edge cases, and making sure it actually ships.
                </p>

                <p>
                  I work across AI/ML, web development, and automation. The common thread
                  is taking something from idea to production without leaving loose ends.
                </p>

                <p className="text-[var(--text-muted)]">
                  Based in Mumbai. Available for engineering work and consulting.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Tech stack */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2}>
              <div className="p-6 border border-[var(--border)] rounded-xl bg-[var(--surface)]">
                <h3 className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-6">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <motion.span
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: 'var(--accent-subtle)',
                        borderColor: 'var(--accent)',
                      }}
                      className="px-3 py-1.5 text-sm text-[var(--text-secondary)] bg-[var(--bg)] border border-[var(--border)] rounded-lg cursor-default transition-colors"
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
