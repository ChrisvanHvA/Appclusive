import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('404', {
        ...res.locals,
		noNav: true
    });
});

export default router;
