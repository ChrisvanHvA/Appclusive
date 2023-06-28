import passport from 'passport';
import express from 'express';
const router = express.Router();

import {
    validationChecks,
    handleValidationErrors
} from '../middleware/sanitizer.js';

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/settings');
    }

    const loginFailed = req.query.error ? 'We could not find an account with the provided information' : null;

    res.render('login', {
        noNav: true,
        loading: true,
        'general-form-error': loginFailed
    });
});

router.post(
    '/',
    validationChecks,
    handleValidationErrors('login', { noNav: true, loading: true }),
    passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login?error=1'
    })
);

export default router;