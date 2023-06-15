const calcTotalProgressByCategory = (categories) => {
    let total = 0;
    let completed = 0;

    categories.forEach((category) => {
        total += parseInt(category.all_checklists);
        completed += parseInt(category.completed_checklists);
    });

    return { all_checklists: total, completed_checklists: completed };
};

const calcTotalProgressByItems = (items) => {
	let total = items.length;
	let completed = items.filter(item => item.is_completed).length;

	return { all_checklists: total, completed_checklists: completed };
};

export { calcTotalProgressByCategory, calcTotalProgressByItems };