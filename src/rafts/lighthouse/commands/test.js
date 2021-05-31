'use strict';

const Discord = require('discord.js');
const BaseCommand = require('../../BaseCommand');

class test extends BaseCommand {
  constructor(raft) {
    const options = {
      name: 'test',
      owner: false,
      enabled: true,
    };
    super(raft, options);
  }

  run(message) {
    let embed = new Discord.MessageEmbed().setDescription('Testing, testing, can anyone hear me?');
    message.channel.send(embed);
  }
}

module.exports = test;
