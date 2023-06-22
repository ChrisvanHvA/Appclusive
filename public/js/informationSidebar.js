const sidebarContainer = document.querySelector('.checklist__sidebar');

let resizeTimer;

const noTransitionOnResize = () => {
    sidebarContainer.classList.add('no-transition');

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        sidebarContainer.classList.remove('no-transition');
    }, 100);
};

if (sidebarContainer) {
    window.addEventListener('resize', noTransitionOnResize);
}

export default noTransitionOnResize;