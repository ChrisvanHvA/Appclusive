import express from 'express';
import WCAGController from '../controllers/wcagController.js';

import wcagModel from '../models/wcagModel.js';
import projectModel from '../models/projectModel.js';
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    const projectId = req.params.projectId;
    const category = req.query.category;

	const categoryId = wcagCategories.find((cat) => cat.name === category)?.id;

	// todo: redirect to project category page when it exists
	if (!categoryId) {
		return res.redirect(`/`);
		// return res.redirect(`/projects/${projectId}`);
	}

    // const tasks = await WCAGController.createWCAGOverview();

    const WCAGModel = new wcagModel();
    const wcagItems = await WCAGModel.listWCAGItemsByParentId(categoryId, projectId);
    res.render('checklist', {
        tasks: wcagItems,
        ...res.locals
    });
});

// dit gaat vast ooit nuttig zijn
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

router.post('/submit', async (req, res) => {
    // TODO: provide project_id and wcag_item_id
    const ProjectModel = new projectModel();
    const updateChecklist = await ProjectModel.updateChecklistCompletion(
        req.body.wcag_item_id,
        req.body.is_checked
    );

    res.json(updateChecklist);
});

export default router;
