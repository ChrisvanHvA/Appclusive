import passport from 'passport';
import express from 'express';
const router = express.Router();

import {
    validationChecks,
    handleValidationErrors
} from '../middleware/sanitizer.js';

router.get('/', (req, res) => {
    res.render('register', {
        noNav: true
    });
});

router.post(
    '/',
    validationChecks,
    handleValidationErrors('register', { noNav: true }),
    passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/register'
    })
);

export default router;
