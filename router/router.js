import home from './home.js';
import checklist from './checklist.js';
import login from './login.js';
import register from './register.js';
import profile from './profile.js';
import logout from './logout.js';

const routes = [
    { path: '/profile', view: profile, auth: true },
    { path: '/login', view: login, auth: false },
    { path: '/logout', view: logout, auth: true },
    { path: '/register', view: register, auth: false },
    { path: '/checklist', view: checklist, auth: true },
    { path: '/', view: home, auth: true },
];

export default routes;
