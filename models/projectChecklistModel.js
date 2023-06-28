import sql from '../config/db.js';

class projectChecklistModel {
    constructor() {}

	/**
     * Async function to update the assignees of a checklist item within a project
     *
     * @param {number[]} assignees The assignees to be updated
     * @param {number} projectId The project ID
     * @param {number} wcagItemId The WCAG item ID
     * @returns {boolean} True if the update was successful, false otherwise
     */
    async updateAssignees(assignees, projectId, wcagItemId) {
        try {
            await sql`
                UPDATE project_checklists
                SET assignees = ${assignees}
                WHERE wcag_item_id = ${wcagItemId} AND project_id = ${projectId}
            `;

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Async function to update the completion status of a specific checklist item within a project
     *
     * @param {number} wcag_item_id The WCAG item ID
     * @param {number} project_id The project ID
     * @param {boolean} bool The completion status
     * @returns {boolean} True if the update was successful, false otherwise
     */
    async updateChecklistCompletion(wcag_item_id, project_id, bool) {
        if (wcag_item_id == 0 || project_id == 0 || bool == null) {
            return false;
        }

        try {
            const [updated] = await sql`
					UPDATE project_checklists
					SET is_completed = ${bool}
					WHERE wcag_item_id = ${parseInt(wcag_item_id)}
					AND project_id = ${parseInt(project_id)}
					RETURNING project_checklists_id;
				`;

            return updated.project_checklists_id ? true : false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

	/**
     * Async function to retrieve project category data
     *
     * @param {number} project_id The project ID
     * @returns object - The project category data
     */
    async getProjectCategoryData(project_id) {
        if (project_id == 0) {
            return null;
        }
        try {
            const data = await sql`
			SELECT wc.*,
			(
				SELECT COUNT(wi.*) 
				FROM project_checklists AS pc
				LEFT JOIN wcag_item AS wi ON wi.wcag_item_id = pc.wcag_item_id
				LEFT JOIN wcag AS wc_parent ON wc_parent.wcag_id = wi.parent_id
				WHERE wc_parent.wcag_id = wc.wcag_id AND pc.project_id = ${project_id}
			) AS all_checklists,
			(
				SELECT COUNT(wi.*) 
				FROM project_checklists AS pc
				LEFT JOIN wcag_item AS wi ON wi.wcag_item_id = pc.wcag_item_id
				LEFT JOIN wcag AS wc_parent ON wc_parent.wcag_id = wi.parent_id
				WHERE wc_parent.wcag_id = wc.wcag_id AND pc.project_id = ${project_id} AND pc.is_completed = TRUE
			) AS completed_checklists
			FROM wcag AS wc
			ORDER BY wc.wcag_id;
			`;

            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

	/**
     * Async function to list checklist items for a given parent ID and project ID
     *
     * @param {number} parentId The parent ID
     * @param {number} projectId The project ID
     * @returns array - An array of checklist items
     */
    async listChecklistItems(parentId, projectId) {
        if (projectId == 0) {
            return null;
        }

        try {
            const data = await sql`
			SELECT wi.*, pc.is_completed,
			(
				SELECT array_agg(json_build_object(
							'first_name', u.first_name,
							'insertion', u.insertion,
							'surname', u.surname,
							'full_name', CONCAT_WS(' ',
							u.first_name,
							NULLIF(u.insertion, ''),
							u.surname
							),
                            'user_id', u.user_id,
							'profile_pic', u.profile_pic
				))
				FROM unnest(pc.assignees) AS a
				JOIN users AS u ON u.user_id = a
			) AS assignees
			FROM project_checklists AS pc
			LEFT JOIN wcag_item AS wi ON wi.wcag_item_id = pc.wcag_item_id
			WHERE pc.project_id = ${projectId} AND wi.parent_id = ${parentId};
			`;

            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

	/**
     * Async function to add new project checklists based on the WCAG level of the project
     *
     * @param {number} projectId The project ID
     * @returns promise<void>
     */
    async addNewProjectChecklists(projectId) {
        try {
            await sql`
				INSERT INTO project_checklists (project_id, wcag_item_id, is_completed, assignees)
				SELECT projects.project_id, wcag_item.wcag_item_id, false, array[]::integer[]
				FROM projects
				JOIN wcag_item ON LENGTH(projects.wcag_level) >= LENGTH(wcag_item.wcag_level)
				WHERE projects.project_id = ${projectId}
				AND NOT EXISTS (
				SELECT 1
				FROM project_checklists
				WHERE project_checklists.project_id = projects.project_id
				AND project_checklists.wcag_item_id = wcag_item.wcag_item_id
				)
			`;
        } catch (error) {
            console.error(error);
        }
    }

	/**
     * Async function to delete all project checklists above the project level
     *
     * @param {number} projectId The project ID
     * @returns promise<void>
     */
	async deleteProjectChecklists(projectId) {
		try {
			await sql`
				DELETE FROM project_checklists
				WHERE project_id = ${projectId}
				AND wcag_item_id IN (
					SELECT wcag_item_id
					FROM wcag_item
					WHERE LENGTH(wcag_item.wcag_level) > (
						SELECT LENGTH(projects.wcag_level)
						FROM projects
						WHERE projects.project_id = ${projectId}
					)
				)
			`;
		} catch (error) {
			console.error(error);
		}
	}
}

export default projectChecklistModel;