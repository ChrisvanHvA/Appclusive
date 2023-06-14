const wcagCategories = [
    { id: 1, name: 'content' },
    { id: 2, name: 'headings' },
    { id: 3, name: 'appearance' },
    { id: 4, name: 'forms' },
    { id: 5, name: 'controls' },
    { id: 6, name: 'global-code' },
    { id: 7, name: 'media' },
    { id: 8, name: 'color-contrast' },
    { id: 9, name: 'keyboard' },
    { id: 10, name: 'tables' },
    { id: 11, name: 'video' },
    { id: 12, name: 'mobile-and-touch' },
    { id: 13, name: 'audio' },
    { id: 14, name: 'animation' },
    { id: 15, name: 'lists' },
    { id: 16, name: 'images' }
];

const findCategoryNameById = (id) => {
	id = parseInt(id);
	return wcagCategories.find((cat) => cat.id === id)?.name;
}

const findCategoryIdByName = (name) => {
	return wcagCategories.find((cat) => cat.name === name)?.id;
}

export { findCategoryNameById, findCategoryIdByName };