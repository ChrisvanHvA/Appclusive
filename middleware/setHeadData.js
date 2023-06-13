import { findRoute } from '../helpers/findRoute.js';

const setHeadData = async (req, res, next) => {
	const match = await findRoute(req.originalUrl);

    res.locals.head = data[match.route.path] ?? data.fallback;

    next();
};

const data = {
    '/': {
        title: 'Dashboard',
        description: '',
        scripts: [],
    },
    '/new-project': {
        title: 'New Project | Appclusive',
        description: '',
        scripts: ['createProject'],
    },
    '/project/:projectId': {
        title: 'Checklist',
        description: '',
        scripts: ['checklist'],
    },
    '/login': {
        title: 'Login',
        description: '',
        scripts: [],
    },
    '/register': {
        title: 'Register',
        description: '',
        scripts: ['validator'],
    },
    '/account': {
        title: 'Account',
        description: '',
        scripts: [],
    },
    '/forgot-password': {
        title: 'Forgot Password',
        description: '',
        scripts: [],
    },
    '/reset-password': {
        title: 'Reset Password',
        description: '',
        scripts: [],
    },
    fallback: {
        title: 'Whoopsy',
        description: 'whoops',
        scripts: [],
    },
};

export { setHeadData };
