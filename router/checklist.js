import express from 'express';
import WCAGController from '../controllers/wcagController.js';
const router = express.Router();

router.get('/', async (req, res) => {
    const tasks = await WCAGController.createWCAGOverview();
    res.render('checklist', {
        tasks: tasks,
        ...res.locals
    });
});

router.post('/submit', (req, res) => {
    console.log(req.body);
    res.json('hiii');
});

export default router;