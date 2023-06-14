import express from 'express';
const router = express.Router();

import projectModel from '../models/projectModel.js';

router.get('/', async (req, res) => {
    const ProjectModel = new projectModel();

    const allProjects = await ProjectModel.listProjects(1);
    res.render('dashboard', {
        ...res.locals,
        user: req.user,
        projects: allProjects
    });
});

export default router;
