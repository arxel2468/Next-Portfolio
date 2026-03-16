'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { IconExternalLink, IconQuote } from '@tabler/icons-react';
import { projects } from '@/data/content';
import DecryptedText from '../ui/DecryptedText';
import SpotlightCard from '../ui/SpotlightCard';
import CountUp from '../ui/CountUp';
import ScrollFloat from '../ui/ScrollFloat';

export default function CaseStudy() {
  const p = projects[0];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  return (
    <section id="work" className="py-20 md:py-32 px-6 md:px-12 lg:px-16 max-w-[1200px] mx-auto" ref={ref}>
      <div className="mb-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3 block" style={{ color: 'var(--accent)' }}>01 · Featured Work</span>
        <h2 className="font-serif text-[clamp(2rem,6vw,4rem)] leading-[1] mb-2" style={{ color: 'var(--text)' }}>
          <DecryptedText text="106 purchases in 6 days." animateOn="view" speed={40} maxIterations={12} className="text-[var(--text)]" encryptedClassName="text-[var(--text-3)]" />
        </h2>
      </div>

      <ScrollFloat containerClassName="mb-12" textClassName="font-serif italic text-base md:text-lg text-[var(--text-2)]" animationDuration={0.8} stagger={0.02}>
        An entire e-commerce business shipped from scratch.
      </ScrollFloat>

      <SpotlightCard className="p-0 mb-12" spotlightColor="rgba(100,255,218,0.1)">
        <div className="grid md:grid-cols-2">
          <div ref={imgRef} className="relative aspect-[16/10] md:aspect-auto md:min-h-[400px] overflow-hidden rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl">
            {p.image && (
              <motion.div style={{ scale: imgScale }} className="absolute inset-[-10%]">
                <Image src={p.image} alt={p.title} fill className="object-cover" priority sizes="(max-width:768px) 100vw, 50vw" />
              </motion.div>
            )}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(17,17,19,0.5))' }} />
          </div>

          <div className="p-6 md:p-10 flex flex-col justify-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--accent)' }}>{p.subtitle}</span>
            <h3 className="font-serif text-2xl md:text-3xl mb-4" style={{ color: 'var(--text)' }}>{p.title}</h3>
            <p className="text-sm leading-relaxed mb-6">{p.description}</p>

            {p.stats && (
              <div className="flex gap-6 mb-6 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
                {p.stats.map((s, i) => (
                  <div key={i}>
                    <span className="font-serif text-2xl block" style={{ color: 'var(--accent)' }}>
                      {s.prefix || ''}<CountUp to={s.value} duration={2} delay={0.5} />{s.suffix || ''}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {p.tech.map(t => (
                <span key={t} className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full"
                  style={{ color: 'var(--accent)', background: 'var(--accent-dim)', border: '1px solid rgba(100,255,218,0.1)' }}>
                  {t}
                </span>
              ))}
            </div>

            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs transition-colors" style={{ color: 'var(--accent)' }}>
                Visit Store <IconExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </SpotlightCard>

      {p.quote && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-xl mb-12 pl-5 border-l-2" style={{ borderColor: 'var(--accent)' }}>
          <IconQuote size={18} className="mb-2" style={{ color: 'var(--accent)', opacity: 0.4 }} />
          <p className="font-serif italic text-base leading-relaxed mb-2" style={{ color: 'var(--text)' }}>&ldquo;{p.quote}&rdquo;</p>
          <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>{p.quoteBy}</span>
        </motion.div>
      )}

      {p.scope && (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4 block" style={{ color: 'var(--accent)' }}>Scope of Work</span>
            {p.scope.map((s, i) => (
              <div key={i} className="py-3 border-b text-sm flex items-center gap-3 transition-colors"
                style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}>
                <span className="font-mono text-[10px] w-5 opacity-30">{String(i + 1).padStart(2, '0')}</span>
                {s}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
