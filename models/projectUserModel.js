import sql from '../config/db.js';

class projectUserModel {
    constructor() {}

    /**
     * Async function to insert project users into db
     *
     * @param insertData: Object - The data to be inserted
     * @returns {number} - The inserted row id
     */
    async insert(insertData) {
        try {
            const { project_id, user_id, is_admin } = insertData;

            const [insertedRow] = await sql`
                INSERT INTO project_users (project_id, user_id, is_admin)
                VALUES (
					${project_id ?? null},
					${user_id ?? null},
					${is_admin ?? null}		
                )

                RETURNING project_users_id;
            `;
            return insertedRow.project_users_id ?? 0;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

    /**
     * Async function to check if a user has access to a project
     *
     * @param {number} projectId The project ID
     * @param {number} userId The user ID
     * @returns {boolean} True if the user has access, false otherwise
     */
    async hasAccessToProject(projectId, userId) {
        try {
            const [{ result }] = await sql`
			SELECT EXISTS (
				SELECT 1 FROM project_users
				WHERE project_id = ${projectId}
				AND user_id = ${userId}
			) AS result
		  `;

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * Async function to list users associated with a project
     *
     * @param {number} projectId The project ID
     * @returns Array - An array of project users
     */
    async listProjectUsers(projectId) {
        try {
            const result = await sql`
                SELECT u.*, CONCAT_WS(' ',
				  u.first_name,
				  NULLIF(u.insertion, ''),
				  u.surname
				) AS "full_name", pc.is_admin
                FROM project_users AS pc
                LEFT JOIN users AS u ON u.user_id = pc.user_id
                WHERE project_id = ${projectId}
		  `;

            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /**
     * Async function to check if a user is an admin of a project
     *
     * @param {number} projectId The project ID
     * @param {number} userId The user ID
     * @returns {boolean} True if the user is an admin, false otherwise
     */
    async isAdmin(projectId, userId) {
		if (!projectId || !userId) return false;
		
        try {
			const [{ is_admin }] = await sql`
				SELECT is_admin
					FROM project_users
					WHERE project_id = ${projectId}
					AND user_id = ${userId}
			`;
			return is_admin ?? false;
        } catch (error) {
            console.log(error);
			return false;
        }
    }
}

export default projectUserModel;