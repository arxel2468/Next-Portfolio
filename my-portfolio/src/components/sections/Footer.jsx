// src/components/sections/Footer.jsx
import { motion } from 'framer-motion';
import s from './Footer.module.css';
import { about } from '@/data/content';

export default function Footer() {
  return (
    <footer className={s.root} role="contentinfo">

      <div className={s.epigraph}>
        <span className={s.epigraphMark} aria-hidden="true">"</span>
        <p className={s.epigraphText}>
          After destruction, there is only one thing to do:<br />
          to create myself anew.
        </p>
        <span className={s.epigraphAttr}>— Amit Pandit, Infinity Within</span>
      </div>

      <div className={s.bottom}>
        <div className={s.bottomLeft}>
          <span className={s.name}>Amit Pandit</span>
          <span className={s.byline}>
            Mumbai · Builder · Writer · {new Date().getFullYear()}
          </span>
        </div>

        <nav className={s.links} aria-label="Social links">
          {about.socials.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div className={s.foot}>
        <span
          className={s.made}
          title="not a template. not a theme. written from scratch."
        >
          made with obsession
        </span>
        <span className={s.inf} aria-hidden="true">∞</span>
      </div>

    </footer>
  );
}