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
 * @param projectData: Object - The project data to be inserted
 * @param user_id: Number - The ID of the user who created the project
 * @returns Promise<any>
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
            projectId
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
 * Updates WCAG items for a project
 *
 * @param projectId: Number - The ID of the project
 * @returns boolean - True if the update is completed, false otherwise
 */
const updateWcagItemsForProject = async (projectId) => {
    
    try {
        const project = await ProjectModel.getProject(projectId);
        await ProjectChecklistModel.addNewProjectChecklists(projectId);

        // If the project is not AAA, delete all checklists that are above the project level
        if (project.wcag_level !== 'AAA') {
            await ProjectChecklistModel.deleteProjectChecklists(projectId);
        }

        return true;
    } catch (error) {
        return false;
    }   
};


/**
 * Creates a full project overview with checklist data
 *
 * @param wcagCategory: Object - The WCAG category object
 * @param projectId: Number - The ID of the project
 * @returns Object - The project information
 */
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