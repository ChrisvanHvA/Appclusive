import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('settings', {
        title: 'Settings',
    });
});

export default router;
