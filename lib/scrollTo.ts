function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function animateScrollTo(targetY: number, duration: number) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeOutCubic(progress));
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export function smoothScrollTo(targetId: string, offset = 120, duration = 700) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetY = target.getBoundingClientRect().top + window.scrollY - offset;
  animateScrollTo(targetY, duration);
}

export function smoothScrollToTop(duration = 700) {
  animateScrollTo(0, duration);
}
