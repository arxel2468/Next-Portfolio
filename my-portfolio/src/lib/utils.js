export function scrollTo(id) {
  const el = document.getElementById(id);
  if (el && window.lenis) window.lenis.scrollTo(el, { offset: 0, duration: 1.8 });
}
