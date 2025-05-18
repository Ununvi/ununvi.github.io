const btn = document.querySelector('.hi-info');
let bounceTimer = null;
let isStopped = false;

function triggerBounce() {
  if (isStopped) return; // 중단되었으면 아무것도 하지 않음

  btn.classList.remove('bounce'); // 반복 트리거를 위해 제거
  void btn.offsetWidth; // 강제 리플로우
  btn.classList.add('bounce');

  // 다음 bounce까지의 시간 (1초~3초 사이 무작위)
  const nextBounce = Math.random() * 2000 + 1000;
  bounceTimer = setTimeout(triggerBounce, nextBounce);
}

// 버튼 클릭 시 애니메이션 멈춤
btn.addEventListener('click', () => {
  isStopped = true;
  clearTimeout(bounceTimer);
  btn.classList.remove('bounce'); // 남아있는 애니메이션도 제거
});

setTimeout(triggerBounce, 1000); // 처음 1초 후 시작