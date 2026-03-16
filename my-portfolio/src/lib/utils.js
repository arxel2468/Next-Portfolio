import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function scrollTo(id) {
  const el = document.getElementById(id);
  if (el && window.lenis) {
    window.lenis.scrollTo(el, { offset: -60, duration: 1.4 });
  } else if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
