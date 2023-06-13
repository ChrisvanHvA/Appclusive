import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('account', {
        title: 'Account',
        user: req.user,
    });
});

export default router;
