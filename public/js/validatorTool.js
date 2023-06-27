const form = document.querySelector('.validator__form');
const loadingState = document.querySelector('.loading');

form?.addEventListener('submit', () => {
    loadingState?.classList.remove('hide');
})
