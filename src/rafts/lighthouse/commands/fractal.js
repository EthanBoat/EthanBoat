'use strict';

const { createCanvas } = require('canvas');

const Discord = require('discord.js');

const BaseCommand = require('../../BaseCommand');

class FractalCommand extends BaseCommand {
  constructor(boat) {
    const options = {
      name: 'fractal',
      owner: true,
      enabled: true,
    };
    super(boat, options);
  }

  run(message) {
    const width = 1200;
    const height = 1200;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    function checkIfBelongsToMandelbrotSet(x, y) {
      let realComponentOfResult = x;
      let imaginaryComponentOfResult = y;
      const maxIterations = 300;
      for (let i = 0; i < maxIterations; i++) {
        const tempRealComponent = realComponentOfResult * realComponentOfResult - imaginaryComponentOfResult * imaginaryComponentOfResult + x;
        const tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult + y;
        realComponentOfResult = tempRealComponent;
        imaginaryComponentOfResult = tempImaginaryComponent;

        // Return a number as a percentage
        if (realComponentOfResult * imaginaryComponentOfResult > 5) {
          return (i / maxIterations) * 100;
        }
      }
      // Return zero if in set
      return 0;
    }

    const magnificationFactor = 2000;
    const panX = Math.random() * 2;
    const panY = Math.random() * 1;
    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        const belongsToSet = checkIfBelongsToMandelbrotSet(x / magnificationFactor - panX, y / magnificationFactor - panY);
        if (belongsToSet === 0) {
          ctx.fillStyle = '#000';
          // Draw a black pixel
          ctx.fillRect(x, y, 1, 1);
        } else {
          ctx.fillStyle = `hsl(165, 100%, ${belongsToSet}%)`;
          // Draw a colorful pixel
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    ctx.translate(width / 2, height / 2);
    ctx.rotate((Math.floor(Math.random() * 360) * Math.PI) / 180);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'fractal.png');

    message.channel.send(attachment);
  }
}

module.exports = FractalCommand;
