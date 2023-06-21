const dialogs = document.querySelectorAll('.dialog');

const levelDescriptionBtn = document.querySelector('.btn--acc');

if (levelDescriptionBtn) {
    levelDescriptionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const dialogClass = '.dialog-level'; // Replace with the specific dialog class
        const dialog = document.querySelector(dialogClass);
        if (dialog) {
            dialog.showModal();
        }
    });
}

