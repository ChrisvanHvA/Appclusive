import sql from '../config/db.js';

class projectModel {
    constructor() {}

    /**
     * Async function to insert a project into the db
     *
     * @params insertData: object containing the fields to insert
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
     * Async function to update project information
     *
     * @params projectId: id of the project to update
     * @params updateData: object containing the fields to update
     * @returns boolean indicating whether the update was successful
     */
    async update(projectId, updateData) {
        try {
            const { title, description, level } = updateData;

            const result = await sql`
        UPDATE projects
        SET
          title = ${title ?? sql`title`},
          description = ${description ?? sql`description`},
          wcag_level = ${level ?? sql`wcag_level`}
        WHERE
          project_id = ${projectId}
      `;

            return result.rowCount > 0;
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
        if (!projectId || projectId == 0) return null;

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
				  u.first_name,
				  NULLIF(u.insertion, ''),
				  u.surname
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

    async getRecentProjectNames(userId, limit = 3) {
        try {
            const projects = await sql`
				SELECT p.title, p.project_id
				FROM project_users AS pu
				LEFT JOIN projects AS p ON p.project_id = pu.project_id
				WHERE pu.user_id = ${userId}
				ORDER BY p.project_id DESC
				LIMIT ${limit}
			`;

            return projects;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default projectModel;
