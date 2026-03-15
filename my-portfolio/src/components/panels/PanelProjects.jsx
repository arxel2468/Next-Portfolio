"use client";

import { m } from 'framer-motion';
import Image from 'next/image';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { projects } from '@/data/content';

export default function PanelProjects() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center relative overflow-hidden px-8 md:px-16 py-16 gap-8">
      {/* Left — title */}
      <div className="shrink-0 md:w-[30%]">
        <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-[var(--rose)]" />
          <span className="f-label">Projects</span>
        </m.div>
        <m.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="f-head text-[clamp(2rem,4vw,3.5rem)]" data-c="hover">
          Things I've<br />built.
        </m.h2>
      </div>

      {/* Right — stacked cards */}
      <div className="flex-1 relative flex items-center justify-center">
        <div className="relative w-full max-w-[700px] h-[400px] md:h-[450px]">
          {projects.map((p, i) => {
            const rotations = [-6, -2, 2, 6];
            const offsets = [-20, -8, 8, 20];
            return (
              <m.div key={p.title}
                initial={{ opacity: 0, y: 60, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: rotations[i] || 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .12, duration: .7, ease: [.25, .46, .45, .94] }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 50, y: -10 }}
                className="absolute rounded-2xl border border-[var(--line)] overflow-hidden shadow-xl w-[280px] md:w-[320px]"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${10 + Math.abs(offsets[i])}%`,
                  background: 'var(--surface)',
                  zIndex: projects.length - i,
                }}
                data-c="project" data-cl="View">

                {/* Image */}
                <div className="relative h-36 md:h-40 bg-[var(--bg2)] overflow-hidden">
                  {p.img ? (
                    <Image src={p.img} alt={p.title} fill className="object-cover object-top" sizes="320px" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-lg text-lg font-bold text-white flex items-center justify-center"
                        style={{ background: p.color }}>{p.title[0]}</div>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1">{p.title}</h3>
                  <p className="text-[var(--ink2)] text-xs leading-relaxed mb-2">{p.desc}</p>
                  <p className="f-label mb-3" style={{ fontSize: '.5rem' }}>{p.tech}</p>
                  <div className="flex gap-2">
                    <a href={p.gh} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()} data-c="hover"
                      className="w-7 h-7 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--ink3)] hover:text-[var(--ink)] transition-colors">
                      <IconBrandGithub size={12} />
                    </a>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()} data-c="hover"
                        className="w-7 h-7 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--ink3)] hover:text-[var(--rose)] transition-colors">
                        <IconExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
