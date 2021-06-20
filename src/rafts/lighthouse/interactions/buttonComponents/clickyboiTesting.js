'use strict';

const { ComponentFunctions } = require('../../../../util/Constants');
const BaseInteraction = require('../../../BaseInteraction');

class TestingClickybois extends BaseInteraction {
  constructor(raft) {
    super(raft, { name: 'TESTING_CLICKY_BOIS', enabled: true });
    this.definition = [
      [
        {
          type: 'BUTTON',
          style: 'SUCCESS',
          label: 'This button has a maximum of 80 characters and I have no idea how many characte-',
          customID: `${ComponentFunctions[this.name]}`,
          // Gently carresses this object cause it's purdy <3
        },
      ],
    ];
  }

  run(pain) {
    return pain.reply('Wow this actually worked');
  }
}

module.exports = TestingClickybois;
