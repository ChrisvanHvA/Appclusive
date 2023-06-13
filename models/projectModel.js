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
     * Async function to update the completion status of a specific checklist item
     * 
     * @params wcag_item_id
     * @params bool
     * @returns bool
     */
    async updateChecklistCompletion(wcag_item_id, bool) {
        try {
            const updated = await sql`
                UPDATE project_checklists
                SET is_completed = ${bool}
                WHERE wcag_item_id = ${wcag_item_id}
                RETURNING project_checklists_id;
            `;

            if (updated.project_checklists_id) {
                return true;
            }

            return false;
        } catch (error) {
            console.log(error);
            return false;
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
				SELECT p.*, pu.user_id, pu.is_admin
				FROM project_users AS pu
				LEFT JOIN projects AS p ON p.project_id = pu.project_id
				WHERE pu.user_id = ${userId}
				`;
            return projects;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default projectModel;
