import sql from "../config/db.js";

class wcagModel {

    constructor() {

    }
    
    /**
     * 
     * Async function to retrieve list of all users in DB
     * 
     * @param data [user_id, name] 
     * @returns list of users
     */
    async listUsers(data) {

        try {

            const users = await sql`
                select *
                from users
            `

            return users
            
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default wcagModel;