import _ from 'lodash';

import {
    CHOOSE_SYSTEM
} from '../actions/chosenSystem';

const initialState = {
    systemId: 3,
    subsystem: 'ATX'
};

export default function(state = initialState, action) {
    let nextState = state;

    switch(action.type) {
        case CHOOSE_SYSTEM: {
            nextState = {
                ...state,
                systemId: action.systemId,
                subsystem: action.subsystem
            };
        }
        break;
    }

    return nextState;
}
