'use strict';

const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { ComponentFunctions } = require('../../../../util/Constants');
const BaseInteraction = require('../../../BaseInteraction');

class HandleSelectInteraction extends BaseInteraction {
  constructor(raft) {
    const info = {
      name: 'HANDLE_SELECT',
      enabled: true,
    };
    super(raft, info);
    this.definition = this.generateDefinition.bind(this);
  }

  async run(interaction) {
    const user = interaction.customId.split(':').slice(1)[0];
    const data = interaction.values;
    if (data[0] === 'first_option') {
      if (user !== interaction.user.id) {
        interaction.reply({ content: 'I was expecting someone else to click that button <:fifiBlank:572866765214711809>', ephemeral: true });
      } else {
        interaction.reply({ content: 'Droppybois <a:fifiHappyAnimated:572871508624539679>', ephemeral: true });
      }
    } else if (data[0] === 'second_option') {
      let row = new MessageActionRow({
        components: [
          new MessageSelectMenu()
            .setCustomId(`${ComponentFunctions[this.name]}:${data[0]}`)
            .setPlaceholder('Nothing selected')
            .addOptions([
              {
                label: 'Select me',
                description: 'Select me pls',
                value: 'first_option',
              },
              {
                label: "Don't select me",
                description: "Please don't select me",
                value: 'second_option',
              },
            ])
            .setDisabled(true),
        ],
      });
      await interaction.update({ components: [interaction.message.components[0], row] });
      interaction.followUp(`${interaction.user.toString()} selected the second option so I disabled the select menu <:foxblep:826881118685888563>`);
    }
  }

  generateDefinition(messagea) {
    const customId = `${ComponentFunctions[this.name]}:${messagea}`;
    return new MessageActionRow({
      components: [
        new MessageSelectMenu()
          .setCustomId(customId)
          .setPlaceholder('Nothing selected')
          .addOptions([
            {
              label: 'Select me',
              description: 'Select me pls',
              value: 'first_option',
            },
            {
              label: "Don't select me",
              description: "Please don't select me",
              value: 'second_option',
            },
          ]),
      ],
    });
  }
}

module.exports = HandleSelectInteraction;
