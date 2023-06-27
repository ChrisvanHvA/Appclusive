import express from 'express';
const router = express.Router();

import projectModel from '../models/projectModel.js';
import messageController from '../controllers/messageController.js';

router.get('/', async (req, res) => {
    const userId = req.user?.user_id || 7;
    
    const ProjectModel = new projectModel();
    const allProjects = await ProjectModel.listProjects(userId);
    
    // const MessageController = new messageController(res.locals.system_message);
    // res.locals.system_message = MessageController.setMessage(
    //     'hi testing custom message',
    //     'stinky'
    // );

    res.render('dashboard', {
        ...res.locals,
        projects: allProjects,
        title: 'Dashboard'
    });
});

export default router;
