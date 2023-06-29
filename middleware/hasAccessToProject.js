import { findRoute } from '../helpers/findRoute.js';
import projectUserModel from '../models/projectUserModel.js';

const ProjectUserModel = new projectUserModel();

const hasAccessToProject = async (req, res, next) => {
	// todo
	// return next();
    const match = await findRoute(req.originalUrl);
	const projectIdIndex = match.paramNames.indexOf('projectId');
	const projectId = match.paramValues[projectIdIndex];

	if (!projectId) {
		return next();
	}


	const user = res.locals.user;
	const hasAccess = await ProjectUserModel.hasAccessToProject(projectId, user?.user_id);

	return hasAccess ? next() : res.redirect('/not-found');
}

export { hasAccessToProject };