const projectId = document.querySelector('.hidden-project-id').value;

function submitHandler() {
	console.log(projectId);

    const checklistItemsCheckboxes = document.querySelectorAll(
        '[data-checklist-button]'
    );

    checklistItemsCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', async (e) => {
            e.preventDefault();

            const wcagItemId = document.querySelector('input[name="wcag_item_id"]');
            let isCompleted = document.querySelector('input[name="is_completed"]');
            const parentId = document.querySelector('input[name="parent_id"]');

            const checkedInput = document.querySelector('.checklist__checkbox');       
            checkedInput.checked = (isCompleted.value === 'true' ? false : true);

            const url = new URL(window.location.href);
            const queryParams = new URLSearchParams(url.search);
            const category = queryParams.get("category");

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

                console.log(checkStatusSaved);

                if (!checkStatusSaved) {
                    errorParam = '';
                    window.location.href = `/project/${projectId}?category=${category}&error=1`;
                } else {
                    isCompleted.value = (isCompleted.value === 'true' ? false : true);
                }

            } catch (err) {
                console.log(err);
                window.location.href = `/project/${projectId}?category=${category}&error=1`;
            }
        });
    });
}


submitHandler();