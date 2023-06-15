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
}

export default projectChecklistModel;
