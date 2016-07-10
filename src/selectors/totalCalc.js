import _ from 'lodash';
import {createSelector} from 'reselect';

export default createSelector(
    state => state.products,
    state => state.chosenProducts,
    (products, chosenProducts) => {
        let totalSum = _.reduce(chosenProducts, (acc, cp) => {
            let product = _.find(products, p => p.id === cp.productId);
            return acc + (product ? product.price * cp.quantity : 0);
        }, 0);

        return totalSum;
});
