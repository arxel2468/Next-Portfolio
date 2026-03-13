"use client";

import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { projects } from '@/data/projects';

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-40 bg-[var(--bg-deep)] section-glow">
      <div className="container-wide">
        <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-[var(--accent-color)]" />
          <span className="font-label">Selected Projects</span>
        </m.div>

        <m.h2 initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-[clamp(2.5rem,7vw,5.5rem)] mb-20 max-w-3xl" data-c="hover">
          Things I've built.
        </m.h2>
      </div>

      <div className="space-y-1">
        {projects.map((p, i) => <ProjectRow key={p.title} project={p} index={i} />)}
      </div>
    </section>
  );
}

function ProjectRow({ project: p, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.4'] });
  const xDir = index % 2 === 0 ? -30 : 30;
  const x = useTransform(scrollYProgress, [0, 1], [xDir, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <m.div ref={ref} style={{ x, opacity }}>
      <a href={p.live || p.github} target="_blank" rel="noopener noreferrer"
        className="block group" data-c="project" data-c-label="View">
        <div className="container-wide">
          <div className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 border-t border-[var(--border)] items-center">
            <div className="md:col-span-1">
              <span className="font-label text-[var(--accent-color)]">0{index + 1}</span>
            </div>

            <div className="md:col-span-4">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[var(--bg)]">
                {p.image ? (
                  <Image src={p.image} alt={p.title} fill
                    className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    sizes="(max-width:768px) 100vw, 33vw" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-lg text-xl font-bold text-white flex items-center justify-center"
                      style={{ background: p.color }}>{p.title[0]}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-5">
              <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] mb-2 group-hover:text-[var(--accent-color)] transition-colors duration-300">
                {p.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map(t => (
                  <span key={t} className="px-3 py-1 text-[11px] font-medium rounded-full border border-[var(--border)] text-[var(--text-muted)]">{t}</span>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 flex md:justify-end gap-3">
              <a href={p.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text-muted)] transition-all"
                data-c="hover"><IconBrandGithub size={16} /></a>
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                  className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] transition-all"
                  data-c="hover"><IconExternalLink size={16} /></a>
              )}
            </div>
          </div>
        </div>
      </a>
    </m.div>
  );
}
