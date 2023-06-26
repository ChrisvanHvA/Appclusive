import { findRoute } from '../helpers/findRoute.js';

const setHeadData = async (req, res, next) => {
    const match = await findRoute(req.originalUrl);

	res.locals.head = { ...data[match.route.path] } ?? { ...data.fallback };

    res.locals.head.currentPath = req.originalUrl.split('?')[0];

    if (res.locals.head?.backUrl) {
        const paramNames = match.paramNames;
        const paramValues = match.paramValues;

        // replace the params in the backUrl with the values of the params in the current url (cool swag) B)
        if (paramNames?.length > 0 && paramValues?.length > 0) {
            for (let i = 0; i < paramNames.length; i++) {
                res.locals.head.backUrl = res.locals.head.backUrl.replace(
                    ':' + paramNames[i],
                    paramValues[i]
                );
            }
        }
    }

    next();
};

const data = {
    '/': {
        title: 'Dashboard',
        description: '',
        scripts: []
    },
    '/new-project': {
        title: 'New Project | Appclusive',
        description: '',
        scripts: ['createProject'],
        backUrl: '/'
    },
    '/join-project': {
        title: 'Join Project | Appclusive',
        description: '',
        scripts: [],
        backUrl: '/'
    },
    '/project/:projectId': {
        title: 'Checklist',
        description: '',
        scripts: ['checklist', 'projectinfo', 'dialog'],
        backUrl: '/project/:projectId/categories'
    },
    '/project/:projectId/categories': {
        title: 'Categories',
        description: '',
        scripts: ['categories', 'projectinfo', 'dialog'],
        backUrl: '/'
    },
    '/project/:projectId/settings': {
        title: 'Project settings',
        description: '',
        scripts: ['createProject'],
        backUrl: '/project/:projectId/categories'
    },
    '/login': {
        title: 'Login',
        description: '',
        scripts: []
    },
    '/landing': {
        title: 'Appclusive | Landing',
        description: '',
        scripts: ['landingPage']
    },
    '/register': {
        title: 'Register',
        description: '',
        scripts: ['validator']
    },
    '/settings': {
        title: 'Settings',
        description: '',
        scripts: ['avatar'],
        backUrl: '/'
    },
    '/forgot-password': {
        title: 'Forgot Password',
        description: '',
        scripts: []
    },
    '/reset-password': {
        title: 'Reset Password',
        description: '',
        scripts: []
    },
    '*': {
        title: 'Page not found',
        description: '',
        scripts: [],
        backUrl: '/'
    },
    fallback: {
        title: 'Appclusive',
        description: '',
        scripts: []
    }
};

export { setHeadData };
