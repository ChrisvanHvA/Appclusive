import express from 'express';
import ProjectController from '../controllers/projectController.js';
import projectModel from '../models/projectModel.js';

const router = express.Router({ mergeParams: true });
const ProjectModel = new projectModel();

const mapObject = (obj, callback) => {
    return Object.keys(obj).reduce((result, key) => {
        const value = obj[key];

        if (value !== '') {
            result[key] = callback(value);
        }

        return result;
    }, {});
};

router.get('/', async (req, res) => {
    const projectId = req.params.projectId;
    const project = await ProjectModel.getProject(projectId);

    res.render('projectSettings', {
        ...res.locals,
        title: 'Project settings',
        project
    });
});

router.post('/', async (req, res) => {
    const type = req.body.type;
    const formErrors = validateForm(req.body);
    const submitData = mapObject(req.body, (value) => value);
    const projectId = req.params.projectId;

    if (type === 'update') {
        if (Object.keys(formErrors).length > 0) {
            return res.render(`/settings/${projectId}`, {
                ...res.locals,
                formErrors
            });
        }

		// update project item
        const updatedProject = await ProjectModel.update(
            projectId,
            submitData
        );

        if (!updatedProject) {
            console.log('failed to update');
        }

        const { completedInsert } = await ProjectController.insertWcagItemsForProject(
            submitData.wcag_level,
            projectId
        );

		if (completedInsert) {
			console.log('project and its checklists were successfully updated');
			return res.redirect(`/project/${projectId}/settings`);
		} else {
			console.log('failed to update project and its checklists');
			return res.redirect(`/project/${projectId}/settings?m=1`);
		}

        
    } else if (type === 'delete') {
        const deletedData = await ProjectModel.deleteProject(projectId);

        if (deletedData && deletedData.length === 0) {
			// todo: error msg
            console.log('failed to delete');
        }

        return res.redirect('/');
    }
});

const validateForm = (formData) => {
    const { title, wcag_level } = formData;
    const errors = {};

    if (!title) {
        errors.title = 'Title is required';
    }

    if (!wcag_level) {
        errors.level = 'An accessibility level is required';
    }

    return errors;
};

export default router;
