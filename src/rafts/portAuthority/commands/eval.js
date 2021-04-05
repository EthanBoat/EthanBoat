'use strict';

const util = require('util');

const BaseCommand = require('../../BaseCommand');

class EvalCommand extends BaseCommand {
  constructor(boat) {
    const options = {
      name: 'eval',
      owner: true,
      enabled: true,
    };
    super(boat, options);
  }

  async run(message, args) {
    let depth = 2;
    if (args.includes('--depth') || args.includes('-d')) {
      const index = args.indexOf('--depth') > -1 ? args.indexOf('--depth') : args.indexOf('-d');
      depth = args[index + 1];
      args.splice(index, 2);
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
    if (cleaned.length > 1950) {
      const cleanedLines = cleaned.split('\n');
      let toSend = '';
      cleanedLines.forEach(line => {
        toSend += `\n${line}`;
        if (toSend.length > 1600) {
          message.channel.send(`\`\`\`js${toSend}\n\`\`\``);
          toSend = '';
        }
      });
      if (toSend.length) {
        return message.channel.send(`\`\`\`js${toSend}\n\`\`\``);
      }
      return null;
    }
    return message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``);
  }

  clean(text) {
    if (typeof text === 'string') {
      return text
        .replace(/` /g, `\`${String.fromCharCode(8203)}`)
        .replace(/@/g, `@${String.fromCharCode(8203)}`)
        .replace(this.boat.token, 'Redacted')
        .replace(this.boat.options.log.webhookToken, 'Redacted');
    }
    return text;
  }
}

module.exports = EvalCommand;
