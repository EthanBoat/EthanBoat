'use strict';
/* We did this without ck's help */
/* eslint-disable-next-line no-unused-vars */
const util = require('util');

const Discord = require('discord.js');

const BaseCommand = require('../../BaseCommand');

class PingCommand extends BaseCommand {
  constructor(boat) {
    const options = {
      name: 'ping',
      owner: true,
      enabled: true,
    };
    super(boat, options);
  }

  run(message) {
    /* eslint-disable-next-line no-unused-vars */
    const client = this.boat.client;
    let embed = new Discord.MessageEmbed()
      .setTitle('Ping')
      .setColor('#F1C40F')
      .setDescription(`🏓 Latency is ${message.createdTimestamp - Date.now()}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
      .setFooter('Made by Pilot, Ethan, Markens without ck');

    message.channel.send('Loading data').then(msg => {
      msg.edit(null, embed);
    });
  }
}

module.exports = PingCommand;
