/* eslint-disable prettier/prettier */
'use strict';
/* We did this without ck's help */
/* eslint-disable-next-line no-unused-vars */

const { createCanvas } = require('canvas');

const Discord = require('discord.js');

const BaseCommand = require('../../BaseCommand');

class TreeCommand extends BaseCommand {
    constructor(boat) {
        const options = {
            name: 'tree',
            owner: true,
            enabled: true,
        };
        super(boat, options);
    }

    run(message) {
        const width = 600;
        const height = 600;
        var canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        let curve = 10;
        let curve2 = 0;

        function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
            ctx.beginPath();
            ctx.save();
            ctx.strokeStyle = color1;
            ctx.fillStyle = color2;
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'black';
            ctx.lineWidth = branchWidth;
            ctx.translate(startX, startY);
            ctx.rotate(angle * Math.PI / 180);
            ctx.moveTo(0, 0);
            // Ctx.lineTo(0, -len);
            if (angle > 0) {
                ctx.bezierCurveTo(curve2, -len / 2, curve2, -len / 2, 0, -len);
            } else {
                ctx.bezierCurveTo(curve2, -len / 2, -curve2, -len / 2, 0, -len);
            }

            ctx.stroke();

            if (len < 5) {
                // Leafs
                ctx.beginPath();
                ctx.arc(0, -len, (Math.random() * 20) + 10, 0, Math.PI / 2);
                ctx.fill();
                ctx.restore();
                return;
            }

            drawTree(0, -len, len * 0.7, angle + curve, branchWidth * 0.6);
            drawTree(0, -len, len * 0.7, angle - curve, branchWidth * 0.6);

            ctx.restore();
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // StartX, startY, len, angle, branchWidth, color1, color2
        let centerPointX = canvas.width / 2;
        let len = Math.floor((Math.random() * 20) + 140);
        let angle = 0;
        let branchWidth = (Math.random() * 70) + 1;
        let color1 = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
        let color2 = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
        curve = (Math.random() * 25) + 3;
        curve2 = Math.random() * 10;
        drawTree(centerPointX, canvas.height - 80, len, angle, branchWidth, color1, color2);


        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'tree.png');

        message.channel.send(attachment);
    }
}

module.exports = TreeCommand;
