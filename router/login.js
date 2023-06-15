import passport from 'passport';
import express from 'express';
const router = express.Router();

import { validationChecks, handleValidationErrors } from '../middleware/sanitizer.js';

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/settings');
    }

    res.render('login', {
        noNav: true,
        message: req.flash('loginMsg'),
    });
});

router.post('/', validationChecks, handleValidationErrors('login'), (req, res) => {

        passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        });
    }
);

export default router;
