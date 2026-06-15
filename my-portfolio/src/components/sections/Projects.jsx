// src/components/sections/Projects.jsx
'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import s from './Projects.module.css';
import { RevealSection, RevealItem } from '@/components/ui/RevealSection';
import { projects } from '@/data/content';

function Arrow() {
  return (
    <span className={s.arrow} aria-hidden="true">
      <span className={s.arrowLine} />
      <span className={s.arrowHead} />
    </span>
  );
}

function ProjectCard({ p }) {
  return (
    <motion.article
      className={s.card}
      aria-label={p.title}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {/* Image */}
      <div className={s.cardImage}>
        <motion.div
          className={s.cardImageInner}
          variants={{
            rest:  { scale: 1 },
            hover: { scale: 1.04, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          <Image
            src={p.image}
            alt={p.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          className={s.cardImageOverlay}
          variants={{
            rest:  { opacity: 1 },
            hover: { opacity: 0.85, transition: { duration: 0.4 } },
          }}
        />

        <span className={s.cardImageIndex} aria-hidden="true">
          {p.index}
        </span>
      </div>

      {/* Content */}
      <div className={s.cardBody}>
        <div className={s.cardTop}>
          <span className={s.cardCategory}>{p.category}</span>
          <span className={s.cardYear}>{p.year}</span>
        </div>

        <h3 className={s.cardTitle}>{p.title}</h3>
        <p className={s.cardLede}>{p.lede}</p>
        <p className={s.cardDesc}>{p.body}</p>

        <div className={s.cardBottom}>
          <div className={s.cardTech}>
            {p.tech.slice(0, 4).map((t) => (
              <span key={t} className={s.cardTag}>{t}</span>
            ))}
          </div>
          <div className={s.cardLinks}>
            {p.live && (
              <motion.a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className={s.cardLink}
                aria-label={`Visit ${p.title}`}
                whileHover={{ gap: '14px' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                Live <Arrow />
              </motion.a>
            )}
            {p.github && (
              <motion.a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${s.cardLink} ${s.cardLinkGhost}`}
                aria-label={`${p.title} source`}
                whileHover={{ gap: '14px' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                Code <Arrow />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className={s.root} aria-label="Projects">

      {/* ── Header ── */}
      <RevealSection>
        <div className={s.header}>
          <RevealItem>
            <div className={s.headerMeta}>
              <span className={s.headerIdx}>01</span>
              <span className={s.headerLine} aria-hidden="true" />
              <span className={s.headerLabel}>Projects</span>
            </div>
          </RevealItem>
          <RevealItem>
            <div className={s.headerMain}>
              <h2 className={s.headerTitle}>
                Other things<br /><em>I've built.</em>
              </h2>
              <p className={s.headerAside}>
                not every project needs a case study.<br />
                some things just work and that's enough.
              </p>
            </div>
          </RevealItem>
        </div>
      </RevealSection>

      {/* ── Grid ── */}
      <RevealSection>
        <div className={s.grid}>
          {projects.map((p) => (
            <RevealItem key={p.id}>
              <ProjectCard p={p} />
            </RevealItem>
          ))}
        </div>
      </RevealSection>

    </section>
  );
}