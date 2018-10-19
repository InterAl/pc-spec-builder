import {setResponsiveParams} from '../actions/responsiveActions.js';

let initialized = false;

export default function() {
    if (initialized)
        throw new Error('responsiveController should be invoked only once.');

    return dispatch => {
        initialized = true;

        window.addEventListener('resize', updateResponsiveParams);
        updateResponsiveParams();

        function getMobileMaxWidth() {
            return 720;
        }

        function getResponsiveParams() {
            const width = window.innerWidth;
            const isMobile = width <= getMobileMaxWidth();
            return {width, isMobile};
        }

        function updateResponsiveParams() {
            const {isMobile, width} = getResponsiveParams();

            dispatch(setResponsiveParams({
                isMobile,
                width
            }));
        }
    };
}
