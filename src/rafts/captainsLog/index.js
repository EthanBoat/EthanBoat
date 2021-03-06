'use strict';

const LogLevels = {
  console: {
    critical: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    verbose: 5,
  },
  webhook: {
    error: 'BRIGHT_RED',
    warn: 'DEEP_GOLD',
  },
};

const LogColors = {
  critical: 'bold white redBG',
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green',
  verbose: 'blue',
};

const discordColors = {
  BRIGHT_RED: 0xff0000,
  CYAN: 0x00ffff,
  DEEP_GOLD: 0xffab32,
};

const { WebhookClient, MessageEmbed } = require('discord.js');
const wn = require('winston');
const BaseRaft = require('../BaseRaft');

/**
 * Logging raft for the boat.
 * @extends {BaseRaft}
 */
class CaptainsLog extends BaseRaft {
  constructor(boat) {
    super(boat);

    /**
     * The log driver.
     * @type {Winston}
     * @private
     */
    this.driver = wn.createLogger({
      levels: LogLevels.console,
      format: wn.format.combine(
        wn.format.colorize(),
        wn.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        wn.format.printf(info => `${info.timestamp} ${info.level} ${info.message}`),
      ),
      transports: [
        new wn.transports.Console({
          level: boat.options.log.verbose ? 'verbose' : boat.debug ? 'debug' : 'error',
          handleExceptions: true,
        }),
        new wn.transports.File({
          handleExceptions: true,
          filename: boat.options.log.outputFile,
          level: boat.options.log.maxLevel ?? 'error',
        }),
      ],
    });

    wn.addColors(LogColors);
  }

  launch() {
    const token = this.boat.options.log.webhookToken.split('/');
    /**
     * The webhook client that handles sending error logs to discord
     * Only available after launching
     * @type {WebhookClient}
     * @private
     */
    this.webhook = new WebhookClient(token[0], token[1]);
  }

  /**
   * Write a message to the log.
   * @param {LogLevel} level the log level
   * @param {Module} source the module sourcing this log
   * @param {string} message the message to output
   */
  async out(level, source, message) {
    const path = this.path(source);
    this.driver.log(level, `[${path}] ${message}`);
    if (LogLevels.webhook[level]) {
      await this.logDiscord(level, path, message);
    }
  }

  /**
   * Exit the process after writing a message to the log.
   * @param {LogLevel} level the log level
   * @param {Module} source the module sourcing this log
   * @param {string} message the message to output
   */
  async fatal(level, source, message) {
    const path = this.path(source);
    await this.out(level, path, message);
    this.boat.end(1);
  }

  /**
   * Send a log message via webhook.
   * @param {LogLevel} level the log level
   * @param {string} path the path to the module that this occured in
   * @param {string} message the message to send
   * @returns {Promise<axiosRequest, axiosResponse>}
   * @private
   */
  logDiscord(level, path, message) {
    const levels = LogLevels.webhook;

    if (!Object.prototype.hasOwnProperty.call(levels, level)) return Promise.reject(new Error('Invalid level'));

    let formatted = typeof message === 'string' ? message : String(message);
    formatted = formatted.split('\n').slice(0, 5);
    let code = false;
    for (const i in formatted) {
      let line = formatted[i];
      if (line.trim().startsWith('at')) {
        formatted[i] = `\`\`\`ada\n${line}`;
        code = true;
        break;
      }
    }
    formatted = `${formatted.join('\n')}${code ? '```' : ''}`;

    const embed = new MessageEmbed()
      .setDescription(formatted)
      .setTimestamp(Date.now())
      .setTitle(`${level} \u00B7 ${path}`)
      .setColor(discordColors[levels[level] ?? 'CYAN']);

    return this.webhook.send(embed).catch(err => {
      this.driver.log('error', `[${this.path(module)}] Failed to send webhook: ${err}`);
    });
  }

  /**
   * Calculate the path of the given source module.
   * @param {Module} source the module that made this log
   * @returns {string}
   * @private
   */
  path(source) {
    if (!source.id) return source;
    /* eslint-disable-next-line newline-per-chained-call */
    return source.id.split('.').shift().replace(`${this.boat.options.basepath}/`, '').replace(/\//g, '.');
  }
}

module.exports = CaptainsLog;
module.exports.LogLevels = LogLevels;
