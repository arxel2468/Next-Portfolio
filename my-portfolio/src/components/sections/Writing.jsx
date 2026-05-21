'use client';
import { useEffect, useRef } from 'react';
import s from './Writing.module.css';

function fmt(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  } catch { return ''; }
}

function FeaturedPost({ post }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add(s.postIn); obs.unobserve(el); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <a ref={ref} href={post.url} target="_blank" rel="noopener noreferrer"
       className={`${s.featured} ${s.postBase}`} aria-label={`Read: ${post.title}`}>
      <div className={s.featuredTag}>
        {post.pinned ? 'Pinned · Welcome' : 'Latest'}
        <span className={s.featuredDate}>{fmt(post.date)}</span>
      </div>
      <h3 className={s.featuredTitle}>{post.title}</h3>
      {post.subtitle && <p className={s.featuredSub}>{post.subtitle}</p>}
      {post.excerpt && (
        <p className={s.featuredExcerpt}>{post.excerpt}<span className={s.ellipsis}>…</span></p>
      )}
      <span className={s.readLink}>
        Read essay
        <span className={s.readArr} aria-hidden="true">
          <span /><span />
        </span>
      </span>
    </a>
  );
}

function PostRow({ post, i }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add(s.postIn), i * 60);
        obs.unobserve(el);
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [i]);

  return (
    <a ref={ref} href={post.url} target="_blank" rel="noopener noreferrer"
       className={`${s.row} ${s.postBase}`} aria-label={`Read: ${post.title}`}>
      <span className={s.rowNum}>{String(i + 1).padStart(2, '0')}</span>
      <div className={s.rowContent}>
        <span className={s.rowTitle}>{post.title}</span>
        {post.subtitle && <span className={s.rowSub}>{post.subtitle}</span>}
      </div>
      <span className={s.rowDate}>{fmt(post.date)}</span>
    </a>
  );
}

export default function Writing({ posts = [] }) {
  const pinIdx  = posts.findIndex(p => p.pinned);
  const featIdx = pinIdx >= 0 ? pinIdx : 0;
  const featured = posts[featIdx] ?? null;
  const rest     = posts.filter((_, i) => i !== featIdx).slice(0, 5);

  return (
    <section id="writing" className={s.root} aria-label="Writing — Infinity Within">

      {/* Dark inversion */}
      <div className={s.inner}>

        {/* ── Header ── */}
        <div className={s.header}>
          <div className={s.headerMeta}>
            <span className={s.headerIdx}>02</span>
            <span className={s.headerRule} aria-hidden="true" />
            <span className={s.headerLabel}>Infinity Within — Substack</span>
          </div>

          <div className={s.pubRow}>
            <div className={s.pubLeft}>
              <h2 className={s.pubName}>
                <em>Infinity</em>
                <br />Within
              </h2>
            </div>
            <div className={s.pubRight}>
              <p className={s.pubDesc}>
                Essays that don't resolve neatly.
                Philosophy, introspection, and the interior life
                of someone who also ships software.
                <br /><br />
                Published on Substack. Written at odd hours.
              </p>
              <a href="https://amitpandit.substack.com" target="_blank"
                 rel="noopener noreferrer" className={s.pubLink}
                 aria-label="All essays on Substack">
                All essays
                <span className={s.pubLinkLine} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className={s.divider} aria-hidden="true" />

        {posts.length === 0 ? (
          <p className={s.empty}>
            Essays live at{' '}
            <a href="https://amitpandit.substack.com" target="_blank" rel="noopener noreferrer">
              amitpandit.substack.com
            </a>
          </p>
        ) : (
          <div className={s.content}>
            {featured && <FeaturedPost post={featured} />}
            {rest.length > 0 && (
              <div className={s.rowList}>
                {rest.map((p, i) => <PostRow key={p.id} post={p} i={i} />)}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Enormous barely-visible background text */}
      <span className={s.bgWord} aria-hidden="true">Write</span>

    </section>
  );
}