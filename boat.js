'use strict'; 

const discord = require('discord.js'); // Loads the module discord.js into const discord
const rafts = require('./rafts'); // Loads the directory /rafts into the const rafts
const events = require('./events'); // Loads the directory /events into the const events

/**
 * The main entry point for any instance of this bot.
 */
class Boat {
  /**
   * Options for creating a boat
   * @typedef {Object} BoatOptions
   * @prop {string} token the token to use for login
   * @prop {ClientOptions} [clientOpts] the options to pass to djs
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
    this.client = new discord.Client(options.clientOpts);

    /**
     * The events that this client will handle
     * @type {Object}
     */
    this.events = events;

    /**
     * The sub modules that this boat handles
     * @type {Object}
     */
    this.rafts = rafts;

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
    this.attach();
    return this.client.login(this.token).catch(err => this.log(module, err));
  }

/**
 * Returns the error and where
 * @param {Module} source the module sourcing this log
 * @param {*} 
 */
  log(source, message) {
    console.log(`Err in ${source}`, message);
  }
}

module.exports = Boat;
