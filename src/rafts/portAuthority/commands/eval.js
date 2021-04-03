'use strict';

/* eslint-disable-next-line no-unused-vars */
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
    /* eslint-disable-next-line no-unused-vars */
    const client = this.boat.client;
    args = args.join(' ');
    if (args.toLowerCase().includes('token') || args.toLowerCase().includes('secret')) {
      return message.channel.send(`Error: Execution of command refused`);
    }
    let evaluated = eval(args);
    let cleaned = await this.clean(evaluated);
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
