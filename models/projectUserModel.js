import sql from '../config/db.js';

class projectUserModel {
    constructor() {}

    /**
     * Async function to insert project users into db
     *
     * @params insertData: todo
     * @returns inserted row id
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
}

export default projectUserModel;
