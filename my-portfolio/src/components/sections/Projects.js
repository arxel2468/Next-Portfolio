"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { IconBrandGithub, IconExternalLink, IconArrowUpRight } from '@tabler/icons-react';
import { projects } from '@/data/projects';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Projects() {
  return (
    <section id="projects" className="section bg-[var(--bg-tertiary)] relative">
      <div className="container">
        <SectionHeader
          label="Projects"
          title="Things I've built."
          description="A selection of projects that showcase my approach to building software."
        />

        {/* Projects Grid */}
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
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`card group ${project.featured ? 'lg:col-span-2' : ''}`}
    >
      {/* Image/Visual Header */}
      <div
        className={`relative ${project.featured ? 'aspect-[21/9]' : 'aspect-video'} bg-gradient-to-br overflow-hidden`}
        style={{
          backgroundImage: `linear-gradient(135deg, ${project.color}20, ${project.color}05)`,
        }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent opacity-60" />

        {/* Links - Top Right */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-[var(--text-primary)] hover:bg-white dark:hover:bg-black transition-colors"
            aria-label="GitHub"
          >
            <IconBrandGithub size={20} />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-[var(--brand-primary)] hover:bg-white dark:hover:bg-black transition-colors"
              aria-label="Live Demo"
            >
              <IconExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-title mb-1 group-hover:text-gradient transition-all">
              {project.title}
            </h3>
            <p
              className="text-sm font-medium"
              style={{ color: project.color }}
            >
              {project.tagline}
            </p>
          </div>
          <IconArrowUpRight
            size={24}
            className="text-[var(--text-muted)] group-hover:text-[var(--brand-primary)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0"
          />
        </div>

        {/* Description */}
        <p className="text-body mb-6">{project.description}</p>

        {/* Problem/Solution */}
        <div className="bg-[var(--bg-tertiary)] rounded-xl p-5 mb-6">
          <div className="text-label mb-2">The Problem</div>
          <p className="text-small">{project.problem}</p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="badge"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
