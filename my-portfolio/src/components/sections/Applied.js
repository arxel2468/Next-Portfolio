"use client";

import ScrollReveal from '@/components/ui/ScrollReveal';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { appliedWork } from '@/data/applied';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Applied() {
  return (
    <section id="applied" className="section px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-wide mx-auto">
        <ScrollReveal>
          <p className="section-header">Applied Execution</p>
        </ScrollReveal>

        <div className="space-y-8">
          {appliedWork.map((work, index) => (
            <ScrollReveal key={work.id} delay={index * 0.1}>
              <SpotlightCard>
                <motion.article
                  className="p-8 md:p-10 border border-[var(--border)] rounded-2xl bg-[var(--surface)]"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-semibold">{work.title}</h3>
                        {work.link && (
                          <a
                            href={work.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                            aria-label={`Visit ${work.title}`}
                          >
                            <FaExternalLinkAlt className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-[var(--text-muted)] font-mono">
                        {work.type} · {work.period}
                      </p>
                    </div>

                    {/* Result badge */}
                    {work.acquisition && (
                      <div className="inline-flex items-center gap-3 px-4 py-2 bg-[var(--accent-subtle)] border border-[var(--accent)]/20 rounded-full">
                        <span className="text-sm font-mono text-[var(--text-muted)]">
                          {work.acquisition.channel}
                        </span>
                        <span className="text-sm font-semibold text-[var(--accent)]">
                          {work.acquisition.result}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Outcome */}
                  <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
                    {work.outcome}
                  </p>

                  {/* Description */}
                  <p className="text-[var(--text-secondary)] mb-6">
                    {work.description}
                  </p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {work.details.map((detail, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-[var(--accent)] mt-0.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span>{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.article>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
