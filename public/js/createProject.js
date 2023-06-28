const titleInput = document.querySelector('input[name="title"]');
const levelInput = document.querySelector('input[name="level"]');
const descriptionInput = document.querySelector('textarea[name="description"]');
const descriptionCharCount = document.querySelector(
    '.description-char-counter'
);

const titleError = document.querySelector('[data-name="title"]');
const levelError = document.querySelector('[data-name="level"]');

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