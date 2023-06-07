import sql from "../config/db.js";

class wcagModel {
    
    /**
     * 
     * Async function to retrieve list of all WCAG categories
     * 
     * @returns list of WCAG categories
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
     * 
     * Async function to retrieve a list of WCAG items based on category parent id
     * 
     * @returns list of WCAG categories
     */
    async listWCAGItemsByParentId(parent_id) {

        try {

            if (parent_id == 0)
                return [];

            const wcagItem = await sql`
                SELECT *
                FROM wcag_item
                WHERE parent_id = ${ parent_id }
            `;

            return wcagItem;
            
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    
    /**
     * 
     * Async function to retrieve a specific WCAG item based on its id
     * 
     * @returns get specific WCAG item {}
     */
    async getWCAGItemById(wcag_item_id) {

        try {

            if (wcag_item_id == 0)
                return {};

            
            const [wcagItem] = await sql`
                SELECT *
                FROM wcag_item
                WHERE wcag_item_id = ${ wcag_item_id }
            `;

            return wcagItem || {};
            
        } catch (error) {
            console.log(error);
            return {};
        }
    }
}

export default wcagModel;