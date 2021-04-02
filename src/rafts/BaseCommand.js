'use strict';

/**
 * Represents a standard text command that can be run
 * @abstract
 */
class BaseCommand {
  constructor(raft, options) {
    /**
     * The boat that handles this commands raft
     * @name BaseCommand#boat
     * @type {boat}
     */
    Object.defineProperty(this, 'boat', { value: raft.boat });

    /**
     * The raft that handles this command
     * @name BaseCommand#raft
     * @type {Raft}
     */
    Object.defineProperty(this, 'raft', { value: raft });

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
     * @type {boolean}
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
