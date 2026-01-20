"use client";

import { motion } from 'framer-motion';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { projects } from '@/data/projects';

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="label block mb-3">Projects</span>
          <h2 className="h2">Things I've built.</h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`card p-6 ${project.featured ? 'md:col-span-2' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${project.color}15` }}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: project.color }}
          />
        </div>
        <div className="flex gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-bg transition-colors text-muted hover:text-fg"
            aria-label="GitHub"
          >
            <IconBrandGithub size={20} />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-bg transition-colors text-accent"
              aria-label="Live site"
            >
              <IconExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="h3 mb-1">{project.title}</h3>
      <p className="text-sm text-accent mb-3">{project.tagline}</p>
      <p className="text-muted mb-4">{project.description}</p>

      {/* Problem/Solution */}
      <div className="bg-bg rounded-lg p-4 mb-4">
        <div className="text-xs font-medium text-subtle mb-1">THE PROBLEM</div>
        <p className="text-sm text-muted">{project.problem}</p>
      </div>

      {/* Tech */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="badge">{t}</span>
        ))}
      </div>
    </motion.div>
  );
}
