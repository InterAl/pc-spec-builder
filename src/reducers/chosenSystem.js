import _ from 'lodash';

import {
    CHOOSE_SYSTEM,
    SET_SYSTEM_PICK_PHASE
} from '../actions/chosenSystem';

import {
    SET_SPEC_OPTIONS
} from '../actions/setSpecOptions';

import {load} from '../persister';

const initialState = load('chosenSystem', {
    phase: 'systemPick'
});

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
            if (!state.systemName) {
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
        }
        break;

        case SET_SYSTEM_PICK_PHASE: {
            nextState = {
                ...state,
                phase: action.phase
            };
        }
        break;
    }

    return nextState;
}
