import passport from 'passport';
import express from 'express';
const router = express.Router();

router.post(
    '/',
    passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
    })
);

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }
    res.render('login', { noNav: true });
});

export default router;
