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

    const projectUserInsert = {
        project_id: projectId, 
        user_id: 1,
        is_admin: true
    }

    await ProjectUserModel.insert(projectUserInsert);

    const allMatchingWCAGItems = await WCAGModel.listWCAGItemsByLevel(insertData.level);

    let completedInsert = true;

    for (let i = 0; i < allMatchingWCAGItems.length; i++) {
        const item = allMatchingWCAGItems[i];

        const data = { 
            project_id: projectId,
            wcag_item_id: item.wcag_item_id,
            is_completed: false,
        };

        const insertId = await checklistModel.insert(data);

        if (insertId == 0) {
            console.log('something went wrong...');
            completedInsert = false;
            break;          
        }
        
    }

    return completedInsert;

};

export default {
    createProject,
};
