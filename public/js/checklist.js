const projectId = document.querySelector('.hidden-project-id').value;

function submitHandler() {
	console.log(projectId);

    const dialog = document.querySelector('.dialog');

    dialog.showModal();

    const checklistItemsCheckboxes = document.querySelectorAll(
        '.checklist__checkbox'
    );

    checklistItemsCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', async (e) => {

            const checklistValue = e.target.checked ? true : false;

            try {

                const res = await fetch(`/project/${projectId}/submit`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        wcag_item_id: parseInt(e.target.id),
                        is_checked: checklistValue,
                    }),
                });

                const checkStatusSaved = await res.json();
				// returns true or false depending on the success of the query
				console.log(checkStatusSaved);

                // TODO: error handling
                // if (!checkStatusSaved) {
                    
                // } else {

                // }


            } catch (err) {
                console.log(err);
            }
        });
    });
}


submitHandler();