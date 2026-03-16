export function scrollTo(id) {
  const el = document.getElementById(id);
  if (el && window.lenis) window.lenis.scrollTo(el, { offset: -80, duration: 1.2 });
  else if (el) el.scrollIntoView({ behavior: 'smooth' });
}
