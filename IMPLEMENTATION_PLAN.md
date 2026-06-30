# IMPLEMENTATION_PLAN.md — 서효진 포트폴리오 웹사이트

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | 서효진 개인 포트폴리오 |
| 기술 스택 | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| 구조 | 단일 index.html SPA |
| 설계 기준 | Figma 파일: `feWYduARib1e2o9AhIV0U6` |
| 반응형 | Desktop 1440+ / Tablet 768~1439 / Mobile 767 이하 |
| 데이터 연동 | 현재 단계: 정적 하드코딩 → 이후 Supabase 연결 예정 |

### 디자인 토큰 (CSS 변수)
```css
:root {
  /* 색상 */
  --color-main:    #ff6200;   /* 오렌지 포인트 */
  --color-black:   #202020;   /* 거의 검정 */
  --color-accent:  #3033ff;   /* 파란색 강조 (날짜, 라벨) */
  --color-bg-card: #e5e5e5;   /* 콘텐츠 카드 배경 */
  --color-tab-off: #d9d9d9;   /* 비활성 탭 */
  --color-text:    #323232;   /* 일반 본문 */

  /* 폰트 */
  --font-scorem:   'S-Core Dream', sans-serif;
  --font-pretend:  'Pretendard', sans-serif;
  --font-coming:   'Coming Soon', cursive;
  --font-apple:    'AppleSDGothicNeoEB00', sans-serif;
}
```

---

## 2. 구현 대상 화면 목록

| # | 섹션 ID | 탭 라벨 | Figma node-id |
|---|---------|---------|--------------|
| 1 | #main | (탭 없음, 로고 클릭으로 이동) | 8:2 |
| 2 | #about | ABOUT | 103:429 |
| 3 | #graphic | GRAPHIC | 107:1169 |
| 4 | #web | WEB | 111:1276 |
| 5 | #uiux | UI / UX | 111:1324 |
| 6 | #contact | CONTACT | 21:180 |

---

## 3. 화면별 역할

### MAIN (#main)
- 포트폴리오 인트로 화면 (랜딩)
- 좌측: Coming Soon 폰트 네비게이션 링크
  - `profile` (형광펜 하이라이트 active 표시)
  - `Publishing` / `UI/UX design` / `Team Project` / `Contact`
