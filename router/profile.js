import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('profile', {
        user: req.user,
    });
});

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/');
// }

export default router;
