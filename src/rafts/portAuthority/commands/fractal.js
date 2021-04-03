/* eslint-disable prettier/prettier */
'use strict';
/* We did this without ck's help */
/* eslint-disable-next-line no-unused-vars */

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
        var canvas = createCanvas(width, height);
        var ctx = canvas.getContext('2d');

        function checkIfBelongsToMandelbrotSet(x, y) {
            var realComponentOfResult = x;
            var imaginaryComponentOfResult = y;
            var maxIterations = 300;
            for (var i = 0; i < maxIterations; i++) {
                var tempRealComponent = realComponentOfResult * realComponentOfResult
                    - imaginaryComponentOfResult * imaginaryComponentOfResult
                    + x;
                var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
                    + y;
                realComponentOfResult = tempRealComponent;
                imaginaryComponentOfResult = tempImaginaryComponent;

                // Return a number as a percentage
                if (realComponentOfResult * imaginaryComponentOfResult > 5) { return (i / maxIterations * 100); }
            }
            // Return zero if in set
            return 0;
        }

        var magnificationFactor = 2000;
        var panX = (Math.random() * 2);
        var panY = (Math.random() * 1);
        for (var x = 0; x < canvas.width; x++) {
            for (var y = 0; y < canvas.height; y++) {
                var belongsToSet =
                    checkIfBelongsToMandelbrotSet(x / magnificationFactor - panX,
                        y / magnificationFactor - panY);
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
        ctx.rotate((Math.floor(Math.random() * 360) * Math.PI / 180));
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'fractal.png');

        message.channel.send(attachment);
    }
}

module.exports = FractalCommand;
