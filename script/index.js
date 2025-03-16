document.addEventListener("DOMContentLoaded", () => {
    const indexSection = document.querySelector("#index");
    const projectCards = document.querySelectorAll(".project_card");
    
    const observerOptions = {
        threshold: 0.5 // index 섹션이 화면의 50% 이상 보일 때
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add("animate-up");
                    }, index * 200);
                });
            } else {
                projectCards.forEach(card => {
                    card.classList.remove("animate-up");
                });
            }
        });
    }, observerOptions);
    
    observer.observe(indexSection);
});