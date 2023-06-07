import sql from "../config/db.js";

class userModel {

    constructor(user_id) {
        this.user_id = user_id ?? 0;
    }

    async insert() {

    }

    async update() {

    }
    
    /**
     * 
     * Async function to retrieve the current logged in user
     * 
     * @param user_id
     * @returns user object
     */
    async getCurrentLoggedUser() {

        try {

            if (this.user_id == 0)
                return {};

            const [user] = await sql`
                SELECT *
                FROM users
                WHERE user_id = ${ this.user_id }
            `;

            return user || {};
            
        } catch (error) {
            console.log(error);
            return {};
        }
    }

    /**
     * 
     * Async function to retrieve a user based on user_id
     * 
     * @param user_id
     * @returns user object
     */
    async getUser(user_id) {

        try {

            if (user_id == 0)
                return {};

            const [user] = await sql`
                SELECT *
                FROM users
                WHERE user_id = ${ user_id }
            `;

            return user || {};
            
        } catch (error) {
            console.log(error);
            return {};
        }
    }

    /**
     * 
     * Async function to retrieve list of all users in DB
     * 
     * @returns list of users
     */
    async listUsers() {

        try {

            const users = await sql`
                SELECT *
                FROM users
            `;

            return users;
            
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default userModel;