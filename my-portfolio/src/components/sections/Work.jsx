'use client';
import { useEffect, useRef } from 'react';
import styles from './Work.module.css';
import { projects } from '@/data/content';

function ProjectRow({ project, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add(styles.rowVisible), index * 90);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <article
      ref={ref}
      className={styles.row}
      aria-label={project.title}
    >
      {/* The huge ghost index — only seen on close inspection */}
      <span className={styles.ghostIndex} aria-hidden="true">
        {project.index}
      </span>

      <div className={styles.rowInner}>

        <div className={styles.rowMeta}>
          <span className={styles.rowNum}>{project.index}</span>
          <span className={styles.rowYear}>{project.year}</span>
        </div>

        <div className={styles.rowMain}>
          <div className={styles.rowTop}>
            <span className={styles.rowCategory}>{project.category}</span>
            <h3 className={styles.rowTitle}>{project.title}</h3>
          </div>
          <p className={styles.rowLede}>{project.lede}</p>
          <p className={styles.rowBody}>{project.body}</p>
        </div>

        <div className={styles.rowRight}>
          <div className={styles.rowTech}>
            {project.tech.map(t => (
              <span key={t} className={styles.rowTag}>{t}</span>
            ))}
          </div>
          <div className={styles.rowLinks}>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.rowLink}
                aria-label={`Visit ${project.title}`}
              >
                Live
                <RowArrow />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.rowLink} ${styles.rowLinkGhost}`}
                aria-label={`${project.title} source code`}
              >
                GitHub
                <RowArrow />
              </a>
            )}
          </div>
        </div>

      </div>
    </article>
  );
}

function RowArrow() {
  return (
    <span className={styles.arrow} aria-hidden="true">
      <span className={styles.arrowLine} />
      <span className={styles.arrowHead} />
    </span>
  );
}

export default function Work() {
  return (
    <section id="work" className={styles.root} aria-label="Other projects">

      <div className={styles.header}>
        <div className={styles.headerLabel}>
          <span className={styles.headerIdx}>01</span>
          <span className={styles.headerRule} aria-hidden="true" />
          <span className={styles.headerText}>Projects</span>
        </div>
        <div className={styles.headerHeadWrap}>
          <h2 className={styles.headerHead}>
            Other things<br /><em>I've made.</em>
          </h2>
          <p className={styles.headerNote}>
            {/*
              This note is in a smaller, quieter font.
              It's not a CTA. It's a comment to self.
            */}
            not everything needs to be a case study.
            <br />some things just work.
          </p>
        </div>
      </div>

      <div className={styles.list}>
        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} />
        ))}
      </div>

    </section>
  );
}