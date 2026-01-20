/**
 * Smooth scroll to a target position with easing
 * @param {number} targetY - Target scroll position
 * @param {number} duration - Animation duration in ms
 */
export function smoothScrollTo(targetY, duration = 800) {
  const startY = window.pageYOffset;
  const difference = targetY - startY;
  const startTime = performance.now();

  // Easing function: easeInOutCubic
  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + difference * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

/**
 * Scroll to an element by ID with header offset
 * @param {string} elementId - Target element ID
 * @param {number} offset - Offset from top (default: 100px for header)
 */
export function scrollToElement(elementId, offset = 100) {
  const element = document.getElementById(elementId);

  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    smoothScrollTo(offsetPosition, 800);
  }
}
