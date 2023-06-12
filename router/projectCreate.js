import express from 'express';
const router = express.Router();

import projectModel from '../models/projectModel.js';

router.get('/', (req, res) => {
    res.render('projectCreate', {
        ...res.locals,
    });
});

router.post('/', (req, res) => {
    const formErrors = validateForm(req.body);

    if (Object.keys(formErrors).length > 0) {
        return res.render('projectCreate', {
            ...res.locals,
            formErrors,
        });
    }

	const ProjectModel = new projectModel();
	ProjectModel.createProject(req.body);

    return res.send('ok');
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
