import { clsx } from 'clsx';

export function cn(...inputs) {
  return clsx(inputs);
}

export function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element && window.lenis) {
    window.lenis.scrollTo(element, {
      offset: -100,
      duration: 1.5,
    });
  }
}
