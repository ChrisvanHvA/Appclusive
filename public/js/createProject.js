const form = document.querySelector('form');
const titleInput = document.querySelector('input[name="title"]');
const levelInput = document.querySelector('input[name="level"]');
const descriptionInput = document.querySelector(
    'textarea[name="description"]'
);
const descriptionCharCount = document.querySelector(
    '.description-char-counter'
);

// check if description input and char counter exist, if so, update char counter on input
if (descriptionInput && descriptionCharCount) {
	const maxChars = descriptionInput.getAttribute('maxlength');

	if (maxChars) {
		descriptionInput.addEventListener('input', () => {
			descriptionCharCount.textContent = `${descriptionInput.value.length}/${maxChars}`;
		});
		// dispatch input event to update char counter on page load
		descriptionInput.dispatchEvent(new Event('input'));
	}
}

const validateForm = (e) => {
	const title = titleInput?.value;
	const level = levelInput?.value;
    const errors = {};

    if (!title) {
        errors.title = 'Title is required';
    }

    if (!level) {
        errors.level = 'An accessibility level is required';
    }

    return errors;
};

form?.addEventListener('submit', validateForm);
