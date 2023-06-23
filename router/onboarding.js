import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('onboarding', {
        noNav: true,
        ...res.locals
    });
});



export default router;
