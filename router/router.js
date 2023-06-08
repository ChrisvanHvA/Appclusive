import express from 'express';
import home from './home.js';
import checklist from './checklist.js';
import login from './login.js';

const routes = [
    { path: '/login', view: login },
    { path: '/checklist', view: checklist },
    { path: '/', view: home },
];

export default routes;
