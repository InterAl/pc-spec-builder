export const SET_RESPONSIVE_PARAMS = 'SET_RESPONSIVE_PARAMS';

export function setResponsiveParams({isMobile, width}) {
    return {
        type: SET_RESPONSIVE_PARAMS,
        isMobile,
        width
    };
}
