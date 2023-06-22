import express from 'express';
const router = express.Router();

import projectModel from '../models/projectModel.js';

router.get('/', async (req, res) => {
	// todo: remove default user id 1
	const userId = req.user?.user_id || 1;

    const ProjectModel = new projectModel();
    const allProjects = await ProjectModel.listProjects(userId);

    res.render('dashboard', {
        ...res.locals,
        projects: allProjects,
		title: 'Dashboard',
    });
});

export default router;
