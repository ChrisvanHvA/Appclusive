import express from 'express';
import home from './home.js';
const router = express.Router();


const routes = [
	// { path: '/test', view: test},
	{ path: '/', view: home},
	// { path: '*', view: error}
];


export default routes;