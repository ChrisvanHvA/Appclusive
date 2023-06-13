import projectModel from '../models/projectModel.js';
import projectUserModel from '../models/projectUserModel.js';
import wcagModel from '../models/wcagModel.js';
import projectChecklistModel from '../models/projectChecklistModel.js';

const WCAGModel = new wcagModel();
const ProjectModel = new projectModel();
const ProjectUserModel = new projectUserModel();
const checklistModel = new projectChecklistModel();

/**
 * Inserting data into multiple tables to ensure 
 * checklists are connected to the right projects and users
 * 
 * @params insertData: todo
 * @params user_id: user who created the project
 * @returns bool
 */
const createProject = async (projectData, user_id) => {
    let completedInsert = true;
	const projectId = await ProjectModel.insert(projectData);

    const projectUserInsert = {
        project_id: projectId, 
        user_id: user_id,
        is_admin: true
    };

    await ProjectUserModel.insert(projectUserInsert);

    // Get all WCAG items based on the WCAG level
    const allMatchingWCAGItems = await WCAGModel.listWCAGItemsByLevel(projectData.level);

    // Insert each WCAG item into the project checklist model
    for (let i = 0; i < allMatchingWCAGItems.length; i++) {
        const item = allMatchingWCAGItems[i];

        const insertData = { 
            project_id: projectId,
            wcag_item_id: item.wcag_item_id,
            is_completed: false,
        };

        const insertId = await checklistModel.insert(insertData);

        // If the insert went wrong, it will return 0, so end the loop!
        if (insertId == 0) {
            completedInsert = false;
            break;          
        }
        
    }

    return completedInsert;
};

export default {
    createProject,
};