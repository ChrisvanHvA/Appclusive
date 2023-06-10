import passport from 'passport';
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('register', {
        noNav: true,
        message: req.flash('registerMsg'),
    });
});

router.post(
    '/',
    passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/register',
        failureFlash: true,
    })
);

export default router;
