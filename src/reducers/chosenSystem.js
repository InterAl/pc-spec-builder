import _ from 'lodash';

import {
    CHOOSE_SYSTEM
} from '../actions/chosenSystem';

import {
    SET_SPEC_OPTIONS
} from '../actions/setSpecOptions';

const initialState = {
};

export default function(state = initialState, action) {
    let nextState = state;

    switch(action.type) {
        case CHOOSE_SYSTEM: {
            nextState = {
                ...state,
                systemName: action.systemName,
                subsystem: action.subsystem
            };
        }
        break;
        case SET_SPEC_OPTIONS: {
            let systems = _.get(action, 'specOptions.systems');

            let systemName = Object.keys(systems)[0];

            let subsystem = systemName &&
                            systems[systemName].subsystems &&
                            Object.keys(systems[systemName].subsystems)[0];

            nextState = {
                ...state,
                systemName,
                subsystem
            };
        }
        break;
    }

    return nextState;
}
