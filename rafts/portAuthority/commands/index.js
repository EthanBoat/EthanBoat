'use strict';

function createCommands(raft) {
  const commands = {};

  commands.eval = new (require('./eval'))(raft);
  commands.ping = new (require('./ping'))(raft);
  commands.echo = new (require('./echo'))(raft);

  return commands;
}

module.exports = createCommands;
