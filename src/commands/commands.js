import { RichEmbed } from 'discord.js';

exports.run = async (client, message, args) => {
    const embed = new RichEmbed()
        .setColor("0xE51E0A")
        .setTitle("Available commands")
        .setDescription("Want more information about a command? Use pack!cmd <command>. (Not yet implemented)")
        .addField('Packs', "pack!list // Get a list of available packs.\n" +
            "pack!open [pack_id] // Just open a pack.\n"
            , false)
        .addField('Club information', "pack!balance // Get your current amount of coins.\n" +
            "pack!clubinfo // Get some general information of your own club.\n" +
            "pack!points // Get your current amount of points."
            , false)
        .addField('Club collections', "pack!club [player_name] // Get a list of players in your own club. You can switch pages with the reacted emojis.\n" +
            "pack!transferpile // Get a collection of your transferpile. You can switch pages with the reacted emojis.\n"
            , false)
        .addField('Transfer market', "pack!market // Get a list of players that are currently on the transfer market. You can switch pages with the reacted emojis.\n" +
            "pack!transferpile // Get a collection of your transferpile. You can switch pages with the reacted emojis.\n"
            , false);

    message.channel.send(embed)
}