import projectModel from '../models/projectModel.js';
import wcagModel from '../models/wcagModel.js';

const WCAGModel = new wcagModel();
const ProjectModel = new projectModel();

const createProject = async (insertData) => {
	const projectId = await ProjectModel.insert(insertData);

};

export default {
    createWCAGOverview,
};
