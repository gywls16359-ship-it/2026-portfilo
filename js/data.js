/* Static data — replace fetchData() internals with Supabase later */

const localData = {
  graphic: [
    { id: 'g1', subtitle: 'AI Design',          title: '크로캉부슈 광고',       img: 'image/ai_1.jpg',         desc: 'AI 이미지 디자인' },
    { id: 'g2', subtitle: 'Promotion Banner',   title: '파파고 플러스 배너',    img: 'image/banner_2.jpg',     desc: '프로모션 배너 디자인' },
    { id: 'g3', subtitle: 'Event Promotion',    title: '이젠아카데미 이벤트',   img: 'image/youtube_2.jpg',    desc: '유튜브 채널 썸네일 디자인' },
    { id: 'g4', subtitle: 'Brand Campaign',     title: '이케아 프로모션',       img: 'image/eventpage_1.jpg',  desc: '이벤트 페이지 디자인' },
    { id: 'g5', subtitle: 'Promotion Banner',   title: '팝업 배너',             img: 'image/popup_1.jpg',      desc: '팝업 배너 디자인' },
  ],
  web: [
    { id: 'ankorea',  name: '앤코리아',      img: 'assets/web/ankorea.jpg',  skills: ['HTML','CSS','JS'], period: '2025.06', desc: '앤코리아 기업 웹사이트 퍼블리싱' },
    { id: 'bunjang',  name: '번개장터',      img: 'assets/web/bunjang.jpg',  skills: ['HTML','CSS','JS'], period: '2025.07', desc: '번개장터 UI 클론 퍼블리싱' },
    { id: 'sulbing',  name: '설빙',          img: 'assets/web/sulbing.jpg',  skills: ['HTML','CSS','JS'], period: '2025.08', desc: '설빙 반응형 웹사이트 퍼블리싱' },
    { id: 'cocktail', name: '퍼스널 칵테일', img: 'assets/web/cocktail.jpg', skills: ['HTML','CSS','JS'], period: '2025.09', desc: '퍼스널 칵테일 랜딩 페이지' },
  ],
  uiux: [
    { id: 'craft',  name: '서울공예박물관', img: 'assets/uiux/craft.jpg',  isTeam: false, tools: ['Figma'], period: '2025.03', desc: '서울공예박물관 UX 리디자인' },
    { id: 'heyeom', name: '헤이엄',        img: 'assets/uiux/heyeom.jpg', isTeam: false, tools: ['Figma'], period: '2025.05', desc: '헤이엄 앱 UI/UX 디자인' },
    { id: 'jeju',   name: '제주비건\n(team)', img: 'assets/uiux/jeju.jpg', isTeam: true,  tools: ['Figma'], period: '2025.07', desc: '제주비건 팀 프로젝트' },
    { id: 'timo',   name: '티모(팀원 매칭 앱)\n(team)', img: 'assets/uiux/timo.jpg', isTeam: true, tools: ['Figma'], period: '2025.09', desc: '티모 팀 매칭 앱 UI/UX' },
  ],
  skills: [
    { name: 'PHOTOSHOP',  pct: 90, label: '90%' },
    { name: 'FIGMA',      pct: 90, label: '90%' },
    { name: 'HTML · CSS', pct: 90, label: '90%' },
    { name: 'JAVA SCRIPT',pct: 90, label: '90%' },
    { name: 'VIBE CODING',pct: 85, label: '80~90%' },
  ],
};

export async function fetchData(type) {
  return localData[type] ?? [];
}

export const SKILLS_DATA = localData.skills;
