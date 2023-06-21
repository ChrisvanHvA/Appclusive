const levelDescriptionBtn = document.querySelector('.btn--acc');

if (levelDescriptionBtn) {
    levelDescriptionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const dialog = document.querySelector('.dialog-level');
        dialog.showModal();
    });
}