'use strict';

class BaseCommand {
  constructor(boat, options) {
    /**
     * The boat that handles this command
     * @name BaseCommand#boat
     * @type {Boat}
     */
    Object.defineProperty(this, 'boat', { value: boat });

    /**
     * The name of this command
     * @name BaseCommand#name
     * @type {string}
     */
    Object.defineProperty(this, 'name', { value: options.name });

    /**
     * Whether this command is currently enabled
     * @type {boolean}
     */
    this.enabled = options.enabled ?? true;

    /**
     * Whether this command is owners only
     */
    this.owner = options.owner ?? false;
  }

  /**
   * Runs the command
   * @param {Message} message the message that executed the command
   * @param {string[]} args the content of the message split on spaces excluding the command name
   * @abstract
   */
  run() {
    throw new Error('Must be implemented by subclass');
  }
}

module.exports = BaseCommand;
