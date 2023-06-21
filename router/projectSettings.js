import express from 'express';
import projectModel from '../models/projectModel.js';

const router = express.Router({ mergeParams: true });
const ProjectModel = new projectModel();

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
    const formErrors = validateForm(req.body);

    if (Object.keys(formErrors).length > 0) {
        return res.render('/', {
            ...res.locals,
            formErrors
        });
    }
});

const validateForm = (formData) => {
    const { title, level } = formData;
    const errors = {};

    if (!title) {
        errors.title = 'Title is required';
    }

    if (!level) {
        errors.level = 'An accessibility level is required';
    }

    return errors;
};

export default router;
