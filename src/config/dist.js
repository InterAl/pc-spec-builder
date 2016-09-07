'use strict';

import baseConfig from './base';

let config = {
  productsApiUrl: '/pnp/alon.tmpl',
  systemsApiUrl: '/pnp/alondt.tmpl'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
