/* GSAP animation definitions — all sections */

import { getWordSearchEls } from './wordSearch.js';
import { animateSkillCircles } from './skillCircle.js';

export function initAnimations() {

  initMainAnimations();
  initAboutAnimations();
  initContactAnimations();
  initNavHighlight();
  initSectionDots();
}

/* ── MAIN: 입장 애니메이션 + word search + pills ── */
function initMainAnimations() {
  const { orangeCells, pills } = getWordSearchEls();

  /* 각 SVG path: 위치·회전·dashoffset 초기화 */
  pills.forEach(pill => {
    const rot   = parseFloat(pill.dataset.rot)  || 0;
    const cx    = parseFloat(pill.dataset.cx);
    const cy    = parseFloat(pill.dataset.cy);
    const w     = parseFloat(pill.dataset.w);
    const h     = parseFloat(pill.dataset.h);
    const perim = parseFloat(pill.dataset.perim);

    gsap.set(pill, {
      x: cx - w / 2,
      y: cy - h / 2,
      rotation: rot,
      transformOrigin: '50% 50%',
      strokeDasharray: perim,
      strokeDashoffset: perim,
    });
  });

  /* Orange cells start dark */
  gsap.set(Array.from(orangeCells), { color: 'var(--color-black)' });

  /* ── 입장 애니메이션 ── */
  const navItems  = gsap.utils.toArray('.nav-left__item');
  const introText = document.querySelector('.intro-text');
  const wrapper   = document.querySelector('.word-search-wrapper');

  if (!wrapper) return;

  /*
   * word-search 자연 위치 중심 = nav-left(400) + gap(100) + half-width(450) = 950px
   * main-content 중심 = 700px → 오른쪽으로 250px 치우침
   * x: -250으로 시작하면 화면 정중앙에 위치
   */
  gsap.set(wrapper, { x: -250, opacity: 0 });
  gsap.set([...navItems, introText].filter(Boolean), { x: -60, opacity: 0 });

  /* buildPills() 순서와 동일한 셀 좌표 매핑 */
  const PILL_CELLS = [
    [[0,0],[1,1],[2,2]],                                                       // WEB (대각선 ↘)
    [[0,7],[1,6],[2,5],[3,4],[4,3],[5,2],[6,1]],                              // PUBLISHING (대각선 ↙)
    [[2,8],[3,8],[4,8],[5,8]],                                                 // UIUX (세로)
    [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5]],                                    // DESIGN (가로)
    [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8]],                  // PORTFOLIO (가로)
  ];

  const tl = gsap.timeline({ delay: 0.4 });

  /* 1. word-search-wrapper 중앙에서 페이드인 */
  tl.to(wrapper, { opacity: 1, duration: 0.5, ease: 'power2.out' });

  /* 2. 필 하나씩 순서대로 그리기 → 완성되면 해당 셀만 점등 */
  pills.forEach((pill, i) => {
    tl.to(pill, {
      strokeDashoffset: 0,
      duration: 1,
      ease: 'power1.inOut',
    }); // 기본 위치('>') = 이전 완료 후 시작

    const cells = PILL_CELLS[i]
      .map(([r, c]) => document.querySelector(`.word-search__cell[data-r="${r}"][data-c="${c}"]`))
      .filter(Boolean);

    if (cells.length) {
      tl.to(cells, {
        color: 'var(--color-main)',
        duration: 0.07,
        stagger: { each: 0.05, from: 'start' },
        ease: 'none',
      }, '>');
    }
  });

  /* 3. 모든 애니메이션 완료 후 → 오른쪽으로 슬라이드 */
  tl.to(wrapper, { x: 0, duration: 0.85, ease: 'power3.out' }, '>0.3');

  /* 4. 슬라이드와 동시에 nav-left 아이템 위→아래 순서로 왼쪽에서 등장 */
  tl.to([...navItems, introText].filter(Boolean), {
    x: 0,
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out',
    stagger: 0.12,
  }, '<0.15');
}

