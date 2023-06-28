import sql from '../config/db.js';

class wcagModel {
    /**
     * Async function to retrieve a WCAG category by ID
     *
     * @params wcag_id: number - The ID of the WCAG category
     * @returns Object - The WCAG category object
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
            console.log(error);
            return null;
        }
    }

    /**
     * Async function to retrieve a WCAG category by slug
     *
     * @params slug: string - The slug of the WCAG category
     * @returns Object - The WCAG category object
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
            console.log(error);
            return null;
        }
    }

    /**
     * Async function to retrieve a list of all WCAG categories
     *
     * @returns Array - An array of WCAG category objects
     */
    async listWCAGCategories() {
        try {
            const categories = await sql`
                SELECT *
                FROM wcag
            `;

            return categories;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /**
     * Async function to retrieve a list of WCAG items based on the parent category ID
     *
     * @params parent_id: number - The ID of the parent category
     * @params project_id: number (optional) - The ID of the project
     * @returns Array - An array of WCAG item objects within the category
     */
    async listWCAGItemsByParentId(parent_id, project_id = 0) {
        try {
            if (parent_id == 0) return [];

            // const wcagItem = await sql`
            //     SELECT wi.*, pc.is_completed
            //     FROM wcag_item AS wi
            //     LEFT JOIN project_checklists AS pc ON pc.wcag_item_id = wi.wcag_item_id
            //     WHERE parent_id = ${parent_id}
			// 	${project_id > 0 ? `AND pc.project_id = ${project_id}` : ''}
            // `;

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
            console.log(error);
            return [];
        }
    }
    
    /**
     * Async function to retrieve a list of WCAG items based on the WCAG level
     *
     * @params wcag_level: string - The WCAG level
     * @returns Array - An array of WCAG item objects
     */
	// todo: check if needed
    async listWCAGItemsByLevel(wcag_level) {
        try {
            if (!wcag_level || wcag_level == '') return [];

            const wcagItem = await sql`
                SELECT *
                FROM wcag_item
                WHERE LENGTH(wcag_level) <= ${wcag_level.length}
            `;

            return wcagItem;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /**
     * Async function to retrieve a specific WCAG item by ID
     *
     * @params wcag_item_id: number - The ID of the WCAG item
     * @returns Object - The specific WCAG item object
     */
	// todo: check if needed
    async getWCAGItemById(wcag_item_id) {
        try {
            if (wcag_item_id == 0) return {};

            const [wcagItem] = await sql`
                SELECT *
                FROM wcag_item
                WHERE wcag_item_id = ${wcag_item_id}
            `;

            return wcagItem || {};
        } catch (error) {
            console.log(error);
            return {};
        }
    }
}

export default wcagModel;