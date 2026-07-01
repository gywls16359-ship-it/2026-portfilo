/* Pin 갤러리 구간(graphic ~ uiux pin 종료) scroll-snap 비활성화 */

export function initGalleryScrollSnap() {
  const graphic = document.getElementById('graphic');
  const contact = document.getElementById('contact');
  if (!graphic || !contact) return;

  ScrollTrigger.create({
    id: 'gallery-scroll-snap',
    trigger: graphic,
    endTrigger: contact,
    start: 'top top',
    end: 'top top',
    onToggle(self) {
      const on = self.isActive;
      document.documentElement.classList.toggle('is-pin-scrolling', on);
      document.body.classList.toggle('is-pin-scrolling', on);
      document.documentElement.style.scrollSnapType = on ? 'none' : '';
    },
  });
}
