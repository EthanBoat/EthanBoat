'use strict';

const commands = {};

commands.eval = require('./eval');
commands.ping = require('./ping');
commands.echo = require('./echo');
commands.abstract = require('./abstract');
commands.fractal = require('./fractal');

module.exports = commands;
