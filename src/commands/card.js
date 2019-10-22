import * as Canvas from 'canvas';
import { Attachment } from 'discord.js';
import rwc from 'random-weighted-choice';
import { getPlayer, getQuality, getRarityName } from '../functions/general';

exports.run = async (client, message, args) => {
    console.log(rwc([
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
            id: "gold+84"
        },
        {
            weight: 1.8,
            id: "totw"
        }
    ]));
    const player_info = await getPlayer(75, 99, 3);

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
    Canvas.registerFont(`fut.ttf`, { family: "DIN Pro Cond" });
    Canvas.registerFont(`futlight.ttf`, { family: "DIN Pro Cond Light" });
    const packCard = Canvas.createCanvas((644 / 2.15), (900 / 2.15));
    const ctx = packCard.getContext('2d');


    const background = await Canvas.loadImage('./cards_bg_e_1_3_3.png');
    ctx.drawImage(background, 0, 0, (644 / 2.15), (900 / 2.15));

    const playerpicture = await Canvas.loadImage(player_info.meta_info.img);

    ctx.drawImage(playerpicture, 95, 57, 165, 160);

    ctx.font = "19px 'Roboto Bold'";
    ctx.fillStyle = "#EAE59B";
    ctx.textAlign = "center";
    ctx.fillText(player_info.meta_info.common_name ? player_info.meta_info.common_name.toUpperCase() : player_info.meta_info.last_name.toUpperCase(), packCard.width / 2, 240);

    ctx.font = "45px 'DIN Pro Cond'";
    ctx.fillText(player_info.rating, 90, 93);

    ctx.font = "28px 'DIN Pro Cond Light'";
    ctx.fillText(player_info.preferred_position.toUpperCase(), 90, 119);

    const nation = await Canvas.loadImage(player_info.nation_info.img);
    ctx.drawImage(nation, 70, 128, nation.width * 0.6, nation.height * 0.6);

    const club = await Canvas.loadImage(player_info.club_info.img);
    ctx.drawImage(club, 68, 165, club.width * 0.31, club.height * 0.31);

    ctx.font = "18px 'Roboto Bold'";
    ctx.fillStyle = "#EAE59B";
    ctx.textAlign = "center";
    ctx.fillText(player_info.pac, packCard.width * 0.28, packCard.height * 0.67);
    ctx.fillText(player_info.sho, packCard.width * 0.28, packCard.height * 0.73);
    ctx.fillText(player_info.pas, packCard.width * 0.28, packCard.height * 0.79);
    ctx.fillText(player_info.dri, packCard.width * 0.583, packCard.height * 0.67);
    ctx.fillText(player_info.def, packCard.width * 0.583, packCard.height * 0.73);
    ctx.fillText(player_info.phy, packCard.width * 0.583, packCard.height * 0.79);

    if (player_info.preferred_position === "GK") {
        positions = positions.g;
    } else {
        positions = positions.p;
    }

    ctx.fillStyle = "#D6D28E";
    ctx.textAlign = "left";
    ctx.fillText(positions.pac.toUpperCase(), packCard.width * 0.33, packCard.height * 0.67);
    ctx.fillText(positions.sho.toUpperCase(), packCard.width * 0.33, packCard.height * 0.73);
    ctx.fillText(positions.pas.toUpperCase(), packCard.width * 0.33, packCard.height * 0.79);
    ctx.fillText(positions.dri.toUpperCase(), packCard.width * 0.633, packCard.height * 0.67);
    ctx.fillText(positions.def.toUpperCase(), packCard.width * 0.633, packCard.height * 0.73);
    ctx.fillText(positions.phy.toUpperCase(), packCard.width * 0.633, packCard.height * 0.79);


    ctx.font = "20px 'DIN Pro Cond Light'";
    ctx.textAlign = "center";
    ctx.fillStyle = "#4D2222";
    ctx.fillText("__", 90, 120);
    ctx.fillText("__", 90, 155);
    ctx.fillText("|", packCard.width / 2, packCard.height * 0.66);
    ctx.fillText("|", packCard.width / 2, packCard.height * 0.68);
    ctx.fillText("|", packCard.width / 2, packCard.height * 0.70);
    ctx.fillText("|", packCard.width / 2, packCard.height * 0.72);
    ctx.fillText("|", packCard.width / 2, packCard.height * 0.74);
    ctx.fillText("|", packCard.width / 2, packCard.height * 0.76);
    ctx.fillText("|", packCard.width / 2, packCard.height * 0.78);
    ctx.fillText("|", packCard.width / 2, packCard.height * 0.80);

    ctx.fillText("________________", packCard.width / 2, 247);

    const attachment = new Attachment(packCard.toBuffer(), 'card.png');

    message.channel.send(attachment);

}