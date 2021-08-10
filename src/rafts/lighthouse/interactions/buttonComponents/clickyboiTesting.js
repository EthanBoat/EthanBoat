'use strict';

const { MessageActionRow, MessageButton } = require('discord.js');
const { ComponentFunctions } = require('../../../../util/Constants');
const BaseInteraction = require('../../../BaseInteraction');

class TestingClickybois extends BaseInteraction {
  constructor(raft) {
    super(raft, { name: 'TESTING_CLICKY_BOIS', enabled: true });
    this.definition = [
      new MessageActionRow({
        components: [
          new MessageButton({
            customId: ComponentFunctions[this.name],
            label: 'This button has a maximum of 80 characters and I have no idea how many characte-',
            style: 'SUCCESS',
          }),
        ],
      }),
    ];
  }

  run(pain) {
    return pain.reply('Wow this actually worked');
  }
}

module.exports = TestingClickybois;
