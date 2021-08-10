'use strict';

const commands = require('./commands');
const interactions = require('./interactions');
const BaseRaft = require('../BaseRaft');

/**
 * Misc. commands raft for this boat.
 * @extends {BaseRaft}
 */
class SeaShanties extends BaseRaft {
  launch() {
    super.launch({ commands, interactions });
  }
}

module.exports = SeaShanties;
