/*
 * EthanBoat
 */
'use strict';

// Environment
require('dotenv').config();

// Run
const shipyard = require('./boat');
const config = {
  token: process.env.DISCORD_TOKEN,
  clientOpts: {},
  owners: ['140214425276776449', '337104786593939456', '396726969544343554', '133302647431102465', '255834596766253057'],
};

const ethanBoat = new shipyard(config);

ethanBoat.log('#', 'Starting...');

ethanBoat.boot();
