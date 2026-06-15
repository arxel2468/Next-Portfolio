// src/components/sections/Work.jsx
'use client';
import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
} from 'framer-motion';
import { useEffect } from 'react';
import s from './Work.module.css';
import { stealstreet } from '@/data/content';

function AnimatedNumber({ to, decimals = 0, duration = 2.2 }) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const started  = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current)
          ref.current.textContent =
            decimals > 0 ? v.toFixed(decimals) : String(Math.floor(v));
      },
      onComplete: () => {
        if (ref.current)
          ref.current.textContent =
            decimals > 0 ? to.toFixed(decimals) : String(to);
      },
    });
    return () => controls.stop();
  }, [isInView, to, decimals, duration]);

  return <span ref={ref}>0</span>;
}

export default function Work() {
  const d          = stealstreet;
  const sectionRef = useRef(null);

  // Parallax on the image — content scrolls, image drifts slower
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section id="work" ref={sectionRef} className={s.root}>

      {/* ── Full bleed image — no padding, edge to edge ── */}
      <div className={s.imageFrame}>
        <motion.div className={s.imageInner} style={{ y: imageY }}>
          <Image
            src={d.images.hero}
            alt="StealStreet store"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            sizes="100vw"
          />
          {/* Dark gradient — bottom only, for the overlaid number */}
          <div className={s.imageGradient} />
        </motion.div>

        {/* The number — stenciled on the image */}
        <motion.div
          className={s.imageNumber}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={s.imageNumberValue}>
            <AnimatedNumber to={42.3} decimals={1} duration={2.4} />×
          </span>
          <span className={s.imageNumberLabel}>return on ad spend</span>
        </motion.div>
      </div>

      {/* ── Content — padded, below the image ── */}
      <div className={s.content}>

        {/* Title block */}
        <motion.div
          className={s.titleBlock}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={s.titleLeft}>
            <span className={s.titleEyebrow}>Work Experience</span>
            <h2 className={s.title}>StealStreet<span className={s.titleTld}>.in</span></h2>
            <p className={s.titleSub}>{d.category}</p>
          </div>
          <a
            href={d.live}
            target="_blank"
            rel="noopener noreferrer"
            className={s.visitLink}
            data-hover
          >
            Visit store
            <motion.span
              className={s.visitArrow}
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              ↗
            </motion.span>
          </a>
        </motion.div>

        {/* Supporting stats — not equal boxes, weighted by meaning */}
        <motion.div
          className={s.statsRow}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Big stat */}
          <div className={s.statBig}>
            <span className={s.statBigValue}>
              <AnimatedNumber to={106} duration={1.8} />
            </span>
            <span className={s.statBigLabel}>purchases</span>
            <span className={s.statBigSub}>in 6 days</span>
          </div>
          {/* Small stats */}
          <div className={s.statsSmall}>
            <div className={s.statSmall}>
              <span className={s.statSmallValue}>₹0.48</span>
              <span className={s.statSmallLabel}>cost per result</span>
            </div>
            <div className={s.statSmall}>
              <span className={s.statSmallValue}>&lt;24h</span>
              <span className={s.statSmallLabel}>zero to first sale</span>
            </div>
            <div className={s.statSmall}>
              <span className={s.statSmallValue}>₹2K</span>
              <span className={s.statSmallLabel}>total ad spend</span>
            </div>
          </div>
        </motion.div>

        {/* Body — two column */}
        <motion.div
          className={s.body}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className={s.bodyLeft}>
            {d.description.map((p, i) => (
              <p key={i} className={s.bodyPara}>{p}</p>
            ))}
            <blockquote className={s.quote}>
              <p className={s.quoteText}>"{d.testimonial.quote}"</p>
              <cite className={s.quoteBy}>— {d.testimonial.by}</cite>
            </blockquote>
          </div>

          <div className={s.bodyRight}>
            <p className={s.scopeLabel}>What was built</p>
            <ol className={s.scopeList}>
              {d.scope.map((item, i) => (
                <li key={i} className={s.scopeItem}>
                  <span className={s.scopeN}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={s.scopeT}>{item}</span>
                </li>
              ))}
            </ol>
            <div className={s.techRow}>
              {d.tech.map((t) => (
                <span key={t} className={s.tech}>{t}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* The horizontal rule that bleeds past the edge */}
        <div className={s.bleedRule} aria-hidden="true" />
      </div>

    </section>
  );
}