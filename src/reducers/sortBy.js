import _ from 'lodash';

import {
    SORT_BY_PRICE,
    SORT_BY_MANUFACTURER,
    SORT_BY_POPULARITY
} from '../actions/sortBy';

const initialState = 'price';

export default function(state = initialState, action) {
    let nextState = state;

    switch(action.type) {
        case SORT_BY_PRICE: {
            nextState = 'price'
        }
        break;

        case SORT_BY_MANUFACTURER: {
            nextState = 'manufacturer';
        }
        break;

        case SORT_BY_POPULARITY: {
            nextState = 'popularity';
        }
        break;
    }

    return nextState;
}
