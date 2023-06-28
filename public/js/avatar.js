const previewImage = (e) => {
	const currentAvatarForm = e.currentTarget.closest('.content-avatar');
	currentAvatarForm.classList.remove('removeUpload');

    const fileReader = new FileReader();
    fileReader.addEventListener('load', (e) => {
		const currentAvatar = currentAvatarForm.querySelector('img');
        currentAvatar.src = e.target.result;
    });

    const file = e.target.files[0];
    fileReader.readAsDataURL(file);
}

const avatars = document.querySelectorAll('.avatar');
const avatarForms = document.querySelectorAll('.content-avatar');
const avatarInputs = document.querySelectorAll('.content-avatar input[type="file"]');

avatarInputs.forEach((avatarInput, i) => {
    avatarForms[i].classList.add('removeUpload');
    avatarInput.addEventListener('change', previewImage);
});