// src/components/sections/Hero.jsx
'use client';
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  animate,
} from 'framer-motion';
import s from './Hero.module.css';
import MagneticButton from '@/components/ui/MagneticButton';
import { quotes } from '@/data/content';

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a',
];

// Variants for the name lines — clip reveal upward
const nameVariants = {
  hidden: { y: '110%' },
  visible: (delay) => ({
    y: '0%',
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

// Variants for the lower third content
const lowerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.6 },
  },
};

const lowerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Infinite vertical ticker for the quote panel
function QuoteTicker({ quotes: qs }) {
  // Duplicate array for seamless loop
  const doubled = [...qs, ...qs];
  return (
    <div className={s.ticker}>
      <motion.div
        animate={{ y: ['0%', '-50%'] }}
        transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
        aria-hidden="true"
      >
        {doubled.map((q, i) => (
          <p key={i} className={s.tickerLine}>
            {q}
          </p>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const clockRef   = useRef(null);
  const seqRef     = useRef([]);
  const [egg, setEgg] = useState(false);

  // Scroll-linked parallax — only transforms, no layout properties
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const rawAmitY   = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const rawPanditY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Spring-smoothed parallax — removes scroll jitter
  const amitY   = useSpring(rawAmitY,   { stiffness: 60, damping: 20 });
  const panditY = useSpring(rawPanditY, { stiffness: 60, damping: 20 });

  // Live IST clock
  useEffect(() => {
    const tick = () => {
      if (!clockRef.current) return;
      clockRef.current.textContent = new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Konami code easter egg
  useEffect(() => {
    const fn = (e) => {
      seqRef.current = [...seqRef.current, e.key].slice(-KONAMI.length);
      if (seqRef.current.join() === KONAMI.join()) setEgg(true);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  return (
    <motion.section
      id="hero"
      ref={sectionRef}
      className={s.root}
      style={{ opacity: heroOpacity }}
    >
      {/* ── Top bar ── */}
      <motion.header
        className={s.topBar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className={s.topLeft}>
          <span className={s.topPulse} aria-hidden="true" />
          <span className={s.topText}>Amit Pandit — Portfolio</span>
        </div>
        <time
          ref={clockRef}
          className={s.clock}
          aria-label="Live time in Mumbai"
          dateTime={new Date().toISOString()}
        />
        <span className={s.topRight}>Mumbai · AI-first</span>
      </motion.header>

      {/* ── Name + Ticker ── */}
      <div className={s.nameSection}>

        {/* Left: the name with parallax depth */}
        <div className={s.nameWrap} aria-label="Amit Pandit">

          {/* AMIT — faster parallax (appears farther back) */}
          <motion.div className={s.nameRow} style={{ y: amitY }}>
            <div className={s.nameLineClip}>
              <motion.span
                className={s.nameWord}
                variants={nameVariants}
                custom={0.18}
                initial="hidden"
                animate="visible"
              >
                AMIT
              </motion.span>
            </div>
            <span className={s.nameAnnotation} aria-hidden="true">
              builder /<br />writer /<br />both
            </span>
          </motion.div>

          {/* PANDIT — slower parallax (appears closer) */}
          <motion.div className={s.nameRow} style={{ y: panditY }}>
            <div className={s.nameLineClip}>
              <motion.span
                className={`${s.nameWord} ${s.nameWordAlt}`}
                variants={nameVariants}
                custom={0.30}
                initial="hidden"
                animate="visible"
              >
                PANDIT
              </motion.span>
            </div>
          </motion.div>

        </div>

        {/* Right: infinite quote ticker */}
        <div className={s.tickerWrap} aria-label="Writing archive excerpts">
          <span className={s.tickerLabel}>— from the archive</span>
          <QuoteTicker quotes={quotes} />
        </div>

      </div>

      {/* ── Lower third ── */}
      <motion.div
        className={s.lower}
        variants={lowerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={s.lowerLeft} variants={lowerItem}>
          <p className={s.tagline}>
            I build things.
            <br />
            <em>I write about what it means.</em>
          </p>
          <div className={s.chips}>
            <span className={s.chip} data-active="true">Builder</span>
            <span className={s.chipDot} aria-hidden="true" />
            <span className={s.chip}>Writer</span>
            <span className={s.chipDot} aria-hidden="true" />
            <span className={s.chip} data-muted="true">AI-first</span>
          </div>
        </motion.div>

        {/* Proof points — the above-fold conversion layer */}
        <motion.div className={s.lowerRight} variants={lowerItem}>
          <ul className={s.stats} aria-label="Key achievements">
            {[
              { value: '46.4×', label: 'peak ROAS, 6 days' },
              { value: '5',     label: 'AI products shipped' },
              { value: '∞',     label: 'essays written' },
            ].map((st) => (
              <li key={st.label} className={s.stat}>
                <span className={s.statValue}>{st.value}</span>
                <span className={s.statLabel}>{st.label}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        className={s.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-hidden="true"
      >
        <MagneticButton as="div" className={s.scrollInner} strength={0.2}>
          <span className={s.scrollWord}>scroll</span>
          <div className={s.scrollTrack}>
            <div className={s.scrollRunner} />
          </div>
        </MagneticButton>
      </motion.div>

      {/* ── Background watermark ── */}
      <span className={s.watermark} aria-hidden="true">∞</span>

      {/* ── Easter egg ── */}
      {egg && (
        <motion.div
          className={s.egg}
          onClick={() => setEgg(false)}
          role="alertdialog"
          aria-modal="true"
          aria-label="Easter egg"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={s.eggBox}>
            <p className={s.eggCode}>↑↑↓↓←→←→BA</p>
            <p className={s.eggMsg}>
              you found it.<br />
              <em>some things reward attention.</em>
            </p>
            <p className={s.eggClose}>click to close</p>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}