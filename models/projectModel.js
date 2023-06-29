import sql from '../config/db.js';

class projectModel {
    constructor() {}

    /**
     * Async function to insert a project into the db
     *
     * @param object insertData: The fields to insert
     * @returns {number} - The project_id
     */
    async insert(insertData) {
        try {
            const { title, description, wcag_level } = insertData;

            const [insertedRow] = await sql`
				INSERT INTO projects (title, description, wcag_level)
				VALUES (
					${title ?? null},
					${description ?? null},
					${wcag_level ?? null}
				)
	
				RETURNING project_id;
			`;
            return insertedRow.project_id ?? 0;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    /**
     * Async function to update project information
     *
     * @param {number} projectId The ID of the project to update
     * @param object updateData: The fields to update
     * @param object (optional) oldProject: The old project object
     * @returns {boolean} - True if the update was successful, false otherwise
     */
    async update(projectId, updateData) {
        try {
            const { title, description, wcag_level: newWcagLevel } = updateData;

            await sql`
                UPDATE projects
                SET title = ${title ?? sql`title`},
                description = ${description ?? sql`description`},
                wcag_level = ${newWcagLevel ?? sql`wcag_level`}
                WHERE project_id = ${projectId}
            `;

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Async function to delete a project
     *
     * @param {number} projectId The ID of the project to delete
     * @returns {boolean} True if the deletion was successful, false otherwise
     */
    async deleteProject(projectId) {
        try {
            await Promise.all([
                sql`DELETE FROM project_users
					WHERE project_id = ${projectId};`,
                sql`DELETE FROM project_checklists
					WHERE project_id = ${projectId};`,
                sql`DELETE FROM projects 
					WHERE project_id = ${projectId};`
            ]);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Async function to retrieve a project by ID
     *
     * @param {number} projectId The ID of the requested project
     * @returns object - The project object
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
            console.error(error);
            return null;
        }
    }

    /**
     * Async function to retrieve a project by it's invite code
     *
     * @param {number} projectCode The requested invite code
     * @returns object - The project object
     */
    async getProjectByCode(projectCode) {
        try {
            if (!projectCode) {
                throw new Error('No project code provided');
            }

            const [project] = await sql`
					SELECT *
					FROM projects
					WHERE project_invite_code = ${projectCode}
				`;

            return project;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Async function to list projects by user ID
     *
     * @param {number} userId The ID of the user
     * @returns array of objects - The project object
     */
    async listProjects(userId) {
        try {
        //     const projects = await sql`
		// 	SELECT p.*, pu.user_id,
		// 	(SELECT COUNT(*) FROM project_checklists WHERE project_id = p.project_id) AS all_checklists,
		// 	(SELECT COUNT(*) FROM project_checklists WHERE project_id = p.project_id AND is_completed = TRUE) AS completed_checklists,
		// 	(
		// 	  SELECT json_agg(json_build_object(
		// 		'first_name', u.first_name,
		// 		'insertion', u.insertion,
		// 		'surname', u.surname,
		// 		'full_name', CONCAT_WS(' ',
		// 		  u.first_name,
		// 		  NULLIF(u.insertion, ''),
		// 		  u.surname
		// 		),
		// 		'profile_pic', u.profile_pic
		// 	  ))
		// 	  FROM project_users AS pu
		// 	  LEFT JOIN users AS u ON u.user_id = pu.user_id
		// 	  WHERE pu.project_id = p.project_id
		// 	) AS all_users,
		// 	(CASE
		// 		WHEN (SELECT COUNT(*) FROM project_checklists WHERE project_id = p.project_id AND is_completed = TRUE) = 0 THEN 'New'
		// 		WHEN (SELECT COUNT(*) FROM project_checklists WHERE project_id = p.project_id AND is_completed = TRUE) = (SELECT COUNT(*) FROM project_checklists WHERE project_id = p.project_id) THEN 'Done'
		// 		ELSE 'In Progress'
		// 	  END) AS status
		//   FROM project_users AS pu
		//   LEFT JOIN projects AS p ON p.project_id = pu.project_id
		//   LEFT JOIN project_checklists pc ON pc.project_id = p.project_id
		//   WHERE pu.user_id = ${userId} AND p.project_id IS NOT NULL
		//   GROUP BY p.project_id, pu.user_id
		//   ORDER BY p.updated_at DESC NULLS LAST, p.project_id DESC;
        //     `;
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
                    ELSE 'In Progress'
                END) AS status
            FROM project_users AS pu
            LEFT JOIN projects AS p ON p.project_id = pu.project_id
            LEFT JOIN project_checklists pc ON pc.project_id = p.project_id
            WHERE pu.user_id = ${userId} AND p.project_id IS NOT NULL
            GROUP BY p.project_id, pu.user_id
            ORDER BY (
                    SELECT COUNT(*) 
                    FROM project_checklists 
                    WHERE project_id = p.project_id AND is_completed = TRUE
                    ) = (
                    SELECT COUNT(*) 
                    FROM project_checklists
                    WHERE project_id = p.project_id
                    ) ASC, p.updated_at DESC NULLS LAST, p.project_id DESC
            `;

            return projects;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    /**
     * Async function to add notes to a project
     *
     * @param {number} project_id The ID of the project to add notes to
     * @param {string} notes The notes to be added
     * @returns {boolean} - True if the notes were added successfully, false otherwise
     */
    async addNotes(project_id, notes) {
        try {
            if (!project_id) {
                throw new Error('No project ID provided');
            }

            await sql`
                UPDATE projects
                SET notes = ${notes}
                WHERE project_id = ${project_id}
            `;

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default projectModel;