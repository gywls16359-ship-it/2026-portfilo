/* Skill circle renderer — SVG-based with rounded stroke caps */

import { SKILLS_DATA } from './data.js';

const R = 55;
const CIRCUMFERENCE = 2 * Math.PI * R; // ≈ 345.58

function formatPct(label, pct) {
  const text = label || pct + '%';
  // Split number part and % sign: e.g. "80~90%" → <strong>80~90</strong><span class="pct-sign">%</span>
  return text.replace(/^(.+?)(%+)$/, '<strong>$1</strong><span class="pct-sign">$2</span>');
}

export function renderSkillCircles(containerId = 'skillCircles') {
  const container = document.getElementById(containerId);
  if (!container) return;

  SKILLS_DATA.forEach(({ name, pct, label }) => {
    const circle = document.createElement('div');
    circle.className = 'skill-circle';
    circle.dataset.pct = pct;

    circle.innerHTML = `
      <svg class="skill-circle__svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle class="skill-circle__track" cx="60" cy="60" r="${R}"/>
        <circle class="skill-circle__fill" cx="60" cy="60" r="${R}"
          stroke-dasharray="${CIRCUMFERENCE}"
          stroke-dashoffset="${CIRCUMFERENCE}"/>
      </svg>
      <div class="skill-circle__inner">
        <span class="skill-circle__name">${name}</span>
        <span class="skill-circle__pct">${formatPct(label, pct)}</span>
      </div>
    `;
    container.appendChild(circle);
  });
}

export function animateSkillCircles() {
  document.querySelectorAll('.skill-circle').forEach(el => {
    const fill = el.querySelector('.skill-circle__fill');
    const pct  = parseFloat(el.dataset.pct) || 0;
    if (fill) {
      gsap.to(fill, {
        strokeDashoffset: CIRCUMFERENCE * (1 - pct / 100),
        duration: 1.4,
        ease: 'power2.out',
        delay: 0.1,
      });
    }
  });
}
