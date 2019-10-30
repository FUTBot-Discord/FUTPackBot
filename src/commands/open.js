import * as Canvas from 'canvas';
import { Attachment, RichEmbed } from 'discord.js';
import { Chance } from 'chance';
import { getPlayer, getQuality, getRarityName, getCardColor, getPackById, getAnimation } from '../functions/general';
import { createClient } from 'async-redis';

const redis = createClient({
    "host": process.env.R_HOST,
    "db": 15,
    "retry_strategy": function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            return undefined;
        }
        return Math.min(options.attempt * 100, 3000);
    }
});

exports.run = async (client, message, args) => {
    const channel = message.channel;
    const author = message.author;

    if (!args[0] || args[0] == undefined) return channel.send(`You need to fill in an id of a pack. ${author}`);

    const wPacks = JSON.parse(await redis.get(args[0]));

    if (!wPacks || wPacks == undefined) return channel.send(`You need to fill in a valid id of a pack. ${author}`);

    const iPacks = await getPackById(args[0]);
    const delay = ms => new Promise(res => setTimeout(res, ms));

    let players_info = [];
    let tPacks = JSON.parse(await redis.get("information"));
    let w;
    let chance;

    for (let players_count = 1; players_count <= iPacks.players; players_count++) {
        chance = new Chance();
        w = tPacks[chance.weighted(wPacks[0], wPacks[1])];
        console.log(w);
        players_info.push(await getPlayer(w.ratingB, w.ratingT, w.rarity));
    }

    console.log("==========");

    players_info = players_info.sort((a, b) => (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0));

    const card = await makeCard(players_info[0]);
    const animation = getAnimation(players_info[0].rareflag, players_info[0].rating);

    let embed = new RichEmbed()
        .setColor("0xE51E0A")
        .setTimestamp()
        .attachFile(`pack_animations/${animation}.gif`, `${animation}.gif`)
        .setImage(`attachment://${animation}.gif`)
        .setFooter(`FUTPackBot v.1.0.0 | Made by Tjird#0001`, "https://tjird.nl/futbot.jpg")
        .setTitle(`${author.username}#${author.discriminator} is opening a ${iPacks.name}`, "https://tjird.nl/futbot.jpg");

    channel.send(embed)
        .then(async m => {
            await delay(10000);

            let quality = getQuality(players_info[0].rating);

            const other_players = [];

            for (let i = 1; i < players_info.length; i++) {
                other_players.push(`Playername: ${(players_info[i].meta_info.common_name ? `${players_info[i].meta_info.common_name} (${players_info[i].meta_info.first_name} ${players_info[i].meta_info.last_name})` : `${players_info[i].meta_info.first_name} ${players_info[i].meta_info.last_name}`)}\nVersion: ${getRarityName(`${players_info[i].rareflag}-${getQuality(players_info[i].rating)}`) ? getRarityName(`${players_info[i].rareflag}-${getQuality(players_info[i].rating)}`) : "Unknown"}\nRating: ${players_info[i].rating}`);
            }

            embed = new RichEmbed()
                .setColor("0xE51E0A")
                .attachFile(card)
                .setTimestamp()
                .setImage("attachment://card.png")
                .setDescription(`Version: ${getRarityName(`${players_info[0].rareflag}-${quality}`) ? getRarityName(`${players_info[0].rareflag}-${quality}`) : "Unknown"}\nPack: ${iPacks.name}\n\nOther players obtained through this pack are listed below.\n\n${other_players.join("\n\n")}`)
                .setTitle(`${author.username}#${author.discriminator} has packed ${(players_info[0].meta_info.common_name ? players_info[0].meta_info.common_name : `${players_info[0].meta_info.first_name} ${players_info[0].meta_info.last_name}`)}`, "https://tjird.nl/futbot.jpg")
                .setFooter(`FUTPackBot v.1.0.0 | Made by Tjird#0001`, "https://tjird.nl/futbot.jpg");

            m.delete();

            channel.send(embed);
        });
}

