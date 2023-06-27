import express from 'express';
const router = express.Router();

import projectModel from '../models/projectModel.js';

router.get('/', async (req, res) => {
    const userId = req.user?.user_id || 7;
    
    const ProjectModel = new projectModel();
    const allProjects = await ProjectModel.listProjects(userId);

    res.render('dashboard', {
        ...res.locals,
        projects: allProjects,
        title: 'Dashboard'
    });
});

export default router;
