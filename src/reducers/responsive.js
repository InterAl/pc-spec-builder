import {
    SET_RESPONSIVE_PARAMS
} from '../actions/responsiveActions.js';

const initialState = {
    isMobile: false,
    width: 0
};

export default function(state = initialState, action) {
    let nextState = {...state};

    switch(action.type) {
        case SET_RESPONSIVE_PARAMS: {
            nextState.isMobile = action.isMobile;
            nextState.width = action.width;
        }
        break;
    }

    return nextState;
}
