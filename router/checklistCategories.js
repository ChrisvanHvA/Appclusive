import express from 'express';
import WCAGModel from '../models/wcagModel.js';
import wcagModel from '../models/wcagModel.js';
const router = express.Router({mergeParams: true});

router.get('/', async (req, res) => {
	const projectId = req.params.projectId;

	if (!projectId || projectId == 0) {
		// todo: betere redirect / error handling
		return res.redirect('/');
	}

    const WCAGModel = new wcagModel();
    const categories = await WCAGModel.listWCAGCategories();

    res.render('checklistCategories', {
        ...res.locals,
        categories,
		projectId
    });
});


export default router;
