'use client';
import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import s from './Opening.module.css';
import { quotes } from '@/data/content';

// Each quote has position, rotation, opacity, and a horizontal drift factor.
// Positive drift → moves right as you scroll. Negative → left.
// Depth is subtle — max ±3% of viewport width total travel.
const FIELD = [
  { text: quotes[0],  x: 8,  y: 9,  r: -1.5, o: 0.055, drift:  0.4  },
  { text: quotes[2],  x: 62, y: 13, r:  0.8,  o: 0.04,  drift: -0.3  },
  { text: quotes[4],  x: 14, y: 30, r: -0.5,  o: 0.06,  drift:  0.25 },
  { text: quotes[6],  x: 70, y: 34, r:  1.2,  o: 0.045, drift: -0.5  },
  { text: quotes[8],  x: 5,  y: 52, r: -1.0,  o: 0.05,  drift:  0.35 },
  { text: quotes[10], x: 58, y: 57, r:  0.6,  o: 0.04,  drift: -0.2  },
  { text: quotes[1],  x: 22, y: 72, r: -0.8,  o: 0.06,  drift:  0.45 },
  { text: quotes[3],  x: 74, y: 70, r:  1.0,  o: 0.05,  drift: -0.4  },
  { text: quotes[5],  x: 10, y: 86, r: -0.4,  o: 0.055, drift:  0.3  },
  { text: quotes[7],  x: 60, y: 84, r:  0.9,  o: 0.04,  drift: -0.35 },
];

const STATS = [
  { value: '42.3×', label: 'return on ad spend' },
  { value: '5',     label: 'products shipped'   },
  { value: '∞',     label: 'problems solved'    },
];

// Individual drifting quote — each reads its own scroll transform
function DriftQuote({ quote, index }) {
  const { scrollYProgress } = useScroll();

  // Each quote drifts horizontally by its unique factor
  // Range: scroll 0→1 produces drift × 6vw of horizontal travel
  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [`${quote.x}%`, `${quote.x + quote.drift * 6}%`]
  );

  // Spring smooths the drift so it doesn't feel mechanical
  const x = useSpring(rawX, { stiffness: 40, damping: 20 });

  return (
    <motion.span
      className={s.fieldQuote}
      style={{
        top:     `${quote.y}%`,
        x,
        rotate:   quote.r,
        opacity:  quote.o,
      }}
      aria-hidden="true"
    >
      {quote.text}
    </motion.span>
  );
}

export default function Opening() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.55], ['0%', '-5%']);

  // Field drifts upward subtly as you scroll — independent of quotes
  const fieldY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  return (
    <section id="opening" className={s.root} ref={sectionRef}>

      {/* ── Sparse quote field with horizontal drift ── */}
      <motion.div
        className={s.field}
        style={{ y: fieldY }}
        aria-hidden="true"
      >
        {FIELD.map((q, i) => (
          <DriftQuote key={i} quote={q} index={i} />
        ))}
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        className={s.content}
        style={{ opacity: contentOpacity, y: contentY }}
      >

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

        {/*
          The hook — typographic break here.
          "I see how things" is light weight.
          "fit together." drops to a heavier weight AND shifts right.
          Creates tension then resolution.
        */}
        <motion.h1
          className={s.hook}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
        >
          <span className={s.hookLight}>I see how things</span>
          <br />
          <span className={s.hookHeavy}>fit together.</span>
        </motion.h1>

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
                hidden:  { opacity: 0, x: -12 },
                visible: {
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

      {/* ── Falling dot scroll cue ── */}
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
            animate={{ y: ['0%', '1800%'] }}
            transition={{
              duration: 1.6,
              ease: [0.76, 0, 0.24, 1],
              repeat: Infinity,
              repeatDelay: 0.8,
            }}
          />
        </div>
      </motion.div>

    </section>
  );
}