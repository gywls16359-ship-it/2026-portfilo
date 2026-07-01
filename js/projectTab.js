/* WEB / UIUX — Mabinogi-style scroll gallery (fade slides + bottom nav) */

import { fetchData } from './data.js';

const scrollPerStep = () => Math.max(400, window.innerHeight * 0.5);

function getGalleryScrollDistance(itemCount) {
  if (itemCount <= 1) return 0;
  return (itemCount - 1) * scrollPerStep() + window.innerHeight * 0.1;
}

function getSnapProgress(progress, steps) {
  const scaled = progress * steps;
  const base = Math.floor(scaled);
  const frac = scaled - base;
  const idx = frac >= 0.28 ? Math.min(steps, base + 1) : base;
  return idx / steps;
}

function getTabMetrics(tabEls, idx, track) {
  const tab = tabEls[idx];
  if (!tab || !track) return { x: 0, width: 6, center: 0 };
  const trackRect = track.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  const x = tabRect.left - trackRect.left;
  const width = tabRect.width;
  return { x, width, center: x + width / 2 };
}

function updateSlider(slider, tabEls, track, fractionalIndex, count) {
  if (count <= 1) {
    const m = getTabMetrics(tabEls, 0, track);
    gsap.set(slider, { left: m.x, width: m.width });
    return;
  }

  const clamped = Math.max(0, Math.min(fractionalIndex, count - 1));
  const i = Math.floor(clamped);
  const t = clamped - i;
  const next = Math.min(i + 1, count - 1);
  const a = getTabMetrics(tabEls, i, track);
  const b = getTabMetrics(tabEls, next, track);

  let x;
  let w;

  if (i === next || t === 0) {
    x = a.x;
    w = a.width;
  } else if (t < 0.35) {
    const p = t / 0.35;
    w = gsap.utils.interpolate(a.width, 6, p);
    x = a.center - w / 2;
  } else if (t < 0.65) {
    const p = (t - 0.35) / 0.3;
    const center = gsap.utils.interpolate(a.center, b.center, p);
    w = 6;
    x = center - w / 2;
  } else {
    const p = (t - 0.65) / 0.35;
    w = gsap.utils.interpolate(6, b.width, p);
    x = b.center - w / 2;
  }

  gsap.set(slider, { left: x, width: w });
}

function updateSlides(slides, fractionalIndex) {
  slides.forEach((slide, i) => {
    const dist = Math.abs(fractionalIndex - i);
    const opacity = dist >= 1 ? 0 : Math.max(0, 1 - dist);
    slide.classList.toggle('project-swiper__slide--active', opacity > 0.5);
    gsap.set(slide, { opacity });
  });
}

function updateTabItems(tabEls, fractionalIndex) {
  const active = Math.round(fractionalIndex);
  tabEls.forEach((tab, i) => {
    const on = i === active;
    tab.classList.toggle('project-bot__item--active', on);
    tab.setAttribute('aria-selected', on ? 'true' : 'false');
    tab.querySelector('.project-bot__target')?.classList.toggle('project-bot__target--on', on);
    tab.querySelector('.project-bot__label')?.classList.toggle('project-bot__label--on', on);
  });
}

function attachScrollEndSnap(scrollTrigger, itemCount) {
  const steps = Math.max(itemCount - 1, 1);
  let timer = null;
  let snapping = false;

  function snapToNearest() {
    if (!scrollTrigger.isActive || snapping) return;
    const progress = scrollTrigger.progress;
    const nearest = getSnapProgress(progress, steps);
    if (Math.abs(progress - nearest) < 0.01) return;

    snapping = true;
    const range = scrollTrigger.end - scrollTrigger.start;
    gsap.to(window, {
      scrollTo: scrollTrigger.start + nearest * range,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
      onComplete: () => { snapping = false; },
    });
  }

  function onActivity() {
    if (!scrollTrigger.isActive) return;
    clearTimeout(timer);
    timer = setTimeout(snapToNearest, 120);
  }

  window.addEventListener('scroll', onActivity, { passive: true });
  window.addEventListener('wheel', onActivity, { passive: true });
  window.addEventListener('touchend', onActivity, { passive: true });
}

