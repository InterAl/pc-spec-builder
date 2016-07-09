import {
    ADD_EMPTY_SPECLINE,
    SET_CHOSEN_PRODUCTS
} from '../actions/chosenProducts';

const initialState = [];

export default function(state = initialState, action) {
    let nextState = state;

    switch(action.type) {
        case ADD_EMPTY_SPECLINE: {
            const newChosenProduct = {
                categoryId: action.categoryId
            };

            nextState = [
                ...state,
                newChosenProduct
            ];
        }
        break;

        case SET_CHOSEN_PRODUCTS: {
            nextState = [
                ...state,
                ...action.chosenProducts
            ];
        }
        break;

    }

    return nextState;
}
