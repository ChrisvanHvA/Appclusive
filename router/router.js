import dashboard from './dashboard.js';
import error404 from './404.js';
import search from './search.js';
import checklist from './checklist.js';
import checklistCategories from './checklistCategories.js';
import landing from './landing.js';

import projectCreate from './projectCreate.js';
import joinProject from './joinProject.js';

import projectSettings from './projectSettings.js';
import userSettings from './userSettings.js';

import login from './login.js';
import register from './register.js';
import logout from './logout.js';

import changePassword from './changePassword.js';
import forgotPassword from './forgotPassword.js';
import resetPassword from './resetPassword.js';
import upload from './upload.js';

import validatorTool from './validatorTool.js';

const routes = [
    { path: '/new-project', handler: projectCreate, auth: true },
	{ path: '/join-project', handler: joinProject, auth: true },

    { path: '/change-password', handler: changePassword, auth: true },
    { path: '/forgot-password', handler: forgotPassword, auth: false },
    { path: '/reset-password', handler: resetPassword, auth: false },
    { path: '/settings', handler: userSettings, auth: true },
    { path: '/login', handler: login, auth: false },
    { path: '/logout', handler: logout, auth: false },
    { path: '/register', handler: register, auth: false },
	
    { path: '/project/:projectId', handler: checklist, auth: true },
    { path: '/project/:projectId/categories', handler: checklistCategories, auth: true },
    { path: '/project/:projectId/settings', handler: projectSettings, auth: true },
    { path: '/upload', handler: upload, auth: true },

    { path: '/validator', handler: validatorTool, auth: true },
	
    { path: '/search', handler: search, auth: true },
    { path: '/landing', handler: landing, auth: false },

    { path: '/', handler: dashboard, auth: true },
    { path: '*', handler: error404, auth: false }

	// { path: '/new-project', handler: projectCreate, auth: true },
	// { path: '/join-project', handler: joinProject, auth: true },

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
    // { path: '/upload', handler: upload, auth: true },
	
    // { path: '/search', handler: search, auth: true },
    // { path: '/landing', handler: landing, auth: false },

    // { path: '/', handler: dashboard, auth: true },
    // { path: '*', handler: error404, auth: false }
];

export default routes;