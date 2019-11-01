import { getUserClubId, numberWithCommas, getClubCollectionCount } from '../functions/general';
import { RichEmbed } from 'discord.js';
import moment from "moment";

exports.run = async (client, message, args) => {
    const channel = message.channel;
    const author = message.author;

    channel.send("Club information is being fetched...")
        .then(async m => {
            const cInfo = await getUserClubId(author.id);
            const cCollection = await getClubCollectionCount(cInfo.id);

            let embed = new RichEmbed()
                .setTimestamp()
                .setFooter(`FUTPackBot v.1.0.0 | Made by Tjird#0001`, "https://tjird.nl/futbot.jpg")
                .setColor("0xE51E0A")
                .setTitle(`Club information of ${author.username}#${author.discriminator}`)
                .addField("Player amount", `\`${cCollection.length}\``, true)
                .addField("Coins", `\`${numberWithCommas(cInfo.coins)}\``, true)
                .addField("Points", `\`${numberWithCommas(cInfo.points)}\``, true)
                .addField("Creation time", `\`${moment(cInfo.creation_time * 1000).format("DD-MM-YYYY HH:mm:ss Z")}\``, true);

            m.edit(embed);
        });
}
