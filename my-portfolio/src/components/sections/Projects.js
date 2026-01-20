"use client";

import { motion } from 'framer-motion';
import { FaGithub, FaArrowRight } from 'react-icons/fa';

export default function Projects({ repos }) {
  return (
    <section id="projects" className="py-32">
      <div className="container-wide">

        <div className="flex items-end justify-between mb-16">
          <h2 className="text-4xl font-bold tracking-tight">Selected Work</h2>
          <span className="mono-micro hidden md:block">01 — INDEX</span>
        </div>

        <div className="border-t border-[var(--accents-2)]">
          {repos.map((repo, index) => (
            <ProjectRow key={repo.name} project={repo} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

function ProjectRow({ project, index }) {
  const { name, description, url, language, stars } = project;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group block relative border-b border-[var(--accents-2)] transition-colors hover:bg-[var(--accents-1)]"
    >
      <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

        {/* 01. Project Name */}
        <div className="md:col-span-4">
          <h3 className="text-xl font-semibold group-hover:translate-x-2 transition-transform duration-300">
            {name.replace(/-/g, ' ')}
          </h3>
        </div>

        {/* 02. Description */}
        <div className="md:col-span-5">
          <p className="text-[var(--accents-5)] group-hover:text-[var(--accents-6)] transition-colors line-clamp-2 md:line-clamp-1">
            {description}
          </p>
        </div>

        {/* 03. Meta Data */}
        <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-8">
          <div className="flex items-center gap-2 font-mono text-sm text-[var(--accents-4)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accents-8)]" />
            {language}
          </div>

          <div className="text-[var(--accents-3)] group-hover:text-[var(--success)] transition-colors transform -rotate-45 group-hover:rotate-0 duration-300">
            <FaArrowRight />
          </div>
        </div>

      </div>
    </motion.a>
  );
}
