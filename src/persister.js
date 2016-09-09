import _ from 'lodash';

const key = 'savedConfiguration';
const expirationMs = 1000 * 3600; //hour

export function save(state) {
    try {
        const value = {
            chosenSystem: state.chosenSystem,
            chosenProducts: state.chosenProducts,
            sortBy: state.sortBy,
            timestamp: new Date()
        };

        const serialized = JSON.stringify(value);

        localStorage.setItem(key, serialized);
    } catch (err) {
        console.error('could not save state', err);
    }
}

export function load(slice, defaultValue) {
    try {
        const state = localStorage.getItem(key);
        const dehydrated = JSON.parse(state);
        if (!hasExpired(dehydrated)) {
            const loaded =  _.get(dehydrated, slice, defaultValue);
            return loaded;
        }
    } catch (err) {
        console.error('failed loading from local storage', err);
    }

    return defaultValue;
}

function hasExpired(state) {
    let then = state.timestamp;
    let elapsed = new Date() - then;
    return elapsed < expirationMs;
}
