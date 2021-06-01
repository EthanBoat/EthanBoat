'use strict';

const Discord = require('discord.js');
const BaseCommand = require('../../BaseCommand');

class PuppyCommand extends BaseCommand {
  constructor(raft) {
    const options = {
      name: 'Puppy',
      owner: false,
      enabled: true,
    };
    super(raft, options);
  }

  async run(message, args) {
    let breed;
    let subbreed;
    if (args.length > 1) {
      breed = args[1];
      subbreed = args[0];
    }
    if (args.length === 1) {
      breed = args[0];
      if (breed === 'random') breed = undefined;
    }
    const pupper = await this.raft.apis.dog.getRandom(breed, subbreed).catch(err => this.boat.log.verbose(module, `Error getting pupper`, err));

    if (!pupper) {
      if (subbreed) {
        message.channel.send(`Subbreed \`${subbreed}\` or breed \`${breed}\` not found or the puppers went missing :(`);
        return;
      }
      if (breed) {
        message.channel.send(`Breed \`${breed}\` not found or the puppers went missing :(`);
        return;
      }
      message.channel.send('The puppers went missing :(');
      return;
    }

    const embed = new Discord.MessageEmbed().setImage(`${pupper.message}`).setColor('#0000FF');
    embed.setDescription(`It's a freaking pupper`).setTimestamp(Date.now());
    message.channel.send(embed);
  }
}

module.exports = PuppyCommand;
