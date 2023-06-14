import express from 'express';

import wcagModel from '../models/wcagModel.js';
import projectChecklistModel from '../models/projectChecklistModel.js';
import projectModel from '../models/projectModel.js';

import { findCategoryIdByName } from '../helpers/wcagCategoryFind.js';

const router = express.Router({ mergeParams: true });
const ProjectModel = new projectModel();
const ProjectChecklistModel = new projectChecklistModel();

router.get('/', async (req, res) => {
    const projectId = req.params.projectId;
    const category = req.query.category;

    const categoryId = findCategoryIdByName(category);

    // todo: redirect to project category page when it exists
    if (!categoryId) {
        return res.redirect(`/`);
        // return res.redirect(`/projects/${projectId}`);
    }

    const WCAGModel = new wcagModel();
    const wcagItems = await WCAGModel.listWCAGItemsByParentId(
        categoryId,
        projectId
    );

	const projectInfo = await ProjectModel.getProject(projectId);

    res.render('checklist', {
        ...res.locals,
        title: 'Checklist',
        tasks: wcagItems,
		category,
		projectInfo
    });
});

router.post('/submit', async (req, res) => {	
    const updateChecklist = await ProjectChecklistModel.updateChecklistCompletion(
        req.body.wcag_item_id,
        req.params.projectId,
        req.body.is_checked
    );

    res.json(updateChecklist);
});

export default router;
