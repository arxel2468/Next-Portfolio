"use client";

import { m } from 'framer-motion';
import Image from 'next/image';
import { IconBrandGithub, IconExternalLink, IconArrowUpRight } from '@tabler/icons-react';
import { projects } from '@/data/projects';
import SectionHeader from '@/components/ui/SectionHeader';
import { MagneticCard } from '@/components/ui/MagneticCard';

export default function Projects() {
  return (
    <section id="projects" className="section bg-[var(--bg-tertiary)] relative">
      <div className="container">
        <SectionHeader
          label="Projects"
          title="Things I've built."
          description="A selection of projects that showcase my approach to building software."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={project.featured ? 'lg:col-span-2' : ''}
    >
      <MagneticCard className="h-full">
        <article className="card group h-full">
          {/* Image/Visual Header */}
          <div
            className={`relative ${project.featured ? 'aspect-[21/9]' : 'aspect-video'} overflow-hidden`}
            style={{
              backgroundImage: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
            }}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                sizes={project.featured ? '100vw' : '(max-width: 1024px) 100vw, 50vw'}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-24 h-24 rounded-3xl flex items-center justify-center text-4xl font-bold text-white shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}, ${project.color}CC)`,
                  }}
                >
                  {project.title[0]}
                </div>
              </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent opacity-40" />

            {/* Links - Top Right */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-[var(--text-primary)] hover:bg-white dark:hover:bg-black transition-colors"
                aria-label={`${project.title} GitHub repository`}
              >
                <IconBrandGithub size={20} />
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-[var(--brand-primary)] hover:bg-white dark:hover:bg-black transition-colors"
                  aria-label={`${project.title} live demo`}
                >
                  <IconExternalLink size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-title mb-1 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-sm font-medium" style={{ color: project.color }}>
                  {project.tagline}
                </p>
              </div>
              <IconArrowUpRight
                size={24}
                className="text-[var(--text-muted)] group-hover:text-[var(--brand-primary)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0"
              />
            </div>

            <p className="text-body mb-6">{project.description}</p>

            {/* Problem / Architecture */}
            <div className="grid gap-3 mb-6">
              <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
                <div className="text-label mb-1.5">What I Solved</div>
                <p className="text-small">{project.problem}</p>
              </div>
              <div className="bg-[var(--bg-tertiary)] rounded-xl p-4">
                <div className="text-label mb-1.5">How I Built It</div>
                <p className="text-small">{project.solution}</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>
      </MagneticCard>
    </m.div>
  );
}
