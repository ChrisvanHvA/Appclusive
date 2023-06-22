
const dog = document.querySelector('.mobileDog');
dog.addEventListener('click', () => { 
    dog.src = 'images/hulphond_closed.svg';
    setTimeout(resetMobile, 500);
    dog.setAttribute("id", "dognod");
});


function resetMobile() {
    dog.src = 'images/hulphond.svg';   
    dog.removeAttribute('id');
}


const dogDesktop = document.querySelector('.dog');
const desktopDog = document.querySelector('.desktopDog');
dogDesktop.addEventListener('click', () => { 
    desktopDog.src = 'images/hulphond_closed.svg';
    setTimeout(resetDesktop, 500);
    desktopDog.setAttribute("id", "dognod");
});


function resetDesktop() {
    desktopDog.src = 'images/hulphond.svg';   
    desktopDog.removeAttribute('id');
}
