const form = document.querySelector('form');
const titleInput = document.querySelector('input[name="title"]');
const levelInput = document.querySelector('input[name="level"]');
const descriptionInput = document.querySelector(
    'textarea[name="description"]'
);
const descriptionCharCount = document.querySelector(
    '.description-char-counter'
);
const loadingState = document.querySelector('.loading');

const titleError = document.querySelector('label[for="title"] span.formerror');
const levelError = document.querySelector('label[for="level"] span.formerror');

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
	if (titleError) {
		titleError.textContent = '';

		if (!titleInput?.value) {
			e.preventDefault();
			titleError.textContent = 'A title is required';
		}
	}

	if (levelError) {
		levelError.textContent = '';
		
		if (!levelInput?.value) {
			e.preventDefault();
			levelError.textContent = 'An accessibility level is required';
		}
	}

	// while loading, show loading state


	if(titleInput?.value && levelInput?.value) {
		loadingState?.classList.remove('hide');
	}

};

form?.addEventListener('submit', validateForm);
