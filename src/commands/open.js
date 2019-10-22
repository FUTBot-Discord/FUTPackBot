import * as Canvas from 'canvas';
import { Attachment, RichEmbed } from 'discord.js';
import rwc from 'random-weighted-choice';
import { getPlayer, getQuality, getRarityName, getCardColor } from '../functions/general';

exports.run = async (client, message, args) => {
    const ran = rwc([
        {
            weight: 76,
            id: "gold+75"
        },
        {
            weight: 18,
            id: "gold+82"
        },
        {
            weight: 4.2,
            id: "gold+86"
        },
        {
            weight: 1.8,
            id: "totw"
        }
    ]);

    const weights = {
        "gold+75": {
            ratingB: 75,
            ratingT: 81,
            rarity: "0,1,3,47,48,12,22"
        },
        "gold+82": {
            ratingB: 82,
            ratingT: 85,
            rarity: "0,1,3,47,48,12,22"
        },
        "gold+86": {
            ratingB: 86,
            ratingT: 99,
            rarity: "0,1,3,47,48,12,22"
        },
        "totw": {
            ratingB: 75,
            ratingT: 99,
            rarity: "3"
        }
    }

    const values = weights.get(ran);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const player_info = await getPlayer(values.ratingB, values.ratingT, values.rarity);
    const card = await makeCard(player_info);
    const channel = message.channel;
    const author = message.author;

    let embed = new RichEmbed()
        .setColor("0xE51E0A")
        .setTimestamp()
        .setTitle("Opening a gold pack", "https://tjird.nl/futbot.jpg");

    channel.send(embed)
        .then(async m => {
            await delay(2000);

            let secondText = "Not even a board... Yeeezz...";

            if ((player_info.rareflag !== 3 && player_info.rating > 82) || (player_info.rareflag === 3 && player_info.rating <= 82)) secondText = "Decend, it's a board!";
            if ((player_info.rareflag !== 3 && player_info.rating > 85) || (player_info.rareflag === 3 && player_info.rating >= 83) || (player_info.rareflag === 12)) secondText = "WALKOUT!!!";

            embed = new RichEmbed()
                .setColor("0xE51E0A")
                .setTimestamp()
                .setTitle(secondText, "https://tjird.nl/futbot.jpg");

            m.edit(embed);

            await delay(2000);

            let quality = getQuality(player_info.rating);

            embed = new RichEmbed()
                .setColor("0xE51E0A")
                .attachFile(card)
                .setTimestamp()
                .setImage("attachment://card.png")
                .setDescription(`Version: ${getRarityName(`${player_info.rareflag}-${quality}`) ? getRarityName(`${player_info.rareflag}-${quality}`) : "Unknown"}`)
                .setTitle(`${author.username}#${author.discriminator} has packed ${(player_info.meta_info.common_name ? player_info.meta_info.common_name : `${player_info.meta_info.first_name} ${player_info.meta_info.last_name}`)}`, "https://tjird.nl/futbot.jpg")
                .setFooter(`FUTPackBot v.1.0.0 | Made by Tjird#0001`, "https://tjird.nl/futbot.jpg");

            await m.delete();

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

    if (playername.length < 17) {
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