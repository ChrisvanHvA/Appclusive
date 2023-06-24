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

const updateProject = async (existingWCAGItems, level, project_id) => {
    const allMatchingWCAGItems = await WCAGModel.listWCAGItemsByLevel(level);

    const wcagItemsToInsert = allMatchingWCAGItems.filter(
        (item) =>
            !existingWCAGItems.some(
                (existingItem) =>
                    existingItem.wcag_item_id === item.wcag_item_id
            )
    );

    for (let i = 0; i < wcagItemsToInsert.length; i++) {
        const item = wcagItemsToInsert[i];

        const insertData = {
            project_id: project_id,
            wcag_item_id: item.wcag_item_id,
            wcag_level: item.wcag_level,
            is_completed: false
        };

        await checklistModel.insert(insertData);
    }
};

export default {
    createProject,
    updateProject
};
