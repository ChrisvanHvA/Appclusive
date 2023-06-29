import passport from 'passport';
import express from 'express';
const router = express.Router();

import {
    validationChecks,
    handleValidationErrors
} from '../middleware/sanitizer.js';

router.get('/', (req, res) => {

    const registerError = req.query.error;

    res.render('register', {
        noNav: true,
        'general-form-error': registerError,
        errorFields: null
    });
});

router.post(
    '/',
    validationChecks,
    handleValidationErrors('register', { noNav: true }),
    passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/register?error=1'
    })
);

export default router;