const descriptionInput = document.querySelector(
    'textarea[name="project_description"]'
);
const descriptionCharCount = document.querySelector(
    '.description-char-counter'
);

// check if description input and char counter exist, if so, update char counter on input
if (descriptionInput && descriptionCharCount) {
	const maxChars = descriptionInput.getAttribute('maxlength') || 500;
    descriptionInput.addEventListener('input', () => {
        descriptionCharCount.textContent = `${descriptionInput.value.length}/${maxChars}`;
    });
	// dispatch input event to update char counter on page load
    descriptionInput.dispatchEvent(new Event('input'));
}
