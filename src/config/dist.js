'use strict';

import baseConfig from './base';

let config = {
  productsApiUrl: '/pnp/alon.tmpl',
  systemsApiUrl: '/pnp/alonDT.tmpl'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
