'use strict';

const { MessageActionRow, MessageButton } = require('discord.js');
const { ComponentFunctions } = require('../../../../util/Constants');
const BaseInteraction = require('../../../BaseInteraction');

class HandleClickInteraction extends BaseInteraction {
  constructor(raft) {
    const info = {
      name: 'HANDLE_CLICK',
      enabled: true,
    };
    super(raft, info);
    this.definition = this.generateDefinition.bind(this);
  }

  async run(interaction) {
    const data = interaction.customId.split(':').slice(1);
    if (data[1] === 'green') {
      if (data[0] !== interaction.user.id) {
        interaction.reply({ content: 'I was expecting someone else to click that button <:fifiBlank:572866765214711809>', ephemeral: true });
      } else {
        interaction.reply({ content: 'Clickybois <a:fifiHappyAnimated:572871508624539679>', ephemeral: true });
      }
    } else if (data[1] === 'red') {
      let row = new MessageActionRow({
        components: [
          new MessageButton({
            customId: `${ComponentFunctions[this.name]}:${data[0]}:green`,
            label: 'Click Meh',
            style: 'SUCCESS',
            disabled: true,
          }),
          new MessageButton({
            customId: `${ComponentFunctions[this.name]}:${data[0]}:red`,
            label: "Don't click Meh",
            style: 'DANGER',
            disabled: true,
          }),
        ],
      });
      await interaction.update({ components: [row, interaction.message.components[1]] });
      interaction.followUp(`${interaction.user.toString()} clicked the red button so I disabled the buttons <:foxblep:826881118685888563>`);
    }
  }

  generateDefinition(messagea) {
    const customId = `${ComponentFunctions[this.name]}:${messagea}:`;
    return new MessageActionRow({
      components: [
        new MessageButton({
          customId: `${customId}green`,
          label: 'Click Meh',
          style: 'SUCCESS',
        }),
        new MessageButton({
          customId: `${customId}red`,
          label: "Don't click Meh",
          style: 'DANGER',
        }),
      ],
    });
  }
}

module.exports = HandleClickInteraction;
