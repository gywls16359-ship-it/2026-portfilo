/* Graphic — GSAP horizontal scrolling gallery (ScrollTrigger pin + scrub) */

let track;
let galleryTween;

function getSlider() {
  return track?.closest('.card-slider');
}

function getStepPx() {
  const style = getComputedStyle(document.documentElement);
  const cardW = parseFloat(style.getPropertyValue('--card-w')) || 310;
  const gap   = parseFloat(style.getPropertyValue('--card-gap')) || 50;
  return cardW + gap;
}

function getScrollDistance() {
  const slider = getSlider();
  if (!track || !slider) return 0;
  const padLeft = parseFloat(getComputedStyle(slider).paddingLeft) || 0;
  const viewW = slider.clientWidth - padLeft;
  return Math.max(0, track.scrollWidth - viewW);
}

function scrollGalleryBy(deltaSteps) {
  const st = galleryTween?.scrollTrigger;
  if (!st) return;

  const dist = getScrollDistance();
  if (dist <= 0) return;

  const range = st.end - st.start;
  const step  = getStepPx();
  const currentX = st.progress * dist;
  let nextX;

  if (deltaSteps > 0 && st.progress >= 0.99) {
    nextX = 0;
  } else if (deltaSteps < 0 && st.progress <= 0.01) {
    nextX = dist;
  } else {
    nextX = Math.max(0, Math.min(currentX + deltaSteps * step, dist));
  }

  gsap.to(window, {
    scrollTo: st.start + (nextX / dist) * range,
    duration: 0.6,
    ease: 'power2.inOut',
  });
}

function isGraphicActive() {
  const section = document.getElementById('graphic');
  if (!section) return false;
  const rect = section.getBoundingClientRect();
  return rect.top <= 10 && rect.bottom > window.innerHeight * 0.4;
}

export function initSlider() {
  track = document.getElementById('graphicTrack');
  const section = document.getElementById('graphic');
  const nextBtn = document.querySelector('.page--graphic .slider-btn--next');
  if (!track || !section) return;

  gsap.set(track, { x: 0 });

  galleryTween = gsap.to(track, {
    x: () => -getScrollDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${Math.max(getScrollDistance(), 1)}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onUpdate(self) {
        section.classList.toggle('is-scrolling-gallery', self.progress > 0 && self.progress < 1);
        if (nextBtn) {
          nextBtn.classList.toggle('slider-btn--at-left', self.progress > 0.9);
        }
      },
    },
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const st = galleryTween.scrollTrigger;
      if (!st) return;
      if (st.progress > 0.9) {
        gsap.to(window, { scrollTo: st.start, duration: 0.6, ease: 'power2.inOut' });
      } else {
        scrollGalleryBy(1);
      }
    });
  }

  document.addEventListener('keydown', e => {
    if (!isGraphicActive()) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollGalleryBy(1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollGalleryBy(-1); }
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready?.then(() => ScrollTrigger.refresh());
}
