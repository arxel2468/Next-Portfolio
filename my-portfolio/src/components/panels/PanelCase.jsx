"use client";

import { m } from 'framer-motion';
import Image from 'next/image';
import { caseStudy as d } from '@/data/content';
import { IconQuote, IconExternalLink } from '@tabler/icons-react';
import Num from '../Num';

export default function PanelCase() {
  return (
    <div className="w-full h-full relative flex">
      {/* Background image — full bleed */}
      {d.image && (
        <div className="absolute inset-0">
          <Image src={d.image} alt={d.client} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-[var(--bg)]/70 dark:bg-[var(--bg)]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 py-16 w-full md:max-w-[60%]">
        <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-[var(--rose)]" />
          <span className="f-label">Case Study — {d.year}</span>
        </m.div>

        <m.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .8, ease: [.25, .46, .45, .94] }}
          className="f-head text-[clamp(2rem,5vw,4rem)] mb-8 whitespace-pre-line max-w-lg" data-c="hover">
          106 purchases{'\n'}in 6 days.
        </m.h2>

        {/* Metrics — glass cards */}
        <div className="grid grid-cols-2 gap-3 mb-8 max-w-md">
          {d.metrics.map((met, i) => (
            <m.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * .1 }}
              className="rounded-xl p-4 border border-[var(--line)]"
              style={{ background: 'color-mix(in srgb, var(--bg) 70%, transparent)', backdropFilter: 'blur(16px)' }}>
              <span className="f-display text-[clamp(1.5rem,3vw,2.5rem)]"><Num value={met.n} /></span>
              <p className="f-label mt-1" style={{ fontSize: '.55rem' }}>{met.l}</p>
              <p className="text-[var(--ink3)] text-[.625rem] mt-0.5">{met.sub}</p>
            </m.div>
          ))}
        </div>

        <m.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-[var(--ink2)] text-sm leading-relaxed mb-8 max-w-lg">{d.body}</m.p>

        {/* Quote */}
        <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative pl-5 border-l border-[var(--rose)]/30 mb-8 max-w-md">
          <IconQuote size={16} className="mb-2 opacity-30" style={{ color: 'var(--rose)' }} />
          <p className="font-serif italic text-sm leading-relaxed">&ldquo;{d.quote}&rdquo;</p>
          <p className="f-label mt-2" style={{ fontSize: '.55rem' }}>{d.quoteAuthor}</p>
        </m.div>

        <div className="flex flex-wrap gap-2 mb-6">
          {d.scope.map((s, i) => (
            <span key={i} className="px-3 py-1 text-[.625rem] font-medium rounded-full border border-[var(--line)] text-[var(--ink3)]">{s}</span>
          ))}
        </div>

        <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <a href={d.link} target="_blank" rel="noopener noreferrer" data-c="hover"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium border border-[var(--line2)] hover:border-[var(--rose)] text-[var(--ink2)] hover:text-[var(--rose)] transition-all">
            Visit {d.client} <IconExternalLink size={12} />
          </a>
        </m.div>
      </div>
    </div>
  );
}
