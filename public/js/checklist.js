import noTransitionOnResize from './informationSidebar.js';


const assignUsers = document.querySelector('.btn--user');

assignUsers?.addEventListener('click', (e) => {
    e.stopPropagation();
    
    const dialog = document.querySelector('.dialog-assign_users');
    dialog.showModal();
});


const projectId = document.querySelector('.hidden-project-id').value;
const checkboxes = document.querySelectorAll('.checklist__checkbox');

const init = () => {
    const checklistButtons = document.querySelectorAll(
        '[data-checklist-button]'
    );

    checklistButtons.forEach((button) => {
        button.remove();
    });

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', submitHandler);

        // zorgt ervoor dat enter keydown ook werkt op firefox
        checkbox.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitHandler(e);
            }
        });
    });
};

const submitHandler = async (e) => {
    e.preventDefault();

    const formElement = e.currentTarget.closest('form');

    const wcagItemId = formElement.querySelector('input[name="wcag_item_id"]');
    let isCompleted = formElement.querySelector('input[name="is_completed"]');
    const parentId = formElement.querySelector('input[name="parent_id"]');

    // Toggle checkbox
    const checkedInput = formElement.querySelector('.checklist__checkbox');
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
            updateProgress();
        }
    } catch (err) {
        console.log(err);
        window.location.href = `/project/${projectId}?category=${category}&error=1`;
    }
};

const progressBar = document.querySelector('.checklist__sidebar .progress');
const percentageSpan = document.querySelector('.sidebar__progress > h3 > span');
const completedChecksText = document.querySelectorAll(
    '.completed-checks-counter, .page-title > div > p.page-title__subtitle'
);

const updateProgress = () => {
    if (!progressBar || !percentageSpan) return;
    const checkedCheckboxes = Array.from(checkboxes).filter(
        (checkbox) => checkbox.checked
    );
    const percentage = Math.floor(
        (checkedCheckboxes.length / checkboxes.length) * 100
    );

    percentageSpan.textContent = `${percentage}`;
    completedChecksText.forEach((completedChecksSpan) => {
        completedChecksSpan.textContent = `${checkedCheckboxes.length} / ${checkboxes.length}`;
    });
    progressBar.setAttribute('value', percentage);


    // open dialog if all items are checked
    if (checkedCheckboxes.length === checkboxes.length) {
        const dialog = document.querySelector('.dialog-category_finished');

        dialog ? setTimeout(() => {
            dialog.showModal();
        }, 1000) : null;
    }
};

init();
