"use client";

import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { IconExternalLink, IconQuote, IconCheck } from '@tabler/icons-react';
import { appliedWork } from '@/data/applied';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { TextRevealOnScroll } from '@/components/ui/TextReveal';

export default function WorkCinematic() {
  const work = appliedWork[0];
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Phase 1: Image reveals (0% - 25% scroll)
  const imageScale = useTransform(scrollYProgress, [0, 0.2], [1.2, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.15], [0.2, 1]);

  // Phase 2: Title + Badge (15% - 30%)
  const titleY = useTransform(scrollYProgress, [0.12, 0.25], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.12, 0.25], [0, 1]);

  // Phase 3: Metrics (30% - 45%)
  const metricsY = useTransform(scrollYProgress, [0.28, 0.4], [50, 0]);
  const metricsOpacity = useTransform(scrollYProgress, [0.28, 0.4], [0, 1]);

  // Phase 4: Testimonial (45% - 60%)
  const testimonialScale = useTransform(scrollYProgress, [0.43, 0.55], [0.95, 1]);
  const testimonialOpacity = useTransform(scrollYProgress, [0.43, 0.55], [0, 1]);

  // Phase 5: Scope (55% - 70%)
  const scopeY = useTransform(scrollYProgress, [0.55, 0.67], [40, 0]);
  const scopeOpacity = useTransform(scrollYProgress, [0.55, 0.67], [0, 1]);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative bg-[var(--bg-secondary)]"
      style={{ minHeight: '300vh' }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 min-h-screen overflow-hidden">
        {/* Section Label */}
        <div className="container pt-32 pb-6">
          <m.div
            style={{ opacity: titleOpacity }}
            className="mb-6"
          >
            <span className="inline-block text-label badge badge-brand mb-4">
              Featured Work
            </span>
            <h2 className="text-headline mb-4">
              <TextRevealOnScroll>Real results, not just projects.</TextRevealOnScroll>
            </h2>
            <p className="text-body-lg">
              I don&apos;t just build things — I ship products that generate real business outcomes.
            </p>
          </m.div>
        </div>

        {/* Case Study Card */}
        <div className="container pb-12">
          <div className="card overflow-hidden">
            {/* Image with parallax scale */}
            <m.div
              className="relative aspect-[21/9] overflow-hidden bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
              style={{ scale: imageScale, opacity: imageOpacity }}
            >
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

              {/* Badge */}
              <div className="absolute top-6 left-6">
                <span className="badge badge-success">
                  <IconCheck size={14} />
                  Live Project
                </span>
              </div>

              {/* Title Overlay */}
              <m.div
                className="absolute bottom-0 left-0 right-0 p-8 md:p-12"
                style={{ y: titleY, opacity: titleOpacity }}
              >
                <h3 className="text-title text-white mb-2 drop-shadow-lg">
                  {work.title}
                </h3>
                <p className="text-body text-white/80">{work.tagline}</p>
              </m.div>
            </m.div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Metrics — scroll-linked reveal */}
              <m.div
                className="grid grid-cols-3 gap-6 mb-12"
                style={{ y: metricsY, opacity: metricsOpacity }}
              >
                {work.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="text-center md:text-left p-6 rounded-2xl bg-gradient-to-br from-[var(--bg-tertiary)] to-transparent"
                  >
                    <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                      <AnimatedNumber value={metric.value} />
                    </div>
                    <div className="font-semibold text-[var(--text-primary)]">
                      {metric.label}
                    </div>
                    <div className="text-small">{metric.sublabel}</div>
                  </div>
                ))}
              </m.div>

              {/* Description */}
              <m.p
                className="text-body-lg mb-10"
                style={{ opacity: metricsOpacity }}
              >
                {work.description}
              </m.p>

              {/* Testimonial — the emotional peak */}
              {work.testimonial && (
                <m.div
                  className="bg-[var(--brand-light)] border border-[var(--brand-primary)]/20 rounded-2xl p-8 mb-12"
                  style={{
                    scale: testimonialScale,
                    opacity: testimonialOpacity,
                  }}
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
              <m.div
                className="grid md:grid-cols-3 gap-8 mb-10"
                style={{ y: scopeY, opacity: scopeOpacity }}
              >
                {work.scope.map((section, i) => (
                  <div key={i}>
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
                  </div>
                ))}
              </m.div>

              {/* CTA */}
              {work.link && (
                <m.a
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary inline-flex"
                  style={{ opacity: scopeOpacity }}
                >
                  Visit Live Site
                  <IconExternalLink size={18} />
                </m.a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
