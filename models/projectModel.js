import sql from '../config/db.js';

class projectModel {

    /**
     * Async function to retrieve list of projects user is involved in
     * @params userId: id of the user account
     * @returns list of projects
     */
    async listProjects(userId) {
        try {
            const projects = await sql`
				SELECT p.*, pu.user_id, pu.is_admin
				FROM project_users AS pu
				LEFT JOIN projects AS p ON p.project_id = pu.project_id
				WHERE pu.user_id = ${ userId }
				`;
			return projects
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default projectModel;
