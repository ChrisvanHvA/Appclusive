import passport from 'passport';
import express from 'express';
const router = express.Router();

router.post(
    '/',
    passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/register',
    })
);

router.get('/', (req, res) => {
    res.render('register', { noNav: true });
});

export default router;
