import router from '../router/router.js';

const checkAuth = (req, res, next) => {
    const path = req.originalUrl.split('?')[0];
    const route = router.find((route) => route.path === path);

    return req.isAuthenticated() || !route?.auth
        ? next()
        : res.redirect('/login');
};

export { checkAuth };
