/* WEB / UIUX project tab switcher */

import { fetchData } from './data.js';

async function initProjectSection(sectionId, dataType) {
  const section    = document.getElementById(sectionId);
  const tabsBar    = section?.querySelector('.project-tabs-bar__items');
  const contentEl  = section?.querySelector('.project-display');
  if (!section || !tabsBar || !contentEl) return;

  const items = await fetchData(dataType);
  if (!items.length) return;

  let activeIdx = 0;

  // Build tab items
  items.forEach((item, i) => {
    const tab = document.createElement('div');
    tab.className = 'project-tab-item' + (i === 0 ? ' project-tab-item--active' : '');
    tab.dataset.idx = i;
    tab.innerHTML = `
      <div class="project-tab-item__indicator"></div>
      <span class="project-tab-item__name">${item.name.replace('\n','<br>')}</span>
    `;
    tab.addEventListener('click', () => switchTo(i));
    tabsBar.appendChild(tab);
  });

  const tabEls = tabsBar.querySelectorAll('.project-tab-item');

  function switchTo(idx) {
    if (idx === activeIdx) return;
    activeIdx = idx;

    // Update tabs
    tabEls.forEach((t, i) => {
      t.classList.toggle('project-tab-item--active', i === idx);
    });

    // Animate dot elongation → content fade
    const activeIndicator = tabEls[idx].querySelector('.project-tab-item__indicator');
    gsap.from(activeIndicator, { width: 8, duration: 0.4, ease: 'power2.out' });

    // Swap content
    gsap.to(contentEl, {
      opacity: 0, y: 10, duration: 0.2, ease: 'power1.in',
      onComplete: () => renderProject(items[idx], contentEl),
    });
  }

  // Initial render
  renderProject(items[0], contentEl);
}

function renderProject(item, container) {
  if (!item) return;
  container.innerHTML = `
    <img class="project-display__img"
         src="${item.img}"
         alt="${item.name}"
         loading="lazy"
         onerror="this.outerHTML='<div class=\'project-display__placeholder\'>${item.name}</div>'">
  `;
  gsap.fromTo(container, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
}

export function initProjectTabs() {
  initProjectSection('web',  'web');
  initProjectSection('uiux', 'uiux');
}
