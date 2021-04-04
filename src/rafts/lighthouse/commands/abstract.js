'use strict';

const { createCanvas } = require('canvas');

const Discord = require('discord.js');

const BaseCommand = require('../../BaseCommand');

class AbstractCommand extends BaseCommand {
  constructor(boat) {
    const options = {
      name: 'abstract',
      owner: false,
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
    const maxIterations = 20;
    for (let i = 0; i < maxIterations; i++) {
      context.fillStyle = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
      context.arc(Math.random() * 1150 + 1, Math.random() * 720 + 1, 1, 0, 2 * Math.PI);
      context.fill();
    }

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'blue.png');

    message.channel.send(attachment);
  }
}

module.exports = AbstractCommand;
