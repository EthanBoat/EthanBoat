'use strict';

const BaseCommand = require('../../BaseCommand');

class TheBoisCommand extends BaseCommand {
  constructor(raft) {
    const options = {
      name: 'thebois',
      owner: false,
      enabled: true,
    };
    super(raft, options);
  }

  run(message) {
    const components = [
      this.raft.interactions.buttonComponents.get('HANDLE_CLICK').definition(message.author.id),
      this.raft.interactions.selectMenuComponents.get('HANDLE_SELECT').definition(message.author.id),
    ];
    message.channel.send({ content: "Here's the bois in action!", components });
  }
}

module.exports = TheBoisCommand;
