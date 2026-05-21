'use client';
import { useEffect, useRef, useState } from 'react';
import s from './Hero.module.css';
import { quotes } from '@/data/content';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
                'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

/* A random quote from the archive, changes on each load */
function useRandomQuote() {
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  return quote;
}

export default function Hero() {
  const clockRef  = useRef(null);
  const lineRefs  = useRef([]);
  const [egg, setEgg] = useState(false);
  const seq = useRef([]);
  const quote = useRandomQuote();

  /* Clock */
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

  /* Name reveal */
  useEffect(() => {
    lineRefs.current.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => {
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
      }, 180 + i * 130);
    });
  }, []);

  /* Konami */
  useEffect(() => {
    const fn = (e) => {
      seq.current = [...seq.current, e.key].slice(-KONAMI.length);
      if (seq.current.join() === KONAMI.join()) setEgg(true);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  return (
    <section id="hero" className={s.root}>

      {/* ── top bar: purely informational, like a newspaper header ── */}
      <header className={s.topBar}>
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
      </header>

      {/* ── the name — occupies most of the viewport ── */}
      <div className={s.nameWrap} aria-label="Amit Pandit">

        {/* "AMIT" — left edge, solid */}
        <div className={s.nameRow}>
          <div className={s.nameLineClip}>
            <span
              ref={el => lineRefs.current[0] = el}
              className={s.nameWord}
              style={{ transform: 'translateY(110%)', opacity: 0,
                transition: 'transform 1.1s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease' }}
            >
              AMIT
            </span>
          </div>

          {/*
            This small annotation floats mid-name, slightly out of place.
            It's a comment. Like margin notes in a manuscript.
            Only legible if you slow down.
          */}
          <span className={s.nameAnnotation} aria-hidden="true">
            builder /<br />writer /<br />both
          </span>
        </div>

        {/* "PANDIT" — indented, burgundy, italic — the one rule-break */}
        <div className={s.nameRow}>
          <div className={s.nameLineClip}>
            <span
              ref={el => lineRefs.current[1] = el}
              className={`${s.nameWord} ${s.nameWordAlt}`}
              style={{ transform: 'translateY(110%)', opacity: 0,
                transition: 'transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.12s, opacity 0.4s ease 0.12s' }}
            >
              PANDIT
            </span>
          </div>
        </div>

      </div>

      {/* ── the lower third ── */}
      <div className={s.lower}>

        {/* Left: tagline + identity markers */}
        <div className={s.lowerLeft}>
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
        </div>

        {/* Right: a quote from his own writing — random, regenerates each load */}
        <div className={s.lowerRight}>
          <span className={s.quoteLabel} aria-label="From the writing archive">
            — from the archive
          </span>
          <blockquote className={s.quoteBlock}>
            <p className={s.quoteText}>"{quote}"</p>
          </blockquote>
        </div>

      </div>

      {/* ── scroll cue ── */}
      <div className={s.scrollCue} aria-hidden="true">
        <span className={s.scrollWord}>scroll</span>
        <div className={s.scrollTrack}>
          <div className={s.scrollRunner} />
        </div>
      </div>

      {/*
        The watermark.
        ∞ at 2.4% opacity.
        Won't be seen on first look.
        Noticed around second 40.
      */}
      <span className={s.watermark} aria-hidden="true">∞</span>

      {/* ── Easter egg ── */}
      {egg && (
        <div
          className={s.egg}
          onClick={() => setEgg(false)}
          role="alertdialog"
          aria-modal="true"
          aria-label="You found the easter egg"
        >
          <div className={s.eggBox}>
            <p className={s.eggCode}>↑↑↓↓←→←→BA</p>
            <p className={s.eggMsg}>
              you found it.<br />
              <em>some things reward attention.</em>
            </p>
            <p className={s.eggClose}>click to close</p>
          </div>
        </div>
      )}

    </section>
  );
}