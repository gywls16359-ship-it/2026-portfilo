/* Graphic card slider — wheel / arrow / touch */

import { fetchData } from './data.js';

let currentIndex = 0;
let total = 0;
let track;
let nextBtn;

function getStepPx() {
  const style = getComputedStyle(document.documentElement);
  const cardW = parseFloat(style.getPropertyValue('--card-w')) || 310;
  const gap   = parseFloat(style.getPropertyValue('--card-gap')) || 50;
  return cardW + gap;
}

function getMaxOffset() {
  const container = track && track.closest('.card-slider');
  if (!container) return 0;
  const padLeft = parseFloat(getComputedStyle(container).paddingLeft) || 118;
  const style = getComputedStyle(document.documentElement);
  const cardW = parseFloat(style.getPropertyValue('--card-w')) || 310;
  const gap   = parseFloat(style.getPropertyValue('--card-gap')) || 50;
  const lastCardRight = padLeft + total * (cardW + gap) - gap;
  return Math.max(0, lastCardRight - container.offsetWidth);
}

/*
 * Math.floor: 마지막 위치에서 마지막 카드가 부분적으로 보임
 * → 블랭크 없이 "더 있다"는 힌트를 주면서 버튼이 왼쪽으로 이동
 */
function getMaxIndex() {
  const maxPx = getMaxOffset();
  const step  = getStepPx();
  return Math.min(total - 1, maxPx > 0 ? Math.floor(maxPx / step) : 0);
}

function updateBtn() {
  if (!nextBtn) return;
  const atMax = currentIndex >= getMaxIndex();
  nextBtn.classList.toggle('slider-btn--at-left', atMax);
}

function goTo(idx, animate = true) {
  if (!track) return;
  const maxIdx = getMaxIndex();
  currentIndex = Math.max(0, Math.min(idx, maxIdx));
  const offset = Math.min(currentIndex * getStepPx(), getMaxOffset());
  gsap.to(track, {
    x: -offset,
    duration: animate ? 0.55 : 0,
    ease: 'power2.inOut',
  });
  updateBtn();
}

export async function initSlider() {
  track   = document.getElementById('graphicTrack');
  nextBtn = document.querySelector('.slider-btn--next');
  if (!track) return;

  const items = await fetchData('graphic');
  total = items.length;

  items.forEach(({ title, img }) => {
    const card = document.createElement('div');
    card.className = 'card-item';
    card.innerHTML = `
      <div class="card-item__image">
        <img src="${img}" alt="${title}" loading="lazy" onerror="this.style.display='none'">
      </div>
      <span class="card-item__label">${title}</span>
    `;
    track.appendChild(card);
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const maxIdx = getMaxIndex();
      goTo(currentIndex >= maxIdx ? 0 : currentIndex + 1);
    });
  }

  document.addEventListener('keydown', e => {
    const graphic = document.getElementById('graphic');
    if (!graphic || !isVisible(graphic)) return;
    const maxIdx = getMaxIndex();
    if (e.key === 'ArrowRight') goTo(currentIndex >= maxIdx ? 0 : currentIndex + 1);
    if (e.key === 'ArrowLeft')  goTo(currentIndex <= 0 ? maxIdx : currentIndex - 1);
  });

  /* 터치 스와이프 */
  let touchStartX = 0;
  let touchDelta  = 0;

  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchDelta  = 0;
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    touchDelta = e.touches[0].clientX - touchStartX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    const THRESHOLD = 60;
    const maxIdx = getMaxIndex();
    if (touchDelta < -THRESHOLD && currentIndex < maxIdx) goTo(currentIndex + 1);
    else if (touchDelta > THRESHOLD && currentIndex > 0)  goTo(currentIndex - 1);
    else goTo(currentIndex);
  });

  /* 휠 스크롤 */
  const section = document.getElementById('graphic');
  if (section) {
    section.addEventListener('wheel', e => {
      if (!isVisible(section)) return;
      const maxIdx = getMaxIndex();
      if (e.deltaY > 30 && currentIndex < maxIdx) { e.preventDefault(); goTo(currentIndex + 1); }
      else if (e.deltaY < -30 && currentIndex > 0) { e.preventDefault(); goTo(currentIndex - 1); }
    }, { passive: false });
  }

  goTo(0, false);
}

function isVisible(el) {
  const rect = el.getBoundingClientRect();
  return rect.top >= -10 && rect.top < window.innerHeight / 2;
}
