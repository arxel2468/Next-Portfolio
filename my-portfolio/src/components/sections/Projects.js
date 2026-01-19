"use client";

import ScrollReveal from '@/components/ui/ScrollReveal';
import ProjectCard from '@/components/ui/ProjectCard';
import { motion } from 'framer-motion';

export default function Projects({ repos }) {
  return (
    <section id="projects" className="section px-6">
      <div className="max-w-wide mx-auto">
        <ScrollReveal>
          <p className="section-header">Selected Projects</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {repos.map((repo, index) => (
            <ScrollReveal key={repo.name} delay={index * 0.08}>
              <ProjectCard project={repo} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <motion.div
            className="mt-12 text-center"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <a
              href="https://github.com/arxel2468"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
            >
              <span>View all repositories</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
