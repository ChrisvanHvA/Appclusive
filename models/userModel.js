import sql from '../config/db.js';

class UserModel {
    constructor(user_id) {
        this.table_name = 'users';
        this.user_id = user_id ?? 0;
    }

    /**
     * Async function to insert a user into the database
     *
     * @param object insertData: The data to be inserted
     * @returns {number} The inserted user_id
     */
    async insert(insertData) {
        try {
            const {
                email_address,
                first_name,
                insertion,
                surname,
                password,
                profile_pic
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
            console.error(error);
            return 0;
        }
    }

    /**
     * Async function to update a user in the database
     *
     * @param {number} user_id: The user ID
     * @param object updateData The data to be updated
     * @returns {boolean} True if the update is successful, false otherwise
     */
    async update(user_id, updateData) {
        try {
            await sql`
                UPDATE users
                SET ${sql(updateData)}
                WHERE user_id = ${user_id}
            `;

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Async function to update a user's profile picture in the database
     *
     * @param {number} user_id The user ID
     * @param {string} profile_pic The profile picture
     * @returns {promise<boolean>} True if the update is successful, false otherwise
     */
    async updateProfilePic(user_id, profile_pic) {
        try {
            await sql`
                UPDATE users
                SET profile_pic = ${profile_pic}
                WHERE user_id = ${user_id}
            `;
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Async function to update a user's password in the database
     *
     * @param {number} user_id The user ID
     * @param {string} newPassword The new password
     * @returns {boolean} True if the update is successful, false otherwise
     */
    async updatePassword(user_id, newPassword) {
        try {
            await sql`
                UPDATE users
                SET password = ${newPassword}
                WHERE user_id = ${user_id}
            `;
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Async function to retrieve a user based on email address
     *
     * @param {string} email_address The email address
     * @returns Object - The user object
     */
    async getUserByEmail(email_address) {
        try {
            if (email_address == '') return null;

            const [user] = await sql`
                SELECT *
                FROM users
                WHERE email_address = ${email_address}
            `;

            return user || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Async function to retrieve a user based on user ID
     *
     * @param {number} user_id: Number - The user ID
     * @returns object - The user object
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
            console.error(error);
            return null;
        }
    }

    async deleteUser(user_id) {
        try {
            await sql`
                DELETE FROM users
                WHERE user_id = ${user_id}
            `;

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async deleteUser(user_id) {
        try {
            await Promise.all([
                sql`DELETE FROM users
                    WHERE user_id = ${user_id};`,
                sql`DELETE FROM project_users
                    WHERE user_id = ${user_id};`,
                sql`UPDATE project_checklists
                    SET assignees = array_remove(assignees, ${user_id})
                    WHERE ${user_id} = ANY(assignees);`
            ]);

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default UserModel;