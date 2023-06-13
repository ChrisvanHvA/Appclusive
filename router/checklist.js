import express from 'express';
import WCAGController from '../controllers/wcagController.js';
import projectModel from '../models/projectModel.js';
const router = express.Router();

router.get('/', async (req, res) => {
    const tasks = await WCAGController.createWCAGOverview();

    res.render('checklist', {
        ...res.locals,
        title: 'Checklist',
        tasks: tasks
    });
});

router.post('/submit', async (req, res) => {

    // TODO: provide project_id and wcag_item_id
    const ProjectModel = new projectModel();
    const updateChecklist = await ProjectModel.updateChecklistCompletion(req.body.wcag_item_id, req.body.is_checked);
    
    res.json(updateChecklist);
});

export default router;