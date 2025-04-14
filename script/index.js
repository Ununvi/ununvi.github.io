
const slider = document.querySelector('.project');
let isDown = false;
let startX, scrollLeft;
let isDragging = false;
let dragThreshold = 5;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  isDragging = false;
  startX = e.pageX;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  const x = e.pageX;
  const distance = x - startX;
  if (Math.abs(distance) > dragThreshold) isDragging = true;
  slider.scrollLeft = scrollLeft - distance;
});

slider.addEventListener('mouseup', (e) => {
  if (!isDragging) {

    const card = e.target.closest('.project_card');
    if (card && card.dataset.link) {
      window.open(card.dataset.link, '_blank');
    }
  }
  isDown = false;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
});

//모바일 대응
slider.addEventListener('touchstart', (e) => {
  isDown = true;
  isDragging = false;
  startX = e.touches[0].clientX;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchmove', (e) => {
  if (!isDown) return;
  const x = e.touches[0].clientX;
  const distance = x - startX;
  if (Math.abs(distance) > dragThreshold) isDragging = true;
  slider.scrollLeft = scrollLeft - distance;
});

slider.addEventListener('touchend', (e) => {
  if (!isDragging) {
    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const card = element.closest('.project_card');
    if (card && card.dataset.link) {
      window.open(card.dataset.link, '_blank');
    }
  }
  isDown = false;
});

slider.addEventListener('click', (e) => {
  if (e.target.closest('.project_card')) return;
  if (isDragging) return;

  const isLeft = e.clientX < window.innerWidth / 2;
  const slideAmount = slider.offsetWidth * 0.9;

  slider.scrollLeft += isLeft ? -slideAmount : slideAmount;
});
