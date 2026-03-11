"use client";

import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { IconExternalLink, IconQuote } from '@tabler/icons-react';
import { caseStudy } from '@/data/applied';
import { ScrollTextReveal } from '@/components/ui/TextReveal';
import AnimatedNumber from '@/components/ui/AnimatedNumber';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Work() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.25], [1.15, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.15], [0.3, 1]);
  const metricsY = useTransform(scrollYProgress, [0.2, 0.35], [40, 0]);
  const metricsOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const testimonialOpacity = useTransform(scrollYProgress, [0.35, 0.48], [0, 1]);
  const testimonialScale = useTransform(scrollYProgress, [0.35, 0.48], [0.97, 1]);
  const deliverablesOpacity = useTransform(scrollYProgress, [0.45, 0.58], [0, 1]);
  const deliverablesY = useTransform(scrollYProgress, [0.45, 0.58], [30, 0]);

  const d = caseStudy;

  return (
    <section id="work" ref={containerRef} className="relative" style={{ minHeight: '250vh' }}>
      <div className="sticky top-0 min-h-screen py-24 flex flex-col justify-center overflow-hidden">
        <div className="container">
          {/* Section Label */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="type-mono">{d.year} · {d.duration}</span>
          </m.div>

          {/* Headline */}
          <div className="mb-12">
            <h2 className="type-headline mb-4" data-cursor="text">
              <ScrollTextReveal>{d.headline}</ScrollTextReveal>
            </h2>
            <m.p
              style={{ opacity: metricsOpacity }}
              className="type-body-lg max-w-2xl"
            >
              {d.subheadline}
            </m.p>
          </div>

          {/* Image */}
          {d.image && (
            <m.div
              className="relative w-full aspect-[16/8] rounded-2xl overflow-hidden mb-12 border border-[var(--border)]"
              style={{ scale: imageScale, opacity: imageOpacity }}
            >
              <Image
                src={d.image}
                alt={d.client}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/60 via-transparent to-transparent" />
            </m.div>
          )}

          {/* Metrics */}
          <m.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-16"
            style={{ y: metricsY, opacity: metricsOpacity }}
          >
            {d.metrics.map((metric, i) => (
              <div key={i} className="border-l-2 border-[var(--accent)] pl-5">
                <div className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-1">
                  <AnimatedNumber value={metric.value} />
                </div>
                <div className="type-small font-medium text-[var(--text-secondary)]">
                  {metric.label}
                </div>
                <div className="type-small text-[0.75rem]">{metric.detail}</div>
              </div>
            ))}
          </m.div>

          {/* Testimonial */}
          {d.testimonial && (
            <m.div
              className="max-w-2xl mb-16"
              style={{ opacity: testimonialOpacity, scale: testimonialScale }}
            >
              <div className="relative pl-6 border-l-2 border-[var(--border)]">
                <IconQuote
                  size={24}
                  className="text-[var(--accent)] mb-3 opacity-60"
                />
                <blockquote className="font-serif text-xl md:text-2xl leading-relaxed mb-4 text-[var(--text-primary)]">
                  "{d.testimonial.quote}"
                </blockquote>
                <cite className="type-small not-italic">
                  {d.testimonial.author}, {d.testimonial.role}
                </cite>
              </div>
            </m.div>
          )}

          {/* Deliverables */}
          <m.div
            style={{ y: deliverablesY, opacity: deliverablesOpacity }}
            className="mb-10"
          >
            <h3 className="type-mono mb-6">What I Delivered</h3>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
              {d.deliverables.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-2 border-b border-[var(--border)]"
                >
                  <span className="text-accent mt-1 text-sm">✦</span>
                  <span className="type-body text-sm">{item}</span>
                </div>
              ))}
            </div>
          </m.div>

          {/* CTA */}
          <m.div style={{ opacity: deliverablesOpacity }}>
            <MagneticButton strength={0.15}>
              <a
                href={d.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                data-cursor="pointer"
              >
                Visit {d.client}
                <IconExternalLink size={16} />
              </a>
            </MagneticButton>
          </m.div>
        </div>
      </div>
    </section>
  );
}
