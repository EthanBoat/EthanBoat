'use strict';
/* We did this without ck's help */
/* eslint-disable-next-line no-unused-vars */
const util = require('util');

const { createCanvas } = require('canvas');

const Discord = require('discord.js');

const BaseCommand = require('../../BaseCommand');

class ImgCommand extends BaseCommand {
  constructor(boat) {
    const options = {
      name: 'img',
      owner: true,
      enabled: true,
    };
    super(boat, options);
  }

  run(message) {
    const width = 1200;
    const height = 730;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    context.fillStyle = '#57C7FF';
    context.fillRect(0, 0, width, height);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    message.channel.send(attachment);
  }
}

module.exports = ImgCommand;
