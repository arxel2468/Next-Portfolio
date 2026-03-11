"use client";

import { m } from 'framer-motion';
import Image from 'next/image';
import { IconBrandGithub, IconExternalLink, IconArrowUpRight } from '@tabler/icons-react';
import { projects } from '@/data/projects';
import { ScrollTextReveal } from '@/components/ui/TextReveal';

export default function Projects() {
  return (
    <section id="projects" className="py-32 md:py-40 relative">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <span className="type-mono block mb-4">Selected Projects</span>
            <h2 className="type-headline" data-cursor="text">
              <ScrollTextReveal>Things I've built.</ScrollTextReveal>
            </h2>
          </div>
          <p className="type-body-lg md:max-w-sm md:text-right">
            Each project is a product — built to solve a real problem, not to fill a portfolio.
          </p>
        </div>

        {/* Projects List — Editorial Style */}
        <div className="space-y-0">
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }) {
  return (
    <m.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="group border-t border-[var(--border)] py-10 md:py-14"
    >
      <a
        href={project.live || project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        data-cursor="pointer"
      >
        <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Number */}
          <div className="md:col-span-1">
            <span className="type-mono text-[var(--text-muted)]">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Title & Tagline */}
          <div className="md:col-span-4">
            <h3 className="type-title mb-2 flex items-center gap-2 group-hover:text-[var(--accent)] transition-colors duration-300">
              {project.title}
              <IconArrowUpRight
                size={18}
                className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
              />
            </h3>
            <p className="font-serif italic text-[var(--text-muted)] text-sm">
              {project.tagline}
            </p>
          </div>

          {/* Description + Architecture */}
          <div className="md:col-span-5">
            <p className="type-body text-sm mb-3">{project.description}</p>
            <p className="type-mono text-[0.625rem] text-[var(--text-muted)] leading-relaxed">
              {project.architecture}
            </p>
          </div>

          {/* Tech + Links */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end gap-3">
            <div className="flex flex-wrap gap-1.5 md:justify-end">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t} className="tag text-[0.6875rem]">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <IconBrandGithub size={16} />
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                  aria-label="Live"
                  onClick={(e) => e.stopPropagation()}
                >
                  <IconExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </a>

      {/* Reveal image on hover — desktop only */}
      {project.image && (
        <div className="hidden md:block overflow-hidden max-h-0 group-hover:max-h-[300px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]">
          <div className="pt-8">
            <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden border border-[var(--border)] ml-auto">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      )}
    </m.article>
  );
}
