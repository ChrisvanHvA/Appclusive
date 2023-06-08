import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {
        noNav: true,
    });

});

export default router;
