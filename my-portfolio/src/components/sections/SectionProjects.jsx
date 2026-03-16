"use client";

import { useRef, useState } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { projects } from '@/data/content';
import { RevealText, FadeUp } from '../ui/TextReveal';
import SpotlightCard from '../ui/SpotlightCard';

export default function SectionProjects() {
  return (
    <section id="projects" className="py-28 md:py-44 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      <div className="wrap relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <m.span
            className="f-mono text-accent text-[0.6rem] tracking-[0.3em] mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Selected Work
          </m.span>

          <RevealText>
            <h2 className="f-head text-[clamp(2.5rem,6vw,4.5rem)]">
              Things I&apos;ve shipped.
            </h2>
          </RevealText>

          <FadeUp delay={0.2}>
            <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto mt-4">
              No tutorials. No clones. Real products solving real problems, built from scratch.
            </p>
          </FadeUp>
        </div>

        <div className="space-y-8 md:space-y-12">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, i }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.5'] });
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [2, 0]);

  const isReversed = i % 2 === 1;

  // Normalize tech to always be an array
  const techList = Array.isArray(p.tech)
    ? p.tech
    : typeof p.tech === 'string'
      ? p.tech.split(' · ')
      : [];

  return (
    <m.div ref={ref} style={{ y, opacity, rotateX: rotate }}>
      <SpotlightCard
        className="overflow-hidden"
        spotlightColor={`${p.color}12`}
      >
        <div
          className={`grid md:grid-cols-5 gap-0 ${isReversed ? 'md:[direction:rtl]' : ''}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image — 3 cols */}
          <div className={`md:col-span-3 relative aspect-[16/10] md:aspect-auto md:min-h-[380px] bg-muted/30 overflow-hidden ${isReversed ? 'md:[direction:ltr]' : ''}`}>
            {p.img ? (
              <>
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out"
                  style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
                  sizes="(max-width:768px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <m.div
                  animate={{ rotate: hovered ? 90 : 0, scale: hovered ? 1.1 : 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-20 h-20 rounded-2xl text-3xl font-bold text-white flex items-center justify-center shadow-2xl"
                  style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}88)` }}
                >
                  {p.title[0]}
                </m.div>
              </div>
            )}

            {/* Year badge */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border/50">
              <span className="f-mono text-[0.5rem]">{p.year}</span>
            </div>
          </div>

          {/* Content — 2 cols */}
          <div className={`md:col-span-2 p-8 md:p-10 flex flex-col justify-center ${isReversed ? 'md:[direction:ltr]' : ''}`}>
            {/* Links */}
            <div className="flex gap-2 mb-6">
              <a
                href={p.gh}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/50 transition-all duration-300"
              >
                <IconBrandGithub size={15} />
              </a>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-all duration-300"
                >
                  <IconExternalLink size={15} />
                </a>
              )}
            </div>

            {/* Title */}
            <h3
              className="f-head text-2xl md:text-3xl mb-4 transition-colors duration-300"
              style={{ color: hovered ? p.color : undefined }}
            >
              {p.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {p.desc}
            </p>

            {/* Tech tags — safely mapped */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {techList.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-[0.6rem] font-mono rounded-md bg-muted/50 text-muted-foreground border border-border/30"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Hover accent */}
            <m.div
              className="h-[2px] mt-8 rounded-full origin-left"
              style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
              animate={{ scaleX: hovered ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </SpotlightCard>
    </m.div>
  );
}
