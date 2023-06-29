import express from 'express';
const router = express.Router();

import projectController from '../controllers/projectController.js';

import {
    validationChecks,
    handleValidationErrors
} from '../middleware/sanitizer.js';
import messageController from '../controllers/messageController.js';

router.get('/', (req, res) => {
    res.render('projectCreate', {
        ...res.locals,
        mobileTitle: 'Project creation',
        title: 'Create a new project',
        loading: true
    });
});

router.post(
    '/',
    validationChecks,
    handleValidationErrors('projectCreate', {
        mobileTitle: 'Project creation',
        title: 'Create a new project',
        loading: true
    }),
    async (req, res) => {
        console.log(req.body);
        const MessageController = new messageController();

        const { completedInsert, projectId } =
            await projectController.createProject(req.body, req.user?.user_id);

        const messageKey = MessageController.getMessageKeyByType(
            'project_create',
            'fail'
        );

        return completedInsert
            ? res.redirect(`/project/${projectId}/categories`)
            : res.redirect(`/?m=${messageKey}`);
    }
);

export default router;