const avatars = document.querySelectorAll('.avatar');
const avatarForms = document.querySelectorAll('.content-avatar');

avatarForms.forEach((avatarForm) => {
    avatarForm.classList.add('removeUpload');
    avatarForm.addEventListener('change', previewImage);
});

function previewImage(e) {
    e.target.parentNode.parentNode.classList.remove('removeUpload');
    const currentAvatarForm = e.target.parentNode;

    const fileReader = new FileReader();
    fileReader.addEventListener('load', (e) => {
        const currentAvatar = currentAvatarForm.previousElementSibling;
        currentAvatar.src = e.target.result;
    });

    const file = e.target.files[0];
    fileReader.readAsDataURL(file);
}
