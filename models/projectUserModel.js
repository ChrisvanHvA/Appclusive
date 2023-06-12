import sql from '../config/db.js';

class projectUserModel {

    constructor() {
    }

    async insert(insertData) {
        try {

            const [insertedRow] = await sql`
                INSERT INTO project_users (project_id, user_id, is_admin)
                VALUES ( 
                    ${ insertData.email_address ?? null },
                    ${ insertData.first_name ?? null },
                    ${ insertData.insertion ?? null }
                )

                RETURNING user_id;
            `;
            return insertedRow.user_id ?? 0;
            
        } catch (error) {
            console.log(error);
            return 0;
        }
    }
    
}

export default projectUserModel;
