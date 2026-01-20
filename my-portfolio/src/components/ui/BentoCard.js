"use client";
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';
import { clsx } from 'clsx';

export default function BentoCard({ project, featured = false }) {
  const { name, description, url, liveUrl, stars, language, languageColor, updatedAt } = project;

  // Calculate days since update for activity status
  const daysSinceUpdate = Math.floor((new Date() - new Date(updatedAt)) / (1000 * 60 * 60 * 24));
  const isActive = daysSinceUpdate < 30;

  return (
    <motion.div
      className={clsx(
        "group relative flex flex-col justify-between p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent-glow)]",
        featured ? "md:col-span-2 md:row-span-2 min-h-[300px]" : "col-span-1 min-h-[240px]"
      )}
      whileHover={{ y: -4 }}
    >
      {/* Background Gradient Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-glow)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top Row: Meta */}
      <div className="relative z-10 flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={clsx(
            "p-2 rounded-lg border",
            isActive
              ? "bg-green-500/10 border-green-500/20 text-green-600"
              : "bg-[var(--bg)] border-[var(--border)] text-[var(--text-muted)]"
          )}>
            <FaCodeBranch className="w-4 h-4" />
          </div>
          {stars > 0 && (
            <div className="flex items-center gap-1 text-xs font-mono text-[var(--text-secondary)]">
              <FaStar className="text-yellow-500 w-3 h-3" />
              <span>{stars}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          <a href={url} target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
            <FaGithub className="w-5 h-5" />
          </a>
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
              <FaExternalLinkAlt className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Middle: Content */}
      <div className="relative z-10 flex-grow">
        <h3 className={clsx(
          "font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors",
          featured ? "text-2xl" : "text-lg"
        )}>
          {name.replace(/-/g, ' ')}
        </h3>
        <p className={clsx(
          "text-[var(--text-secondary)] leading-relaxed",
          featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"
        )}>
          {description}
        </p>
      </div>

      {/* Bottom: Tech & Status */}
      <div className="relative z-10 mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: languageColor }} />
          <span className="text-xs font-mono text-[var(--text-muted)]">{language}</span>
        </div>

        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
          {daysSinceUpdate === 0 ? 'Updated today' : `${daysSinceUpdate}d ago`}
        </span>
      </div>
    </motion.div>
  );
}
