"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { appliedWork } from '@/data/applied';

export default function Applied() {
  return (
    <section id="applied" className="section" style={{ backgroundColor: 'var(--bg-elevated)' }}>
      <div className="container-wide">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <span className="label block mb-4">02 — Work</span>
            <h2 className="text-headline">Applied Execution</h2>
          </div>
          <span className="hidden md:block label">Production Systems</span>
        </div>

        {/* Case Studies */}
        <div className="space-y-16">
          {appliedWork.map((work, index) => (
            <CaseStudyCard key={work.id} work={work} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({ work, index }) {
  const {
    title,
    category,
    type,
    period,
    status,
    image,
    outcome,
    description,
    metrics,
    sections,
    link
  } = work;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="border overflow-hidden"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
    >
      {/* Header with Image */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Image */}
        {image && (
          <div className="relative h-48 lg:h-auto lg:min-h-[300px] overflow-hidden">
            <Image
              src={image}
              alt={`${title} logo`}
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className={`p-8 md:p-12 ${image ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          {/* Top Row */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="label">{category}</span>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--fg-subtle)' }} />
                <span className="label">{period}</span>
                {status === 'Live' && (
                  <>
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--fg-subtle)' }} />
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="label text-green-600 dark:text-green-400">Live</span>
                    </span>
                  </>
                )}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{title}</h3>
              <p style={{ color: 'var(--fg-muted)' }}>{type}</p>
            </div>

            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-sm"
              >
                View Live
                <FaExternalLinkAlt className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Metrics Row */}
          {metrics && metrics.length > 0 && (
            <div
              className="flex flex-wrap gap-8 mb-8 pb-8 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <span
                    className="block text-3xl md:text-4xl font-bold mb-1"
                    style={{ color: 'var(--accent)' }}
                  >
                    {metric.value}
                  </span>
                  <span className="label">{metric.label}</span>
                  {metric.context && (
                    <span
                      className="block text-xs mt-1"
                      style={{ color: 'var(--fg-subtle)' }}
                    >
                      {metric.context}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Outcome */}
          <div className="mb-8">
            <p className="text-lg leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              {outcome}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Sections */}
      {sections && sections.length > 0 && (
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12 border-t"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
        >
          {sections.map((section, sIndex) => (
            <div key={sIndex}>
              <span className="label block mb-4">{section.title}</span>
              <ul className="space-y-2">
                {section.items.map((item, iIndex) => (
                  <li
                    key={iIndex}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    <span
                      className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
