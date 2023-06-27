import express from 'express';
const router = express.Router();

import projectModel from '../models/projectModel.js';

router.get('/', async (req, res) => {
    // todo: remove default user id 1
    const userId = req.user?.user_id || 7;

    const ProjectModel = new projectModel();
    const allProjects = await ProjectModel.listProjects(userId);

    res.render('search', {
        ...res.locals,
        projects: allProjects,
        mobileTitle: 'Project search',
        title: 'Search for a project'
    });
});

router.post('/', async (req, res) => {
    // todo: remove default user id 1
    const userId = req.user?.user_id || 7;

    const ProjectModel = new projectModel();
    const allProjects = await ProjectModel.listProjects(userId);

    const search = req.body.search_projects;
    let matchingItems = [];

    if (search) {
        const searchLowercase = search.toLowerCase();

        matchingItems = await allProjects.filter((project) =>
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
