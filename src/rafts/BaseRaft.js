'use strict';

const { Collection } = require('discord.js');
const util = require('../util');

/**
 * Represents a raft that handles one function
 * @abstract
 */
class BaseRaft {
  constructor(boat) {
    /**
     * The boat that handles this raft
     * @name BaseRaft#boat
     * @type {Boat}
     */
    Object.defineProperty(this, 'boat', { value: boat });

    /**
     * Whether this raft is currently active
     * @type {boolean}
     */
    this.active = true;

    /**
     * The commands for this raft
     * @type {Collection<string, Object>?}
     */
    this.commands = undefined;

    /**
     * The apis for this raft
     * @type {Object?}
     */
    this.apis = undefined;

    /**
     * The interactions for this raft
     * @type {Object?}
     */
    this.interactions = undefined;
  }

  /**
   * Initiates this raft
   * @param {Object} [handlers={}] The handlers for commands interactions, etc.
   * @param {Object} [handlers.commands] The command handlers
   * @param {Obejct} [handlers.interactions] The interaction handlers
   * @param {Object} [handlers.apis] The API handlers
   * @abstract
   */
  launch({ commands, interactions, apis } = {}) {
    this.boat.log.verbose(module, `Lauching ${this.constructor.name}`);
    this.boat.log.berbose(module, `Registering APIs`);
    util.objForEach(
      apis,
      ((api, name) => {
        if (!this.apis) this.apis = {};
        this.apis[name] = new api(this);
      }).bind(this),
    );
    this.boat.log.verbose(module, 'Registering commands');
    util.objForEach(
      commands,
      ((command, name) => {
        if (!(this.commands instanceof Collection)) this.commands = new Collection();
        const instance = new command(this);
        if (!instance.enabled) return;
        this.commands.set(name, instance);
      }).bind(this),
    );
    this.boat.log.verbose(module, 'Registering interactions');
    util.objForEach(interactions, (category, catName) => {
      if (!this.interactions) this.interactions = {};
      this.boat.log.verbose(module, `Registering ${catName} interactions`);
      util.objForEach(
        category,
        ((interaction, name) => {
          if (!(this.interactions[catName] instanceof Collection)) this.interactions[catName] = new Collection();
          const instance = new interaction(this);
          if (!instance.enabled) return;
          this.interactions[catName].set(name, instance);
        }).bind(this),
      );
    });
  }
}

module.exports = BaseRaft;
