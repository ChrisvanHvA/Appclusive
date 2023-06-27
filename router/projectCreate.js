import express from 'express';
const router = express.Router();

import ProjectController from '../controllers/projectController.js';

router.get('/', (req, res) => {
    res.render('projectCreate', {
        ...res.locals,
        title: 'Create a new project'
    });
});

router.post('/', async (req, res) => {
    const formErrors = validateForm(req.body);

    if (Object.keys(formErrors).length > 0) {
        return res.render('projectCreate', {
            ...res.locals,
            formErrors
        });
    }

    const projectId = await ProjectController.createProject(req.body, req.user?.user_id);

    // TODO: show error on fail
    return projectId
        ? res.redirect(`/project/${projectId}/categories`)
        : res.send('failed');
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
