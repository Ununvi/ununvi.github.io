const openBtn = document.getElementById('openBtn');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');

// 팝업 열기
openBtn.addEventListener('click', () => {
  overlay.style.display = 'block';
  modal.style.display = 'block';
  setTimeout(() => {
    modal.style.left = '10px'; // 애니메이션 효과 적용
  }, 10);
});

// 팝업 닫기
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// 스와이프 제스처로 모달 닫기 (간단한 구현, 터치 이벤트 활용)
overlay.addEventListener('touchstart', handleSwipeStart);
let touchStartX = 0;

function handleSwipeStart(event) {
  touchStartX = event.touches[0].clientX;
}

overlay.addEventListener('touchend', (event) => {
  const touchEndX = event.changedTouches[0].clientX;
  if (touchEndX - touchStartX > 100) {
    closeModal();
  }
});

// 모달 닫기 함수
function closeModal() {
  modal.style.left = '-200px'; // 모달 닫히는 애니메이션
  setTimeout(() => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  }, 300); // 애니메이션 시간(0.3초) 후 숨기기
}