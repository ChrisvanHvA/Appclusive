import home from './home.js';
import checklist from './checklist.js';
import projectCreate from './projectCreate.js';

const routes = [
	{ path: '/new-project', handler: projectCreate },
    { path: '/checklist', handler: checklist },
    { path: '/', handler: home },
];

export default routes;
