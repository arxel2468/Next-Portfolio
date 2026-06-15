// src/components/sections/StealStreet.jsx
'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, animate, useScroll, useTransform } from 'framer-motion';
import s from './StealStreet.module.css';
import { RevealSection, RevealItem } from '@/components/ui/RevealSection';
import { stealstreet } from '@/data/content';

// Framer-native counter — replaces the custom RAF CountUp
function StatNumber({ to, suffix = '', prefix = '', decimals = 0, duration = 2 }) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const started  = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    const raw = parseFloat(String(to).replace(/[^0-9.]/g, ''));
    if (isNaN(raw)) {
      if (ref.current) ref.current.textContent = `${prefix}${to}${suffix}`;
      return;
    }

    const controls = animate(0, raw, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent =
            `${prefix}${decimals > 0 ? v.toFixed(decimals) : Math.floor(v)}${suffix}`;
        }
      },
      onComplete: () => {
        if (ref.current) {
          ref.current.textContent =
            `${prefix}${decimals > 0 ? raw.toFixed(decimals) : raw}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [isInView, to, suffix, prefix, decimals, duration]);

  return (
    <span ref={ref} aria-label={`${prefix}${to}${suffix}`}>
      {prefix}0{suffix}
    </span>
  );
}

// The hero stat — 46.4× rendered as typographic sculpture
function HeroStat({ value, label }) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const started  = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    const controls = animate(0, 46.4, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${v.toFixed(1)}×`;
      },
      onComplete: () => {
        if (ref.current) ref.current.textContent = '46.4×';
      },
    });

    return () => controls.stop();
  }, [isInView]);

  return (
    <div className={s.heroStatWrap}>
      <motion.span
        ref={ref}
        className={s.heroStatValue}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        aria-label="46.4 times return on ad spend"
      >
        0×
      </motion.span>
      <motion.span
        className={s.heroStatLabel}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {label}
      </motion.span>
    </div>
  );
}

export default function StealStreet() {
  const d          = stealstreet;
  const sectionRef = useRef(null);

  // Subtle parallax on the hero image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      id="stealstreet"
      ref={sectionRef}
      className={s.root}
      aria-label="StealStreet — featured work"
    >

      {/* ── Section marker ── */}
      <RevealSection>
        <RevealItem>
          <div className={s.marker}>
            <span className={s.markerTag}>Work Experience</span>
            <span className={s.markerRule} aria-hidden="true" />
            <span className={s.markerSub}>The one that proved the system</span>
          </div>
        </RevealItem>
      </RevealSection>

      {/* ── Hero image with parallax ── */}
      <RevealSection>
        <RevealItem>
          <div className={s.imageWrap}>
            <motion.div className={s.imageInner} style={{ y: imageY }}>
              <Image
                src={d.images.hero}
                alt="StealStreet store"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
                sizes="(max-width: 768px) 100vw, 90vw"
              />
            </motion.div>
          </div>
        </RevealItem>
      </RevealSection>

      {/* ── Meta header ── */}
      <RevealSection>
        <RevealItem>
          <div className={s.metaHeader}>
            <div className={s.metaLeft}>
              <div className={s.metaLogo}>
                <Image
                  src={d.images.logo}
                  alt="StealStreet logo"
                  width={48}
                  height={48}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className={s.metaText}>
                <h2 className={s.metaTitle}>
                  StealStreet
                  <span className={s.metaTLD}>.in</span>
                </h2>
                <p className={s.metaCategory}>{d.category}</p>
              </div>
            </div>
            <a
              href={d.live}
              target="_blank"
              rel="noopener noreferrer"
              className={s.metaVisit}
              aria-label="Visit StealStreet.in"
            >
              <span>Visit store</span>
              <span className={s.visitArrow} aria-hidden="true">
                <span className={s.visitLine} />
                <span className={s.visitHead} />
              </span>
            </a>
          </div>
        </RevealItem>
      </RevealSection>

      {/* ── THE HERO STAT — 46.4× as typographic sculpture ── */}
      <RevealSection>
        <RevealItem>
          <div className={s.heroStatSection}>
            <HeroStat value="46.4×" label="return on ad spend" />
            <div className={s.heroStatRule} aria-hidden="true" />
            <p className={s.heroStatContext}>
              106 purchases &nbsp;·&nbsp; 6 days &nbsp;·&nbsp; ₹0.48 cost per result
            </p>
          </div>
        </RevealItem>
      </RevealSection>

      {/* ── Tagline ── */}
      <RevealSection>
        <RevealItem>
          <div className={s.taglineRow}>
            <p className={s.tagline}>{d.tagline}</p>
          </div>
        </RevealItem>
      </RevealSection>

      {/* ── Supporting stats bar ── */}
      <RevealSection>
        <div className={s.statsBar}>
          {d.stats.map((stat, i) => (
            <RevealItem key={i}>
              <div className={s.stat}>
                <span className={s.statValue}>
                  {stat.value === '<24h' ? (
                    '<24h'
                  ) : (
                    <StatNumber
                      to={stat.value}
                      suffix={stat.unit}
                      decimals={String(stat.value).includes('.') ? 1 : 0}
                      duration={1.6 + i * 0.18}
                    />
                  )}
                </span>
                <span className={s.statLabel}>{stat.label}</span>
                <span className={s.statSub}>{stat.sub}</span>
              </div>
            </RevealItem>
          ))}
        </div>
      </RevealSection>

      {/* ── Body: description + scope ── */}
      <div className={s.body}>
        <RevealSection>
          <RevealItem>
            <div className={s.bodyLeft}>
              {d.description.map((p, i) => (
                <p key={i} className={s.bodyPara}>{p}</p>
              ))}

              <div className={s.resultBand}>
                <span className={s.resultMark} aria-hidden="true">→</span>
                <p className={s.resultText}>{d.result}</p>
              </div>

              <blockquote className={s.quote}>
                <p className={s.quoteText}>"{d.testimonial.quote}"</p>
                <cite className={s.quoteBy}>— {d.testimonial.by}</cite>
              </blockquote>
            </div>
          </RevealItem>
        </RevealSection>

        <RevealSection>
          <RevealItem>
            <div className={s.bodyRight}>
              <p className={s.scopeHeading}>What was built</p>
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
          </RevealItem>
        </RevealSection>
      </div>

      <div className={s.bleed} aria-hidden="true" />

    </section>
  );
}