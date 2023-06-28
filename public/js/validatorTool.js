const errorState = document.querySelector('.validator__error');
const errorStateContent = document.querySelector('.validator__error > p');

form?.addEventListener('submit', (e) => {
    e.preventDefault();
    // check if value is larger than 2048
    const html = document.querySelector('.validator__text').value;
    if (html.length > 10000) {
        errorState?.classList.remove('hide');
        errorStateContent.textContent =
            'HTML is too large. Please enter a smaller HTML file.';
    } else {
        form.submit();
    }
});