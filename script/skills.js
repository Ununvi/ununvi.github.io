const items = document.querySelectorAll(".floating-item");
const descriptionBox = document.getElementById("description");

// 설명 내용들 (각 설명에 CSS 클래스 추가)
const descriptions = {
    1: "<div class='description-type'>Design</div><div class='description-title'>Photoshop</div><div class='description-type'>Strength</div><div class='description-text'>색감 보정, 합성<br>사진 편집, 영상 편집<br>스크린 디자인, 그래픽</div>",
    2: "<div class='description-type'>Design</div><div class='description-title'>Illustrator</div><div class='description-type'>Strength</div><div class='description-text'>로고, 아이콘<br>타이포그래피<br>일러스트레이션</div>",
    3: "<div class='description-type'>UXUI</div><div class='description-title'>Adobe XD</div><div class='description-type'>Strength</div><div class='description-text'>벡터 기반 디자인<br>프로토타이핑<br>반응형 웹 제작</div>",
    4: "<div class='description-type'>IDE</div><div class='description-title'>Dreamweaver</div><div class='description-type'>Strength</div><div class='description-text'>웹 문서 구조 정의, 목록<br>내비게이션, 멀티미디어<br>시멘틱, 인터랙티브 요소</div>",
    5: "<div class='description-type'>UXUI</div><div class='description-title'>Figma</div><div class='description-type'>Strength</div><div class='description-text'>반응형 디자인<br>컴포넌트 제작<br>프로토타이핑</div>",
    6: "<div class='description-type'>Markup Language</div><div class='description-title'>HTML5</div><div class='description-type'>Strength</div><div class='description-text'>웹 문서 구조 정의, 목록<br>내비게이션, 멀티미디어<br>시멘틱, 인터랙티브 요소</div>",
    7: "<div class='description-type'>stylesheet language</div><div class='description-title'>CSS3</div><div class='description-type'>Strength</div><div class='description-text'>레이아웃, 객체 배치, 스타일링<br>애니메이션, 반응형 웹, 인터렉션<br>사용자 경험 개선, 다크모드</div>",
    8: "<div class='description-type'>script language</div><div class='description-title'>JavaScript</div><div class='description-type'>Strength</div><div class='description-text'>이벤트 처리, 사용자 입력 처리<br>애니메이션, 인터랙션, 로컬 저장<br>객체 조작, 반응형 웹 사이트 구현</div>"
};

// ✅ 요소들의 개별 위치 설정
const positions = [
    { top: "30%", left: "10%" },
    { top: "30%", left: "40%" },
    { top: "50%", left: "60%" },
    { top: "85%", left: "75%" },
    { top: "20%", left: "70%" },
    { top: "40%", left: "50%" },
    { top: "60%", left: "30%" },
    { top: "80%", left: "20%" }
];

items.forEach((item, index) => {
    // ✅ 각 요소를 지정된 위치로 배치
    item.style.top = positions[index].top;
    item.style.left = positions[index].left;

    // ✅ 애니메이션 속도를 랜덤하게 변경
    const duration = Math.random() * 3 + 2; // 2~5초 사이의 랜덤 속도
    item.style.animationDuration = `${duration}s`;

    // ✅ 클릭하면 설명 변경
    item.addEventListener("click", () => {
        const descriptionText = descriptions[index + 1]; // descriptions 객체에서 클릭된 항목에 해당하는 설명을 가져옴
        descriptionBox.innerHTML = descriptionText; // innerHTML을 사용하여 <br> 태그와 클래스 적용
    });
});
