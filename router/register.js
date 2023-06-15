import passport from 'passport';
import express from 'express';
const router = express.Router();

import {
    validationChecks,
    handleValidationErrors
} from '../middleware/sanitizer.js';

router.get('/', (req, res) => {
    res.render('register', {
        noNav: true,
        message: req.flash('registerMsg')
    });
});

// router.post(
//     '/',
//     validationChecks,
//     handleValidationErrors('register'),
//     passport.authenticate('local-signup', {
//         successRedirect: '/',
//         failureRedirect: '/register',
//         failureFlash: true
//     })
// );
router.post(
    '/',
    passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/register',
        failureFlash: true
    })
);

export default router;
