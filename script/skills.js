const items = document.querySelectorAll(".floating-item");
const descriptionBox = document.getElementById("description");
const lines = document.querySelectorAll(".floating-line");

const descriptions = {
    1: "<div class='description-title'>Photoshop</div><div class='description-type'>Strength</div><div class='description-text'>색감 보정, 합성<br>사진 편집, 영상 편집<br>스크린 디자인, 그래픽</div>",
    2: "<div class='description-title'>Illustrator</div><div class='description-type'>Strength</div><div class='description-text'>로고, 아이콘<br>타이포그래피<br>일러스트레이션</div>",
    3: "<div class='description-title'>XD</div><div class='description-type'>Strength</div><div class='description-text'>벡터 기반 디자인<br>프로토타이핑<br>반응형 웹 제작</div>",
    4: "<div class='description-title'>Dreamweaver</div><div class='description-type'>Strength</div><div class='description-text'>웹 문서 구조 정의, 목록<br>내비게이션, 멀티미디어<br>시멘틱, 인터랙티브 요소</div>",
    5: "<div class='description-title'>Figma</div><div class='description-type'>Strength</div><div class='description-text'>반응형 디자인<br>컴포넌트 제작<br>프로토타이핑</div>",
    6: "<div class='description-title'>HTML5</div><div class='description-type'>Strength</div><div class='description-text'>웹 문서 구조 정의, 목록<br>내비게이션, 멀티미디어<br>시멘틱, 인터랙티브 요소</div>",
    7: "<div class='description-title'>CSS3</div><div class='description-type'>Strength</div><div class='description-text'>레이아웃, 객체 배치, 스타일링<br>애니메이션, 반응형 웹, 인터렉션<br>사용자 경험 개선, 다크모드</div>",
    8: "<div class='description-title'>JavaScript</div><div class='description-type'>Strength</div><div class='description-text'>이벤트 처리, 사용자 입력 처리<br>애니메이션, 인터랙션, 로컬 저장<br>객체 조작, 반응형 웹 사이트 구현</div>"
};

const positions = [
    { top: "30%", left: "10%" },
    { top: "30%", left: "40%" },
    { top: "42%", left: "50%" },
    { top: "85%", left: "56%" },
    { top: "20%", left: "70%" },
    { top: "52%", left: "67%" },
    { top: "60%", left: "30%" },
    { top: "80%", left: "20%" }
];


items.forEach((item, index) => {
    item.style.top = positions[index].top;
    item.style.left = positions[index].left;

    const duration = Math.random() * 3 + 2;
    item.style.animation = `floatAnimation ${duration}s ease-in-out infinite alternate`;

    item.addEventListener("click", () => {
        const descriptionText = descriptions[index + 1];
        descriptionBox.innerHTML = descriptionText;
    });
});

function selectItem(selectedElement) {
    const items = document.querySelectorAll('.floating-item');
    items.forEach(item => item.classList.remove('selected'));
    selectedElement.classList.add('selected');
  }
