function submitHandler() {
    console.log('checklist.js');

    const checklistItemsCheckboxes = document.querySelectorAll(
        '.checklist__checkbox'
    );

    checklistItemsCheckboxes.forEach((checkbox) => {
        console.log(checkbox);
        checkbox.addEventListener('click', async (e) => {
            console.log('clicked');

            const checklistValue = e.target.checked ? 1 : 0;

            try {
                const res = await fetch('/checklist/submit', {
                    method: 'post',
                    data: {
                        wcag_item_id: '',
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
