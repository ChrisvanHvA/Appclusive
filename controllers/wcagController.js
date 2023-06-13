import wcagModel from '../models/wcagModel.js';
const WCAGModel = new wcagModel();

const createWCAGOverview = async () => {
    const categories = await WCAGModel.listWCAGCategories();

    const wcagData = await Promise.all(
        categories.map(async (cat) => {
            const relatedItems = await WCAGModel.listWCAGItemsByParentId(
                cat.wcag_id
            );

            return {
                category: cat,
                items: relatedItems
            };
        })
    );

    return wcagData;
};

export default {
    createWCAGOverview
};
