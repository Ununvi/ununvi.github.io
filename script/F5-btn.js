const scrollToTopSmoothly = (event) => {
    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    setTimeout(() => {
        window.location.reload();
    }, 500);
};

document.getElementById('F5').addEventListener('click', scrollToTopSmoothly);
