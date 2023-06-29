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
    // { path: '/new-project', handler: projectCreate, auth: true },
	// { path: '/join-project', handler: joinProject, auth: true },

    // { path: '/change-password', handler: changePassword, auth: true },
    // { path: '/forgot-password', handler: forgotPassword, auth: false },
    // { path: '/reset-password', handler: resetPassword, auth: false },
    // { path: '/settings', handler: userSettings, auth: true },
    // { path: '/login', handler: login, auth: false },
    // { path: '/logout', handler: logout, auth: false },
    // { path: '/register', handler: register, auth: false },
	
    // { path: '/project/:projectId', handler: checklist, auth: true },
    // { path: '/project/:projectId/categories', handler: checklistCategories, auth: true },
    // { path: '/project/:projectId/settings', handler: projectSettings, auth: true },
    // { path: '/upload', handler: upload, auth: true },

    // { path: '/validator', handler: validatorTool, auth: true },
	
    // { path: '/search', handler: search, auth: true },
    // { path: '/landing', handler: landing, auth: false },

    // { path: '/', handler: dashboard, auth: true },
    // { path: '*', handler: error404, auth: false }

	{ path: '/new-project', handler: projectCreate, auth: false },
	{ path: '/join-project', handler: joinProject, auth: false },

    { path: '/change-password', handler: changePassword, auth: false },
    { path: '/forgot-password', handler: forgotPassword, auth: false },
    { path: '/reset-password', handler: resetPassword, auth: false },
	{ path: '/settings', handler: userSettings, auth: false },
    { path: '/login', handler: login, auth: false },
    { path: '/logout', handler: logout, auth: false },
    { path: '/register', handler: register, auth: false },
	
    { path: '/project/:projectId', handler: checklist, auth: false },
    { path: '/project/:projectId/categories', handler: checklistCategories, auth: false },
    { path: '/project/:projectId/settings', handler: projectSettings, auth: false },
    { path: '/upload', handler: upload, auth: false },

	{ path: '/validator', handler: validatorTool, auth: false },
	
    { path: '/search', handler: search, auth: false },
    { path: '/landing', handler: landing, auth: false },

    { path: '/', handler: dashboard, auth: false },
    { path: '*', handler: error404, auth: false }
];

export default routes;