import sql from '../config/db.js';
import bcrypt from 'bcrypt';

class UserModel {
    constructor(user_id) {
        this.table_name = 'users';
        this.user_id = user_id ?? 0;
    }

    async insert(insertData) {
        try {

            const [insertedRow] = await sql`
                INSERT INTO users (email_address, first_name, insertion, surname, password, profile_pic)
                VALUES (
                    ${ insertData.email_address ?? null },
                    ${ insertData.first_name ?? null },
                    ${ insertData.insertion ?? null },
                    ${ insertData.surname ?? null },
                    ${ insertData.password ?? null },
                    ${ insertData.profile_pic ?? null }
                )

                RETURNING user_id;
            `;

            return insertedRow.user_id ?? 0;
            
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

    async update() {}

    /**
     *
     * Async function to compare passwords for authentication
     *
     * @param user_id
     * @returns user object
     */
    async authenticateUser(email_address, password) {
        try {
            const userByEmail = await this.getUserByEmail(email_address);
            const hashedPassword = userByEmail.password;

            const isPasswordValid = await bcrypt.compare(
                password,
                hashedPassword
            );

            if (!isPasswordValid)
                return false;

            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
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
