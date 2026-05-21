export async function getSubstackPosts(subdomain, limit = 7) {
  try {
    const res = await fetch(
      `https://${subdomain}.substack.com/api/v1/posts?limit=${limit}`,
      {
        next: { revalidate: 3600 },
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; portfolio/1.0)' },
      }
    );
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    return data.map(p => ({
      id:       p.id,
      title:    p.title || '',
      subtitle: p.subtitle || '',
      excerpt:  stripHtml(p.body_html || p.description || '').slice(0, 220),
      slug:     p.slug,
      url:      p.canonical_url || `https://${subdomain}.substack.com/p/${p.slug}`,
      date:     p.post_date,
      pinned:   !!p.pinnedPost,
    }));
  } catch (e) {
    console.error('Substack error:', e.message);
    return [];
  }
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}