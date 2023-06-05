import express from 'express';
import home from './home.js';
import checklist from './checklist.js';

const routes = [
    { path: '/checklist', view: checklist },
    { path: '/', view: home },
];

export default routes;
