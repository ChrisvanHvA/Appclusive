import express from 'express';
const router = express.Router();

import ProjectController from "../controllers/projectController.js";

router.get('/', (req, res) => {
    res.render('projectCreate', {
        ...res.locals,
    });
});

router.post('/', async (req, res) => {
    const formErrors = validateForm(req.body);

    if (Object.keys(formErrors).length > 0) {
        return res.render('projectCreate', {
            ...res.locals,
            formErrors,
        });
    }
    
    const projectCreated = await ProjectController.createProject(req.body);

    if (!projectCreated) {
        return res.send('failed');
    }

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
