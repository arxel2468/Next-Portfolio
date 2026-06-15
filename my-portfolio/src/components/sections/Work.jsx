'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
} from 'framer-motion';
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

  // Watermark drifts upward slower than scroll — creates depth
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);

  return (
    <section id="work" ref={sectionRef} className={s.root}>

      {/*
        The wordmark watermark — rendered at natural ratio so it never clips.
        Position: absolute, centered, enormous, low opacity.
        It's a stamp, not an image.
      */}
      <motion.div
        className={s.watermark}
        style={{ y: watermarkY }}
        aria-hidden="true"
      >
        <Image
          src={d.images.hero}
          alt=""
          width={1400}
          height={400}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
          }}
          priority
        />
      </motion.div>

      {/* ── All content sits above the watermark ── */}
      <div className={s.content}>

        {/* Section marker */}
        <motion.div
          className={s.marker}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={s.markerEyebrow}>Work Experience</span>
          <div className={s.markerTitle}>
            <h2 className={s.title}>StealStreet</h2>
            <a
              href={d.live}
              target="_blank"
              rel="noopener noreferrer"
              className={s.visitLink}
              data-hover
            >
              Visit store ↗
            </a>
          </div>
          <p className={s.markerSub}>{d.category}</p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className={s.tagline}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {d.tagline}
        </motion.p>

        {/* Stats — weighted by meaning, not equal boxes */}
        <motion.div
          className={s.statsRow}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className={s.statPrimary}>
            <span className={s.statPrimaryValue}>
              <AnimatedNumber to={42.3} decimals={1} duration={2.4} />×
            </span>
            <span className={s.statPrimaryLabel}>return on ad spend</span>
          </div>

          <div className={s.statSecondaryGroup}>
            {[
              { value: '106',   label: 'purchases',           sub: 'in 6 days'       },
              { value: '₹0.48', label: 'cost per result',     sub: 'Meta Ads'        },
              { value: '<24h',  label: 'zero to first sale',  sub: 'conception → ₹'  },
              { value: '₹2K',   label: 'total ad spend',      sub: '5 campaigns'     },
            ].map((st) => (
              <div key={st.label} className={s.statSecondary}>
                <span className={s.statSecondaryValue}>
                  {/^\d/.test(st.value) && st.value !== '₹0.48' && st.value !== '<24h' && st.value !== '₹2K' ? (
                    <AnimatedNumber to={parseInt(st.value)} duration={1.8} />
                  ) : (
                    st.value
                  )}
                </span>
                <span className={s.statSecondaryLabel}>{st.label}</span>
                <span className={s.statSecondarySub}>{st.sub}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Body */}
        <motion.div
          className={s.body}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
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

      </div>

    </section>
  );
}