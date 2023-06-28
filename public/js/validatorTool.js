const form = document.querySelector('.validator__form');
const loadingState = document.querySelector('.loading');
const errorState = document.querySelector('.validator__error');

form?.addEventListener('submit', (e) => {
    e.preventDefault();
    // check if value is larger than 2048
    const html = document.querySelector('.validator__text').value;
    if(html.length > 2048) {
        errorState?.classList.remove('hide');
        errorState.textContent = 'HTML is too large. Please enter a smaller HTML file.'
    }else {
        loadingState?.classList.remove('hide');
        form.submit();
    }
    
})


