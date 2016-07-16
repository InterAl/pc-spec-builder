import _ from 'lodash';

import {
    CHOOSE_SYSTEM
} from '../actions/chosenSystem';

const initialState = {};

export default function(state = initialState, action) {
    let nextState = state;

    switch(action.type) {
        case CHOOSE_SYSTEM: {
            nextState = {
                ...state,
                system: action.system,
                subsystem: action.subsystem
            };
        }
        break;
    }

    return nextState;
}
