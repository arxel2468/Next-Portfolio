// src/components/sections/Opening.jsx
'use client';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import s from './Opening.module.css';
import { quotes } from '@/data/content';

// 10 quotes, scattered manually across the field
// Each has a fixed position (vw/vh) and a rotation
const SPARSE_QUOTES = quotes.slice(0, 10).map((q, i) => ({
  text: q,
  // Distribute across the viewport avoiding dead center
  x: [8, 62, 14, 70, 5, 55, 22, 75, 10, 60][i],
  y: [8, 12, 28, 32, 50, 55, 70, 68, 85, 82][i],
  rotate: [-1.5, 0.8, -0.5, 1.2, -1, 0.6, -0.8, 1, -0.4, 0.9][i],
  opacity: [0.055, 0.04, 0.06, 0.045, 0.05, 0.04, 0.06, 0.05, 0.055, 0.04][i],
}));

// The three above-fold stats
const STATS = [
  { value: '42.3×', label: 'return on ad spend' },
  { value: '5',     label: 'products shipped'    },
  { value: '∞',     label: 'problems figured out' },
];

export default function Opening() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // The sparse quote field drifts upward as you scroll — slowly
  const fieldY  = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  // The main content fades as you scroll away
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.6], ['0%', '-6%']);

  return (
    <section id="opening" className={s.root} ref={sectionRef}>

      {/* ── Sparse quote field — fixed backdrop ── */}
      <motion.div className={s.field} style={{ y: fieldY }} aria-hidden="true">
        {SPARSE_QUOTES.map((q, i) => (
          <span
            key={i}
            className={s.fieldQuote}
            style={{
              left:     `${q.x}%`,
              top:      `${q.y}%`,
              rotate:   `${q.rotate}deg`,
              opacity:   q.opacity,
            }}
          >
            {q.text}
          </span>
        ))}
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        className={s.content}
        style={{ opacity: contentOpacity, y: contentY }}
      >

        {/* Identity — quiet, not loud */}
        <div className={s.identity}>
          <motion.p
            className={s.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Amit Pandit
          </motion.p>
          <motion.p
            className={s.location}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Builder · Mumbai
          </motion.p>
        </div>

        {/* The hook — the one line that does all the work */}
        <motion.h1
          className={s.hook}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
        >
          I see how things
          <br />
          <em>fit together.</em>
        </motion.h1>

        {/* Stats — proof before anyone asks */}
        <motion.ul
          className={s.stats}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 1.1 },
            },
          }}
          aria-label="Key numbers"
        >
          {STATS.map((st) => (
            <motion.li
              key={st.label}
              className={s.stat}
              variants={{
                hidden:   { opacity: 0, x: -12 },
                visible:  {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              <span className={s.statValue}>{st.value}</span>
              <span className={s.statLabel}>{st.label}</span>
            </motion.li>
          ))}
        </motion.ul>

      </motion.div>

      {/* ── Scroll cue — a falling dot ── */}
      <motion.div
        className={s.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        aria-hidden="true"
      >
        <div className={s.scrollLine}>
          <motion.div
            className={s.scrollDot}
            animate={{ y: ['0%', '300%'] }}
            transition={{
              duration: 1.8,
              ease: [0.76, 0, 0.24, 1],
              repeat: Infinity,
              repeatDelay: 0.6,
            }}
          />
        </div>
      </motion.div>

    </section>
  );
}