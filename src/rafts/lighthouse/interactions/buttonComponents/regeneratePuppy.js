'use strict';

const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { ComponentFunctions } = require('../../../../util/Constants');
const BaseInteraction = require('../../../BaseInteraction');

class RegeneratePuppyInteraction extends BaseInteraction {
  constructor(raft) {
    const info = {
      name: 'REGENERATE_PUPPY',
      enabled: true,
    };
    super(raft, info);
    this.definition = this.generateDefinition.bind(this);
  }

  async run(interaction) {
    const breedInfo = interaction.customID.split(':').slice(1);
    const breed = breedInfo[0] !== 'undefined' ? breedInfo[0] : undefined;
    const subbreed = breedInfo[1] !== 'undefined' ? breedInfo[1] : undefined;
    await interaction.deferUpdate();
    const pupper = await this.raft.apis.dog.getRandom(breed, subbreed).catch(err => this.boat.log.verbose(module, `Error getting pupper`, err.response?.data));
    if (!pupper) {
      interaction.followUp('The puppers went missing :(', { ephemeral: true });
      return;
    }
    const embed = new MessageEmbed().setImage(`${pupper.message}`).setColor('#0000FF');
    embed.setDescription(`It's a freaking pupper`).setTimestamp();
    interaction.editReply(embed);
  }

  generateDefinition(breed, subbreed) {
    const customID = `${ComponentFunctions[this.name]}:${breed}:${subbreed}`;
    return [
      new MessageActionRow({
        components: [
          new MessageButton({
            customID,
            label: 'Gib more dog',
            style: 'PRIMARY',
            emoji: {
              id: '663178451922190366',
            },
          }),
        ],
      }),
    ];
  }
}

module.exports = RegeneratePuppyInteraction;
