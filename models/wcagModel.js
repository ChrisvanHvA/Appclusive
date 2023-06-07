import sql from "../config/db.js";

class wcagModel {

    constructor() {

    }
    
    /**
     * 
     * @returns list of users
     */
    async listUsers() {

        try {

            const users = await sql`
                select *
                from users
                where name = 'poep'
            `

            return users
            
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default wcagModel;