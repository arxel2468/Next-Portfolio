// src/components/sections/Footer.jsx
import s from './Footer.module.css';
import { about } from '@/data/content';

export default function Footer() {
  return (
    <footer className={s.root} role="contentinfo">

      <div className={s.left}>
        <span className={s.name}>Amit Pandit</span>
        <span className={s.byline}>
          Mumbai · {new Date().getFullYear()}
        </span>
        <span
          className={s.made}
          title="not a template. written from scratch."
        >
          made with obsession
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

    </footer>
  );
}