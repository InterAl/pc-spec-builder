import {save} from './persister';

export default store => next => action => {
    console.log('[persisterMiddleware] persisting');
    let result = next(action);
    save(store.getState());
    return result;
}
