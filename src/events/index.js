'use strict';

const events = {};

events.message = require('./message');
events.ready = require('./ready');

module.exports = events;
