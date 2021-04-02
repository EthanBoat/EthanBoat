'use strict';

const { Collection } = require('discord.js');
const commands = require('./commands');
const util = require('../../util');
const BaseRaft = require('../BaseRaft');

class PortAuthority extends BaseRaft {
  constructor(boat) {
    super(boat);
    /**
     * The commands for this raft
     * @type {Collection<string, Object>}
     */
    this.commands = new Collection();
  }

  launch() {
    this.boat.log(module, `Lauching ${this.constructor.name}`);
    this.boat.log(module, 'Registering commands');
    util.objForEach(commands, ((command, name) => this.commands.set(name, new command(this))).bind(this));
  }
}

module.exports = PortAuthority;
