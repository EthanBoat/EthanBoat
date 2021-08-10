'use strict';

const util = require('util');
const { ComponentFunctions } = require('../util/Constants');

module.exports = async (boat, interaction) => {
  let handler;
  // Check for handler
  if (interaction.isCommand()) {
    handler = boat.interactions.commands.get(interaction.commandName);
  }
  if (interaction.isMessageComponent()) {
    if (!verifyCustomId(interaction.customId, interaction.message.components)) {
      interaction.reply({ content: 'You think you are sneaky huh, well, no such luck here!', ephemeral: true });
      return;
    }
    const name = ComponentFunctions[Number(interaction.customId.split(':')[0])];
    switch (interaction.componentType) {
      case 'BUTTON':
        handler = boat.interactions.buttonComponents.get(name);
        break;
      case 'SELECT_MENU':
        handler = boat.interactions.selectMenuComponents.get(name);
        break;
    }
  }

  if (!handler) {
    interaction.reply({
      content: 'This command has no associated action! Please contact the developer if it is supposed to be doing something!',
      ephemeral: true,
    });
    return;
  }

  // Handle command
  try {
    await handler.run(interaction, interaction.options);
  } catch (err) {
    boat.log.warn(module, `Error occurred during interaction call ${handler.name}: ${util.formatWithOptions({}, err)}`);
  }
};

function verifyCustomId(id, components) {
  if (!components?.length) return true;
  const found = components.find(component => component.type === 'ACTION_ROW' && component.components.find(c => c.customId === id));
  if (found) return true;
  return false;
}
