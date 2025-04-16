const cursorDot = document.querySelector('.cursor-dot');
const cursorFollow = document.querySelector('.cursor-follow');

let mouseX = 0;
let mouseY = 0;
let followX = 0;
let followY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

// 부드러운 따라가기
function animate() {
  followX += (mouseX - followX) * 0.1;
  followY += (mouseY - followY) * 0.1;

  cursorFollow.style.transform = `translate(${followX - 15}px, ${followY - 15}px)`; // 가운데 정렬

  requestAnimationFrame(animate);
}

animate();