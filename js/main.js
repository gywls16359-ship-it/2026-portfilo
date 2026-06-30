/* Entry point */

import { renderWordSearch } from './wordSearch.js';
import { renderSkillCircles } from './skillCircle.js';
import { initSlider } from './slider.js';
import { initProjectTabs } from './projectTab.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin, Draggable);

  /* Render dynamic content */
  renderWordSearch('wordSearch');
  renderSkillCircles('skillCircles');

  /* Init interactive modules */
  initSlider();
  initProjectTabs();

  /* Init all GSAP animations */
  initAnimations();

  /* Bookmark tab navigation */
  initBookmarkTabs();

  /* Mobile nav */
  initMobileNav();

  /* Modal */
  initModal();

  /* TOP button → main 섹션으로 */
  document.querySelectorAll('.top-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const main = document.getElementById('main');
      if (main) gsap.to(window, { duration: 0.6, scrollTo: main, ease: 'power2.inOut' });
    });
  });
});

/* ── Bookmark tabs ── */
function initBookmarkTabs() {
  const TAB_TARGETS = ['main','about','graphic','web','uiux','contact'];

  document.querySelectorAll('.bookmark-tabs').forEach(nav => {
    nav.querySelectorAll('.bookmark-tabs__item').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(TAB_TARGETS[i]);
        if (target) gsap.to(window, { duration: 0.7, scrollTo: target, ease: 'power2.inOut' });
      });
    });
  });

  // Update active tab on scroll
  const sections = ['about','graphic','web','uiux','contact'];
  sections.forEach((id, tabIdx) => {
    const el = document.getElementById(id);
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveTab(tabIdx + 1),
      onEnterBack: () => setActiveTab(tabIdx + 1),
    });
  });

  // Main → no active tab
  const mainEl = document.getElementById('main');
  if (mainEl) {
    ScrollTrigger.create({
      trigger: mainEl,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveTab(-1),
      onEnterBack: () => setActiveTab(-1),
    });
  }
}

function setActiveTab(activeIdx) {
  /* Each section has its own .bookmark-tabs with 6 items — update each independently */
  document.querySelectorAll('.bookmark-tabs').forEach(nav => {
    nav.querySelectorAll('.bookmark-tabs__item').forEach((btn, i) => {
      btn.classList.toggle('bookmark-tabs__item--active', i === activeIdx);
    });
  });
}

/* ── MAIN nav links → scroll ── */
function initMobileNav() {
  const TAB_IDS = ['main','about','graphic','web','uiux','contact'];

  // Desktop left nav
  document.querySelectorAll('.nav-left__link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(link.dataset.target);
      if (target) gsap.to(window, { duration: 0.7, scrollTo: target, ease: 'power2.inOut' });
    });
  });

  // Mobile bottom nav
  document.querySelectorAll('.mobile-nav__item').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(btn.dataset.target);
      if (target) gsap.to(window, { duration: 0.6, scrollTo: target, ease: 'power2.inOut' });
    });
  });

  // Update mobile nav active state on scroll
  TAB_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => updateMobileNav(id),
      onEnterBack: () => updateMobileNav(id),
    });
  });
}

function updateMobileNav(activeId) {
  document.querySelectorAll('.mobile-nav__item').forEach(btn => {
    btn.classList.toggle('mobile-nav__item--active', btn.dataset.target === activeId);
  });
}

/* ── Modal ── */
function initModal() {
  const overlay = document.getElementById('modalOverlay');
  const box     = document.getElementById('modalBox');
  if (!overlay || !box) return;

  const close = () => overlay.classList.remove('is-open');

  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  box.querySelector('.modal-close')?.addEventListener('click', close);
}

/* Expose for card clicks */
window.openModal = function(imgSrc, title, desc) {
  const overlay = document.getElementById('modalOverlay');
  const img   = overlay?.querySelector('.modal-img');
  const ttl   = overlay?.querySelector('.modal-title');
  const dsc   = overlay?.querySelector('.modal-desc');
  if (img)  { img.src = imgSrc; img.alt = title; img.style.display = imgSrc ? 'block' : 'none'; }
  if (ttl)  ttl.textContent = title;
  if (dsc)  dsc.textContent = desc;
  overlay?.classList.add('is-open');
};
