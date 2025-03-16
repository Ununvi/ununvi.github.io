document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    // 스크롤 이벤트로 섹션 나타나게 하기
    const revealSections = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight * 0.85) {
                section.classList.add("show");
            }
        });
    };

    window.addEventListener("scroll", revealSections);
    revealSections(); // 초기화

    // 마우스 커서 효과
    document.addEventListener("mousemove", (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    document.addEventListener("mousedown", () => {
        cursor.style.transform += " scale(1.5)";
    });

    document.addEventListener("mouseup", () => {
        cursor.style.transform = cursor.style.transform.replace(" scale(1.5)", "");
    });
});