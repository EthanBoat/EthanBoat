'use strict';

const { Collection } = require('discord.js');
const BaseRaft = require('../BaseRaft');

class PortAuthority extends BaseRaft {
  constructor(boat) {
    super(boat);
    /**
     * The commands for this raft
     * @type {Collection<string, Object>}
     */
    this.commands = new Collection();
    const commands = require('./commands')(this);

    Object.keys(commands).forEach(name => this.commands.set(name, commands[name]));
  }
}

module.exports = PortAuthority;
