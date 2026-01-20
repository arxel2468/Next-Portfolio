"use client";

import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';

export default function ProjectCard({ project, index, featured = false }) {
  const {
    name,
    description,
    url,
    liveUrl,
    language,
    languageColor,
    stars,
    topics,
    color,
  } = project;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`card block p-6 ${featured ? 'md:col-span-2' : ''}`}
      style={{ '--project-color': color }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>

        <div className="flex items-center gap-3">
          {stars > 0 && (
            <span className="flex items-center gap-1 text-sm text-muted">
              <FiStar className="w-3.5 h-3.5" />
              {stars}
            </span>
          )}
          <FiGithub className="w-4 h-4 text-muted" />
          {liveUrl && (
            <FiExternalLink className="w-4 h-4 text-accent" />
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="heading-3 mb-2">{name}</h3>
      <p className="text-muted text-sm mb-4 line-clamp-2">{description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: languageColor }}
          />
          <span className="text-xs font-mono text-subtle">{language}</span>
        </div>

        {topics.length > 0 && (
          <div className="flex gap-2">
            {topics.slice(0, 2).map((topic) => (
              <span
                key={topic}
                className="text-xs text-subtle bg-background-elevated px-2 py-0.5 rounded"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.a>
  );
}
