import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('about', {
        ...res.locals,
        noNav: true
    });
});

export default router;