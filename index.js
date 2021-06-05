/*
 * EthanBoat
 */
'use strict';

// Environment
require('dotenv').config();
const { Intents } = require('discord.js');

// Run
const shipyard = require('./src/boat');
const config = {
  debug: true,
  token: process.env.DISCORD_TOKEN,
  clientOpts: { intents: Intents.FLAGS.GUILDS | Intents.FLAGS.GUILD_MESSAGES },
  owners: ['140214425276776449', '337104786593939456', '396726969544343554', '133302647431102465', '255834596766253057'],
  log: {
    outputFile: process.env.LOG_LOCATION,
    verbose: true,
    webhookToken: process.env.LOG_WEBHOOK,
  },
  commandPrefix: process.env.DISCORD_PREFIX,
  tokens: {
    nasa: process.env.NASA_API_KEY,
  },
};

const ethanBoat = new shipyard(config);

ethanBoat.log('#', 'Starting...');

ethanBoat.boot();
