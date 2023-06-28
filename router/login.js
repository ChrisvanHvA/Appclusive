import passport from 'passport';
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/settings');
    }

    res.render('login', {
        noNav: true,
        loading: true
    });
});

router.post(
    '/',
    passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

export default router;