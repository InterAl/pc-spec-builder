import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
const reducers = require('../reducers');

module.exports = function(initialState) {
    const logger = createLogger();
    const store = createStore(reducers,
                              initialState,
                              applyMiddleware(thunk, logger));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