- 우측: 워드서치 스타일 알파벳 격자 (8×9)
  - 폰트: AppleSDGothicNeoEB00, 30px, letter-spacing: -3px, gap: 46px
  - 하이라이트 단어: DESIGN (가로), PORTFOLIO (가로), W·E·B (대각선), U·I·U (세로)
  - 오렌지 pill 타원(border 3px solid #ff6200, border-radius: 100px)으로 단어 감싸기
- 좌측 하단: 소개 문구 (S-Core Dream Light 24px / Medium 26px)
  - "사용자의 경험과 브랜드의 가치를"
  - "연결하기 위해 끊임없이 고민하는"
  - "디자이너 서효진입니다."
- 배경: 종이 질감 SVG (`image/paper.svg`)

### ABOUT (#about)
- 갈피 탭 2번째 활성
- 배경 워터마크: "PROFILE" (S-Core Dream 6_Bold, 96px, #c8c8c8)
- 좌측 패널 (390px):
  - 프로필 사진 (border-radius: 50px, 높이 368px)
  - 이름/생년/연락처/이메일 (아이콘 + S-Core Dream 3_Light, 24px)
  - 해시태그 버튼: `#친절함` / `#섬세함` / `#열정적` (오렌지 border 1.5px, border-radius: 12px)
- 우측 패널:
  - SKILLS: 원형 게이지 5개 (conic-gradient, Pretendard Bold)
    - PHOTOSHOP 90% / FIGMA 90% / HTML·CSS 90% / JAVASCRIPT 90% / VIBE CODING 80~90%
  - additional: 스킬 아이콘 7개
  - 학력 (2021.03~2025.02 수원대학교 공예디자인과)
  - 교육 (2026.03~2026.07 이젠아카데미 DX교육센터)
  - 수상·전시 경력 (타임라인, 연도 구분선)

### GRAPHIC DESIGN (#graphic)
- 갈피 탭 3번째 활성
- 타이틀: "GRAPHIC DESIGN" (S-Core Dream 3_Light, 36px, #ff6200, left:49px, top:149px)
- 가로 슬라이더 카드:
  - 카드 크기: 310px × 420px, gap: 50px
  - 항목: 유튜브 썸네일 / 파파고 플러스 배너 / 이젠아카데미 이벤트 / 이케아 프로모션
  - 카드 하단 텍스트: Pretendard Regular, 20px, #323232
- 우측 next 화살표 버튼 (25px × 50px)

### WEB PUBLISHING (#web)
- 갈피 탭 4번째 활성
- 타이틀: "WEB PUBLISHING" (S-Core Dream 3_Light, 36px, #ff6200)
- 콘텐츠 영역: 배경 #e5e5e5, 높이 803px
- 하단 프로젝트 탭 바 (구분선 포함):
  - 앤코리아 / 번개장터 / 설빙 / 퍼스널 칵테일
  - 활성: 상단 오렌지 바 (6px, border-radius: 10px)
  - 비활성: 점(●, 6px)
  - 폰트: Inter Regular, 20px, #323232
- TOP 화살표 버튼 (섹션 상단 이동)

### UI/UX DESIGN (#uiux)
- 갈피 탭 5번째 활성
- 타이틀: "UI / UX DESIGN" (S-Core Dream 3_Light, 36px, #ff6200)
- WEB과 동일 레이아웃 구조
- 하단 프로젝트 탭 바:
  - 서울공예박물관 / 헤이엄 / 제주비건(team) / 티모(team)

### CONTACT (#contact)
- 갈피 탭 6번째 활성
- 중앙 큰 타이포: "Thank You" (Coming Soon Regular, 96px, #ff6200)
- 우측 연락처 표:
  - `[ name ]` → 서효진
  - `[ email ]` → iiseoiiu@naver.com
  - `[ number ]` → 010-7635-8980
  - 라벨: S-Core Dream 4_Regular, 36px / 값: 32px
  - 각 항목 하단 구분선
- 하단 저작권: Inter Medium 16px / Regular 14px

---

## 4. 공통 컴포넌트 목록

| 컴포넌트 | 위치 | 설명 |
|----------|------|------|
| `.bookmark-tabs` | ABOUT~CONTACT 상단 | 갈피 탭 6개, 우측 정렬, top:56px |
| `.page-title` | ABOUT~CONTACT | 오렌지 타이틀, S-Core Dream 3_Light, 36px, left:49px, top:149px |
| `.paper-bg` | 전체 배경 | paper.svg 종이 질감 (position:absolute, inset:0) |
| `.shadow-top` / `.shadow-bottom` | 각 섹션 | 상하 35px 그림자 레이어 (좌우 스크롤 느낌) |
| `.nav-left` | MAIN 전용 | Coming Soon 폰트 네비 링크 목록 (좌측) |
| `.word-search` | MAIN 전용 | 8×9 알파벳 격자 + 오렌지 타원 하이라이트 |
| `.skill-circle` | ABOUT 전용 | conic-gradient 원형 게이지 |
| `.card-slider` | GRAPHIC 전용 | 가로 슬라이드 카드 래퍼 |
| `.project-tabs` | WEB/UIUX 전용 | 하단 프로젝트 전환 탭 바 |
| `.contact-table` | CONTACT 전용 | 라벨-값 테이블 + 구분선 |

---

## 5. 파일 구조

```
c:\서효진\portfolio\
├── index.html            ← 단일 SPA 파일 (모든 섹션 포함)
├── css/
│   ├── reset.css         ← CSS 초기화 (box-sizing, margin, padding)
│   ├── variables.css     ← CSS 변수 (디자인 토큰)
│   ├── common.css        ← 공통 레이아웃, 갈피 탭, 배경, 그림자
│   ├── main.css          ← MAIN 화면 전용
│   ├── about.css         ← ABOUT 화면 전용
│   ├── graphic.css       ← GRAPHIC 화면 전용
│   ├── web.css           ← WEB 화면 전용
│   ├── uiux.css          ← UI/UX 화면 전용
│   ├── contact.css       ← CONTACT 화면 전용
│   └── responsive.css    ← 반응형 미디어 쿼리
├── js/
│   ├── router.js         ← SPA 화면 전환 (hash 기반)
│   ├── main.js           ← 진입점, 초기화, 이벤트 바인딩
│   ├── wordSearch.js     ← 워드서치 그리드 렌더링 + 타원 오버레이
│   ├── skillCircle.js    ← 원형 스킬 게이지 (conic-gradient)
│   ├── slider.js         ← 카드 슬라이더
│   ├── projectTab.js     ← WEB/UIUX 프로젝트 탭 전환
│   └── data.js           ← 정적 샘플 데이터 (Supabase 전환 예정)
├── image/
│   └── paper.svg         ← 종이 질감 배경 (기존 파일)
└── assets/
    ├── profile/          ← 프로필 사진 (profile.jpg 등)
    ├── graphic/          ← 그래픽 디자인 작업물 이미지
    ├── web/              ← 웹 퍼블리싱 프로젝트 썸네일/스크린
    ├── uiux/             ← UI/UX 프로젝트 이미지
    └── icons/            ← 스킬 아이콘, 연락처 아이콘
```

---

## 6. HTML section 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>서효진 포트폴리오</title>

  <!-- 폰트 CDN -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sunn-us/SCoreDreamFont@master/stylesheet.css">
  <link href="https://fonts.googleapis.com/css2?family=Coming+Soon&display=swap" rel="stylesheet">
  <!-- AppleSDGothicNeoEB00: @font-face 로컬 선언 or 대체 처리 -->

  <!-- CSS -->
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/common.css">
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/about.css">
  <link rel="stylesheet" href="css/graphic.css">
  <link rel="stylesheet" href="css/web.css">
  <link rel="stylesheet" href="css/uiux.css">
  <link rel="stylesheet" href="css/contact.css">
  <link rel="stylesheet" href="css/responsive.css">
</head>
<body>

  <!-- ① MAIN 화면 -->
  <section id="main" class="page page--main" data-page="main">
    <div class="paper-bg"></div>
    <div class="shadow-top"></div>
    <nav class="nav-left" aria-label="주 네비게이션">
      <ul>
        <li><a href="#about" class="nav-left__link nav-left__link--active">profile</a></li>
        <li><a href="#web" class="nav-left__link">Publishing</a></li>
        <li><a href="#uiux" class="nav-left__link">UI/UX design</a></li>
        <li><a href="#uiux" class="nav-left__link">Team Project</a></li>
        <li><a href="#contact" class="nav-left__link">Contact</a></li>
      </ul>
    </nav>
    <div class="intro-text">
      <p><span class="intro-text__accent">사용자의 경험</span>과 <span class="intro-text__accent">브랜드의 가치</span>를</p>
      <p>연결하기 위해 끊임없이 고민하는</p>
      <p class="intro-text__name">디자이너 서효진입니다.</p>
    </div>
    <div class="word-search" id="wordSearch" aria-hidden="true"></div>
    <div class="shadow-bottom"></div>
  </section>

  <!-- ② ABOUT 화면 -->
  <section id="about" class="page page--about" data-page="about">
    <div class="paper-bg"></div>
    <div class="shadow-top"></div>
    <nav class="bookmark-tabs" data-active="about" aria-label="섹션 탭">
      <!-- JS로 렌더링 또는 하드코딩 -->
    </nav>
    <span class="page-watermark">PROFILE</span>
    <div class="about-layout">
      <aside class="profile-panel">
        <div class="profile-panel__photo">
          <img src="assets/profile/photo.jpg" alt="서효진 프로필 사진" loading="lazy">
        </div>
        <div class="profile-panel__info">...</div>
        <div class="profile-panel__tags">
          <span>#친절함</span><span>#섬세함</span><span>#열정적</span>
        </div>
      </aside>
      <main class="info-panel">
        <section class="skills-section">
          <h2 class="section-heading">SKILLS</h2>
          <div class="skill-circles" id="skillCircles"></div>
          <div class="skill-additional">...</div>
        </section>
        <section class="history-section">
          <div class="history-col">
            <div class="history-block"><!-- 학력 --></div>
            <div class="history-block"><!-- 교육 --></div>
          </div>
          <div class="history-col">
            <div class="history-block"><!-- 수상·전시 경력 --></div>
          </div>
        </section>
      </main>
    </div>
    <div class="shadow-bottom"></div>
  </section>

  <!-- ③ GRAPHIC DESIGN 화면 -->
  <section id="graphic" class="page page--graphic" data-page="graphic">
    <div class="paper-bg"></div>
    <div class="shadow-top"></div>
    <nav class="bookmark-tabs" data-active="graphic"></nav>
    <h2 class="page-title">GRAPHIC DESIGN</h2>
    <div class="card-slider">
      <div class="card-track" id="graphicTrack"></div>
      <button class="slider-btn slider-btn--next" aria-label="다음 카드">›</button>
    </div>
    <!-- 모달 (공통, body 하단 배치) -->
    <div class="shadow-bottom"></div>
  </section>

  <!-- ④ WEB PUBLISHING 화면 -->
  <section id="web" class="page page--web" data-page="web">
    <div class="paper-bg"></div>
    <div class="shadow-top"></div>
    <nav class="bookmark-tabs" data-active="web"></nav>
    <h2 class="page-title">WEB PUBLISHING</h2>
    <div class="project-content" id="webContent"></div>
    <button class="top-btn" aria-label="섹션 상단으로">↑</button>
    <div class="project-tabs" id="webTabs"></div>
    <div class="shadow-bottom"></div>
  </section>

  <!-- ⑤ UI/UX DESIGN 화면 -->
  <section id="uiux" class="page page--uiux" data-page="uiux">
    <div class="paper-bg"></div>
    <div class="shadow-top"></div>
    <nav class="bookmark-tabs" data-active="uiux"></nav>
    <h2 class="page-title">UI / UX DESIGN</h2>
    <div class="project-content" id="uiuxContent"></div>
    <button class="top-btn" aria-label="섹션 상단으로">↑</button>
    <div class="project-tabs" id="uiuxTabs"></div>
    <div class="shadow-bottom"></div>
  </section>

  <!-- ⑥ CONTACT 화면 -->
  <section id="contact" class="page page--contact" data-page="contact">
    <div class="paper-bg"></div>
    <div class="shadow-top"></div>
    <nav class="bookmark-tabs" data-active="contact"></nav>
    <h1 class="thank-you">Thank You</h1>
    <div class="contact-table">
      <div class="contact-table__row">
        <span class="contact-table__label">[ name ]</span>
        <span class="contact-table__value">서효진</span>
      </div>
      <div class="contact-table__row">
        <span class="contact-table__label">[ email ]</span>
        <span class="contact-table__value">iiseoiiu@naver.com</span>
      </div>
      <div class="contact-table__row">
        <span class="contact-table__label">[ number ]</span>
        <span class="contact-table__value">010-7635-8980</span>
      </div>
    </div>
    <p class="copyright">
      본 포트폴리오는 100% 직접 제작하였으며, 비상업적 개인 프로젝트임을 밝힙니다.<br>
      Copyright 2026 hyojin seo All Rights Reserved.
    </p>
    <div class="shadow-bottom"></div>
  </section>

  <!-- 공통 모달 -->
  <div class="modal-overlay" id="modalOverlay" role="dialog" aria-modal="true">
    <div class="modal-box" id="modalBox"></div>
  </div>

  <!-- 모바일 하단 탭 (반응형) -->
  <nav class="mobile-nav" aria-label="모바일 하단 탭">
    <a href="#main" class="mobile-nav__item" data-target="main">홈</a>
    <a href="#about" class="mobile-nav__item" data-target="about">프로필</a>
    <a href="#graphic" class="mobile-nav__item" data-target="graphic">그래픽</a>
    <a href="#web" class="mobile-nav__item" data-target="web">웹</a>
    <a href="#uiux" class="mobile-nav__item" data-target="uiux">UI·UX</a>
    <a href="#contact" class="mobile-nav__item" data-target="contact">연락처</a>
  </nav>

  <!-- JavaScript -->
  <script type="module" src="js/main.js"></script>
</body>
</html>
```

---

## 7. CSS 설계 방식

### 네이밍 규칙: BEM (Block__Element--Modifier)
```
.bookmark-tabs                   ← Block
.bookmark-tabs__item             ← Element
.bookmark-tabs__item--active     ← Modifier
```

### 레이아웃 전략
- 기준 너비: `1400px` (Figma 원본)
- `.page`: `width:100%; min-height:100vh; position:relative; overflow:hidden`
- 콘텐츠: `max-width:1400px; margin:0 auto; padding:0 30px`
- 내부 정렬: Flexbox 우선, Grid 보조

### 갈피 탭 (.bookmark-tabs)
```css
.bookmark-tabs {
  position: absolute;
  top: 56px;
  right: 30px;
  display: flex;
  gap: 10px;
  align-items: flex-end;
  z-index: 10;
}
.bookmark-tabs__item {
  width: 93px;
  height: 30px;
  background: var(--color-tab-off);    /* #d9d9d9 */
  border-radius: 20px 20px 0 0;
  font-family: var(--font-pretend);
  font-size: 16px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
}
.bookmark-tabs__item--active {
  height: 39px;
  background: var(--color-main);       /* #ff6200 */
  color: #fff;
}
```

### 갈피 탭 하단 구분선
- `border-bottom: 2px solid #ccc` (Figma Line18 역할)

### 종이 배경 (.paper-bg)
```css
.paper-bg {
  position: absolute;
  inset: 0;
  background-image: url('../image/paper.svg');
  background-size: cover;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 0;
}
```

### 워드서치 격자 (.word-search)
```css
.word-search {
  display: grid;
  grid-template-columns: repeat(9, 27px);
  gap: 46px;
  font-family: var(--font-apple);
  font-size: 30px;
  letter-spacing: -3px;
  text-align: center;
  position: relative;
}
.word-search__cell--highlight { color: var(--color-main); }
.word-search__cell            { color: var(--color-black); }

/* 타원 pill 오버레이 */
.word-search__pill {
  position: absolute;
  border: 3px solid var(--color-main);
  border-radius: 100px;
  pointer-events: none;
  /* 각 단어별 top/left/width/height/transform(rotate) 값을 JS로 주입 */
}
```

### 원형 게이지 (.skill-circle)
```css
.skill-circle {
  position: relative;
  width: 120px;
  height: 120px;
}
.skill-circle__ring {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    #3033ff calc(var(--pct) * 3.6deg),
    #e5e5e5 0deg
  );
}
.skill-circle__inner {
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
```

---

## 8. JavaScript 모듈 설계

### main.js — 진입점
```js
import { initRouter } from './router.js';
import { renderWordSearch } from './wordSearch.js';
import { renderSkillCircles } from './skillCircle.js';
import { initSlider } from './slider.js';
import { initProjectTabs } from './projectTab.js';

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  renderWordSearch();
  renderSkillCircles();
  initSlider('#graphicTrack', '.slider-btn--next');
  initProjectTabs('web');
  initProjectTabs('uiux');
});
```

### router.js — SPA 화면 전환
```js
export function initRouter() {
  const navigate = () => {
    const hash = location.hash || '#main';
    document.querySelectorAll('.page').forEach(p =>
      p.classList.toggle('page--active', `#${p.id}` === hash)
    );
    updateBookmarkTabs(hash);
    updateMobileNav(hash);
  };
  window.addEventListener('hashchange', navigate);
  navigate(); // 초기 실행
}
```

### data.js — 정적 데이터 + Supabase 전환 준비
```js
const localData = {
  graphic: [
    { id: 'g1', title: '유튜브 썸네일',      img: 'assets/graphic/thumbnail.jpg' },
    { id: 'g2', title: '파파고 플러스 배너', img: 'assets/graphic/papago.jpg' },
    { id: 'g3', title: '이젠아카데미 이벤트', img: 'assets/graphic/ezen.jpg' },
    { id: 'g4', title: '이케아 프로모션',    img: 'assets/graphic/ikea.jpg' },
  ],
  web: [
    { id: 'ankorea', name: '앤코리아',     img: 'assets/web/ankorea.jpg',  desc: '' },
    { id: 'bunjang', name: '번개장터',     img: 'assets/web/bunjang.jpg',  desc: '' },
    { id: 'sulbing', name: '설빙',         img: 'assets/web/sulbing.jpg',  desc: '' },
    { id: 'cocktail', name: '퍼스널 칵테일', img: 'assets/web/cocktail.jpg', desc: '' },
  ],
  uiux: [
    { id: 'craft',  name: '서울공예박물관',     img: 'assets/uiux/craft.jpg',  isTeam: false },
    { id: 'heyeom', name: '헤이엄',            img: 'assets/uiux/heyeom.jpg', isTeam: false },
    { id: 'jeju',   name: '제주비건 (team)',    img: 'assets/uiux/jeju.jpg',   isTeam: true },
    { id: 'timo',   name: '티모 (team)',        img: 'assets/uiux/timo.jpg',   isTeam: true },
  ],
  skills: [
    { name: 'PHOTOSHOP',   pct: 90 },
    { name: 'FIGMA',       pct: 90 },
    { name: 'HTML · CSS',  pct: 90 },
    { name: 'JAVA SCRIPT', pct: 90 },
    { name: 'VIBE CODING', pct: 85, label: '80~90%' },
  ],
};

// Supabase 전환 시 이 함수만 교체
export async function fetchData(type) {
  return localData[type] ?? [];
  // Supabase: const { data } = await supabase.from(type).select('*'); return data;
}
```

### wordSearch.js — 워드서치 격자
- 8×9 알파벳 배열 정의 (Figma와 동일한 글자 배치)
- `data-highlight` 속성으로 오렌지 글자 표시
- 타원 pill 위치/크기/회전각도를 절대값 객체로 정의 후 DOM에 추입

### slider.js — 그래픽 카드 슬라이더
- `transform: translateX(calc(-N * (310px + 50px)))`로 이동
- next 버튼: currentIndex++, 마지막에서 0으로 복귀 (무한 루프)
- 키보드: `ArrowRight` / `ArrowLeft` 지원

### projectTab.js — WEB/UIUX 프로젝트 탭
- 탭 클릭 → `fetchData(type)` 호출 → 해당 프로젝트 콘텐츠 렌더링
- 활성 탭: `.project-tabs__item--active` (상단 오렌지 bar)
- 비활성 탭: 점(●) 표시 (active 제거)

---

## 9. 화면 전환 방식

- **방식**: URL Hash 기반 (`#main`, `#about`, `#graphic`, `#web`, `#uiux`, `#contact`)
- **기본값**: hash 없을 때 → `#main`으로 처리
- **애니메이션**: opacity + translateY fade-in (0.3s ease)

```css
.page {
  display: none;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page--active {
  display: block;
  opacity: 1;
  transform: translateY(0);
}
```

### 네비게이션 링크 맵핑

| 클릭 대상 | 이동 대상 |
|-----------|-----------|
| MAIN 좌측 `profile` | `#about` |
| MAIN 좌측 `Publishing` | `#web` |
| MAIN 좌측 `UI/UX design` | `#uiux` |
| MAIN 좌측 `Team Project` | `#uiux` (팀 프로젝트 포함) |
| MAIN 좌측 `Contact` | `#contact` |
| 갈피 탭 각 항목 | 해당 섹션 hash |

---

## 10. 하단 탭 메뉴 표시/숨김 규칙

### 데스크톱 (1440px+)
- 갈피 탭(`.bookmark-tabs`): 각 섹션 상단 우측 고정 표시
- `.mobile-nav`: `display: none`
- MAIN 화면: 갈피 탭 없음 (MAIN에는 `.bookmark-tabs` 미포함)

### 태블릿 (768~1439px)
- 갈피 탭 표시 유지, 너비 축소 조정
- `.mobile-nav`: `display: none`

### 모바일 (767px 이하)
- 갈피 탭(`.bookmark-tabs`): `display: none`
- `.mobile-nav`: `display: flex` (position:fixed; bottom:0; left:0; right:0)
- 모바일 탭 높이: 60px
- 아이콘 또는 텍스트 + 활성 시 오렌지 색상

### 화면별 탭 표시 예외
| 화면 | 갈피 탭 | 모바일 하단 탭 |
|------|---------|---------------|
| MAIN | 없음 | 있음 (홈 활성) |
| ABOUT~CONTACT | 있음 (데스크톱) | 있음 (모바일) |

---

## 11. 모달/바텀시트 처리 방식

### 그래픽 카드 상세 모달
```html
<div class="modal-overlay" id="modalOverlay">
  <div class="modal-box" id="modalBox">
    <button class="modal-close">×</button>
    <img class="modal-img">
    <p class="modal-title"></p>
    <p class="modal-desc"></p>
  </div>
</div>
```
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: none;
  place-items: center;
  z-index: 1000;
}
.modal-overlay.is-open { display: grid; }
.modal-box {
  max-width: 800px;
  width: 90%;
  border-radius: 20px;
  background: #fff;
  padding: 24px;
}
```
- 열기: 카드 클릭 → `modal-overlay.classList.add('is-open')`
- 닫기: ESC 키 / 오버레이 배경 클릭 / × 버튼

### WEB/UIUX 프로젝트 상세 (모바일 바텀시트)
```css
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 20px 20px 0 0;
  background: #fff;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 900;
}
.bottom-sheet.is-open { transform: translateY(0); }
```
- 데스크톱: 탭 클릭 시 인라인 콘텐츠 교체 (바텀시트 없음)
- 모바일: 바텀시트 슬라이드업 + 드래그 핸들

---

## 12. 샘플 데이터 구조

### 그래픽 작업물
```js
{
  id: 'g1',
  title: '유튜브 썸네일',
  category: 'Graphic Design',
  thumb: 'assets/graphic/thumbnail.jpg',
  images: ['assets/graphic/thumbnail_1.jpg'],
  tools: ['Photoshop', 'Illustrator'],
  desc: '유튜브 채널 썸네일 디자인 작업',
  year: 2024
}
```

### 웹 퍼블리싱 프로젝트
```js
{
  id: 'ankorea',
  name: '앤코리아',
  category: 'Web Publishing',
  thumb: 'assets/web/ankorea.jpg',
  screens: ['assets/web/ankorea_01.jpg'],
  skills: ['HTML', 'CSS', 'JavaScript'],
  liveUrl: '',
  desc: '앤코리아 웹사이트 퍼블리싱',
  period: '2025.06'
}
```

### UI/UX 프로젝트
```js
{
  id: 'craft',
  name: '서울공예박물관',
  category: 'UI/UX Design',
  thumb: 'assets/uiux/craft.jpg',
  figmaUrl: '',
  tools: ['Figma'],
  isTeam: false,
  desc: '서울공예박물관 UX 리디자인',
  period: '2025.03'
}
```

---

## 13. 이후 Supabase 연결을 고려한 구조

### 데이터 레이어 분리 원칙
- `data.js`의 `fetchData(type)` 함수가 유일한 데이터 접근 지점
- Phase 1(현재): 로컬 배열 반환
- Phase 2(Supabase): 함수 내부만 교체, 호출부 변경 없음

### Supabase 전환 시 변경 범위
```js
// data.js 내부만 수정
export async function fetchData(type) {
  // 현재
  return localData[type] ?? [];

  // Supabase 전환 후
  const { data, error } = await supabase.from(type).select('*');
  if (error) throw error;
  return data;
}
```

### 예상 Supabase 테이블 구조
| 테이블명 | 주요 컬럼 |
|----------|-----------|
| `graphic_works` | id, title, thumb_url, images (jsonb), tools (array), desc, year |
| `web_projects` | id, name, thumb_url, screens (jsonb), skills (array), live_url, desc, period |
| `uiux_projects` | id, name, thumb_url, figma_url, tools (array), is_team, desc, period |

### Supabase Storage 이미지 URL 패턴
```
{SUPABASE_URL}/storage/v1/object/public/portfolio/{폴더}/{파일명}
```

---

## 14. 구현 순서

### Phase 1: 기반 구조 세팅 (1일차 전반)
1. `index.html` 기본 뼈대 + 6개 `<section>` 작성
2. `css/reset.css`, `css/variables.css` 작성
3. `js/router.js` — hash 기반 화면 전환 구현 및 테스트
4. 폰트 CDN 4종 연결 확인 (Pretendard, S-Core Dream, Coming Soon, AppleSDGothicNeoEB00)

### Phase 2: 공통 컴포넌트 (1일차 후반)
5. `css/common.css` — 갈피 탭, 페이지 타이틀, 종이 배경, 그림자 레이어
6. 갈피 탭 렌더링 및 활성화 JS 로직

### Phase 3: 각 화면 마크업 + CSS (2~3일차)
7. MAIN — 좌측 네비, 워드서치 격자, 소개 문구
8. ABOUT — 프로필 패널, 스킬 원형 게이지, 학력/경력 타임라인
9. GRAPHIC — 카드 슬라이더 마크업 + CSS
10. WEB — 프로젝트 탭 + 콘텐츠 영역
11. UI/UX — WEB과 동일 패턴 적용
12. CONTACT — Thank You 타이포 + 연락처 표

### Phase 4: JavaScript 인터랙션 (3~4일차)
13. `wordSearch.js` — 격자 렌더링 + 타원 pill 오버레이
14. `skillCircle.js` — conic-gradient 게이지 렌더링
15. `slider.js` — 그래픽 카드 슬라이더 + 키보드 지원
16. `projectTab.js` — WEB/UIUX 탭 전환 + 콘텐츠 렌더링
17. 모달 오픈/닫힘 구현

### Phase 5: 반응형 + 마무리 (4~5일차)
18. `css/responsive.css` — 태블릿/모바일 미디어 쿼리
19. 모바일 하단 탭 네비(`.mobile-nav`) 구현
20. 애니메이션: 화면 전환 fade, hover 형광펜, 카드 등장 IntersectionObserver
21. 이미지 Lazy Loading 적용
22. 크로스 브라우저 (Chrome/Safari/Edge) 확인

---

## 15. 테스트 체크리스트

### 화면 전환
- [ ] URL hash 변경 시 올바른 섹션 표시
- [ ] 갈피 탭 클릭 시 활성 탭 상태 변경
- [ ] MAIN 좌측 네비 링크 → 해당 화면 이동
- [ ] 브라우저 뒤로가기/앞으로가기 동작
- [ ] hash 없을 때 MAIN 화면 표시

### MAIN
- [ ] 워드서치 격자 8×9 알파벳 Figma와 동일하게 표시
- [ ] DESIGN, PORTFOLIO, WEB 오렌지 하이라이트 정확
- [ ] 타원 pill 위치·크기·각도 Figma와 일치
- [ ] 소개 문구 폰트 (S-Core Dream Light/Medium) 적용
- [ ] 좌측 네비 Coming Soon 폰트 적용

### ABOUT
- [ ] 프로필 사진 border-radius: 50px 표시
- [ ] 원형 게이지 퍼센트 정확히 표시 (conic-gradient)
- [ ] 해시태그 버튼 오렌지 border 1.5px, rounded-12px
- [ ] 학력·교육·경력 데이터 정확히 표시
- [ ] 배경 워터마크 "PROFILE" (#c8c8c8) 표시

### GRAPHIC
- [ ] 카드 4개 초기 표시 (310px × 420px)
- [ ] next 화살표 클릭 시 슬라이드 이동
- [ ] 카드 이미지 없을 때 #e5e5e5 placeholder 표시
- [ ] 카드 클릭 시 모달 팝업 오픈
- [ ] ESC / 오버레이 클릭으로 모달 닫힘

### WEB / UI·UX
- [ ] 하단 탭 클릭 시 활성 탭 변경 및 콘텐츠 교체
- [ ] 활성 탭 오렌지 bar (6px) 표시
- [ ] TOP 버튼 클릭 시 섹션 상단 스크롤
- [ ] 콘텐츠 영역 배경 #e5e5e5 표시

### CONTACT
- [ ] "Thank You" Coming Soon 폰트, 96px, 오렌지 표시
- [ ] 연락처 라벨 S-Core Dream 4_Regular 36px
- [ ] 각 항목 하단 구분선 표시
- [ ] 저작권 Inter 폰트 적용

### 반응형
- [ ] 데스크톱(1440+): 갈피 탭 우측 상단 표시, 모바일 탭 숨김
- [ ] 태블릿(768~1439): 레이아웃 적절히 축소, 갈피 탭 유지
- [ ] 모바일(~767): 갈피 탭 숨김, 하단 탭 네비 표시
- [ ] 모바일: 바텀시트 슬라이드 동작

### 공통 품질
- [ ] 4종 폰트 모두 적용 확인
- [ ] 오렌지(#ff6200) 포인트 컬러 일관성
- [ ] 종이 질감 배경 모든 화면 표시
- [ ] 이미지 Lazy Loading (loading="lazy") 동작
- [ ] 접근성: 탭 포커스 순서, img alt 텍스트, aria 속성
- [ ] 크로스 브라우저: Chrome / Safari / Edge
