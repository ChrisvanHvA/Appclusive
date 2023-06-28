// import does not need to be called, it will run automatically
import noTransitionOnResize from './informationSidebar.js';

const flipCardCheckboxes = document.querySelectorAll('input[id^="flip"]');

// allows you to tick the checkbox with the space bar (not the default for all browsers)
flipCardCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            checkbox.checked = !checkbox.checked;
        }
    });
});

const progressBar = document.querySelector('.checklist__sidebar .progress');
const dialog = document.querySelector('.dialog-project_finished');

if (progressBar.value === progressBar.max) {
    dialog
        ? setTimeout(() => {
              dialog.showModal();
          }, 1000)
        : null;
}

const categoryLinks = document.querySelectorAll('.category__item > a');
const loadingState = document.querySelector('.loading');

categoryLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        setTimeout(() => {
            loadingState?.classList.remove('hide');
        }, 500);
    });
});
