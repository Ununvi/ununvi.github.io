function hideTag(element) {
    const tag = element.parentElement; // 삭제 버튼의 부모인 .tag 요소를 선택
    tag.classList.add("hidden"); // .hidden 클래스를 추가해 태그를 숨김

    // 5초 후에 다시 보이도록 설정
    setTimeout(() => {
        tag.classList.remove("hidden"); // .hidden 클래스를 제거해 태그를 다시 보이게 함
        tag.classList.add("visible"); // 다시 보이게 할 때 visible 클래스를 추가
    }, 2000); // 2000ms (2초)

    // 태그가 5초 후에 다시 보이도록 클래스 추가
    setTimeout(() => {
        tag.classList.remove("visible"); // 애니메이션을 위한 클래스 제거
    }, 2500); // 애니메이션을 0.5초로 설정하였으므로, 2.5초 뒤에 클래스를 제거
}