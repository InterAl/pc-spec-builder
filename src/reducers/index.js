import { combineReducers } from 'redux';

const reducers = {
    specOptions: require('./specOptions.js'),
    chosenProducts: require('./chosenProducts.js').default,
    sortBy: require('./sortBy.js').default,
    chosenSystem: require('./chosenSystem.js').default,
    responsive: require('./responsive.js').default
};

module.exports = combineReducers(reducers);
