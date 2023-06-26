import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('404', {
        ...res.locals,
        title: 'Page not found',
    });
});

export default router;
