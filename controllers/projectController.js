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
    // todo: remove this default user_id
    if (!user_id) {
        user_id = 1;
    }

    const projectId = await ProjectModel.insert(projectData);

    const projectUserInsert = {
        project_id: projectId,
        user_id: user_id,
        is_admin: true
    };

    await ProjectUserModel.insert(projectUserInsert);
    await updateWcagItemsForProject(projectId);

    return projectId;
};

/**
 * Updates the checklists of a project, removing any items that are higher than the project level, and adding any items that are lower than or equal to the project level.
 * @param {string} projectId - The ID of the project to update.
 * @returns {Promise<boolean>} - A promise that resolves when the update is complete.
 */
const updateWcagItemsForProject = async (projectId) => {
    const project = await ProjectModel.getProject(projectId);
    let completedUpdate = true;

    if (!project) {
        return false;
    }

    try {
        await ProjectChecklistModel.addNewProjectChecklists(projectId);

        // If the project is not AAA, delete all checklists that are above the project level
        if (project.wcag_level !== 'AAA') {
            await ProjectChecklistModel.deleteProjectChecklists(projectId);
        }
    } catch (error) {
        console.log(error);
        return false;
    }

    return completedUpdate;
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
