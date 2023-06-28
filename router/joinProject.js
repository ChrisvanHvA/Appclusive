import express from 'express';
const router = express.Router();

import projectModel from '../models/projectModel.js';
import projectUserModel from '../models/projectUserModel.js';

import {
    validationChecks,
    handleValidationErrors
} from '../middleware/sanitizer.js';
import messageController from '../controllers/messageController.js';

router.get('/', async (req, res) => {
    res.render('joinProject', {
        ...res.locals,
        noNav: true
    });
});

router.post(
    '/',
    validationChecks,
    handleValidationErrors('joinProject', { noNav: true }),
    async (req, res) => {
        const { code } = req.body;

        const ProjectModel = new projectModel();
        const MessageController = new messageController();

        const project = await ProjectModel.getProjectByCode(code);

        if (!project) {
            const messageKey = MessageController.getMessageKeyByType(
                'unknown_project',
                'fail'
            );
            return res.redirect(`/joinProject?m=${messageKey}`);
        }

        const ProjectUserModel = new projectUserModel();
        await ProjectUserModel.insert({
            project_id: project.project_id,
            user_id: res.locals.user.user_id,
            is_admin: false
        });

        const messageKey = MessageController.getMessageKeyByType('joined');
        return res.redirect(
            `/project/${project.project_id}/categories?m=${messageKey}`
        );
    }
);

export default router;