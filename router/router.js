import home from './home.js';
import checklist from './checklist.js';
import checklistCategories from './checklistCategories.js';
import projectCreate from './projectCreate.js';
import login from './login.js';
import register from './register.js';
import profile from './profile.js';
import logout from './logout.js';
import changePassword from './changePassword.js';

const routes = [
    { path: '/new-project', handler: projectCreate, auth: false },
    { path: '/change-password', handler: changePassword, auth: false },
    { path: '/profile', handler: profile, auth: false },
    { path: '/login', handler: login, auth: false },
    { path: '/logout', handler: logout, auth: false },
    { path: '/register', handler: register, auth: false },
    { path: '/checklist', handler: checklist, auth: false },
    { path: '/categories', handler: checklistCategories, auth: false },
    { path: '/', handler: home, auth: false },
];

export default routes;
