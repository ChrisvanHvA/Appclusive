import sql from '../config/db.js';

class projectChecklistModel {

    constructor() {
    }

    async insert(insertData) {
        try {

            const {
                project_id,
                wcag_item_id,
                is_completed,
                assignees,
            } = insertData;

            console.log(insertData);

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
    
}

export default projectChecklistModel;
