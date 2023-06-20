import express from 'express';

import wcagModel from '../models/wcagModel.js';
import projectChecklistModel from '../models/projectChecklistModel.js';
import projectModel from '../models/projectModel.js';

import { calcTotalProgressByItems } from '../helpers/calcTotalProgress.js';
import { findCategoryIdByName } from '../helpers/wcagCategoryFind.js';

const router = express.Router({ mergeParams: true });
const ProjectModel = new projectModel();
const ProjectChecklistModel = new projectChecklistModel();
const WCAGModel = new wcagModel();

router.get('/', async (req, res) => {
    const projectId = req.params.projectId;
    const category = req.query.category;

    // #TODO: receive custom message based on param id
    const errorParam = req.query.error;

    // const categoryId = findCategoryIdByName(category);
    const wcagCategory = await WCAGModel.getWCAGCategoryIdBySlug(category);

    if (!wcagCategory.wcag_id) {
        return res.redirect(`/project/${projectId}/categories`);
    }

    const wcagItems = await WCAGModel.listWCAGItemsByParentId(
        wcagCategory.wcag_id,
        projectId
    );

    const projectInfo = await ProjectModel.getProject(projectId);

	const { all_checklists, completed_checklists } = calcTotalProgressByItems(wcagItems);

	projectInfo.all_checklists = all_checklists;
	projectInfo.completed_checklists = completed_checklists;

    res.render('checklist', {
        ...res.locals,
        tasks: wcagItems,
		category: wcagCategory.title,
		project: projectInfo,
        system_message: errorParam ? 'Failed to update' : null
    });
});

router.post('/submit', async (req, res) => {
    
    const jsonReturn = req.query.json;

    const updatedStatus = req.body.is_completed === 'true' ? false : true;   
    
    let updateChecklist = await ProjectChecklistModel.updateChecklistCompletion(
        req.body.wcag_item_id,
        req.params.projectId,
        updatedStatus
    );

    const categoryItem = await WCAGModel.getWCAGCategory(req.body.parent_id);
    let errorParam = '';

    // #TODO: pass custom message id
    if (!updateChecklist) {
        errorParam = '&error=1';
    }

    if (jsonReturn) {
        return res.json(true);
    } else {
        return res.redirect(`/project/${req.params.projectId}?category=${categoryItem.title.toLowerCase()}${errorParam}`);
    }

});

export default router;
