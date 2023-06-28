import express from 'express';
import ProjectController from '../controllers/projectController.js';
import projectModel from '../models/projectModel.js';

const router = express.Router({ mergeParams: true });
const ProjectModel = new projectModel();

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

    res.render('projectSettings', {
        ...res.locals,
        title: 'Project settings',
        project
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
                console.log('failed to update project');
                messageKey = MessageController.getMessageKeyByType('project_update', 'fail');
                return res.redirect(`/settings?m=${messageKey}`);            
            }

            const completedInsert = await ProjectController.updateWcagItemsForProject(
                projectId
            );

            if (completedInsert) {
                console.log('project and its checklists were successfully updated');
                return res.redirect(`/project/${projectId}/settings?m=1`);

            } else {
                messageKey = MessageController.getMessageKeyByType('project_update', 'fail');
                console.log('failed to update project and its checklists');
                return res.redirect(`/project/${projectId}/settings?m=${messageKey}`);
            }

        } else if (type === 'delete') {
            const deletedData = await ProjectModel.deleteProject(projectId);

            if (!deletedData) {
                messageKey = MessageController.getMessageKeyByType('project_delete', 'fail');
                console.log('failed to delete project and its checklists');
                return res.redirect(`/project/${projectId}/settings?m=${messageKey}`);
            }

            messageKey = MessageController.getMessageKeyByType('project_delete', 'success');

            return res.redirect(`/?m=${messageKey}`);
        }
    }
);

export default router;
