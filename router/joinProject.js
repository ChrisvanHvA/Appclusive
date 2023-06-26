import express from 'express';
const router = express.Router();

import projectModel from '../models/projectModel.js';
import projectUserModel from '../models/projectUserModel.js';

router.get('/', async (req, res) => {
    res.render('joinProject', {
        ...res.locals,
        title: 'Join a project'
    });
});

router.post('/', async (req, res) => {
    const { code } = req.body;
    const ProjectModel = new projectModel();
    const project = await ProjectModel.getProjectByCode(code);

    const ProjectUserModel = new projectUserModel();
    await ProjectUserModel.insert({
        project_id: project.project_id,
        user_id: res.locals.user.user_id,
        is_admin: false
    });

    return res.redirect('/');
});

export default router;
