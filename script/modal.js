const openBtn = document.getElementById('openBtn');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const pages = document.querySelectorAll('.page');

openBtn.addEventListener('click', () => {
    overlay.classList.add('active')
    modal.style.display = 'block';
    setTimeout(() => {
        modal.style.left = '10px';
    }, 10);

    currentPage = 0;
    pages.forEach(page => page.classList.remove('active'));
    pages[currentPage].classList.add('active');

    updateButtonState();
});

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', (event) => {

    if (event.target === overlay) {
        closeModal();
    }
});

let currentPage = 0;

nextBtn.addEventListener('click', () => {
    if (currentPage < pages.length - 1) {
        pages[currentPage].classList.remove('active');
        currentPage++;
        pages[currentPage].classList.add('active');

        updateButtonState();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        pages[currentPage].classList.remove('active');
        currentPage--;
        pages[currentPage].classList.add('active');

        updateButtonState();
    }
});

function updateButtonState() {
    if (currentPage === 0) {
        prevBtn.style.color = '#ddd';
        nextBtn.style.color = 'black';
    }
    else if (currentPage === 1) {
        prevBtn.style.color = 'black';
        nextBtn.style.color = '#ddd';
    }
}

function closeModal() {
    modal.style.left = '-300px';
    setTimeout(() => {
        modal.style.display = 'none';
        overlay.classList.remove('active');
    }, 300);
}

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
