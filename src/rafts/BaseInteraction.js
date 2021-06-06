'use strict';

const BaseCommand = require('./BaseCommand');

/**
 * Represents an interaction of any kind that can be run
 * @abstract
 */
class BaseInteraction extends BaseCommand {
  constructor(raft, options) {
    super(raft, options);

    this.owner = undefined;

    /**
     * The guild, if any, that this interaction is specific too
     * @type {?(Snowflake|Snowflake[])}
     */
    this.guild = options.guild;

    /**
     * The definition for this interaction that gets passed to discord to register / send it
     * @type {?Object|Function}
     */
    this.definition = options.definition;
  }

  /**
   * Runs the command
   * @name BaseInteraction#run
   * @param {Interaction} interaction the interaction that executed this call
   * @param {?Object} options the options passed to the interaction
   * @abstract
   */
}

module.exports = BaseInteraction;
