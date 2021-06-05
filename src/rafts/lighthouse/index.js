'use strict';

const apis = require('./apis');
const commands = require('./commands');
const interactions = require('./interactions');
const BaseRaft = require('../BaseRaft');

/**
 * Image commands raft for this boat.
 * @extends {BaseRaft}
 */
class Lighthouse extends BaseRaft {
  launch() {
    super.launch({ commands, interactions, apis });
  }
}

module.exports = Lighthouse;
