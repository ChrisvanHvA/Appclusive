import express from 'express';

import projectModel from '../models/projectModel.js';
import projectChecklistModel from '../models/projectChecklistModel.js';

import dialogController from '../controllers/dialogController.js';

import { calcTotalProgressByCategory } from '../helpers/calcTotalProgress.js';

const DialogController = new dialogController();

const ProjectChecklistModel = new projectChecklistModel();
const ProjectModel = new projectModel();

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    const projectId = req.params.projectId;

    if (!projectId || projectId == 0) {
        // todo: betere redirect / error handling
        return res.redirect('/');
    }

    const [project, categories] = await Promise.all([
        ProjectModel.getProject(projectId),
        ProjectChecklistModel.getProjectCategoryData(projectId)
    ]);

	const { all_checklists, completed_checklists } = calcTotalProgressByCategory(categories);
	project.all_checklists = all_checklists;
	project.completed_checklists = completed_checklists;

    const dialogMessages = [
        DialogController.getMessage('level'),
    ];

    res.render('checklistCategories', {
        ...res.locals,
        categories,
        project,
        dialog_messages: dialogMessages
    });
});

export default router;
