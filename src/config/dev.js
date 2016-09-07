'use strict';

import baseConfig from './base';

let config = {
    productsApiUrl: 'http://localhost:8000/specOptions.tsv',
    systemsApiUrl: 'http://localhost:8000/systemOptions.js'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
