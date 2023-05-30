import express from 'express';
import home from './home.js';

const routes = [
    // { path: '/test', view: test},
    { path: '/', view: home },
    // { path: '*', view: error}
];

export default routes;
