import express from 'express';
import wcagModel from '../models/wcagModel.js';
const router = express.Router();

router.get('/', async (req, res) => {
    const WCAGModel = new wcagModel();
    const categories = await WCAGModel.listWCAGCategories();

    res.render('landing-page', {
        noNav: true,
        ...res.locals
    });
});


export default router;
