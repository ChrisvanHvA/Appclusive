import sql from '../config/db.js';

class projectModel {
    constructor() {}

    /**
     * Async function to insert a project into the db
     *
     * @params insertData: todo
     * @returns project_id
     */
    async insert(insertData) {
        try {
            const { title, description, level } = insertData;

            const [insertedRow] = await sql`
				INSERT INTO projects (title, description, wcag_level)
				VALUES (
					${title ?? null},
					${description ?? null},
					${level ?? null}
				)
	
				RETURNING project_id;
			`;
            return insertedRow.project_id ?? 0;
        } catch (error) {
            console.log(error);
            return 0;
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
                WHERE wcag_item_id = ${wcag_item_id}
				AND project_id = ${project_id}
                RETURNING project_checklists_id;
            `;

			return updated.project_checklists_id ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

	/**
     * Async function to retrieve singular project by id
     * @params projectId: id of the requested project
     * @returns project
     */
	async getProject(projectId) {
		if (!projectId || projectId == 0 ) return null;
		
			try {
	
				const [project] = await sql`
					SELECT *
					FROM projects
					WHERE project_id = ${projectId}
				`;
	
				return project;
			} catch (error) {
				console.log(error);
				return null;
			}
		
	}

    /**
     * Async function to retrieve list of projects user is involved in
     * @params userId: id of the user account
     * @returns list of projects
     */
    async listProjects(userId) {
        try {
            const projects = await sql`
			SELECT p.*, pu.user_id,
			(SELECT COUNT(*) FROM project_checklists WHERE project_id = p.project_id) AS all_checklists,
			(SELECT COUNT(*) FROM project_checklists WHERE project_id = p.project_id AND is_completed = TRUE) AS completed_checklists,
			(
			  SELECT json_agg(json_build_object(
				'first_name', u.first_name,
				'insertion', u.insertion,
				'surname', u.surname,
				'full_name', CONCAT_WS(' ',
				  NULLIF(u.first_name, ''),
				  NULLIF(u.insertion, ''),
				  NULLIF(u.surname, '')
				),
				'profile_pic', u.profile_pic
			  ))
			  FROM project_users AS pu
			  LEFT JOIN users AS u ON u.user_id = pu.user_id
			  WHERE pu.project_id = p.project_id
			) AS all_users,
			(CASE
				WHEN (SELECT COUNT(*) FROM project_checklists WHERE project_id = p.project_id AND is_completed = TRUE) = 0 THEN 'New'
				WHEN (SELECT COUNT(*) FROM project_checklists WHERE project_id = p.project_id AND is_completed = TRUE) = (SELECT COUNT(*) FROM project_checklists WHERE project_id = p.project_id) THEN 'Done'
				ELSE 'WIP'
			  END) AS status
		  FROM project_users AS pu
		  LEFT JOIN projects AS p ON p.project_id = pu.project_id
		  LEFT JOIN project_checklists pc ON pc.project_id = p.project_id
		  WHERE pu.user_id = ${userId}
		  GROUP BY p.project_id, pu.user_id;
            `;

            return projects;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default projectModel;
