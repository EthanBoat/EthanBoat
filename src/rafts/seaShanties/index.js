'use strict';

const commands = require('./commands');
const BaseRaft = require('../BaseRaft');

/**
 * Misc. commands raft for this boat.
 * @extends {BaseRaft}
 */
class SeaShanties extends BaseRaft {
  launch() {
    super.launch({ commands });
  }
}

module.exports = SeaShanties;
