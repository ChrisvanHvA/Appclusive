const backDrop = document.querySelector('.checklist__sidebar .backdrop');
const sidebarToggle = document.querySelector('.checklist__sidebar > input');

const closeSidebar = () => {
    sidebarToggle.checked = false;
};

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		closeSidebar();
	}
});

backDrop?.addEventListener('click', closeSidebar);

sidebarToggle?.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		sidebarToggle.checked = !sidebarToggle.checked;
	}
});