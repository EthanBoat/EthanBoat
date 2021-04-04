'use strict';

const commands = {};

commands.eval = require('./eval');
commands.ping = require('./ping');
commands.echo = require('./echo');
commands.reboot = require('./reboot');
commands.update = require('./update');

module.exports = commands;
