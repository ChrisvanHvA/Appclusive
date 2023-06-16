const projectId = document.querySelector('.hidden-project-id').value;
const checkboxes = document.querySelectorAll('.checklist__checkbox');

const init = () => {
    const checklistItemsCheckboxes = document.querySelectorAll(
        '[data-checklist-button]'
    );

    checklistItemsCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', submitHandler);
    });
};

const submitHandler = async (e) => {
    e.preventDefault();

    const wcagItemId = document.querySelector('input[name="wcag_item_id"]');
    let isCompleted = document.querySelector('input[name="is_completed"]');
    const parentId = document.querySelector('input[name="parent_id"]');

    const checkedInput = e.currentTarget.querySelector('.checklist__checkbox');
    checkedInput.checked = isCompleted.value === 'true' ? false : true;

    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);
    const category = queryParams.get('category');

    try {
        const res = await fetch(`/project/${projectId}/submit?json=1`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                wcag_item_id: parseInt(wcagItemId.value),
                is_completed: isCompleted.value,
                parent_id: parseInt(parentId.value)
            })
        });

        // returns true or false depending on the success of the query
        let checkStatusSaved = await res.json();

        if (!checkStatusSaved) {
            errorParam = '';
            throw new Error('Error saving checklist item');
        } else {
            const newValue = isCompleted.value === 'true' ? false : true;
            isCompleted.value = newValue;
            updateProgress(newValue);
        }
    } catch (err) {
        console.log(err);
        window.location.href = `/project/${projectId}?category=${category}&error=1`;
    }
};

const progressBar = document.querySelector('.checklist__sidebar .progress');
const percentagePerCheck = 100 / checkboxes.length;
const updateProgress = (newCheck) => {
	if (!progressBar) return;
    const currentValue = Number(progressBar.getAttribute('value'));

    if (newCheck) {
        progressBar.setAttribute('value', currentValue + percentagePerCheck);
    } else {
        progressBar.setAttribute('value', currentValue - percentagePerCheck);
    }
};

init();
