import * as specOptionsActions from '../actions/setSpecOptions';

const initialState = {};

module.exports = function(state = initialState, action) {
    /* Keep the reducer clean - do not mutate the original state. */
    //let nextState = Object.assign({}, state);

    switch(action.type) {

        case specOptionsActions.SET_SPEC_OPTIONS: {
            const nextState = {
                ...state,
                ...action.specOptions
            };

            return nextState;
        }
        break;

        default: {
            /* Return original state if no actions were consumed. */
            return state;
        }
    }
}
