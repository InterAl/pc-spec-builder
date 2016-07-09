import _ from 'lodash';
import {createSelector} from 'reselect';

export default createSelector(
    state => state.products,
    state => state.categories,
    state => state.chosenProducts,
    (products, categories, chosenProducts) => {
        let categoryLines = _.reduce(categories, (acc, cat) => {
            let chosenCategoryProducts =
                _.filter(chosenProducts, p => p.categoryId === cat.id);

            let productLines = chosenCategoryProducts.length > 0 ?
                chosenCategoryProducts : [{categoryId: cat.id}];

            let availableProducts =
                _.filter(products, p => p.categoryId === cat.id);

            acc[cat.id] = {...cat, productLines, availableProducts};

            return acc;
        }, {});

        return categoryLines;
});
