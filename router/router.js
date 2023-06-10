import home from './home.js';
import checklist from './checklist.js';
import checklistCategories from './checklistCategories.js';
import projectCreate from './projectCreate.js';
import login from './login.js';
import register from './register.js';
import account from './account.js';
import logout from './logout.js';
import changePassword from './changePassword.js';
import forgotPassword from './forgotPassword.js';
import resetPassword from './resetPassword.js';

const routes = [
    { path: '/new-project', handler: projectCreate, auth: true },
    { path: '/change-password', handler: changePassword, auth: true },
    { path: '/forgot-password', handler: forgotPassword, auth: false },
    { path: '/reset-password', handler: resetPassword, auth: false },
    { path: '/account', handler: account, auth: true },
    { path: '/login', handler: login, auth: false },
    { path: '/logout', handler: logout, auth: true },
    { path: '/register', handler: register, auth: false },
    { path: '/checklist', handler: checklist, auth: true },
    { path: '/categories', handler: checklistCategories, auth: true },
    { path: '/', handler: home, auth: true },
];

export default routes;
