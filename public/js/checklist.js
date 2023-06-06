function submitHandler() {
    console.log('checklist.js')


    const checklistItemsCheckboxes = document.querySelectorAll('.checklist__checkbox');

    checklistItemsCheckboxes.forEach(checkbox => {
        console.log(checkbox)
        checkbox.addEventListener('click', (e) => {
            console.log('clicked')

            const checklistValue = e.target.checked ? 1 : 0;

            //  post with fetch
            fetch('/checklist/submit', {
                method: 'post',
                data: { 
                    wcag_item_id: "",
                    is_checked: checklistValue 
                }
            }).then(res => {
                return res.json()
                }).then((data) => {
                    console.log(data);
                }
                ).catch(err => {
                    console.log(err)
                })  
            
        })
    })
}

export default {
    submitHandler
}