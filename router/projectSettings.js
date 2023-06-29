import express from 'express';
import ProjectController from '../controllers/projectController.js';
import projectModel from '../models/projectModel.js';
import projectUserModel from '../models/projectUserModel.js';

const router = express.Router({ mergeParams: true });
const ProjectModel = new projectModel();
const ProjectUserModel = new projectUserModel();

import {
    validationChecks,
    handleValidationErrors
} from '../middleware/sanitizer.js';
import messageController from '../controllers/messageController.js';

const mapObject = (obj, callback) => {
    return Object.keys(obj).reduce((result, key) => {
        const value = obj[key];

        if (value !== '') {
            result[key] = callback(value);
        }

        return result;
    }, {});
};

let project;
router.get('/', async (req, res) => {
    const projectId = req.params.projectId;
    project = await ProjectModel.getProject(projectId);

    const isAdmin = await ProjectUserModel.isAdmin(projectId, req.user.user_id);

    res.render('projectSettings', {
        ...res.locals,
        title: 'Project settings',
        project,
        isAdmin
    });
});

router.post(
    '/',
    validationChecks,
    handleValidationErrors('projectSettings'),
    async (req, res) => {
        const type = req.body.type;
        const submitData = mapObject(req.body, (value) => value);
        const projectId = req.params.projectId;

        const MessageController = new messageController();

        let messageKey = 1;

        if (type === 'update') {
            // update project item
            const updatedProject = await ProjectModel.update(
                projectId,
                submitData,
            );

            if (!updatedProject) {
                console.error('failed to update project');
                messageKey = MessageController.getMessageKeyByType(
                    'project_update',
                    'fail'
                );

                return res.redirect(`/settings?m=${messageKey}`);
            }

            const completedInsert = await ProjectController.updateWcagItemsForProject(projectId);

            if (completedInsert) {
                return res.redirect(`/project/${projectId}/settings?m=1`);

            } else {
                messageKey = MessageController.getMessageKeyByType(
                    'project_update',
                    'fail'
                );
                console.error('failed to update project and its checklists');

                return res.redirect(
                    `/project/${projectId}/settings?m=${messageKey}`
                );
            }
        } else if (type === 'delete') {
            const deletedData = await ProjectModel.deleteProject(projectId);

            if (!deletedData) {
                messageKey = MessageController.getMessageKeyByType('project_delete', 'fail');
                console.error('failed to delete project and its checklists');
                
                return res.redirect(
                    `/project/${projectId}/settings?m=${messageKey}`
                );
            }

            messageKey = MessageController.getMessageKeyByType('project_delete', 'success');

            return res.redirect(`/?m=${messageKey}`);

        } else if (type === 'leave') {
            await ProjectModel.removeUserFromProject(req.user.user_id);

            return res.redirect('/');
        }
    }
);

export default router;