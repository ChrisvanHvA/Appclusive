import express from 'express';
import home from './home.js';
import checklist from './checklist.js';
import checklistCategories from './checklistCategories.js';

const routes = [
    { path: '/checklist', view: checklist },
    { path: '/', view: home },
    { path: '/categories', view: checklistCategories },
];

export default routes;
