import express from 'express';
const router = express.Router({ mergeParams: true });

import projectModel from '../models/projectModel.js';
import projectChecklistModel from '../models/projectChecklistModel.js';
import projectUserModel from '../models/projectUserModel.js';

import dialogController from '../controllers/dialogController.js';

import { calcTotalProgressByCategory } from '../helpers/calcTotalProgress.js';

const DialogController = new dialogController();
const ProjectChecklistModel = new projectChecklistModel();
const ProjectModel = new projectModel();
const ProjectUserModel = new projectUserModel();

router.get('/', async (req, res) => {
    const projectId = req.params.projectId;
    // todo: remove default user id
    const userId = req.user?.user_id || 7;

    if (!projectId || projectId == 0) {
        // todo: betere redirect / error handling
        return res.redirect('/');
    }

    const [project, categories, isAdmin] = await Promise.all([
        ProjectModel.getProject(projectId),
        ProjectChecklistModel.getProjectCategoryData(projectId),
        ProjectUserModel.isAdmin(projectId, userId)
    ]);

    const { all_checklists, completed_checklists } =
        calcTotalProgressByCategory(categories);
    project.all_checklists = all_checklists;
    project.completed_checklists = completed_checklists;

    const dialogMessages = [
        DialogController.getMessage('level'),
        DialogController.getMessage('project_finished')
    ];

    res.render('checklistCategories', {
        ...res.locals,
        categories,
        project,
        isAdmin,
        dialog_messages: dialogMessages,
        loading: true
    });
});

export default router;