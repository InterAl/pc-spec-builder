import {SELECT_PRODUCT} from './actions/chosenProducts';
import ga from './googleAnalytics';

export default store => next => action => {
    console.log('[biMiddleware] called');
    let result = next(action);
    report(store.getState(), action);
    return result;
}

function report(state, action) {
    if (action.type === SELECT_PRODUCT) {
        if (state.chosenProducts.length === 1) {
            const {chosenSystem} = state;

            const payload = {
                action: 'choose system',
                label: chosenSystem.systemName,
                fields: {
                    subsystem: chosenSystem.subsystem
                }
            };

            console.log('[biMiddleware] reporting', payload);

            ga.sendEvent(payload);
        }
    }
}
