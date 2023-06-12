import sql from '../config/db.js';

class UserModel {
    constructor(user_id) {
        this.table_name = 'users';
        this.user_id = user_id ?? 0;
    }

    async insert(insertData) {
        try {
            const {
                email_address,
                first_name,
                insertion,
                surname,
                password,
                profile_pic,
            } = insertData;

            const [insertedRow] = await sql`
                INSERT INTO users (email_address, first_name, insertion, surname, password, profile_pic)
                VALUES (
					${email_address ?? null},
					${first_name ?? null},
					${insertion ?? null},
					${surname ?? null},
					${password ?? null},
					${profile_pic ?? null}				
                )

                RETURNING user_id;
            `;
            return insertedRow.user_id ?? 0;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

    async update(updateData) {}

    /**
     *
     * Async function to retrieve the current logged in user
     *
     * @param user_id
     * @returns user object
     */
    async getCurrentLoggedUser() {
        try {
            if (this.user_id == 0) return {};

            const [user] = await sql`
                SELECT *
                FROM users
                WHERE user_id = ${this.user_id}
            `;

            return user || null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    /**
     *
     * Async function to retrieve a user based on email_address
     *
     * @param email_address
     * @returns user object
     */
    async getUserByEmail(email_address) {
        try {
            if (email_address == '') return {};

            const [user] = await sql`
                SELECT *
                FROM users
                WHERE email_address = ${email_address}
            `;

            return user || null;
        } catch (error) {
            console.log(error);
            return null;
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
            if (user_id == 0) return {};

            const [user] = await sql`
                SELECT *
                FROM users
                WHERE user_id = ${user_id}
            `;

            return user || null;
        } catch (error) {
            console.log(error);
            return null;
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

export default UserModel;
