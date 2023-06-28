import sql from '../config/db.js';

class UserModel {
    constructor(user_id) {
        this.table_name = 'users';
        this.user_id = user_id ?? 0;
    }

    /**
     * Async function to insert a user into the database
     *
     * @params insertData: Object - The data to be inserted
     * @returns Number - The inserted user_id
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
            console.log(error);
            return 0;
        }
    }

    /**
     * Async function to update a user in the database
     *
     * @params user_id: Number - The user ID
     * @params updateData: Object - The data to be updated
     * @returns Boolean - True if the update is successful, false otherwise
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
            console.log(error);
            return false;
        }
    }

    /**
     * Async function to update a user's profile picture in the database
     *
     * @params user_id: Number - The user ID
     * @params profile_pic: String - The profile picture
     * @returns Boolean - True if the update is successful, false otherwise
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
            console.log(error);
            return false;
        }
    }

    /**
     * Async function to update a user's password in the database
     *
     * @params user_id: Number - The user ID
     * @params newPassword: String - The new password
     * @returns Boolean - True if the update is successful, false otherwise
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
            console.log(error);
            return false;
        }
    }

    /**
     *
     * Async function to retrieve the current logged-in user
     *
     * @param user_id
     * @returns Object - The current logged-in user
     */
	// todo: check if this is needed
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
     * Async function to retrieve a user based on email address
     *
     * @params email_address: String - The email address
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
            console.log(error);
            return null;
        }
    }

    /**
     * Async function to retrieve a user based on user ID
     *
     * @params user_id: Number - The user ID
     * @returns Object - The user object
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
     * Async function to retrieve a list of all users in the database
     *
     * @returns Array - An array of users
     */
	// todo: check if this is needed
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