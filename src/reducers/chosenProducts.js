import _ from 'lodash';
import guid from '../guid';

import {
    ADD_EMPTY_SPECLINE,
    SET_CHOSEN_PRODUCTS,
    DELETE_SPECLINE,
    SELECT_PRODUCT
} from '../actions/chosenProducts';

const initialState = [];

export default function(state = initialState, action) {
    let nextState = state;

    switch(action.type) {
        case ADD_EMPTY_SPECLINE: {
            const newChosenProduct = {
                categoryId: action.categoryId,
                lineId: guid()
            };

            nextState = [
                ...state,
                newChosenProduct
            ];
        }
        break;

        case SET_CHOSEN_PRODUCTS: {
            let chosenProducts = action.chosenProducts.map(p => ({
                ...p,
                lineId: guid()
            }));

            nextState = [
                ...state,
                ...chosenProducts
            ];
        }
        break;

        case DELETE_SPECLINE: {
            nextState = _.filter(state, p => p.lineId !== action.lineId);
        }
        break;

        case SELECT_PRODUCT: {
            if (!action.lineId) {
                console.error("No lineId supplied!");
                return state;
            }

            let line = _.find(state, l => l.lineId === action.lineId);

            let nextLine = {
                ...line, productId: action.productId
            };

            nextState = [..._.reject(state, l => l.lineId === action.lineId),
                         nextLine];
        }
        break;

    }

    return nextState;
}
