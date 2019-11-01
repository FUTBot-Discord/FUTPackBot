import { RichEmbed } from 'discord.js';
import { Chance } from 'chance';
import {
    getPlayer,
    getQuality,
    getRarityName,
    getPackById,
    getAnimation,
    getUserClubId,
    addClubPlayer,
    getClubPlayer,
    removeCoinsFromClub,
    addCoinsToClub,
    makePlayerCard,
    setDialogue,
    getPacksByName,
    makeOptionMenu
} from '../functions/general';
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
    let pID;

    if (!args[0] || args[0] == undefined) {
        const f = m => m.author.id === author.id;
        let mTemp;
        let mTemp2;
        let pName;

        channel.send(`Send the name of the pack you want to open.\n\n*This request is being cancelled in 20 seconds*`)
            .then(m => mTemp = m);

        await setDialogue(f, channel, 20000)
            .then(m => pName = m)
            .then(m => m.delete())
            .then(() => mTemp.delete())
            .catch(e => {
                switch (e) {
                    case 1:
                        return channel.send(`Request cancelled by ${author}.`);
                    case 2:
                        return channel.send(`Time exceeded for ${author}.`);
                };
            });

        if (!pName) return;

        const packList = await getPacksByName(pName.content);

        if (packList.length < 1) {
            return channel.send(`Try again... No packs where found with that name ${author}.\nYou can get a whole list of available packs with \`pack!list\`.`);
        } else if (packList.length === 1) {
            pID = packList[0].id;
        } else {
            channel.send(await makeOptionMenu(packList), {
                code: true
            }).then(m => mTemp = m);

            channel.send(`Send the **ID** of the pack you want to open.\n\n*This request is being cancelled in 20 seconds*`)
                .then(m => mTemp2 = m);

            await setDialogue(f, channel, 20000)
                .then(m => pID = m)
                .then(m => m.delete())
                .then(() => mTemp.delete())
                .then(() => mTemp2.delete())
                .catch(e => {
                    switch (e) {
                        case 1:
                            return channel.send(`Request cancelled by ${author}.`);
                        case 2:
                            return channel.send(`Time exceeded for ${author}.`);
                    };
                });

            if (!pID) return;

            pID = pID.content
        }

    } else {
        pID = args[0];
    }

    const wPacks = JSON.parse(await redis.get(pID));

    if (!wPacks || wPacks == undefined) return channel.send(`You need to fill in a valid id of a pack. ${author}`);

    const iPacks = await getPackById(pID);
    const delay = ms => new Promise(res => setTimeout(res, ms));

    let players_info = [];
    let tPacks = JSON.parse(await redis.get("information"));
    let clubuser = await getUserClubId(author.id);
    let w;
    let chance;

    for (let players_count = 1; players_count <= iPacks.players; players_count++) {
        chance = new Chance();
        w = tPacks[chance.weighted(wPacks[0], wPacks[1])];
        players_info.push(await getPlayer(w.ratingB, w.ratingT, w.rarity));
    }

    let duplicates = [];

    for (let p of players_info) {
        let o = await getClubPlayer(clubuser.id, p.id);

        if (o !== null) {
            duplicates.push(p.id);
            await addCoinsToClub(clubuser.id, p.min_price);
        } else {
            await addClubPlayer(clubuser.id, p.id);
        }
    }

    players_info = players_info.sort((a, b) => (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0));

    const card = await makePlayerCard(players_info[0]);
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
                if (duplicates.includes(players_info[i].id)) {
                    other_players.push(`Playername: ${(players_info[i].meta_info.common_name ? `${players_info[i].meta_info.common_name} (${players_info[i].meta_info.first_name} ${players_info[i].meta_info.last_name})` : `${players_info[i].meta_info.first_name} ${players_info[i].meta_info.last_name}`)}\nVersion: ${getRarityName(`${players_info[i].rareflag}-${getQuality(players_info[i].rating)}`) ? getRarityName(`${players_info[i].rareflag}-${getQuality(players_info[i].rating)}`) : "Unknown"}\nRating: ${players_info[i].rating}\nQuick-sold for ${players_info[i].min_price} because it's a duplicate.`);
                } else {
                    other_players.push(`Playername: ${(players_info[i].meta_info.common_name ? `${players_info[i].meta_info.common_name} (${players_info[i].meta_info.first_name} ${players_info[i].meta_info.last_name})` : `${players_info[i].meta_info.first_name} ${players_info[i].meta_info.last_name}`)}\nVersion: ${getRarityName(`${players_info[i].rareflag}-${getQuality(players_info[i].rating)}`) ? getRarityName(`${players_info[i].rareflag}-${getQuality(players_info[i].rating)}`) : "Unknown"}\nRating: ${players_info[i].rating}`);
                }
            }

            let t = "";

            if (duplicates.includes(players_info[0].id)) t = `\nQuick-sold for ${players_info[0].min_price} because it's a duplicate.`;

            embed = new RichEmbed()
                .setColor("0xE51E0A")
                .attachFile(card)
                .setTimestamp()
                .setImage("attachment://card.png")
                .setDescription(`Version: ${getRarityName(`${players_info[0].rareflag}-${quality}`) ? getRarityName(`${players_info[0].rareflag}-${quality}`) : "Unknown"}\nPack: ${iPacks.name}${t}\n\nOther players obtained through this pack are listed below.\n\n${other_players.join("\n\n")}`)
                .setTitle(`${author.username}#${author.discriminator} has packed ${(players_info[0].meta_info.common_name ? players_info[0].meta_info.common_name : `${players_info[0].meta_info.first_name} ${players_info[0].meta_info.last_name}`)}`, "https://tjird.nl/futbot.jpg")
                .setFooter(`FUTPackBot v.1.0.0 | Made by Tjird#0001`, "https://tjird.nl/futbot.jpg");

            m.delete()
                .catch(e => {
                    if (e.code !== 50013) return channel.send("The packed players are stored to your club and duplicates has been quick-sold.\nSomething just went wrong with the opening.");

                    return channel.send("The packed players are stored to your club and duplicates has been quick-sold.\nIt looks like the bot has the wrong permissions. Make sure that it can do all the following actions:\n- Manage Messages\n- Embed Links\n- Attach Files");
                });

            channel.send(embed)
                .catch(e => {
                    if (e.code !== 50013) return channel.send("The packed players are stored to your club and duplicates has been quick-sold.\nSomething just went wrong with the opening.");

                    return channel.send("The packed players are stored to your club and duplicates has been quick-sold.\nIt looks like the bot has the wrong permissions. Make sure that it can do all the following actions:\n- Manage Messages\n- Embed Links\n- Attach Files");
                });
        })
        .catch(e => {
            if (e.code !== 50013) return channel.send("The packed players are stored to your club and duplicates has been quick-sold.\nSomething just went wrong with the opening.");

            return channel.send("The packed players are stored to your club and duplicates has been quick-sold.\nIt looks like the bot has the wrong permissions. Make sure that it can do all the following actions:\n- Manage Messages\n- Embed Links\n- Attach Files");
        });
}