async function initProjectSection(sectionId, dataType) {
  const section = document.getElementById(sectionId);
  const gallery = section?.querySelector('.project-gallery');
  const swiperEl = section?.querySelector('.project-swiper__wrapper');
  const descEl = section?.querySelector('.project-bot__desc');
  const tabsBar = section?.querySelector('.project-bot__items');
  const track = section?.querySelector('.project-bot__track');
  const slider = section?.querySelector('.project-bot__slider');

  if (!section || !gallery || !swiperEl || !descEl || !tabsBar || !track || !slider) return;

  const items = await fetchData(dataType);
  if (!items.length) return;

  swiperEl.innerHTML = '';
  tabsBar.innerHTML = '';

  const slides = items.map((item, i) => {
    const slide = document.createElement('div');
    slide.className = 'project-swiper__slide' + (i === 0 ? ' project-swiper__slide--active' : '');
    slide.innerHTML = `
      <img class="project-swiper__img"
           src="${item.img}"
           alt="${item.name.replace('\n', ' ')}"
           loading="${i === 0 ? 'eager' : 'lazy'}"
           draggable="false">
    `;
    const img = slide.querySelector('img');
    img.onerror = () => {
      img.replaceWith(Object.assign(document.createElement('div'), {
        className: 'project-swiper__placeholder',
        textContent: item.name.replace('\n', ' '),
      }));
    };
    swiperEl.appendChild(slide);
    return slide;
  });

  const tabEls = items.map((item, i) => {
    const tab = document.createElement('div');
    tab.className = 'project-bot__item' + (i === 0 ? ' project-bot__item--active' : '');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    tab.setAttribute('aria-label', `${i + 1}번째 슬라이드`);
    tab.tabIndex = 0;
    tab.innerHTML = `
      <span class="project-bot__target${i === 0 ? ' project-bot__target--on' : ''}" aria-hidden="true"></span>
      <p class="project-bot__label${i === 0 ? ' project-bot__label--on' : ''}">${item.name.replace('\n', '<br>')}</p>
    `;
    tabsBar.appendChild(tab);
    return tab;
  });

  let scrollTrigger;
  let currentDescIdx = 0;

  function setDesc(idx) {
    if (idx === currentDescIdx) return;
    currentDescIdx = idx;
    const text = items[idx]?.desc || '';
    gsap.to(descEl, {
      opacity: 0,
      duration: 0.12,
      onComplete: () => {
        descEl.textContent = text;
        gsap.to(descEl, { opacity: 1, duration: 0.2 });
      },
    });
  }

  function applyProgress(progress) {
    const clamped = gsap.utils.clamp(0, 1, progress);
    const fractional = clamped * Math.max(items.length - 1, 0);
    updateSlides(slides, fractional);
    updateSlider(slider, tabEls, track, fractional, items.length);
    updateTabItems(tabEls, fractional);
    setDesc(Math.round(fractional));
    section.classList.toggle('is-scroll-gallery', clamped > 0.01 && clamped < 0.99);
  }

  function scrollToIndex(idx) {
    if (!scrollTrigger || items.length <= 1) return;
    const range = scrollTrigger.end - scrollTrigger.start;
    const target = scrollTrigger.start + (idx / (items.length - 1)) * range;
    gsap.to(window, { scrollTo: target, duration: 0.7, ease: 'power2.inOut' });
  }

  tabEls.forEach((tab, idx) => {
    tab.addEventListener('click', () => scrollToIndex(idx));
    tab.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToIndex(idx);
      }
    });
  });

  descEl.textContent = items[0]?.desc || '';
  gsap.set(descEl, { opacity: 1 });

  if (items.length <= 1) {
    applyProgress(0);
    return;
  }

  scrollTrigger = ScrollTrigger.create({
    id: `${sectionId}-gallery`,
    trigger: section,
    start: 'top top',
    end: () => `+=${Math.max(getGalleryScrollDistance(items.length), 1)}`,
    pin: true,
    pinSpacing: true,
    scrub: true,
    invalidateOnRefresh: true,
    anticipatePin: 1,
    onUpdate(self) {
      applyProgress(self.progress);
    },
  });

  attachScrollEndSnap(scrollTrigger, items.length);
  applyProgress(0);

  const onLayout = () => {
    ScrollTrigger.refresh();
    if (scrollTrigger) applyProgress(scrollTrigger.progress);
  };

  window.addEventListener('resize', onLayout);
  window.addEventListener('load', onLayout);
  document.fonts?.ready?.then(onLayout);
}

export async function initProjectTabs() {
  await Promise.all([
    initProjectSection('web', 'web'),
    initProjectSection('uiux', 'uiux'),
  ]);
  ScrollTrigger.refresh();
}
