import home from './home.js';
import checklist from './checklist.js';
import projectCreate from './projectCreate.js';
import login from './login.js';
import register from './register.js';
import profile from './profile.js';
import logout from './logout.js';

const routes = [
	  { path: '/new-project', handler: projectCreate, auth: true },
    { path: '/profile', handler: profile, auth: true },
    { path: '/login', handler: login, auth: false },
    { path: '/logout', handler: logout, auth: true },
    { path: '/register', handler: register, auth: false },
    { path: '/checklist', handler: checklist, auth: true },
    { path: '/', handler: home, auth: true },
];

export default routes;
