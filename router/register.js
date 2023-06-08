import passport from 'passport';
import express from 'express';
const router = express.Router();

router.post(
    '/',
    passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/register',
        failureFlash: true,
    })
);

router.get('/', (req, res) => {
    res.render('register', { noNav: true });
        message: req.flash('registerMsg'),
});

export default router;
