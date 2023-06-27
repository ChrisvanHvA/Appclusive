import express from 'express';

import wcagModel from '../models/wcagModel.js';
import projectChecklistModel from '../models/projectChecklistModel.js';
import projectUserModel from '../models/projectUserModel.js';

import dialogController from '../controllers/dialogController.js';

import projectController from '../controllers/projectController.js';

const router = express.Router({ mergeParams: true });
const ProjectChecklistModel = new projectChecklistModel();
const ProjectUserModel = new projectUserModel();

const WCAGModel = new wcagModel();

const DialogController = new dialogController();

router.get('/', async (req, res) => {
    const projectId = req.params.projectId;
	// todo: remove default user
	const userId = req.user?.user_id || 7;
    const category = req.query.category;

    // #TODO: receive custom message based on param id
    const errorParam = req.query.error;

    const wcagCategory = await WCAGModel.getWCAGCategoryIdBySlug(category);

    if (!wcagCategory) {
        return res.redirect(`/project/${projectId}/categories`);
    }


	const [projectInfo, isAdmin] = await Promise.all([
        projectController.createFullProjectOverview(wcagCategory, projectId),
		ProjectUserModel.isAdmin(projectId, userId)
    ]);

    const dialogMessages = [
        DialogController.getMessage('category_finished'),
        DialogController.getMessage('level'),
        DialogController.getMessage('assign_users'),
    ];

    res.render('checklist', {
        ...res.locals,
        tasks: projectInfo.checklist_data,
        category: wcagCategory,
        project: projectInfo,
		isAdmin,
        system_message: errorParam ? 'Failed to update' : null,
        dialog_messages: dialogMessages
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
        return res.redirect(
            `/project/${
                req.params.projectId
            }?category=${categoryItem.title.toLowerCase()}${errorParam}`
        );
    }
});

router.post('/assign', async (req, res) => {
	const projectId = req.params.projectId;

	if (!projectId) return false;

	const assignees = (req.body.user_ids || []).map((id) => parseInt(id));
	const checklistId = req.body.wcag_item_id;

	// todo: handle this
	const insertResult = await ProjectChecklistModel.updateAssignees(assignees, projectId, checklistId);

	return res.send('ok');
});

export default router;
