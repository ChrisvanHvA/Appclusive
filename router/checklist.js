import express from 'express';
const router = express.Router({ mergeParams: true });

import wcagModel from '../models/wcagModel.js';
import projectChecklistModel from '../models/projectChecklistModel.js';
import projectUserModel from '../models/projectUserModel.js';

import dialogController from '../controllers/dialogController.js';
import projectController from '../controllers/projectController.js';
import messageController from '../controllers/messageController.js';

const ProjectChecklistModel = new projectChecklistModel();
const ProjectUserModel = new projectUserModel();
const WCAGModel = new wcagModel();
const DialogController = new dialogController();

router.get('/', async (req, res) => {
    const projectId = req.params.projectId;
    // todo: remove default user
    const userId = req.user?.user_id || 7;
    const category = req.query.category;

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
        DialogController.getMessage('assign_users')
    ];

    res.render('checklist', {
        ...res.locals,
        tasks: projectInfo.checklist_data,
        category: wcagCategory,
        project: projectInfo,
        isAdmin,
        dialog_messages: dialogMessages
    });
});

router.post('/submit', async (req, res) => {
    const jsonReturn = req.query.json;
    let updatedStatus = req.body.is_completed === 'true' ? false : true;

    const checklistFromDb =
        await ProjectChecklistModel.getSpecificChecklistItemByProjectId(
            req.params.projectId,
            req.body.wcag_item_id
        );

    // Someone updated it already!
    if (checklistFromDb && `${checklistFromDb.is_completed}` != req.body.is_completed) {
        updatedStatus = checklistFromDb.is_completed;
    }

    const updateChecklist =
        await ProjectChecklistModel.updateChecklistCompletion(
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
            }?category=${categoryItem.slug})}${errorParam}`
        );
    }
});

router.post('/assign', async (req, res) => {
    const MessageController = new messageController();
    const projectId = req.params.projectId;

    if (!projectId) return false;

    const assignees = (req.body.user_ids || []).map((id) => parseInt(id));
    const checklistId = req.body.wcag_item_id;

    const updatedAssignees = await ProjectChecklistModel.updateAssignees(
        assignees,
        projectId,
        checklistId
    );
    const type = updatedAssignees ? 'saved' : 'fail';

    const messageKey = MessageController.getMessageKeyByType(
        'assigned_task',
        type
    );

    const categoryItem = await WCAGModel.getWCAGCategoryByChildId(checklistId);

    return res.redirect(`/project/${projectId}?category=${categoryItem.slug}&m=${messageKey}`);
});

export default router;