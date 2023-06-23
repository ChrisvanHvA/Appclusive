/* ---------------------------------- */
/*          currently unused          */
/* ---------------------------------- */

import projectModel from '../models/projectModel.js';

const ProjectModel = new projectModel();

// todo: nog iets verzinnen dat dit slim kan worden opgeslagen zodat het niet elke keer opnieuw hoeft te worden opgehaald
const setSidebarProjects = async (req, res, next) => {    
	// todo: niet vergeten de || 1 weg te halen
	const userId = res.locals.user?.user_id || 7;

	if (!userId) return next();

	const projects = await ProjectModel.getRecentProjectNames(userId);

	res.locals.recentProjectNames = projects;

    next();
};


export { setSidebarProjects };
