import passport from 'passport';
import express from 'express';
const router = express.Router();

import { validationChecks, handleValidationErrors } from '../middleware/sanitizer.js';

router.get('/', (req, res) => {
    res.render('register', {
        noNav: true,
        message: req.flash('registerMsg'),
    });
});

router.post('/', validationChecks, handleValidationErrors('register'), (req, res, next) => {
        // If there are no validation errors, proceed to passport authentication
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/register',
            failureFlash: true,
        })(req, res, next);
    }
);

export default router;
