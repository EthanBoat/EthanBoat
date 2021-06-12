'use strict';

const util = require('util');
const Discord = require('discord.js');
const BaseCommand = require('../../BaseCommand');

class EvalCommand extends BaseCommand {
  constructor(raft) {
    const options = {
      name: 'eval',
      owner: true,
      enabled: true,
    };
    super(raft, options);
  }

  async run(message, args) {
    let depth = 2;
    let nf = false;
    if (args.includes('--depth') || args.includes('-d')) {
      const index = args.indexOf('--depth') > -1 ? args.indexOf('--depth') : args.indexOf('-d');
      depth = args[index + 1];
      args.splice(index, 2);
    }
    if (args.includes('--nofile') || args.includes('-n')) {
      const index = args.indexOf('--nofile') > -1 ? args.indexOf('--nofile') : args.indexOf('-n');
      nf = true;
      args.splice(index, 1);
    }
    /* eslint-disable-next-line no-unused-vars */
    const client = this.boat.client;
    args = args.join(' ');
    if (args.toLowerCase().includes('token') || args.toLowerCase().includes('secret')) {
      message.channel.send(`Error: Execution of command refused`);
      return message.channel.send('https://media.tenor.com/images/59de4445b8319b9936377ec90dc5b9dc/tenor.gif');
    }
    let evaluated;
    try {
      evaluated = await eval(args);
    } catch (error) {
      evaluated = error;
    }
    if (evaluated === this.boat) {
      evaluated = this.boat.toJSON();
    }
    let cleaned = await this.clean(util.inspect(evaluated, { depth }));
    if (cleaned.split(/\r\n|\r|\n/).length > 8) {
      if (nf === true) {
        return message.channel.send(`\`\`\`js\n${cleaned.slice(0, 1950)}\n\`\`\``);
      }
      let attachment = new Discord.MessageAttachment(Buffer.from(cleaned, 'utf-8'), 'eval.js');
      return message.channel.send({ content: 'Eval output too long, see the attached file', files: [attachment] });
    }
    return message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``);
  }

  clean(text) {
    if (typeof text === 'string') {
      const tokens = findTokens(this.boat.options);
      tokens.forEach(token => (text = text.replace(new RegExp(token, 'gi'), 'Redacted')));
      return text.replace(/` /g, `\`${String.fromCharCode(8203)}`);
    }
    return text;
  }
}

function findTokens(options, includeAll = false) {
  let tokens = [];
  if (options === null) return tokens;
  const keys = Object.keys(options);
  keys.forEach(key => {
    if (typeof options[key] === 'object') {
      const nextIncludesAll = includeAll || key.toLowerCase().includes('token') || key.toLowerCase().includes('secret');
      return (tokens = tokens.concat(findTokens(options[key], nextIncludesAll)));
    }
    if (includeAll || key.toLowerCase().includes('token') || key.toLowerCase().includes('secret')) {
      if (typeof options[key] === 'undefined') return tokens;
      return tokens.push(options[key]);
    }
    return tokens;
  });
  return tokens;
}

module.exports = EvalCommand;
