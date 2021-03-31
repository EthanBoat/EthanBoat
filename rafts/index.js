'use strict';

function createRafts(boat) {
  const rafts = {};

  rafts.eval = new (require('./eval'))(boat);

  return rafts;
}

module.exports = createRafts;
