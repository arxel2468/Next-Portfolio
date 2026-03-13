"use client";

import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { caseStudy as d } from '@/data/projects';
import { IconQuote, IconExternalLink } from '@tabler/icons-react';
import AnimatedNumber from '@/components/AnimatedNumber';

export default function Work() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 0.4], [1.15, 1]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="work" ref={ref} className="py-24 md:py-40 section-glow">
      <div className="container-wide">
        <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-[var(--accent-color)]" />
          <span className="font-label">Case Study — {d.year}</span>
        </m.div>

        <m.h2 initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-[clamp(2.5rem,7vw,5.5rem)] mb-16 max-w-4xl" data-c="hover">
          {d.headline}
        </m.h2>

        {d.image && (
          <m.div initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full aspect-[16/8] rounded-2xl overflow-hidden mb-20 group"
            data-c="project" data-c-label="View Site"
            onClick={() => window.open(d.link, '_blank')}>
            <m.div style={{ scale: imgScale, opacity: imgOpacity }} className="absolute inset-0">
              <Image src={d.image} alt={d.client} fill className="object-cover" priority sizes="100vw" />
            </m.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/40 to-transparent" />
          </m.div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20 mb-24">
          {d.metrics.map((met, i) => (
            <m.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="font-display text-[clamp(2.5rem,5vw,4rem)]">
                <AnimatedNumber value={met.value} />
              </div>
              <div className="text-[var(--text-muted)] text-sm mt-1">{met.label}</div>
            </m.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-20">
          <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-lg md:text-xl leading-relaxed text-[var(--text-secondary)]">{d.description}</p>
          </m.div>
          <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className="font-label mb-6">Scope</div>
            {d.scope.map((item, i) => (
              <m.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="py-3 border-b border-[var(--border)] text-[var(--text-secondary)] text-sm flex items-center gap-3 group">
                <span className="text-[var(--accent-color)] group-hover:translate-x-1 transition-transform duration-300">→</span>
                {item}
              </m.div>
            ))}
          </m.div>
        </div>

        {d.testimonial && (
          <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-3xl">
            <IconQuote size={32} className="text-[var(--accent-color)] opacity-30 mb-6" />
            <blockquote className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.2] mb-6">
              &ldquo;{d.testimonial.quote}&rdquo;
            </blockquote>
            <div className="text-[var(--text-muted)] text-sm">{d.testimonial.author} — {d.testimonial.role}</div>
          </m.div>
        )}
      </div>
    </section>
  );
}
