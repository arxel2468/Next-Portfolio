'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import s from './Projects.module.css';
import { projects } from '@/data/content';

function Arrow() {
  return (
    <span className={s.arrow} aria-hidden="true">
      <span className={s.arrowLine} />
      <span className={s.arrowHead} />
    </span>
  );
}

function ProjectCard({ p, i }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => el.classList.add(s.cardVisible), i * 110);
        obs.unobserve(el);
      }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [i]);

  return (
    <article ref={ref} className={s.card} aria-label={p.title}>
      {/* Image */}
      <div className={s.cardImage}>
        <Image
          src={p.image}
          alt={p.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className={s.cardImageOverlay} aria-hidden="true" />
        <span className={s.cardImageIndex} aria-hidden="true">{p.index}</span>
      </div>

      {/* Content */}
      <div className={s.cardBody}>
        <div className={s.cardTop}>
          <span className={s.cardCategory}>{p.category}</span>
          <span className={s.cardYear}>{p.year}</span>
        </div>

        <h3 className={s.cardTitle}>{p.title}</h3>
        <p className={s.cardLede}>{p.lede}</p>
        <p className={s.cardBody}>{p.body}</p>

        <div className={s.cardBottom}>
          <div className={s.cardTech}>
            {p.tech.slice(0, 4).map(t => (
              <span key={t} className={s.cardTag}>{t}</span>
            ))}
          </div>
          <div className={s.cardLinks}>
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer"
                 className={s.cardLink} aria-label={`Visit ${p.title}`}>
                Live <Arrow />
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer"
                 className={`${s.cardLink} ${s.cardLinkGhost}`}
                 aria-label={`${p.title} source`}>
                Code <Arrow />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className={s.root} aria-label="Projects">

      <div className={s.header}>
        <div className={s.headerMeta}>
          <span className={s.headerIdx}>01</span>
          <span className={s.headerLine} aria-hidden="true" />
          <span className={s.headerLabel}>Projects</span>
        </div>
        <div className={s.headerMain}>
          <h2 className={s.headerTitle}>
            Other things<br /><em>I've built.</em>
          </h2>
          {/* The quiet self-commentary — exactly like how he writes */}
          <p className={s.headerAside}>
            not every project needs a case study.<br />
            some things just work and that's enough.
          </p>
        </div>
      </div>

      {/*
        Two-column card grid.
        But not uniform — cards have different image heights by design.
        The grid breathes.
      */}
      <div className={s.grid}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} />
        ))}
      </div>

    </section>
  );
}