import { findRoute } from '../helpers/findRoute.js';

const hasAccessToProject = async (req, res, next) => {
    const match = await findRoute(req.originalUrl);

	if (!match?.route.path.includes(':projectId')) {
		return next();
	}

	const user = res.locals.user;
	const projectId = req.params.projectId;

	if (!user || !projectId) {
		// return res.redirect('/login');
	}

	// todo: check if user is involved in project
	next();
}

export { hasAccessToProject };