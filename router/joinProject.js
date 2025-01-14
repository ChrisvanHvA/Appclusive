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

        const project = await ProjectModel.getProjectByCode(code.toUpperCase());

        if (!project) {
            const messageKey = MessageController.getMessageKeyByType(
                'unknown_project',
                'fail'
            );
            return res.redirect(`/join-project?m=${messageKey}`);
        }

        const ProjectUserModel = new projectUserModel();
        const doesUserAlreadyExist = await ProjectUserModel.getProjectUserByUserId(res.locals.user.user_id, project.project_id);

        let messageKey = MessageController.getMessageKeyByType('joined');

        if (!doesUserAlreadyExist) {
            await ProjectUserModel.insert({
                project_id: project.project_id,
                user_id: res.locals.user.user_id,
                is_admin: false
            });  
            
            return res.redirect(
                `/project/${project.project_id}/categories?m=${messageKey}`
            );
        }

        messageKey = MessageController.getMessageKeyByType('already_joined');
        return res.redirect(
            `/project/${project.project_id}/categories?m=${messageKey}`
        );
    }
);

export default router;