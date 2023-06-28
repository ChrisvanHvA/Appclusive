const init = () => {
	const currentTheme = localStorage.getItem('theme');
	document.documentElement.setAttribute('data-theme', currentTheme || 'light');

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
	console.log(theme);
};

init();