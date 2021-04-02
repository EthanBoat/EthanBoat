'use strict';

function createRafts(boat) {
  const rafts = {};

  rafts.eval = new (require('./portAuthority'))(boat);
  return rafts;
}

module.exports = createRafts;
