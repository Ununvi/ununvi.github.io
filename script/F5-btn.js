const scrollToTopSmoothly = (event) => {
    event.preventDefault(); // 링크 클릭 시 기본 동작인 페이지 이동을 막습니다.

    // 현재 위치에서 top: 0으로 부드럽게 스크롤 이동
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 부드러운 스크롤 효과
    });

    // 스크롤 후 페이지 새로 고침 방어 (스크롤 이후 위치 유지 방어)
    setTimeout(() => {
        window.location.reload(); // 페이지 새로 고침
    }, 500); // 스크롤 후 약간의 딜레이를 주고 새로 고침
};

// F5 링크에 이벤트 리스너 추가
document.getElementById('F5').addEventListener('click', scrollToTopSmoothly);
