// src/components/sections/Writing.jsx
'use client';
import { motion } from 'framer-motion';
import s from './Writing.module.css';
import { RevealSection, RevealItem } from '@/components/ui/RevealSection';

function fmt(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  } catch { return ''; }
}

function FeaturedPost({ post }) {
  return (
    <RevealItem>
      <motion.a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className={s.featured}
        aria-label={`Read: ${post.title}`}
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        <div className={s.featuredTag}>
          {post.pinned ? 'Pinned · Welcome' : 'Latest'}
          <span className={s.featuredDate}>{fmt(post.date)}</span>
        </div>

        <motion.h3
          className={s.featuredTitle}
          variants={{
            rest:  { color: '#F0EBE3' },
            hover: { color: 'var(--color-accent)', transition: { duration: 0.3 } },
          }}
        >
          {post.title}
        </motion.h3>

        {post.subtitle && (
          <p className={s.featuredSub}>{post.subtitle}</p>
        )}

        {post.excerpt && (
          <p className={s.featuredExcerpt}>
            {post.excerpt}
            <span className={s.ellipsis}>…</span>
          </p>
        )}

        <motion.span
          className={s.readLink}
          variants={{
            rest:  { gap: '12px' },
            hover: { gap: '22px', transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          Read essay
          <span className={s.readArr} aria-hidden="true">
            <span /><span />
          </span>
        </motion.span>
      </motion.a>
    </RevealItem>
  );
}

function PostRow({ post, i }) {
  return (
    <RevealItem>
      <motion.a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className={s.row}
        aria-label={`Read: ${post.title}`}
        whileHover={{ backgroundColor: 'rgba(240,235,227,0.03)' }}
        transition={{ duration: 0.2 }}
      >
        <span className={s.rowNum}>{String(i + 1).padStart(2, '0')}</span>
        <div className={s.rowContent}>
          <motion.span
            className={s.rowTitle}
            whileHover={{ color: 'var(--color-accent)' }}
            transition={{ duration: 0.25 }}
          >
            {post.title}
          </motion.span>
          {post.subtitle && (
            <span className={s.rowSub}>{post.subtitle}</span>
          )}
        </div>
        <span className={s.rowDate}>{fmt(post.date)}</span>
      </motion.a>
    </RevealItem>
  );
}

export default function Writing({ posts = [] }) {
  const pinIdx   = posts.findIndex((p) => p.pinned);
  const featIdx  = pinIdx >= 0 ? pinIdx : 0;
  const featured = posts[featIdx] ?? null;
  const rest     = posts.filter((_, i) => i !== featIdx).slice(0, 5);

  return (
    <section
      id="writing"
      className={s.root}
      aria-label="Writing — Infinity Within"
    >
      <div className={s.inner}>

        {/* ── Header ── */}
        <RevealSection>
          <div className={s.header}>
            <RevealItem>
              <div className={s.headerMeta}>
                <span className={s.headerIdx}>02</span>
                <span className={s.headerRule} aria-hidden="true" />
                <span className={s.headerLabel}>
                  Infinity Within — Substack
                </span>
              </div>
            </RevealItem>

            <RevealItem>
              <div className={s.pubRow}>
                <div className={s.pubLeft}>
                  <h2 className={s.pubName}>
                    <em>Infinity</em>
                    <br />Within
                  </h2>
                </div>
                <div className={s.pubRight}>
                  <p className={s.pubDesc}>
                    Essays that don't resolve neatly. Philosophy,
                    introspection, and the interior life of someone
                    who also ships software.
                    <br /><br />
                    Published on Substack. Written at odd hours.
                  </p>
                  <motion.a
                    href="https://amitpandit.substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.pubLink}
                    aria-label="All essays on Substack"
                    whileHover={{ gap: '22px' }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    All essays
                    <motion.span
                      className={s.pubLinkLine}
                      whileHover={{ width: '40px' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </div>
              </div>
            </RevealItem>
          </div>
        </RevealSection>

        <div className={s.divider} aria-hidden="true" />

        {posts.length === 0 ? (
          <p className={s.empty}>
            Essays live at{' '}
            <a
              href="https://amitpandit.substack.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              amitpandit.substack.com
            </a>
          </p>
        ) : (
          <RevealSection>
            <div className={s.content}>
              {featured && <FeaturedPost post={featured} />}
              {rest.length > 0 && (
                <div className={s.rowList}>
                  {rest.map((p, i) => (
                    <PostRow key={p.id} post={p} i={i} />
                  ))}
                </div>
              )}
            </div>
          </RevealSection>
        )}

      </div>

      <span className={s.bgWord} aria-hidden="true">Write</span>
    </section>
  );
}