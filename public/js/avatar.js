const avatar = document.querySelector('#avatar');
let avatarForm = document.querySelector('.content-avatar');
avatarForm.classList.add('removeUpload');
avatarForm.addEventListener('change', previewImage);

function previewImage(e) {
    avatarForm.classList.remove('removeUpload');
    avatarForm = e.target;

    const fileReader = new FileReader();
    fileReader.addEventListener('load', (e) => {
        avatar.src = e.target.result;
    });

    const file = avatarForm.files[0];
    fileReader.readAsDataURL(file);
}
