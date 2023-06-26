import projectModel from '../models/projectModel.js';
import projectUserModel from '../models/projectUserModel.js';
import wcagModel from '../models/wcagModel.js';
import projectChecklistModel from '../models/projectChecklistModel.js';
import { calcTotalProgressByItems } from '../helpers/calcTotalProgress.js';


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
 * @returns { boolean, number }
 */
const createProject = async (projectData, user_id) => {
    // todo: remove this default user_id
    if (!user_id) {
        user_id = 1;
    }

    let completedInsert = true;
    const projectId = await ProjectModel.insert(projectData);

    const projectUserInsert = {
        project_id: projectId,
        user_id: user_id,
        is_admin: true
    };

    await ProjectUserModel.insert(projectUserInsert);

    // Get all WCAG items based on the WCAG level
    const allMatchingWCAGItems = await WCAGModel.listWCAGItemsByLevel(
        projectData.level
    );

    // Insert each WCAG item into the project checklist model
    for (let i = 0; i < allMatchingWCAGItems.length; i++) {
        const item = allMatchingWCAGItems[i];

        const insertData = {
            project_id: projectId,
            wcag_item_id: item.wcag_item_id,
            wcag_level: item.wcag_level,
            is_completed: false
        };

        const insertId = await checklistModel.insert(insertData);

        // If the insert went wrong, it will return 0, so end the loop!
        if (insertId == 0) {
            completedInsert = false;
            break;
        }
    }

    return { completedInsert: completedInsert, projectId: projectId };
};

/**
 * Updates a project by adding WCAG items of the specified level that are not already present in the existing WCAG items.
 * @param {Array} existingWCAGItems - An array of existing WCAG items.
 * @param {string} level - The WCAG level to filter the WCAG items.
 * @param {string} project_id - The ID of the project to update.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
const insertWcagItemsForProject = async (level, project_id) => {
    const wcagItemsToInsert = await WCAGModel.listWCAGItemsByLevel(level);
    let completedInsert = true;

    for (let i = 0; i < wcagItemsToInsert.length; i++) {
        const item = wcagItemsToInsert[i];

        const insertData = {
            project_id: project_id,
            wcag_item_id: item.wcag_item_id,
            is_completed: false
        };

        const insertId = await checklistModel.insert(insertData);

		// If the insert went wrong, it will return 0, so end the loop!
        if (insertId == 0) {
            completedInsert = false;
            break;
        }
    }

	return { completedInsert: completedInsert, projectId: project_id };

};


const createFullProjectOverview = async (wcagCategory, projectId) => {
    const wcagItems = await WCAGModel.listWCAGItemsByParentId(
        wcagCategory.wcag_id,
        projectId
    );

    const projectInfo = await ProjectModel.getProject(projectId);

    const { all_checklists, completed_checklists } =
        calcTotalProgressByItems(wcagItems);

    projectInfo.all_checklists = all_checklists;
    projectInfo.completed_checklists = completed_checklists;
    
    const allProjectUsers = await ProjectUserModel.listProjectUsers(projectId);
    
    projectInfo.all_users = allProjectUsers;
    projectInfo.checklist_data = wcagItems;

    return projectInfo;
};

export default {
    createProject,
    insertWcagItemsForProject,
    createFullProjectOverview
};
