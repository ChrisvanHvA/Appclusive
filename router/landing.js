import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('landing', {
        ...res.locals,
        noNav: true
    });
});

export default router;