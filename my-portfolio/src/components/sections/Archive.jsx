// src/components/sections/Archive.jsx
'use client';
import { motion } from 'framer-motion';
import s from './Archive.module.css';

function fmt(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  } catch { return ''; }
}

export default function Archive({ posts = [] }) {
  const pinIdx   = posts.findIndex((p) => p.pinned);
  const featIdx  = pinIdx >= 0 ? pinIdx : 0;
  const featured = posts[featIdx] ?? null;
  const rest     = posts.filter((_, i) => i !== featIdx).slice(0, 5);

  return (
    <section id="archive" className={s.root} aria-label="Writing">

      <motion.div
        className={s.header}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className={s.heading}>Things I've thought about.</h2>
        <a
          href="https://amitpandit.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className={s.allLink}
          data-hover
        >
          All essays ↗
        </a>
      </motion.div>

      {posts.length === 0 ? (
        <p className={s.empty}>
          Essays at{' '}
          <a
            href="https://amitpandit.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            data-hover
          >
            amitpandit.substack.com
          </a>
        </p>
      ) : (
        <div className={s.content}>

          {/* Featured — one extra line of breathing room, no badge */}
          {featured && (
            <motion.a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              className={s.featured}
              aria-label={`Read: ${featured.title}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7 }}
              whileHover={{ x: 4 }}
              data-hover
            >
              <span className={s.featuredDate}>{fmt(featured.date)}</span>
              <span className={s.featuredTitle}>{featured.title}</span>
              {featured.subtitle && (
                <span className={s.featuredSub}>{featured.subtitle}</span>
              )}
            </motion.a>
          )}

          {/* Rest — marginalia style */}
          <div className={s.list}>
            {rest.map((post, i) => (
              <motion.a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={s.item}
                aria-label={`Read: ${post.title}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ x: 4 }}
                data-hover
              >
                <span className={s.itemDate}>{fmt(post.date)}</span>
                <span className={s.itemTitle}>{post.title}</span>
              </motion.a>
            ))}
          </div>

        </div>
      )}

    </section>
  );
}