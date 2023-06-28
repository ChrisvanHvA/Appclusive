const initTheme = () => {
    const currentTheme = localStorage.getItem('theme');
    document.documentElement.setAttribute(
        'data-theme',
        currentTheme || 'light'
    );

    const themeButtons = document.querySelectorAll('input[name="theme"]');
    themeButtons.forEach((button) => {
        button.addEventListener('change', changeTheme);
        button.value === currentTheme && button.setAttribute('checked', true);
    });
};

const changeTheme = (e) => {
    const theme = e.currentTarget.value;
    localStorage.setItem('theme', theme || 'light');
    document.documentElement.setAttribute('data-theme', theme);
};

// add and remove loading states
const loadingState = document.querySelector('.loading');

const loadStateToggles = document.querySelectorAll(
    `.layout__login form, 
	.layout__categories .category__item > a, 
	.layout__project-create form, 
	.layout__dashboard .allprojects-card > a,
	.layout__validator validator__form,
	header.page-title a`
);

let loadingStateTimeout;
const addLoadingState = () => {
    loadingStateTimeout = setTimeout(() => {
    	loadingState.classList.remove('hide');
    }, 300);
};

if (loadingState) {
    loadStateToggles.forEach((toggle) => {
        if (toggle.tagName === 'FORM') {
            toggle.addEventListener('submit', addLoadingState);
        } else {
            toggle.addEventListener('click', addLoadingState);
        }
    });
}

window.addEventListener('pagehide', () => {
	loadingStateTimeout && clearTimeout(loadingStateTimeout);
	loadingState.classList.add('hide');
});

initTheme();
