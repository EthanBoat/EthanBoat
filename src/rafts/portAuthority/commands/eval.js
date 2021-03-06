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
    let evaluated = await eval(args);
    if (evaluated === this.boat) {
      evaluated = this.boat.toJSON();
    }
    let cleaned = await this.clean(util.inspect(evaluated, { depth }));
    if (cleaned.split(/\r\n|\r|\n/).length > 8) {
      if (nf === true) {
        return message.channel.send(`\`\`\`js\n${cleaned.slice(0, 1950)}\n\`\`\``);
      }
      let attachment = new Discord.MessageAttachment(Buffer.from(cleaned, 'utf-8'), 'eval.js');
      return message.channel.send('Eval output too long, see the attached file', attachment);
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

const opts = {
  option1: 'hello',
  option2: {
    option3: 'bye',
    optionToken: 'alsdkjfhal sdfkjhasd',
  },
  tokens: {
    nasa: 'bye',
    cat: 'alsdkjfhal sdfkjhasd',
  },
  optionSecret: 'aksjdfh alsdkfjha',
};

findTokens(opts);

function findTokens(options, includeAll = false) {
  let tokens = [];
  const keys = Object.keys(options);
  keys.forEach(key => {
    if (typeof options[key] === 'object') {
      const nextIncludesAll = includeAll || key.toLowerCase().includes('token') || key.toLowerCase().includes('secret');
      return (tokens = tokens.concat(findTokens(options[key], nextIncludesAll)));
    }
    if (includeAll || key.toLowerCase().includes('token') || key.toLowerCase().includes('secret')) {
      return tokens.push(options[key]);
    }
    return tokens;
  });
  return tokens;
}

module.exports = EvalCommand;
