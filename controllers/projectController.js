import projectModel from '../models/projectModel.js';
import projectUserModel from '../models/projectUserModel.js';
import wcagModel from '../models/wcagModel.js';
import projectChecklistModel from '../models/projectChecklistModel.js';

const WCAGModel = new wcagModel();
const ProjectModel = new projectModel();
const ProjectUserModel = new projectUserModel();
const checklistModel = new projectChecklistModel();

const createProject = async (insertData, user_id) => {
	const projectId = await ProjectModel.insert(insertData);
    await ProjectUserModel.insert(projectId, user_id, true);

    const allMatchingWCAGItems = await WCAGModel.listWCAGItemsByLevel(insertData.level);

    // project_id, wcag_item_id, is_completed, assignees
    allMatchingWCAGItems.forEach(async (item) => {
        const data = { 
            project_id: projectId,
            wcag_item_id: item.wcag_item_id,
            is_completed: false,
            assignees: []
        };

        await checklistModel.insert(data);
    });

};

export default {
    createProject,
};
