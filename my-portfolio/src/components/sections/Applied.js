"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import { appliedWork } from '@/data/applied';

export default function Applied() {
  return (
    <section id="applied" className="section bg-background-elevated">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="caption block mb-3">02 — Work</span>
          <h2 className="heading-2">Production Systems</h2>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-16">
          {appliedWork.map((work, index) => (
            <CaseStudy key={work.id} work={work} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy({ work, index }) {
  const { title, subtitle, image, period, status, link, metrics, summary, sections } = work;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-background border border-border rounded-xl overflow-hidden"
    >
      {/* Image Header */}
      {image && (
        <div className="relative h-48 md:h-64 bg-background-elevated">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="caption text-white/70">{period}</span>
                {status === 'live' && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="caption text-green-400">Live</span>
                    </span>
                  </>
                )}
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-white">{title}</h3>
            </div>

            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 hidden md:flex"
              >
                Visit Site
                <FiExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 md:p-10">
        {/* Metrics */}
        {metrics && (
          <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-border">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <span className="block text-3xl md:text-4xl font-semibold text-accent mb-1">
                  {metric.value}
                </span>
                <span className="caption block">{metric.label}</span>
                {metric.detail && (
                  <span className="text-xs text-subtle">{metric.detail}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        <p className="body-large mb-10">{summary}</p>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, sIndex) => (
            <div key={sIndex}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((item, iIndex) => (
                  <li
                    key={iIndex}
                    className="flex items-start gap-2 text-sm text-muted"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Link */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary w-full mt-8 md:hidden"
          >
            Visit Site
            <FiExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