/* ── ABOUT: skill circles fill ── */
function initAboutAnimations() {
  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 60%',
    once: true,
    onEnter: () => animateSkillCircles(),
  });
}

/* ── CONTACT animations ── */
function initContactAnimations() {
  /* Pre-store the text so TextPlugin can fill it in */
  const thankYouEl = document.querySelector('.thank-you-inner');
  const thankYouText = thankYouEl ? thankYouEl.textContent.trim() : 'Thank You';
  if (thankYouEl) thankYouEl.textContent = '';

  /* 초기 숨김 상태 — GSAP으로 관리 */
  const rows = document.querySelectorAll('.contact-row');
  gsap.set(rows, { opacity: 0, y: 60 });
  gsap.set('.copyright', { opacity: 0 });

  ScrollTrigger.create({
    trigger: '#contact',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      const tl = gsap.timeline();

      // 1. "Thank You" typewriter
      if (thankYouEl) {
        tl.to(thankYouEl, {
          text: { value: thankYouText, delimiter: '' },
          duration: thankYouText.length * 0.07,
          ease: 'none',
        });
      }

      // 2. 각 contact-row: 위로 슬라이드 + 줄 성장 + fields 등장
      rows.forEach((row, i) => {
        const divider = row.querySelector('.contact-row__divider');
        const fields  = row.querySelector('.contact-row__fields');
        const offset  = i === 0 ? '>-0.1' : '-=0.1';

        // row 전체 보이기
        tl.to(row, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, offset);

        // divider 선 성장
        tl.to(divider, { width: '100%', duration: 0.5, ease: 'power2.out' }, '<0.1');

        // fields 위에서 슬라이드
        tl.fromTo(fields, {
          y: 20, opacity: 0, clipPath: 'inset(100% 0 0 0)',
        }, {
          y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)',
          duration: 0.4, ease: 'power2.out',
        }, '<0.1');
      });

      // 3. Copyright fade in
      tl.to('.copyright', { opacity: 1, duration: 0.5, ease: 'power1.out' }, '>0.2');
    },
  });
}

/* ── MAIN nav hover: highlighter + dot bounce ── */
function initNavHighlight() {
  document.querySelectorAll('.nav-left__item').forEach(item => {
    const dot  = item.querySelector('.nav-left__dot');
    const link = item.querySelector('.nav-left__link');
    if (!dot || !link) return;

    item.addEventListener('mouseenter', () => {
      gsap.to(dot,  { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'back.out(2)' });
      gsap.to(link, { '--hl-w': '100%', duration: 0.3, ease: 'power2.out' });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(dot,  { opacity: 0, x: -20, scale: 0, duration: 0.25, ease: 'power2.in' });
    });
  });
}

/* ── Section transition dot indicator (GRAPHIC/WEB/UIUX) ── */
function initSectionDots() {
  const dotMap = {
    '#graphic': 0,
    '#web':     1,
    '#uiux':    2,
  };
  const navDots = document.querySelectorAll('.page-nav-dot');
  if (!navDots.length) return;

  function setActiveDot(idx) {
    navDots.forEach((d, i) => {
      const wasActive = d.classList.contains('page-nav-dot--active');
      d.classList.toggle('page-nav-dot--active', i === idx);
      if (!wasActive && i === idx) {
        gsap.from(d, { width: 8, duration: 0.45, ease: 'power2.out' });
      }
    });
  }

  Object.entries(dotMap).forEach(([selector, idx]) => {
    const el = document.querySelector(selector);
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveDot(idx),
      onEnterBack: () => setActiveDot(idx),
    });
  });

  navDots.forEach((dot, i) => {
    const targets = ['#graphic','#web','#uiux'];
    dot.addEventListener('click', () => {
      const target = document.querySelector(targets[i]);
      if (target) {
        gsap.to(window, { duration: 0.6, scrollTo: target, ease: 'power2.inOut' });
      }
    });
  });
}
