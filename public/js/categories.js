import noTransitionOnResize from './informationSidebar.js';

const flipCardCheckboxes = document.querySelectorAll('input[id^="flip"]');

// zorgt ervoor dat je de checkbox kan aanvinken met de spatiebalk (niet voor alle browsers de default)
flipCardCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			checkbox.checked = !checkbox.checked;
		}
	});
});
