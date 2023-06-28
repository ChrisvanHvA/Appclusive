const projectCardLinks = document.querySelectorAll('.allprojects-card > a');
const loadingState = document.querySelector('.loading');

projectCardLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        setTimeout(() => {
            loadingState?.classList.remove('hide');
        }, 500);
    });
});