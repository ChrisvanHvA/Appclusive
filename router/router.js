import dashboard from './dashboard.js';
import error404 from './404.js';
import checklist from './checklist.js';
import checklistCategories from './checklistCategories.js';
import onboarding from './onboarding.js';
import projectCreate from './projectCreate.js';
import projectSettings from './projectSettings.js';
import login from './login.js';
import register from './register.js';
import settings from './settings.js';
import logout from './logout.js';
import changePassword from './changePassword.js';
import forgotPassword from './forgotPassword.js';
import resetPassword from './resetPassword.js';

const routes = [
    { path: '/new-project', handler: projectCreate, auth: false },

    { path: '/change-password', handler: changePassword, auth: false },
    { path: '/forgot-password', handler: forgotPassword, auth: false },
    { path: '/reset-password', handler: resetPassword, auth: false },
    { path: '/settings', handler: settings, auth: false },
    { path: '/login', handler: login, auth: false },
    { path: '/logout', handler: logout, auth: false },
    { path: '/register', handler: register, auth: false },
	
    { path: '/project/:projectId', handler: checklist, auth: false },
    { path: '/project/:projectId/categories', handler: checklistCategories, auth: false },
    { path: '/project/:projectId/settings', handler: projectSettings, auth: false },
	
    { path: '/onboarding', handler: onboarding, auth: false },

    { path: '/', handler: dashboard, auth: false },
    { path: '*', handler: error404, auth: false }

	// { path: '/new-project', handler: projectCreate, auth: true },

    // { path: '/change-password', handler: changePassword, auth: true },
    // { path: '/forgot-password', handler: forgotPassword, auth: true },
    // { path: '/reset-password', handler: resetPassword, auth: true },
    // { path: '/settings', handler: settings, auth: true },
    // { path: '/login', handler: login, auth: false },
    // { path: '/logout', handler: logout, auth: false },
    // { path: '/register', handler: register, auth: false },
	
    // { path: '/project/:projectId', handler: checklist, auth: true },
    // { path: '/project/:projectId/categories', handler: checklistCategories, auth: true },
    // { path: '/project/:projectId/settings', handler: projectSettings, auth: true },
	
    // { path: '/onboarding', handler: onboarding, auth: false },

    // { path: '/', handler: dashboard, auth: true },
    // { path: '*', handler: error404, auth: false }
];

export default routes;
