import {
    RichEmbed
} from 'discord.js';

exports.run = async (client, message, args) => {
    const embed = new RichEmbed()
        .setTitle('Help page')
        .setDescription("Don't know what to do? Where are here to help!\n" +
            'Do you want to know all the commands? Use the ** commands ** (pack!commands) command to see all available commands.\n' +
            "Can't you understand what to do or what else? Join the supported Discord server! [Click here](https://discord.gg/KUnh4fc) to join it.\n");

    return message.channel.send(embed);
}