import home from './home.js';
import checklist from './checklist.js';
import projectCreate from './projectCreate.js';
import login from './login.js';
import register from './register.js';
import profile from './profile.js';
import logout from './logout.js';

const routes = [
    { path: '/new-project', handler: projectCreate, auth: false },
    { path: '/profile', handler: profile, auth: false },
    { path: '/login', handler: login, auth: false },
    { path: '/logout', handler: logout, auth: false },
    { path: '/register', handler: register, auth: false },
    { path: '/checklist', handler: checklist, auth: false },
    { path: '/', handler: home, auth: false },
];

export default routes;
