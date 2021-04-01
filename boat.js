'use strict';

// Import dependencies
const { Client, Collection } = require('discord.js');
const events = require('./events');
const interactionHandler = require('./interactionHandler');
const rafts = require('./rafts');

/**
 * The main entry point for any instance of this bot.
 */
class Boat {
  /**
   * Options for creating a boat
   * @typedef {Object} BoatOptions
   * @prop {string} token the token to use for login
   * @prop {ClientOptions} [clientOpts] the options to pass to djs
   * @prop {Snowflake[]} [owners] the owners of the bot
   * @prop {string} [commandPrefix] the prefix used for standard message commands
   */

  /**
   * Creates a new boat.
   * @param {BoatOptions} options the options to run the bot with
   */
  constructor(options) {
    if (!options) throw new Error('Boat options must be provided');

    /**
     * The discord.js API / Websocket client.
     * @type {discord.js.Client}
     */
    this.client = new Client(options.clientOpts);

    /**
     * The owners of the bot
     * @type {Snowflake[]}
     */
    this.owners = options.owners;

    /**
     * The prefix used for standard message commands
     * @type {string}
     */
    this.prefix = options.commandPrefix ?? '!';

    /**
     * The events that this client will handle
     * @type {Object}
     */
    this.events = events;

    /**
     * The sub modules that this boat handles
     * @type {Object}
     */
    this.rafts = rafts(this);

    /**
     * The text based commands that can be called, and their associated raft
     * @type {Collection<string, BaseRaft>}
     */
    this.commands = new Collection();

    /**
     * The token used to connect to discord
     * @type {string}
     */
    this.token = options.token;
  }

  /**
   * Connect the boat to discord and register events
   * @returns {Promise}
   */
  boot() {
    this.log(module, 'Registering events');
    this.setCommands();
    this.attach();

    // Temporary Addition to handle interactions before discord.js does
    this.client.ws.on('INTERACTION_CREATE', async packet => {
      const result = await interactionHandler(this.client, packet);

      await this.client.api.interactions(packet.id, packet.token).callback.post({
        data: result,
      });
    });
    // End addition

    return this.client.login(this.token).catch(err => this.log(module, err));
  }

  /**
   * Associate all commands from their rafts
   * @private
   */
  setCommands() {
    const raftNames = Object.keys(this.rafts);
    raftNames.forEach(raft => {
      if (this.rafts[raft].active) {
        this.rafts[raft].commands.forEach((command, commandName) => {
          this.commands.set(commandName, command);
        });
      }
    });
  }

  /**
   * Attach the event listeners to the socket.
   * @private
   */
  attach() {
    if (!this.events) return;

    Object.entries(this.events).forEach(([event, listener]) => {
      this.listen(event, listener);
    });
  }

  /**
   * Listen for a socket event.
   * @param {string} event the name of the event to listen for
   * @param {Function} listener the function to call on event
   * @private
   */
  listen(event, listener) {
    this.client.on(event, (...args) => {
      listener(this, ...args);
    });
  }

  /**
   * Returns the error and where
   * @param {Module} source the module sourcing this log
   * @param {*} message it can be anything lmao
   */
  log(source, message) {
    console.log(`Log from ${source.id ?? source}`, message);
  }
}

module.exports = Boat;
