'use strict';

const Discord = require('discord.js')
const BaseCommand = require('../../BaseCommand')

require('dotenv').config();

const axios = require('axios')


class SpaceCommand extends BaseCommand {
  constructor(boat){
    const options = {
      name: 'space',
      owner: true,
      enabled: true,
    };
    super(boat, options)
  }


  async run(message) {
    async function explore() {
      let url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
      const stars = await axios.get(url);
      console.log(stars)
      return stars;
    }    
    const stars = await explore()
    //message.channel.send(`${stars.data.url}`)
    let embed = new Discord.MessageEmbed()
      .setTitle(`${stars.data.title}`)
      .setURL('https://apod.nasa.gov/')
      .setColor('#00FF00')
      .setDescription(`${stars.data.explanation}`)
      .setImage(`${stars.data.hdurl}`)
      .addField('Date', `${stars.data.date}`)
      .setTimestamp()
      .setFooter('nasa.gov', 'https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/nasa-logo.svg')
    message.channel.send(embed);
  }
}

module.exports = SpaceCommand;