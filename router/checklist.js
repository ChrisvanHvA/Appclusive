import express from 'express';

import wcagModel from '../models/wcagModel.js';
import projectChecklistModel from '../models/projectChecklistModel.js';
import dialogController from '../controllers/dialogController.js';
import projectController from '../controllers/projectController.js';
import messageController from '../controllers/messageController.js';

const router = express.Router({ mergeParams: true });
const ProjectChecklistModel = new projectChecklistModel();
const WCAGModel = new wcagModel();

const DialogController = new dialogController();

router.get('/', async (req, res) => {
    const projectId = req.params.projectId;
    const category = req.query.category;

    const wcagCategory = await WCAGModel.getWCAGCategoryIdBySlug(category);

    if (!wcagCategory) {
        return res.redirect(`/project/${projectId}/categories`);
    }

    const projectInfo = await projectController.createFullProjectOverview(wcagCategory, projectId);

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
        dialog_messages: dialogMessages
    });
});

router.post('/submit', async (req, res) => {
    const jsonReturn = req.query.json;
    const updatedStatus = req.body.is_completed === 'true' ? false : true;

    const updateChecklist = await ProjectChecklistModel.updateChecklistCompletion(
        req.body.wcag_item_id,
        req.params.projectId,
        updatedStatus
    );

    const categoryItem = await WCAGModel.getWCAGCategory(req.body.parent_id);
    let errorParam = '';

    if (!updateChecklist) {
        errorParam = '&m=2';
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
    const MessageController = new messageController();
	const projectId = req.params.projectId;

	if (!projectId) return false;

	const assignees = (req.body.user_ids || []).map((id) => parseInt(id));
	const checklistId = req.body.wcag_item_id;

	const updatedAssignees = await ProjectChecklistModel.updateAssignees(assignees, projectId, checklistId);
    const type = updatedAssignees ? 'saved' : 'fail';

    const messageKey = MessageController.getMessageKeyByType('assigned_task', type);

    return res.redirect(`/project/${projectId}/categories?m=${messageKey}`);
});

export default router;
