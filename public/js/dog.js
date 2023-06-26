const dogMobile = document.querySelector('.mobileDog');
dogMobile?.addEventListener('click', () => {
    dogMobile.src = 'images/hulphond_closed.svg';

    setTimeout(() => {
        dogMobile.src = 'images/hulphond.svg';
        dogMobile.removeAttribute('id');
    }, 500);

    dogMobile.setAttribute('id', 'dognod');
});

const dogContainer = document.querySelector('.dog');
const dogDesktop = document.querySelector('.desktopDog');
dogContainer?.addEventListener('click', () => {
    dogDesktop.src = 'images/hulphond_closed.svg';

    setTimeout(() => {
        dogDesktop.src = 'images/hulphond.svg';
        dogDesktop.removeAttribute('id');
    }, 500);

    dogDesktop.setAttribute('id', 'dognod');
});