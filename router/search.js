import express from 'express';
const router = express.Router();

import projectModel from '../models/projectModel.js';

router.get('/', async (req, res) => {
    // todo: remove default user id 1
    const userId = req.user?.user_id || 7;

    const ProjectModel = new projectModel();
    const allProjects = await ProjectModel.listProjects(userId);

    const search = req.query.query;
    let matchingItems = [];

    if (search) {
        const searchLowercase = search.toLowerCase();

        matchingItems = allProjects.filter((project) =>
            project.title.toLowerCase().includes(searchLowercase)
        );
    }

    res.render('search', {
        ...res.locals,
        projects: allProjects,
        search,
        searchedProjects: matchingItems,
        title: 'Project search'
    });
});

export default router;