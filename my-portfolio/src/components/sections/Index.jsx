'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import s from './Index.module.css';
import { projects } from '@/data/content';

function ProjectRow({ project, isOpen, onToggle }) {
  return (
    <motion.article
      className={`${s.row} ${isOpen ? s.rowOpen : ''}`}
      aria-label={project.title}
      layout
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        className={s.rowHead}
        onClick={onToggle}
        aria-expanded={isOpen}
        data-hover
      >
        <span className={s.rowNum}>{project.index}</span>
        <span className={s.rowTitle}>{project.title}</span>
        <span className={s.rowCategory}>{project.category}</span>
        <span className={s.rowYear}>{project.year}</span>
        <motion.span
          className={s.rowToggle}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className={s.rowBody}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height:  { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.35, delay: 0.12 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height:  { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
                opacity: { duration: 0.2 },
              },
            }}
          >
            {/*
              The dark interior — a different material revealed when
              you open the drawer. Not just expanded content but a
              different space entirely.
            */}
            <div className={s.rowBodyInner}>

              {project.image && (
                <div className={s.rowThumb}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 220px"
                  />
                </div>
              )}

              <div className={s.rowText}>
                <p className={s.rowLede}>{project.lede}</p>
                <p className={s.rowDesc}>{project.body}</p>

                <div className={s.rowFoot}>
                  <div className={s.rowTech}>
                    {project.tech.slice(0, 4).map((t) => (
                      <span key={t} className={s.rowTag}>{t}</span>
                    ))}
                  </div>
                  <div className={s.rowLinks}>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={s.rowLink}
                        data-hover
                      >
                        Live ↗
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${s.rowLink} ${s.rowLinkGhost}`}
                        data-hover
                      >
                        Code ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function Index() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="index" className={s.root} aria-label="Projects">

      <motion.div
        className={s.header}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className={s.heading}>Things I've built.</h2>
        <p className={s.sub}>Tap to open.</p>
      </motion.div>

      <motion.div
        className={s.list}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        {projects.map((p) => (
          <ProjectRow
            key={p.id}
            project={p}
            isOpen={openId === p.id}
            onToggle={() => toggle(p.id)}
          />
        ))}
      </motion.div>

    </section>
  );
}