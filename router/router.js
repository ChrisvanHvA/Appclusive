import home from './home.js';
import checklist from './checklist.js';
import checklistCategories from './checklistCategories.js';
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
    // { path: '/checklist', handler: checklist, auth: false },
    { path: '/project/:projectId/categories', handler: checklistCategories, auth: false },
    { path: '/project/:projectId/settings', handler: projectSettings, auth: false },

    { path: '/', handler: home, auth: false }
];

export default routes;
