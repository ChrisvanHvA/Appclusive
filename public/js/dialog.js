const levelDescriptionBtn = document.querySelector('.btn--acc');
const dialog = document.querySelector('.dialog-level');

levelDescriptionBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    dialog?.showModal();
});