async function makeCard(player_info) {
    let positions = {
        p: {
            "pac": "pac",
            "sho": "sho",
            "pas": "pas",
            "dri": "dri",
            "def": "def",
            "phy": "phy"
        },
        g: {
            "pac": "DIV",
            "sho": "HAN",
            "pas": "KIC",
            "dri": "REF",
            "def": "SPE",
            "phy": "POS"
        }
    }

    Canvas.registerFont(`Roboto-Bold.ttf`, { family: "Roboto Bold" });
    Canvas.registerFont(`Champions-Regular.otf`, { family: "Champions" });
    Canvas.registerFont(`fut.ttf`, { family: "DIN Condensed Web" });
    Canvas.registerFont(`futlight.ttf`, { family: "DIN Condensed Web Light" });

    const packCard = Canvas.createCanvas((644 / 2.15), (900 / 2.15));
    const ctx = packCard.getContext('2d');

    const colors = await getCardColor(player_info.rareflag, player_info.rating);
    const background = await Canvas.loadImage(`http://fifa.tjird.nl/cards/${player_info.rareflag}-${getQuality(player_info.rating)}.png`);
    ctx.drawImage(background, 0, 0, (644 / 2.15), (900 / 2.15));

    const playerpicture = await Canvas.loadImage(player_info.meta_info.img);

    ctx.drawImage(playerpicture, 95, 57, 160, 160);

    let playername = player_info.meta_info.common_name ? player_info.meta_info.common_name.toUpperCase() : player_info.meta_info.last_name.toUpperCase();
    let pSize = '19px';
    let pHeight = 241;

    if (playername.length < 15) {
        pSize = '24px';
        pHeight = 241;
    }

    ctx.font = `${pSize} '${colors.font_3}'`;
    ctx.fillStyle = `#${colors.color_text}`;
    ctx.textAlign = "center";
    ctx.fillText(playername, packCard.width / 2, pHeight);

    ctx.font = `45px '${colors.font_1}'`;
    ctx.fillText(player_info.rating, 90, 93);

    ctx.font = `28px '${colors.font_2}'`;
    ctx.fillText(player_info.preferred_position.toUpperCase(), 90, 119);

    const nation = await Canvas.loadImage(player_info.nation_info.img);
    ctx.drawImage(nation, 70, 128, nation.width * 0.6, nation.height * 0.6);

    const club = await Canvas.loadImage(player_info.club_info.img);
    ctx.drawImage(club, 70, 165, club.width * 0.31, club.height * 0.31);

    ctx.font = `18px '${colors.font_3}'`;
    ctx.fillStyle = `#${colors.color_attr_values}`;
    ctx.textAlign = "center";
    ctx.fillText(player_info.pac, packCard.width * 0.28, packCard.height * 0.67);
    ctx.fillText(player_info.sho, packCard.width * 0.28, packCard.height * 0.73);
    ctx.fillText(player_info.pas, packCard.width * 0.28, packCard.height * 0.79);
    ctx.fillText(player_info.dri, packCard.width * 0.598, packCard.height * 0.67);
    ctx.fillText(player_info.def, packCard.width * 0.598, packCard.height * 0.73);
    ctx.fillText(player_info.phy, packCard.width * 0.598, packCard.height * 0.79);

    if (player_info.preferred_position === "GK") {
        positions = positions.g;
    } else {
        positions = positions.p;
    }

    ctx.fillStyle = `#${colors.color_attr_names}`;
    ctx.textAlign = "left";
    ctx.fillText(positions.pac.toUpperCase(), packCard.width * 0.33, packCard.height * 0.67);
    ctx.fillText(positions.sho.toUpperCase(), packCard.width * 0.33, packCard.height * 0.73);
    ctx.fillText(positions.pas.toUpperCase(), packCard.width * 0.33, packCard.height * 0.79);
    ctx.fillText(positions.dri.toUpperCase(), packCard.width * 0.648, packCard.height * 0.67);
    ctx.fillText(positions.def.toUpperCase(), packCard.width * 0.648, packCard.height * 0.73);
    ctx.fillText(positions.phy.toUpperCase(), packCard.width * 0.648, packCard.height * 0.79);

    ctx.strokeStyle = `#${colors.color_stripes}`;

    ctx.beginPath();
    ctx.moveTo(80, 124);
    ctx.lineTo(101, 124);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(80, 160);
    ctx.lineTo(101, 160);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(packCard.width / 2, 262);
    ctx.lineTo(packCard.width / 2, 337);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(62, 249);
    ctx.lineTo(235, 249);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo((packCard.width / 2) - 23, 350);
    ctx.lineTo((packCard.width / 2) + 23, 350);
    ctx.stroke();

    const attachment = new Attachment(packCard.toBuffer(), 'card.png');

    return attachment;
}