"use client";

import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import SpotlightCard from './SpotlightCard';
import { motion } from 'framer-motion';

export default function ProjectCard({ project }) {
  const { name, description, url, liveUrl, topics, language, languageColor } = project;

  const displayName = name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <SpotlightCard className="h-full">
      <motion.div
        className="h-full p-6 border border-[var(--border)] rounded-xl bg-[var(--surface)] transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-lg hover:shadow-[var(--accent)]/5"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            {/* Folder icon */}
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-subtle)] flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-[var(--accent)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </div>
            <h3 className="font-medium text-[var(--text-primary)] leading-tight">
              {displayName}
            </h3>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              aria-label="View on GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                aria-label="View live site"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] mb-6 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]">
          {/* Language */}
          {language && (
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: languageColor || 'var(--text-muted)' }}
              />
              <span className="text-xs font-mono text-[var(--text-muted)]">{language}</span>
            </div>
          )}

          {/* Topics */}
          {topics.length > 0 && (
            <div className="flex items-center gap-1.5">
              {topics.slice(0, 2).map((topic) => (
                <span
                  key={topic}
                  className="text-xs text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-1 rounded-md"
                >
                  {topic}
                </span>
              ))}
              {topics.length > 2 && (
                <span className="text-xs text-[var(--text-muted)]">
                  +{topics.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </SpotlightCard>
  );
}
