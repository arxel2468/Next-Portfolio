'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import s from './StealStreet.module.css';
import { stealstreet } from '@/data/content';

function CountUp({ to, suffix = '', prefix = '', decimals = 0, duration = 1800 }) {
  const [val, setVal] = useState('0');
  const ref = useRef(null);
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const num = parseFloat(String(to).replace(/[^0-9.]/g, ''));
    if (isNaN(num)) { setVal(String(to)); return; }

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !ran.current) {
        ran.current = true;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1);
          const e = 1 - Math.pow(2, -10 * p);
          const cur = num * e;
          setVal(decimals > 0 ? cur.toFixed(decimals) : String(Math.floor(cur)));
          if (p < 1) requestAnimationFrame(tick);
          else setVal(decimals > 0 ? num.toFixed(decimals) : String(num));
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      }
    }, { threshold: 0.6 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration, decimals]);

  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

export default function StealStreet() {
  const d = stealstreet;
  const rootRef = useRef(null);

  useEffect(() => {
    const blocks = rootRef.current?.querySelectorAll(`.${s.revealBlock}`);
    if (!blocks) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Number(entry.target.getAttribute('data-delay') ?? 0);
            setTimeout(() => {
              entry.target.classList.add(s.revealed);
            }, delay);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    blocks.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="stealstreet"
      ref={rootRef}
      className={s.root}
      aria-label="StealStreet — featured work"
    >

      {/* ── Section marker ── */}
      <div className={`${s.marker} ${s.revealBlock}`} data-delay="0">
        <span className={s.markerTag}>Work Experience</span>
        <span className={s.markerRule} aria-hidden="true" />
        <span className={s.markerSub}>The one that proved the system</span>
      </div>

      {/* ── Hero image — completely plain & unshaded ── */}
      <div className={`${s.imageHeroPlain} ${s.revealBlock}`} data-delay="60">
        <Image
          src={d.images.hero}
          alt="StealStreet store"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          sizes="(max-width: 768px) 100vw, 90vw"
        />
      </div>

      {/* ── Info Header Block (Moved below the image) ── */}
      <div className={`${s.metaHeader} ${s.revealBlock}`} data-delay="80">
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
              StealStreet<span className={s.metaTLD}>.in</span>
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
          <span className={s.visitArrowWrap} aria-hidden="true');">
            <span className={s.visitLine} />
            <span className={s.visitHead} />
          </span>
        </a>
      </div>

      {/* ── Tagline ── */}
      <div className={`${s.taglineRow} ${s.revealBlock}`} data-delay="100">
        <p className={s.tagline}>{d.tagline}</p>
      </div>

      {/* ── Stats bar ── */}
      <div className={`${s.statsBar} ${s.revealBlock}`} data-delay="140">
        {d.stats.map((stat, i) => (
          <div key={i} className={s.stat}>
            <span className={s.statValue}>
              {stat.value === '<24h' ? (
                '<24h'
              ) : (
                <CountUp
                  to={stat.value}
                  suffix={stat.unit}
                  decimals={String(stat.value).includes('.') ? 1 : 0}
                  duration={1600 + i * 180}
                />
              )}
            </span>
            <span className={s.statLabel}>{stat.label}</span>
            <span className={s.statSub}>{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* ── Body ── */}
      <div className={s.body}>
        <div className={`${s.bodyLeft} ${s.revealBlock}`} data-delay="180">
          {d.description.map((p, i) => (
            <p key={i} className={s.bodyPara}>{p}</p>
          ))}

          <div className={s.resultBand}>
            <span className={s.resultBandMark} aria-hidden="true">→</span>
            <p className={s.resultText}>{d.result}</p>
          </div>

          <blockquote className={s.quote}>
            <p className={s.quoteText}>"{d.testimonial.quote}"</p>
            <cite className={s.quoteBy}>— {d.testimonial.by}</cite>
          </blockquote>
        </div>

        <div className={`${s.bodyRight} ${s.revealBlock}`} data-delay="220">
          <p className={s.scopeHeading}>What was built</p>
          <ol className={s.scopeList}>
            {d.scope.map((item, i) => (
              <li key={i} className={s.scopeItem}>
                <span className={s.scopeN}>{String(i + 1).padStart(2, '0')}</span>
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
      </div>

      <div className={s.bleed} aria-hidden="true" />

    </section>
  );
}
