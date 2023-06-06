function submitHandler() {

    const checklistItemsCheckboxes = document.querySelectorAll(
        '.checklist__checkbox'
    );

    checklistItemsCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', async (e) => {

            const checklistValue = e.target.checked ? 1 : 0;

            try {
                const res = await fetch('/checklist/submit', {
                    method: 'post',
                    data: {
                        wcag_item_id: e.target,
                        is_checked: checklistValue,
                    },
                });
                const data = await res.json();
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        });
    });
}

export default {
    submitHandler,
};
