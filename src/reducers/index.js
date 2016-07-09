import { combineReducers } from 'redux';

const reducers = {
    specOptions: require('../reducers/specOptions.js'),
    chosenProducts: require('../reducers/chosenProducts.js').default
};

module.exports = combineReducers(reducers);
