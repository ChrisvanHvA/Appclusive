import projectModel from '../models/projectModel.js';
import projectUserModel from '../models/projectUserModel.js';
import wcagModel from '../models/wcagModel.js';

const WCAGModel = new wcagModel();
const ProjectModel = new projectModel();
const ProjectUserModel = new projectUserModel();

const createProject = async (insertData, user_id) => {
	const projectId = await ProjectModel.insert(insertData);
    const userProjectId = await ProjectUserModel.insert(projectId, user_id, true);

};

export default {
    createWCAGOverview,
};
