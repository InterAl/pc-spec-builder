'use strict';

import baseConfig from './base';

let config = {
    productsApiUrl: 'http://localhost:8000/specOptions.tsv'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
