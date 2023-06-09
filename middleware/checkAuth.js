import router from '../router/router.js';

const checkAuth = (req, res, next) => {
    const path = req.originalUrl.split('?')[0];
    const route = router.find((route) => route.path === path);

    if (req.isAuthenticated() || !route?.auth) {
        return next();
    }
    res.redirect('/login');
}

export { checkAuth };