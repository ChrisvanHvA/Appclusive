const form = document.querySelector('.layout__login form');
const loadingState = document.querySelector('.loading');

form?.addEventListener('submit', () => {
    setTimeout(() => {
        loadingState?.classList.remove('hide');
    }, 500);
})
