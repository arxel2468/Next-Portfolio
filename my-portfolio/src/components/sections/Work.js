"use client";

import { m } from 'framer-motion';
import Image from 'next/image';
import { IconExternalLink, IconQuote, IconCheck } from '@tabler/icons-react';
import { appliedWork } from '@/data/applied';
import SectionHeader from '@/components/ui/SectionHeader';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';

export default function Work() {
  const work = appliedWork[0];

  return (
    <section id="work" className="section section-hero-gap relative overflow-hidden bg-[var(--bg-secondary)]">
      <div className="container">
        <SectionHeader
          label="Featured Work"
          title="Real results, not just projects."
          description="I don't just build things — I ship products that generate real business outcomes."
        />

        <m.article
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="card overflow-hidden"
        >
          {/* Image Section */}
          <div className="relative aspect-[21/9] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 overflow-hidden">
            {work.image && (
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent" />

            {/* Floating Badge */}
            <div className="absolute top-6 left-6">
              <span className="badge badge-success">
                <IconCheck size={14} />
                Live Project
              </span>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-title text-white mb-2 drop-shadow-lg">
                  {work.title}
                </h3>
                <p className="text-body text-white/80">{work.tagline}</p>
              </m.div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Metrics Grid with AnimatedNumber */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              {work.metrics.map((metric, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="text-center md:text-left p-6 rounded-2xl bg-gradient-to-br from-[var(--bg-tertiary)] to-transparent"
                >
                  <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                    <AnimatedNumber value={metric.value} />
                  </div>
                  <div className="font-semibold text-[var(--text-primary)]">
                    {metric.label}
                  </div>
                  <div className="text-small">{metric.sublabel}</div>
                </m.div>
              ))}
            </div>

            {/* Description */}
            <p className="text-body-lg mb-10">{work.description}</p>

            {/* Testimonial */}
            {work.testimonial && (
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[var(--brand-light)] border border-[var(--brand-primary)]/20 rounded-2xl p-8 mb-12"
              >
                <IconQuote size={32} className="text-[var(--brand-primary)] mb-4" />
                <blockquote className="text-xl font-medium mb-4">
                  &ldquo;{work.testimonial.quote}&rdquo;
                </blockquote>
                <cite className="text-small not-italic">
                  — {work.testimonial.author}
                </cite>
              </m.div>
            )}

            {/* Scope Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              {work.scope.map((section, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold mb-4"
                    style={{
                      backgroundColor: `${section.color}12`,
                      color: section.color,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: section.color }}
                    />
                    {section.title}
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-body"
                      >
                        <IconCheck
                          size={18}
                          className="text-[var(--accent-green)] mt-0.5 shrink-0"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </m.div>
              ))}
            </div>

            {/* CTA */}
            {work.link && (
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex"
              >
                Visit Live Site
                <IconExternalLink size={18} />
              </a>
            )}
          </div>
        </m.article>
      </div>
    </section>
  );
}
