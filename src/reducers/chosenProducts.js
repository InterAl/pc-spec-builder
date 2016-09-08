import _ from 'lodash';
import guid from '../guid';

import {
    ADD_EMPTY_SPECLINE,
    SET_CHOSEN_PRODUCTS,
    DELETE_SPECLINE,
    SELECT_PRODUCT,
    CHANGE_PRODUCT_QUANTITY,
    RESET_CHOSEN_PRODUCTS
} from '../actions/chosenProducts';

import {
    CHOOSE_SYSTEM
} from '../actions/chosenSystem';

const initialState = [];

export default function(state = initialState, action) {
    let nextState = state;

    switch(action.type) {
        case ADD_EMPTY_SPECLINE: {
            const newChosenProduct = createLine({
                categoryId: action.categoryId
            });

            nextState = [
                ...state,
                newChosenProduct
            ];
        }
        break;

        case SET_CHOSEN_PRODUCTS: {
            let chosenProducts = action.chosenProducts.map(p => createLine({
                ...p
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
                ...line,
                productId: action.productId
            };

            nextState = [..._.reject(state, l => l.lineId === action.lineId),
                         nextLine];
        }
        break;

        case CHANGE_PRODUCT_QUANTITY: {
            let line = _.find(state, l => l.lineId === action.lineId);

            let nextLine = {
                ...line,
                quantity: action.quantity
            };

            nextState = [..._.reject(state, l => l.lineId === action.lineId),
                         nextLine];
        }
        break;

        case CHOOSE_SYSTEM: {
            nextState = resetState();
        }
        break;

        case RESET_CHOSEN_PRODUCTS: {
            nextState = resetState();
        }
        break;
    }

    return nextState;
}

function createLine(mixin) {
    return _.extend({
        lineId: guid(),
        time: new Date(),
        quantity: 1
    }, mixin);
}

function resetState() {
    return initialState;
}
