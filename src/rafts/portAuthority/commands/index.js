'use strict';

const commands = {};

commands.eval = require('./eval');
commands.ping = require('./ping');
commands.echo = require('./echo');
commands.abstract = require('./abstract');
commands.fractal = require('./fractal');
commands.stars = require('./stars');
commands.tree = require('./tree');
commands.reboot = require('./reboot');
commands.update = require('./update');

module.exports = commands;
