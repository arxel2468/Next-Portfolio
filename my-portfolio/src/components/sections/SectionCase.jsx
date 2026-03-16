"use client";

import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { caseStudy as d } from '@/data/content';
import { IconQuote, IconArrowUpRight } from '@tabler/icons-react';
import AnimatedCounter from '../ui/AnimatedCounter';
import SpotlightCard from '../ui/SpotlightCard';
import { RevealText, FadeUp } from '../ui/TextReveal';
import MagneticButton from '../ui/MagneticButton';
import Lamp from '../ui/Lamp';

export default function SectionCase() {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="work" className="py-28 md:py-44 relative">
      {/* Lamp effect header */}
      <Lamp className="pt-20 pb-10">
        <m.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="f-mono text-[0.6rem] tracking-[0.3em] text-accent mb-4 block">
            Featured Case Study — {d.year}
          </span>
        </m.div>
      </Lamp>

      <div className="wrap relative z-10">
        {/* Headline */}
        <div className="text-center mb-6">
          <RevealText>
            <h2 className="f-head text-[clamp(2.5rem,8vw,6rem)] leading-[0.9]">
              <span className="text-gradient">106 purchases</span>
            </h2>
          </RevealText>
          <RevealText delay={0.1}>
            <h2 className="f-head text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] text-muted-foreground">
              in 6 days.
            </h2>
          </RevealText>
        </div>

        <FadeUp delay={0.3}>
          <p className="text-center text-muted-foreground text-base md:text-lg max-w-lg mx-auto font-serif italic mb-16 md:mb-20">
            {d.subline || 'An entire e-commerce business — brand, store, logistics, ads — shipped from scratch.'}
          </p>
        </FadeUp>

        {/* Hero image */}
        {d.image && (
          <FadeUp delay={0.2}>
            <m.div
              ref={imgRef}
              className="relative w-full aspect-[2/1] md:aspect-[2.5/1] rounded-2xl overflow-hidden mb-20 group cursor-pointer glow-card"
              onClick={() => window.open(d.link, '_blank')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && window.open(d.link, '_blank')}
            >
              <m.div style={{ scale: imgScale, y: imgY }} className="absolute inset-[-15%]">
                <Image src={d.image} alt={d.client} fill className="object-cover" priority sizes="100vw" />
              </m.div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />

              {/* CTA overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <div>
                  <p className="text-white/90 font-mono text-xs uppercase tracking-wider">{d.client}</p>
                  <p className="text-white/50 text-sm mt-1">View live store</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <IconArrowUpRight size={18} className="text-white" />
                </div>
              </div>

              {/* Curtain reveal */}
              <m.div
                className="absolute inset-0 bg-background z-20"
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.3, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'right' }}
              />
            </m.div>
          </FadeUp>
        )}

        {/* Metrics — Spotlight cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {d.metrics.map((met, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <SpotlightCard className="p-6 md:p-8 text-center">
                <span className="f-display text-[clamp(2rem,5vw,3.5rem)] text-gradient block">
                  <AnimatedCounter
                    value={met.n}
                    prefix={met.prefix}
                    suffix={met.suffix}
                  />
                </span>
                <p className="f-mono mt-3 text-[0.6rem]">{met.l}</p>
                <p className="text-muted-foreground text-[0.65rem] mt-1">{met.sub}</p>
              </SpotlightCard>
            </FadeUp>
          ))}
        </div>

        {/* Process timeline */}
        <FadeUp>
          <div className="mb-20">
            <h3 className="f-mono text-accent mb-10 text-center tracking-[0.3em] text-[0.6rem]">The Process</h3>
            <div className="grid md:grid-cols-4 gap-0">
              {d.process.map((step, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="relative p-6 border-l border-border/50 group hover:border-accent/30 transition-colors duration-500"
                >
                  {/* Dot on border */}
                  <div className="absolute -left-[5px] top-6 w-[9px] h-[9px] rounded-full bg-background border-2 border-border group-hover:border-accent transition-colors duration-500" />

                  <span className="f-mono text-accent text-[0.55rem] mb-3 block">{step.phase}</span>
                  <h4 className="f-head text-lg mb-2 group-hover:text-accent transition-colors duration-300">{step.title}</h4>
                  <p className="text-muted-foreground text-[13px] leading-relaxed">{step.desc}</p>
                </m.div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Body + Scope */}
        <div className="grid md:grid-cols-2 gap-14 md:gap-24 mb-20">
          <FadeUp>
            <h3 className="f-head text-2xl mb-5">The Challenge</h3>
            <p className="text-muted-foreground text-[15px] leading-[1.9]">{d.body}</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h3 className="f-mono text-[0.6rem] text-accent tracking-[0.2em] mb-6">Scope of Work</h3>
            {d.scope.map((s, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="py-3.5 border-b border-border/30 text-muted-foreground text-sm flex items-center gap-3 group hover:text-foreground hover:pl-2 transition-all duration-400"
              >
                <span className="font-mono text-[0.6rem] text-accent/40 group-hover:text-accent transition-colors w-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s}
              </m.div>
            ))}
          </FadeUp>
        </div>

        {/* Testimonial */}
        <FadeUp>
          <SpotlightCard className="max-w-2xl mx-auto p-8 md:p-12">
            <IconQuote size={24} className="text-accent/30 mb-4" />
            <p className="font-serif italic text-lg md:text-xl leading-relaxed mb-5">
              &ldquo;{d.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-px h-8 bg-accent/30" />
              <p className="f-mono text-[0.6rem]">{d.quoteAuthor}</p>
            </div>
          </SpotlightCard>
        </FadeUp>

        {/* CTA */}
        <FadeUp delay={0.1}>
          <div className="text-center mt-12">
            <MagneticButton>
              <a
                href={d.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium border border-border text-muted-foreground hover:text-accent hover:border-accent/50 transition-all duration-300 group"
              >
                Visit {d.client}
                <IconArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </MagneticButton>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
