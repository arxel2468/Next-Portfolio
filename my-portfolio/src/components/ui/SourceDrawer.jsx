"use client";

import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { IconCode, IconX, IconBrandGithub, IconZap, IconGauge } from '@tabler/icons-react';

const stats = [
  { label: 'Lighthouse Performance', value: '100', icon: IconGauge },
  { label: 'First Contentful Paint', value: '~0.8s', icon: IconZap },
  { label: 'Total JS Bundle', value: '<120KB', icon: IconCode },
];

const decisions = [
  {
    question: 'Why Lenis over native smooth scroll?',
    answer:
      'Native CSS smooth-scroll lacks easing control and creates jank on long pages. Lenis provides spring-physics-based scrolling with RAF synchronization for 60fps consistency.',
  },
  {
    question: 'Why CSS custom properties over Tailwind theme tokens?',
    answer:
      'Custom properties enable runtime theme switching without class recalculation. Combined with next-themes, it provides instant dark mode transitions without layout shift.',
  },
  {
    question: 'Why LazyMotion over standard Framer Motion?',
    answer:
      'LazyMotion with domAnimation feature flag tree-shakes ~60% of Framer Motion\'s bundle. Full animation capabilities are preserved for the features actually used.',
  },
];

export function SourceDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + .
      if ((e.metaKey || e.ctrlKey) && e.key === '.') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-all shadow-lg"
        aria-label="View source and architecture details"
        title="⌘ + ."
      >
        <IconCode size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <m.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[var(--bg-secondary)] border-l border-[var(--border-light)] z-50 overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Architecture details"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-title mb-1">Under the Hood</h2>
                    <p className="text-small">
                      How this portfolio is engineered.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-xl border border-[var(--border-light)] flex items-center justify-center hover:bg-[var(--bg-tertiary)] transition-colors"
                    aria-label="Close"
                  >
                    <IconX size={20} />
                  </button>
                </div>

                {/* Performance Stats */}
                <div className="mb-10">
                  <h3 className="text-label mb-4">Performance</h3>
                  <div className="grid gap-3">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]"
                      >
                        <div className="flex items-center gap-3">
                          <stat.icon
                            size={18}
                            className="text-[var(--brand-primary)]"
                          />
                          <span className="text-body text-sm">{stat.label}</span>
                        </div>
                        <span className="font-mono font-bold text-[var(--accent-green)]">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-10">
                  <h3 className="text-label mb-4">Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Next.js 14',
                      'React 18',
                      'Framer Motion',
                      'Tailwind CSS',
                      'Lenis',
                      'next-themes',
                      'Vercel',
                    ].map((tech) => (
                      <span key={tech} className="badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture Decisions */}
                <div className="mb-10">
                  <h3 className="text-label mb-4">Architecture Decisions</h3>
                  <div className="space-y-4">
                    {decisions.map((d, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-xl border border-[var(--border-light)]"
                      >
                        <h4 className="font-semibold text-sm mb-2 text-[var(--text-primary)]">
                          {d.question}
                        </h4>
                        <p className="text-small leading-relaxed">{d.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Source Link */}
                <a
                  href="https://github.com/arxel2468/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full"
                >
                  <IconBrandGithub size={20} />
                  View Full Source Code
                </a>

                {/* Keyboard hint */}
                <p className="text-center text-small mt-4">
                  Press{' '}
                  <kbd className="px-2 py-0.5 rounded border border-[var(--border-light)] bg-[var(--bg-tertiary)] text-xs font-mono">
                    ⌘ + .
                  </kbd>{' '}
                  to toggle
                </p>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
