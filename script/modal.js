const openBtn = document.getElementById('openBtn');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const pages = document.querySelectorAll('.page');

// 팝업 열기
openBtn.addEventListener('click', () => {
    overlay.classList.add('active'); // 오버레이에 active 클래스 추가
    modal.style.display = 'block';
    setTimeout(() => {
        modal.style.left = '10px'; // 애니메이션 효과 적용
    }, 10);

    // 1번째 장을 항상 보이게 설정
    currentPage = 0;
    pages.forEach(page => page.classList.remove('active')); // 모든 페이지 비활성화
    pages[currentPage].classList.add('active'); // 첫 번째 장 활성화

    // 버튼 상태 업데이트
    updateButtonState();
});

// 팝업 닫기 (오버레이 클릭 시 모달 닫기)
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', (event) => {
    // 오버레이를 클릭했을 때만 모달을 닫도록
    if (event.target === overlay) {
        closeModal();
    }
});

// 페이지 전환
let currentPage = 0;

nextBtn.addEventListener('click', () => {
    if (currentPage < pages.length - 1) {
        pages[currentPage].classList.remove('active');
        currentPage++;
        pages[currentPage].classList.add('active');

        // 버튼 상태 업데이트
        updateButtonState();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        pages[currentPage].classList.remove('active');
        currentPage--;
        pages[currentPage].classList.add('active');

        // 버튼 상태 업데이트
        updateButtonState();
    }
});

// 버튼 상태 업데이트 함수
function updateButtonState() {
    // 첫 번째 장일 때
    if (currentPage === 0) {
        prevBtn.style.color = '#ddd'; // 첫 번째 장에서는 prev-btn 회색
        nextBtn.style.color = 'black'; // next-btn은 정상 컬러
    }
    // 두 번째 장일 때
    else if (currentPage === 1) {
        prevBtn.style.color = 'black'; // prev-btn은 정상 컬러
        nextBtn.style.color = '#ddd'; // 두 번째 장에서는 next-btn 회색
    }
}

// 모달 닫기 함수
function closeModal() {
    modal.style.left = '-300px'; // 모달 닫히는 애니메이션
    setTimeout(() => {
        modal.style.display = 'none';
        overlay.classList.remove('active'); // 오버레이도 숨기기
    }, 300); // 애니메이션 시간(0.3초) 후 숨기기
}

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
