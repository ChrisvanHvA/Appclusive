import projectModel from '../models/projectModel.js';
import projectUserModel from '../models/projectUserModel.js';
import wcagModel from '../models/wcagModel.js';
import projectChecklistModel from '../models/projectChecklistModel.js';
import { calcTotalProgressByItems } from '../helpers/calcTotalProgress.js';

const WCAGModel = new wcagModel();
const ProjectModel = new projectModel();
const ProjectUserModel = new projectUserModel();
const ProjectChecklistModel = new projectChecklistModel();

/**
 * Inserting data into multiple tables to ensure
 * checklists are connected to the right projects and users
 *
 * @params insertData: todo
 * @params user_id: user who created the project
 * @returns {Promise<any>}
 */
const createProject = async (projectData, user_id) => {

    try {
        // todo: remove this default user_id
        if (!user_id) {
            user_id = 1;
        }

        const projectId = await ProjectModel.insert(projectData);

        if (projectId == 0) {
            throw new Error('Project insert went wrong');
        }

        const projectUserInsert = {
            project_id: projectId,
            user_id: user_id,
            is_admin: true
        };

        const projectUserId = await ProjectUserModel.insert(projectUserInsert);

        if (projectUserId == 0) {
            throw new Error('Project user insert went wrong');
        }

        const updatedWcagItems = await updateWcagItemsForProject(
            projectId,
            projectData.wcag_level.length
        );

        if (!updatedWcagItems) {
            throw new Error('WCAG Items not updated');
        }

        return { completedInsert: true, projectId: projectId };
    } catch (error) {
        console.log(error);
        return { completedInsert: false, projectId: projectId };
    }
};

/**
 * Updates the checklists of a project, removing any items that are higher than the project level, and adding any items that are lower than or equal to the project level.
 * @param {string} projectId - The ID of the project to update.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
const updateWcagItemsForProject = async (projectId) => {
    
    try {
        const project = await ProjectModel.getProject(projectId);
        const projectLevel = project.wcag_level.length;

        const allWcagItems = await WCAGModel.listWCAGItemsByLevel('AAA');
        // TODO: getAllChecklistItems of project id

        for (let i = 0; i < allWcagItems.length; i++) {
            const item = allWcagItems[i];
            const itemLevel = item.wcag_level.length;

            // check if the item is already in the project
            const itemInDatabase = await ProjectChecklistModel.getChecklistItem(
                projectId,
                item.wcag_item_id
            );

            // if the item exists and is higher than the projectLevel -> delete it
            if (itemInDatabase && itemLevel > projectLevel) {
                await ProjectChecklistModel.delete(
                    projectId,
                    itemInDatabase.wcag_item_id
                );

            // if the item is not in the project -> add it
            } else if (!itemInDatabase) {
                const insertData = {
                    project_id: projectId,
                    wcag_item_id: item.wcag_item_id,
                    is_completed: false,
                    assignees: []
                };

                await ProjectChecklistModel.insert(insertData);
            }
        }

        return false;
    } catch (error) {
        return false;
    }   
};

const createFullProjectOverview = async (wcagCategory, projectId) => {
    const wcagItems = await ProjectChecklistModel.listChecklistItems(
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
    updateWcagItemsForProject,
    createFullProjectOverview
};
