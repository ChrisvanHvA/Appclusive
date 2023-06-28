import sql from '../config/db.js';

class wcagModel {
    /**
     * Async function to retrieve a WCAG category by ID
     *
     * @param {number} wcag_id The ID of the WCAG category
     * @returns object - The WCAG category object
     */
    async getWCAGCategory(wcag_id) {
        try {
            const [category] = await sql`
                SELECT *
                FROM wcag
                WHERE wcag_id = ${wcag_id}
            `;

            return category || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Async function to retrieve a WCAG category by slug
     *
     * @param {string} slug The slug of the WCAG category
     * @returns object - The WCAG category object
     */
    async getWCAGCategoryIdBySlug(slug) {
        try {
            const [category] = await sql`
                SELECT *
                FROM wcag
                WHERE slug = ${slug}
            `;

            return category || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Async function to retrieve a list of all WCAG categories
     *
     * @returns {object[]} - An array of WCAG category objects
     */
    async listWCAGCategories() {
        try {
            const categories = await sql`
                SELECT *
                FROM wcag
            `;

            return categories;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    /**
     * Async function to get the WCAG category based on wcag_item_id
     *
     * @returns {object} - WCAG object
     */
    async getWCAGCategoryByChildId(wcag_item_id) {
        try {
            
            if (wcag_item_id == 0) {
                return null;
            }

            const [categories] = await sql`
                SELECT *
                FROM wcag_item AS wi
                LEFT JOIN wcag AS w ON w.wcag_id = wi.parent_id
                WHERE wcag_item_id = ${wcag_item_id}
            `;

            return categories || null;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    /**
     * Async function to retrieve a list of WCAG items based on the parent category ID
     *
     * @param {number} parent_id The ID of the parent category
     * @param {number?} project_id The ID of the project
     * @returns {object[]} - An array of WCAG item objects within the category
     */
    async listWCAGItemsByParentId(parent_id, project_id = 0) {
        try {
            if (parent_id == 0) return [];

			const wcagItem = await sql`
				SELECT wi.*, pc.is_completed, pc.assignees
				FROM wcag_item AS wi
				LEFT JOIN project_checklists AS pc ON pc.wcag_item_id = wi.wcag_item_id
				LEFT JOIN users ON users.user_id = ANY(pc.assignees)
				WHERE parent_id = ${parent_id}
				AND pc.project_id = ${project_id}
				ORDER BY is_completed, wcag_item_id
		`;

            return wcagItem;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}

export default wcagModel;