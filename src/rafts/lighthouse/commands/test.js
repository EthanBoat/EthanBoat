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
    let components = this.raft.interactions.buttonComponents.get('TESTING_CLICKY_BOIS').definition;
    message.channel.send({ embeds: [embed], components });
  }
}

module.exports = test;
