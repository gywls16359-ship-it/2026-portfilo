/* Word-search grid renderer + pill overlays */

const GRID = [
  ['W','C','A','Z','S','M','E','P','X'],
  ['J','E','H','W','Q','W','U','O','H'],
  ['A','W','B','S','I','B','P','F','U'],
  ['B','C','A','D','L','N','R','M','I'],
  ['D','E','S','I','G','N','B','C','U'],
  ['S','Q','S','W','F','V','A','C','X'],
  ['H','H','J','C','D','H','W','J','A'],
  ['P','O','R','T','F','O','L','I','O'],
];

/* 0-indexed [row, col] pairs that should be orange */
const HIGHLIGHTS = new Set([
  '0,0','0,7',
  '1,1','1,6',
  '2,2','2,5','2,8',
  '3,4','3,8',
  '4,0','4,1','4,2','4,3','4,4','4,5','4,8',
  '5,2','5,8',
  '6,1',
  '7,0','7,1','7,2','7,3','7,4','7,5','7,6','7,7','7,8',
]);

/*
  Cell metrics (matching Figma):
  cell-width: 27px, line-height: 50px
  column gap: 46px → step-x = 73px
  row gap: 26px    → step-y = 76px
  Cell center: cx = c*73 + 13.5,  cy = r*76 + 25
*/
const SX = 73, SY = 76;
const CX0 = 13.5, CY0 = 25;

function cellCenter(r, c) {
  return { x: c * SX + CX0, y: r * SY + CY0 };
}

/* ── SVG pill path helpers ── */
const R = 25; // border-radius (= h/2 for 50px tall pill)

function pillPerimeter(w, h) {
  return 2 * Math.PI * R + 2 * (Math.max(w, h) - 2 * R);
}

/*
  Horizontal (orient='h'): start at left-center, draw clockwise
    left → bottom-left arc → bottom → right cap → top → top-left arc → close
  Vertical (orient='v'): start at top-center, draw counter-clockwise (top→left→bottom→right)
    top → top-left arc → left → bottom-left arc → bottom-right arc → right → top-right arc → close
*/
function pillPath(w, h, orient) {
  if (orient === 'h') {
    return [
      `M 0,${h / 2}`,
      `A ${R},${R} 0 0,0 ${R},${h}`,
      `L ${w - R},${h}`,
      `A ${R},${R} 0 0,0 ${w - R},0`,
      `L ${R},0`,
      `A ${R},${R} 0 0,0 0,${h / 2}`,
    ].join(' ');
  } else {
    return [
      `M ${w / 2},0`,
      `A ${R},${R} 0 0,0 0,${R}`,
      `L 0,${h - R}`,
      `A ${R},${R} 0 0,0 ${w / 2},${h}`,
      `A ${R},${R} 0 0,0 ${w},${h - R}`,
      `L ${w},${R}`,
      `A ${R},${R} 0 0,0 ${w / 2},0`,
    ].join(' ');
  }
}

/* Pill definitions: [cx, cy, w, h, rotateDeg] */
function buildPills() {
  // WEB diagonal top-left  W(0,0)→E(1,1)→B(2,2)
  const wl = cellCenter(0,0), wr = cellCenter(2,2);
  const wlcx = (wl.x + wr.x)/2, wlcy = (wl.y + wr.y)/2;
  const wlen = Math.hypot(wr.x-wl.x, wr.y-wl.y) + 50;
  const wang = Math.atan2(wr.y-wl.y, wr.x-wl.x) * 180 / Math.PI - 90;

  // WEB diagonal top-right P(0,7)→U(1,6)→B(2,5)→L(3,4)→I(4,3)→S(5,2)→H(6,1)
  const wr2l = cellCenter(0,7), wr2r = cellCenter(6,1);
  const wr2cx = (wr2l.x + wr2r.x)/2, wr2cy = (wr2l.y + wr2r.y)/2;
  const wr2len = Math.hypot(wr2r.x-wr2l.x, wr2r.y-wr2l.y) + 50;
  const wr2ang = Math.atan2(wr2r.y-wr2l.y, wr2r.x-wr2l.x) * 180 / Math.PI - 90;

  // UIUX vertical right  U(2,8)→I(3,8)→U(4,8)→X(5,8)
  const ut = cellCenter(2,8), ub = cellCenter(5,8);
  const ucx = ut.x, ucy = (ut.y+ub.y)/2;
  const ulen = ub.y - ut.y + 60;

  // DESIGN horizontal  D(4,0)→N(4,5)
  const dl = cellCenter(4,0), dr = cellCenter(4,5);
  const dcx = (dl.x+dr.x)/2, dcy = dl.y;
  const dlen = dr.x - dl.x + 90;

  // PORTFOLIO horizontal  P(7,0)→O(7,8)
  const pl2 = cellCenter(7,0), pr2 = cellCenter(7,8);
  const pcx = (pl2.x+pr2.x)/2, pcy = pl2.y;
  const plen = pr2.x - pl2.x + 90;

  return [
    { cx: wlcx,  cy: wlcy,  w: 50,   h: wlen,  rot: wang },
    { cx: wr2cx, cy: wr2cy, w: 50,   h: wr2len,rot: wr2ang },
    { cx: ucx,   cy: ucy,   w: 50,   h: ulen,  rot: 0 },
    { cx: dcx,   cy: dcy,   w: dlen, h: 50,    rot: 0 },
    { cx: pcx,   cy: pcy,   w: plen, h: 50,    rot: 0 },
  ];
}

export function renderWordSearch(containerId = 'wordSearch') {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Build grid cells
  const grid = container.querySelector('.word-search');
  if (!grid) return;

  GRID.forEach((row, r) => {
    row.forEach((letter, c) => {
      const cell = document.createElement('span');
      cell.className = 'word-search__cell';
      cell.textContent = letter;
      cell.dataset.r = r;
      cell.dataset.c = c;
      if (HIGHLIGHTS.has(`${r},${c}`)) {
        cell.classList.add('word-search__cell--orange');
        // start dark; animated to orange by GSAP
        cell.style.color = 'var(--color-black)';
      }
      grid.appendChild(cell);
    });
  });

  // Build SVG pill overlays
  const svg = container.querySelector('.word-search__pills');
  if (!svg) return;

  buildPills().forEach(({ cx, cy, w, h, rot }) => {
    const orient = w >= h ? 'h' : 'v';
    const perim = pillPerimeter(w, h);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'word-search__pill');
    path.setAttribute('d', pillPath(w, h, orient));
    path.setAttribute('stroke', 'var(--color-main)');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.dataset.rot = rot;
    path.dataset.orient = orient;
    path.dataset.cx = cx;
    path.dataset.cy = cy;
    path.dataset.w = w;
    path.dataset.h = h;
    path.dataset.perim = perim;

    svg.appendChild(path);
  });
}

export function getWordSearchEls() {
  return {
    orangeCells: document.querySelectorAll('.word-search__cell--orange'),
    pills: document.querySelectorAll('.word-search__pill'),
  };
}
