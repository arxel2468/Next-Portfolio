"use client";

import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';

export default function Projects({ repos }) {
  return (
    <section id="projects" className="section">
      <div className="container-wide">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <span className="label block mb-4">01 — Projects</span>
            <h2 className="text-headline">Selected Work</h2>
          </div>
          <a
            href="https://github.com/arxel2468"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex link-arrow text-sm"
          >
            View All
            <FaGithub className="w-4 h-4" />
          </a>
        </div>

        {/* Projects List */}
        <div className="border-t" style={{ borderColor: 'var(--border)' }}>
          {repos.map((repo, index) => (
            <ProjectRow key={repo.slug} project={repo} index={index} />
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 md:hidden">
          <a
            href="https://github.com/arxel2468"
            target="_blank"
            rel="noreferrer"
            className="link-arrow text-sm"
          >
            View All on GitHub
            <FaGithub className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }) {
  const { name, slug, description, url, liveUrl, language, languageColor, stars, updatedAt } = project;

  // Calculate time since update
  const daysAgo = Math.floor((Date.now() - new Date(updatedAt).getTime()) / (1000 * 60 * 60 * 24));
  const timeAgo = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo}d ago`;

  // Determine primary link - prefer live URL if exists
  const primaryLink = liveUrl || url;
  const hasLiveUrl = Boolean(liveUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group border-b py-8 transition-colors hover:bg-[var(--bg-elevated)]"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start md:items-center px-4 md:px-6">
        {/* Project Name */}
        <div className="md:col-span-4">
          <h3 className="text-xl font-semibold mb-1 group-hover:text-[var(--accent)] transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-3 md:hidden">
            <span className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: languageColor }}
              />
              <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>{language}</span>
            </span>
            {stars > 0 && (
              <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--fg-muted)' }}>
                <FaStar className="w-3 h-3 text-yellow-500" />
                {stars}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-5">
          <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            {description}
          </p>
        </div>

        {/* Meta */}
        <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-4">
          {/* Language & Stars - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: languageColor }}
              />
              <span className="text-sm font-mono" style={{ color: 'var(--fg-subtle)' }}>{language}</span>
            </span>
            {stars > 0 && (
              <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--fg-muted)' }}>
                <FaStar className="w-3 h-3 text-yellow-500" />
                {stars}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-mono hidden sm:block"
              style={{ color: 'var(--fg-subtle)' }}
            >
              {timeAgo}
            </span>

            {/* GitHub Link */}
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded transition-colors hover:bg-[var(--accent-subtle)]"
              style={{ color: 'var(--fg-muted)' }}
              title="View on GitHub"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub className="w-4 h-4" />
            </a>

            {/* Live Link (if exists) */}
            {hasLiveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded transition-colors hover:bg-[var(--accent-subtle)]"
                style={{ color: 'var(--accent)' }}
                title="View Live"
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Arrow indicator */}
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="p-2"
            >
              <svg
                className="w-5 h-5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: 'var(--fg-subtle)' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
