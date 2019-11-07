import {
    getUserClubId,
    setDialogueReactions,
    getClubTransferpileCount,
    getClubCollectionCount,
    setDialogue,
    getClubCollection,
    getClubTransferpile,
    makeClubMenu,
    makeTransferMenu,
    getTransferpilePlayerById,
    getClubPlayerById,
    makePlayerCard,
    getPlayerVersionById,
    getRarityName,
    getQuality
} from '../functions/general';
import { RichEmbed } from 'discord.js'

exports.run = async (client, message, args) => {
    const transferpile = [
        "t",
        "tp",
        "transferp",
        "transfers",
        "transfer",
        "transferpile",
        "transferspile"
    ];
    const club = [
        "c",
        "club",
        "clubs",
        "players"
    ];

    let choice;

    if ((args[0] && args[0] !== undefined) && transferpile.includes(args[0])) {
        choice = 1;
    } else if ((args[0] && args[0] !== undefined) && club.includes(args[0])) {
        choice = 2;
    } else {
        choice = 0;
    }

    const author = message.author;
    const channel = message.channel;

    let mTemp;
    let rFilter;
    let count;

    if (choice === 0) {
        await channel.send(`From where you want to select a player. ${author}\n\n:one: Club\n:two: Transferpile\n\n*In 30 seconds this request is being closed if no answer is given.*`)
            .then(m => mTemp = m)
            .then(() => mTemp.react("\u0031\u20E3"))
            .then(() => mTemp.react("\u0032\u20E3"));

        rFilter = (reaction, user) => (reaction.emoji.identifier === '1%E2%83%A3' || reaction.emoji.identifier === '2%E2%83%A3') && user.id === author.id;
        await setDialogueReactions(rFilter, mTemp, 30000)
            .then(r => {
                switch (r.emoji.identifier) {
                    case "1%E2%83%A3":
                        choice = 2;
                        break;
                    case "2%E2%83%A3":
                        choice = 1;
                        break;
                }
            })
            .then(() => mTemp.delete())
            .catch(e => channel.send(`${author} your request has been called because no response has given.`));

        if (choice === 0) return;
    }

    const cInfo = await getUserClubId(author.id);

    switch (choice) {
        case 1:
            count = (await getClubTransferpileCount(cInfo.id)).length;
            if (count < 1) return channel.send(`Your transferpile is empty man! ${author}.`);
            break;
        case 2:
            count = (await getClubCollectionCount(cInfo.id)).length;
            if (count < 1) return channel.send(`Your club is empty man! Open some packs ${author}.`);
            break;
    }

    channel.send(`Put in a (part of the) playername you want to search. ${author}\nIf you want all results, put in a '-' or say 30 seconds nothing.`)
        .then(m => mTemp = m);

    let mFilter = m => m.author.id === author.id;
    let mPlayerName;
    let pCollection;
    let page = 1;

    await setDialogue(mFilter, channel, 30000)
        .then(m => mPlayerName = m)
        .then(() => mPlayerName.delete())
        .then(() => mTemp.delete())
        .catch(e => mPlayerName = "");

    if (mPlayerName.content !== "" && mPlayerName.content !== "-") {
        switch (choice) {
            case 1:
                pCollection = await getClubTransferpile(cInfo.id, page, mPlayerName.content);
                break;
            case 2:
                pCollection = await getClubCollection(cInfo.id, page, mPlayerName.content);
                break;
        }
    } else {
        switch (choice) {
            case 1:
                pCollection = await getClubTransferpile(cInfo.id, page);
                break;
            case 2:
                pCollection = await getClubCollection(cInfo.id, page);
                break;
        }
    }

    let pMenu;
    let mTemp2;
    let aPages;

    switch (choice) {
        case 1:
            count = (await getClubTransferpileCount(cInfo.id)).length;

            if (count < 1) return channel.send(`Your transferpile is empty man! ${author}.`);

            aPages = Math.ceil(count / 18);
            pMenu = await makeTransferMenu(pCollection, author, page, aPages, count);
            break;
        case 2:
            count = (await getClubCollectionCount(cInfo.id)).length;

            if (count < 1) return channel.send(`Your club is empty man! Open some packs ${author}.`);

            aPages = Math.ceil(count / 18);
            pMenu = await makeClubMenu(pCollection, author, page, aPages);
            break;
    }

    await channel.send(pMenu, {
        code: true
    })
        .then(m => mTemp = m)
        .then(() => {
            channel.send(`Type the **ID** your player you want to select. ${author}\nIf the player is at the transfer market, you can do nothing with him.\nAfter 30 seconds without any response this request is going to be closed.`)
                .then(m => mTemp2 = m);
        });

    rFilter = (reaction, user) => user.id === author.id;
    const rCollector = mTemp.createReactionCollector(rFilter, { time: 30000 });

    rCollector.on('collect', async r => {

    });

    let pPlayer = false;

    await setDialogue(mFilter, channel, 30000)
        .then(m => pPlayer = m)
        .then(() => rCollector.stop())
        .then(() => pPlayer.delete())
        .then(() => mTemp.delete())
        .then(() => mTemp2.delete())
        .catch(e => channel.send(`No response has been given. Request is no closed ${author}.`));

    if (!pPlayer) return;

    switch (choice) {
        case 1:
            pPlayer = await getTransferpilePlayerById(cInfo.id, pPlayer.content);
            break;
        case 2:
            pPlayer = await getClubPlayerById(cInfo.id, pPlayer.content);
            break;
    }

    if (pPlayer === null) return channel.send(`Player couldn't be found. Try again... ${author}`);
    if (choice === 1) {
        if (pPlayer.auction_info) return channel.send(`Player has an active auction. Wait for the auction to make actions at this player. ${author}`);
    }

    let place;
    let a;
    let b = "";

    switch (choice) {
        case 1:
            place = "Transferpile";
            a = "Send to club";
            b += "\n:three: List to transfer market";
            break;
        case 2:
            place = "Club";
            a = "Send to transferpile";
            break;
    }

    const playerInfo = await getPlayerVersionById(pPlayer.player_id);
    const playerCard = await makePlayerCard(playerInfo);
    const playerName = playerInfo.meta_info.common_name ? playerInfo.meta_info.common_name : `${playerInfo.meta_info.first_name} ${playerInfo.meta_info.last_name}`;
    const pEmbed = new RichEmbed()
        .setTimestamp()
        .attachFile(playerCard)
        .setImage("attachment://card.png")
        .setTitle(`You have choosen ${playerName} his card.`)
        .setDescription(`Version: ${getRarityName(`${playerInfo.rareflag}-${getQuality(playerInfo.rating)}`) ? getRarityName(`${playerInfo.rareflag}-${getQuality(playerInfo.rating)}`) : "Unknown"}\nCurrent place: ${place}\n\nReact at this message with some choosen emojis.\n:one: Quick-sell (${playerInfo.min_price} coins)\n:two: ${a}${b}`)
        .setFooter(`FUTPackBot v.1.0.0 | Made by Tjird#0001`, "https://tjird.nl/futbot.jpg");

    await channel.send(pEmbed)
        .then(m => mTemp = m)
        .then(() => mTemp.react("\u0031\u20E3"))
        .then(() => mTemp.react("\u0032\u20E3"))
        .then(() => {
            if (choice === 1) mTemp.react("\u0033\u20E3");
        });


}