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
}

const ethanBoat = new shipyard(config);

theBoat.log('#', 'Starting...');

ethanBoat.boot();
