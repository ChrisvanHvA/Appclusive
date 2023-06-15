import express from 'express';

import wcagModel from '../models/wcagModel.js';
import projectChecklistModel from '../models/projectChecklistModel.js';
import projectModel from '../models/projectModel.js';

import { calcTotalProgressByItems } from '../helpers/calcTotalProgress.js';
import { findCategoryIdByName } from '../helpers/wcagCategoryFind.js';

const router = express.Router({ mergeParams: true });
const ProjectModel = new projectModel();
const ProjectChecklistModel = new projectChecklistModel();

router.get('/', async (req, res) => {
    const projectId = req.params.projectId;
    const category = req.query.category;

    const categoryId = findCategoryIdByName(category);

    if (!categoryId) {
        return res.redirect(`/project/${projectId}/categories`);
    }

    const WCAGModel = new wcagModel();
    const wcagItems = await WCAGModel.listWCAGItemsByParentId(
        categoryId,
        projectId
    );

	
	const projectInfo = await ProjectModel.getProject(projectId);

	const { all_checklists, completed_checklists } = calcTotalProgressByItems(wcagItems);

	projectInfo.all_checklists = all_checklists;
	projectInfo.completed_checklists = completed_checklists;

    res.render('checklist', {
        ...res.locals,
        tasks: wcagItems,
		category,
		project: projectInfo
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
