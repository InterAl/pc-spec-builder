import _ from 'lodash';
import {createSelector} from 'reselect';

export default createSelector(
    state => state.products,
    state => state.categories,
    state => state.chosenProducts,
    state => state.sortBy,
    (products, categories, chosenProducts, sortBy) => {
        chosenProducts = _.map(chosenProducts, cp => ({
            ...cp,
            ..._.find(products, p => p.id === cp.productId)
        }));

        let categoryLines = _.reduce(categories, (acc, cat) => {
            let productLines = _(chosenProducts)
                .filter(p => p.categoryId === cat.id)
                .sortBy(p => p.time)
                .value();

            let availableProducts = _(products)
                .filter(p => p.categoryId === cat.id)
                .sortBy(p => p[sortBy])
                .value();

            acc[cat.id] = {...cat, productLines, availableProducts};

            return acc;
        }, {});

        return categoryLines;
});
