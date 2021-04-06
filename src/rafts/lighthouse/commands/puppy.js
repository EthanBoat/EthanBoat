'use strict';

const axios = require('axios');

const Discord = require('discord.js');
const BaseCommand = require('../../BaseCommand');

class PuppyCommand extends BaseCommand {
  constructor(boat) {
    const options = {
      name: 'Puppy',
      owner: false,
      enabled: true,
    };
    super(boat, options);
  }

  async run(message) {
    async function dig() {
      let url = 'https://dog.ceo/api/breeds/image/random';
      const pupper = await axios.get(url);
      console.log(pupper);
      return pupper;
    }

    const pupper = await dig();

    let embed = new Discord.MessageEmbed()
      .setImage(`${pupper.data.message}`)
      .setColor('#0000FF')
      .setDescription(`It's a freaking pupper`)
      .setTimestamp(Date.now());
    message.channel.send(embed);
  }
}

module.exports = PuppyCommand;
