import sql from '../config/db.js';

class projectChecklistModel {
    constructor() {}

    /**
     * Async function to insert checklists into db
     *
     * @params insertData: todo
     * @returns inserted row id
     */
    async insert(insertData) {
        try {
            const { project_id, wcag_item_id, is_completed, assignees } =
                insertData;

            const [insertedRow] = await sql`
                INSERT INTO project_checklists (project_id, wcag_item_id, is_completed, assignees)
                VALUES (
					${parseInt(project_id) ?? null},
					${parseInt(wcag_item_id) ?? null},
					${is_completed ?? false},	
					${assignees ?? []}		
                )

                RETURNING project_checklists_id;
            `;

            return insertedRow.project_checklists_id ?? 0;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

    async updateAssignees(assignees, projectId, wcagItemId) {
        try {
            await sql`
                UPDATE project_checklists
                SET assignees = ${assignees}
                WHERE wcag_item_id = ${wcagItemId} AND project_id = ${projectId}
            `;

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * Async function to update the completion status of a specific checklist item within a project
     *
     * @params wcag_item_id
     * @params project_id
     * @params bool
     * @returns bool
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
            console.log(error);
            return false;
        }
    }

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
            console.log(error);
            return null;
        }
    }

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
            console.log(error);
            return null;
        }
    }

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
            console.log(error);
            return null;
        }
    }
}

export default projectChecklistModel;
