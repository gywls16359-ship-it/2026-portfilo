# CLAUDE.md

## 프로젝트 개요
HTML, CSS, JavaScript(Vanilla)만 사용하여 반응형 포트폴리오를 구현한다.

## 기술 스택
- HTML5 (Semantic)
- CSS3 (Flex/Grid, Custom Properties)
- Vanilla JavaScript
- GSAP 사용 가능(스크롤 애니메이션)

## 폰트
CDN 방식으로 연결한다.

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sunn-us/SCoreDreamFont@master/stylesheet.css">
```

### 폰트 규칙
- 폰트는 Pretendard와 Coming Soon,S-Core Dream,AppleSDGothicNeoEB00
- 한글 UI는 S-Core Dream를 주로 사용하되, 작은 폰트들은 Pretendard.
- 영문 로고와 주요 타이틀은 Coming Soon
-MAIN 화면 하단 한글은 S-Core Dream
-MAIN 화면 오른쪽 영어는 AppleSDGothicNeoEB00

## 디자인 원칙
- 피그마 디자인을 픽셀 단위로 최대한 동일하게 구현
- 여백, 타이포, 컬러 유지
- 화이트 + 오렌지 포인트
- 종이 질감 배경
- 부드러운 인터랙션

## 페이지 구성
1. Main
- 좌측 네비게이션
- 워드서치 스타일 HERO
- 소개문구

2. Profile
- 사진
- 소개
- Skills
- Education
- Experience
- Certificates

3. Graphic Design
- 카드 슬라이더
- 좌우 버튼

4. Web Publishing
- 프로젝트 탭
- 상세보기

5. UI/UX
- 프로젝트 목록
- 상세보기

6. Contact
- Thank You
- 연락처

## 반응형
Desktop 1440+
Tablet 768~1439
Mobile 767 이하

## 구현 원칙
- 시맨틱 마크업
- CSS 변수
- 접근성
- Lazy Loading
- 이미지 최적화
- IntersectionObserver 활용
- 모바일 햄버거 메뉴

## 애니메이션
- 메뉴 활성화
- Hover 형광펜 효과
- Fade / Slide
- 카드 등장 애니메이션

## 코드 규칙
css/
js/
images/
assets/
index.html

BEM 네이밍
ES6 사용
