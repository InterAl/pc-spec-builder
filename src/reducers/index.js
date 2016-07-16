import { combineReducers } from 'redux';

const reducers = {
    specOptions: require('../reducers/specOptions.js'),
    chosenProducts: require('../reducers/chosenProducts.js').default,
    sortBy: require('../reducers/sortBy.js').default,
    chosenSystem: require('../reducers/chosenSystem.js').default
};

module.exports = combineReducers(reducers);
