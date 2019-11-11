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
    getClubPlayer,
    getPlayerVersionById,
    getRarityName,
    getQuality,
    addClubPlayer,
    addCoinsToClub,
    removePlayerFromTransferpile,
    removePlayerFromClub,
    addTransferpilePlayer,
    nextCurrentBid,
    numberWithCommas,
    addAuctionPlayer,
    updateTransferPlayer
} from '../functions/general';
import {
    RichEmbed
} from 'discord.js';
import toTime from 'to-time';

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

    if (pCollection.length < 1) return channel.send(`No players are found with this criteria. Try again later... ${author}`);

    let pMenu;
    let mTemp2;
    let aPages;

    switch (choice) {
        case 1:
            count = (await getClubTransferpileCount(cInfo.id)).length;

            if (count < 1) return channel.send(`Your transferpile is empty man! ${author}.`);

            aPages = Math.ceil(count / 12);
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

    if (!message.guild) channel.send("In DM's no reactions could be removed by me. You need to remove those by yourself!");

    rFilter = (reaction, user) => user.id === author.id;
    const rCollector = mTemp.createReactionCollector(rFilter, {
        time: 30000
    });

    if (aPages > 1) {
        await mTemp.react("⏮")
            .then(r => r.message.react("⏪"))
            .then(r => r.message.react("⏩"))
            .then(r => r.message.react("⏭"));
    }

    rCollector.on('collect', async r => {
        switch (choice) {
            case 1:
                if (r.emoji.name === "⏭") {
                    count = (await getClubTransferpileCount(cInfo.id)).length;

                    if (count < 1) {
                        mTemp.edit(`Your transferpile is empty man! ${author}.`);
                        collector.stop();
                    }

                    aPages = Math.ceil(count / 12);

                    if (aPages <= page) return r.remove(author);

                    page = aPages;
                    pCollection = await getClubTransferpile(cInfo.id, page);

                    if (pCollection.length < 1) {
                        mTemp.edit(`Your transferpile is empty man! ${author}.`);
                        collector.stop();
                    }

                    pMenu = makeTransferMenu(pCollection, author, page, aPages, count);

                    await mTemp.edit(pMenu, {
                        code: true
                    });
                } else if (r.emoji.name === "⏩") {
                    count = (await getClubTransferpileCount(cInfo.id)).length;

                    if (count < 1) {
                        mTemp.edit(`Your transferpile is empty man! ${author}.`);
                        collector.stop();
                    }

                    aPages = Math.ceil(count / 12);

                    if (aPages <= page) return r.remove(author);

                    page++;
                    pCollection = await getClubTransferpile(cInfo.id, page);

                    if (pCollection.length < 1) {
                        mTemp.edit(`Your transferpile is empty man! ${author}.`);
                        collector.stop();
                    }

                    pMenu = makeTransferMenu(pCollection, author, page, aPages, count);

                    await mTemp.edit(pMenu, {
                        code: true
                    });
                } else if (r.emoji.name === "⏪") {
                    if (page <= 1) return;

                    count = (await getClubTransferpileCount(cInfo.id)).length;

                    if (count < 1) {
                        mTemp.edit(`Your transferpile is empty man! ${author}.`);
                        collector.stop();
                    }

                    page--;
                    aPages = Math.ceil(count / 12);
                    pCollection = await getClubTransferpile(cInfo.id, page);

                    if (pCollection.length < 1) {
                        mTemp.edit(`Your transferpile is empty man! ${author}.`);
                        collector.stop();
                    }

                    pMenu = makeTransferMenu(pCollection, author, page, aPages, count);

                    await mTemp.edit(pMenu, {
                        code: true
                    });
                } else if (r.emoji.name === "⏮") {
                    if (page <= 1) return;

                    count = (await getClubTransferpileCount(cInfo.id)).length;

                    if (count < 1) {
                        mTemp.edit(`Your transferpile is empty man! ${author}.`);
                        collector.stop();
                    }

                    aPages = Math.ceil(count / 12);
                    page = 1;
                    pCollection = await getClubTransferpile(cInfo.id, page);

                    if (pCollection.length < 1) {
                        mTemp.edit(`Your transferpile is empty man! ${author}.`);
                        collector.stop();
                    }

                    pMenu = makeTransferMenu(pCollection, author, page, aPages, count);

                    await mTemp.edit(pMenu, {
                        code: true
                    });
                }
                break;
            case 2:
                if (r.emoji.name === "⏭") {
                    if (mPlayerName.content !== "" && mPlayerName.content !== "-") {
                        count = (await getClubCollectionCount(cInfo.id, mPlayerName.content)).length;
                    } else {
                        count = (await getClubCollectionCount(cInfo.id)).length;
                    }

                    if (count < 1) {
                        mTemp.edit(`Your club is empty man! Open some packs ${author}.`);
                        collector.stop();
                    }

                    aPages = Math.ceil(count / 18);

                    if (aPages <= page) return r.remove(author);

                    page = aPages;

                    if (mPlayerName.content !== "" && mPlayerName.content !== "-") {
                        pCollection = await getClubCollection(cInfo.id, page, mPlayerName.content);
                    } else {
                        pCollection = await getClubCollection(cInfo.id, page);
                    }

                    if (pCollection.length < 1) {
                        mTemp.edit(`Your club is empty man! Open some packs ${author}.`);
                        collector.stop();
                    }

                    pMenu = makeClubMenu(pCollection, author, page, aPages);

                    await mTemp.edit(pMenu, {
                        code: true
                    });
                } else if (r.emoji.name === "⏩") {
                    if (mPlayerName.content !== "" && mPlayerName.content !== "-") {
                        count = (await getClubCollectionCount(cInfo.id, mPlayerName.content)).length;
                    } else {
                        count = (await getClubCollectionCount(cInfo.id)).length;
                    }

                    if (count < 1) {
                        mTemp.edit(`Your club is empty man! Open some packs ${author}.`);
                        collector.stop();
                    }

                    aPages = Math.ceil(count / 18);

                    if (aPages <= page) return r.remove(author);

                    page++;

                    if (mPlayerName.content !== "" && mPlayerName.content !== "-") {
                        pCollection = await getClubCollection(cInfo.id, page, mPlayerName.content);
                    } else {
                        pCollection = await getClubCollection(cInfo.id, page);
                    }

                    if (pCollection.length < 1) {
                        mTemp.edit(`Your club is empty man! Open some packs ${author}.`);
                        collector.stop();
                    }

                    pMenu = makeClubMenu(pCollection, author, page, aPages);

                    await mTemp.edit(pMenu, {
                        code: true
                    });
                } else if (r.emoji.name === "⏪") {
                    if (page <= 1) return;

                    if (mPlayerName.content !== "" && mPlayerName.content !== "-") {
                        count = (await getClubCollectionCount(cInfo.id, mPlayerName.content)).length;
                    } else {
                        count = (await getClubCollectionCount(cInfo.id)).length;
                    }

                    if (count < 1) {
                        mTemp.edit(`Your club is empty man! Open some packs ${author}.`);
                        collector.stop();
                    }

                    page--;
                    aPages = Math.ceil(count / 18);

                    if (mPlayerName.content !== "" && mPlayerName.content !== "-") {
                        pCollection = await getClubCollection(cInfo.id, page, mPlayerName.content);
                    } else {
                        pCollection = await getClubCollection(cInfo.id, page);
                    }

                    if (pCollection.length < 1) {
                        mTemp.edit(`Your club is empty man! Open some packs ${author}.`);
                        collector.stop();
                    }

                    pMenu = makeClubMenu(pCollection, author, page, aPages);

                    await mTemp.edit(pMenu, {
                        code: true
                    });
                } else if (r.emoji.name === "⏮") {
                    if (page <= 1) return;

                    if (mPlayerName.content !== "" && mPlayerName.content !== "-") {
                        count = (await getClubCollectionCount(cInfo.id, mPlayerName.content)).length;
                    } else {
                        count = (await getClubCollectionCount(cInfo.id)).length;
                    }

                    if (count < 1) {
                        mTemp.edit(`Your club is empty man! Open some packs ${author}.`);
                        collector.stop();
                    }

                    aPages = Math.ceil(count / 18);
                    page = 1;

                    if (mPlayerName.content !== "" && mPlayerName.content !== "-") {
                        pCollection = await getClubCollection(cInfo.id, page, mPlayerName.content);
                    } else {
                        pCollection = await getClubCollection(cInfo.id, page);
                    }

                    if (pCollection.length < 1) {
                        mTemp.edit(`Your club is empty man! Open some packs ${author}.`);
                        collector.stop();
                    }

                    pMenu = makeClubMenu(pCollection, author, page, aPages);

                    await mTemp.edit(pMenu, {
                        code: true
                    });
                }
                break;
        }

        if (message.guild) r.remove(author)
            .catch(e => {

            });
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
    let b = "\n:three: List to transfer market";

    switch (choice) {
        case 1:
            place = "Transferpile";
            a = "Send to club";
            break;
        case 2:
            place = "Club";
            a = "Send to transferpile";
            break;
    }

    const playerInfo = await getPlayerVersionById(pPlayer.player_id);
    const min_price = playerInfo.min_price;
    const playerCard = await makePlayerCard(playerInfo);
    const playerName = playerInfo.meta_info.common_name ? playerInfo.meta_info.common_name : `${playerInfo.meta_info.first_name} ${playerInfo.meta_info.last_name}`;
    let pEmbed = new RichEmbed()
        .setTimestamp()
        .attachFile(playerCard)
        .setImage("attachment://card.png")
        .setTitle(`You have choosen ${playerName} his card.`)
        .setDescription(`Version: ${getRarityName(`${playerInfo.rareflag}-${getQuality(playerInfo.rating)}`) ? getRarityName(`${playerInfo.rareflag}-${getQuality(playerInfo.rating)}`) : "Unknown"}\nCurrent place: ${place}\n\nReact at this message with some choosen emojis.\n:one: Quick-sell (${playerInfo.min_price} coins)\n:two: ${a}${b}\n\nAfter 30 seconds without any response this request is going to be closed.`)
        .setFooter(`FUTPackBot v.1.0.0 | Made by Tjird#0001`, "https://tjird.nl/futbot.jpg");

    await channel.send(pEmbed)
        .then(m => mTemp2 = m)
        .then(() => mTemp2.react("\u0031\u20E3"))
        .then(() => mTemp2.react("\u0032\u20E3"))
        .then(() => mTemp2.react("\u0033\u20E3"));

    switch (choice) {
        case 1:
            rFilter = (reaction, user) => (reaction.emoji.identifier === '1%E2%83%A3' || reaction.emoji.identifier === '2%E2%83%A3' || reaction.emoji.identifier === '3%E2%83%A3') && user.id === author.id;
            await setDialogueReactions(rFilter, mTemp2, 30000)
                .then(async r => {
                    switch (r.emoji.identifier) {
                        case "1%E2%83%A3":
                            if (await getTransferpilePlayerById(cInfo.id, pPlayer.id) == null) return channel.send(`Player couldn't be found. Try again... ${author}`);

                            await removePlayerFromTransferpile(cInfo.id, pPlayer.id)
                                .then(async () => {
                                    await addCoinsToClub(cInfo.id, playerInfo.min_price)
                                        .then(() => channel.send(`${playerName} is successfully quick-sold for ${playerInfo.min_price} coins! ${author}`));
                                });

                            break;
                        case "2%E2%83%A3":
                            if (await getTransferpilePlayerById(cInfo.id, pPlayer.id) == null) return channel.send(`Player couldn't be found. Try again... ${author}`);
                            if (await getClubPlayer(cInfo.id, pPlayer.player_id) !== null) return channel.send(`Player can't be added to your club. The same version is already in your club. ${author}`);

                            await removePlayerFromTransferpile(cInfo.id, pPlayer.id)
                                .then(async () => {
                                    await addClubPlayer(cInfo.id, pPlayer.player_id)
                                        .then(() => channel.send(`${playerName} is successfully moved to your club! ${author}`));
                                });

                            break;
                        case "3%E2%83%A3":
                            if (await getTransferpilePlayerById(cInfo.id, pPlayer.id) == null) return channel.send(`Player couldn't be found. Try again... ${author}`);

                            let tId = pPlayer.id
                            let iBuy_now;
                            let iStart_price;
                            let iEnd_timestamp;

                            await channel.send(`Type the start price of you player auction. ${author}\nIt needs to be equal or higher then the minimum price(${numberWithCommas(min_price)}). Only **NUMBERS** are allowed.\nAfter 30 seconds without any response this request is going to be closed.`)
                                .then(m => mTemp = m);

                            await setDialogue(mFilter, channel, 30000)
                                .then(m => iStart_price = m)
                                .then(() => iStart_price.delete())
                                .then(() => mTemp.delete())
                                .catch(e => {
                                    iStart_price.delete();
                                    mTemp.delete();
                                    channel.send(`No response has been given. Request is no closed ${author}.`);
                                });

                            if (!iStart_price) return;

                            iStart_price = iStart_price.content;

                            if (!iStart_price.isNumber()) return channel.send(`Only numbers are allowed as said before... You need to start all over again. ${author}`);

                            iStart_price = nextCurrentBid(iStart_price);

                            if (iStart_price >= 15000000) return channel.send(`Start price can't be equal or higher then 15 miliieeee. You need to start all over again. ${author}`);
                            if (iStart_price < min_price) return channel.send(`Start price must be equal or higher then minimum price(${numberWithCommas(min_price)}). You need to start all over again. ${author}`);

                            await channel.send(`Type the buy now of you player auction. ${author}\nIt needs to be higher then the start price(${numberWithCommas(iStart_price)}). Only **NUMBERS** are allowed.\nAfter 30 seconds without any response this request is going to be closed.`)
                                .then(m => mTemp = m);

                            await setDialogue(mFilter, channel, 30000)
                                .then(m => iBuy_now = m)
                                .then(() => iBuy_now.delete())
                                .then(() => mTemp.delete())
                                .catch(e => {
                                    iBuy_now.delete();
                                    mTemp.delete();
                                    channel.send(`No response has been given. Request is no closed ${author}.`);
                                });

                            if (!iBuy_now) return;

                            iBuy_now = iBuy_now.content;

                            if (!iBuy_now.isNumber()) return channel.send(`Only numbers are allowed as said before... You need to start all over again. ${author}`);

                            iBuy_now = nextCurrentBid(iBuy_now);

                            if (iBuy_now > 15000000) return channel.send(`Buy now can't be higher then 15 miliieeee. You need to start all over again. ${author}`);
                            if (iBuy_now <= iStart_price) return channel.send(`Buy now can't be equal or lower then start price(${numberWithCommas(iStart_price)}). You need to start all over again. ${author}`);

                            let pEmbed = new RichEmbed()
                                .setFooter(`FUTPackBot v.1.0.0 | Made by Tjird#0001`, "https://tjird.nl/futbot.jpg")
                                .setTitle("Choose time duration menu")
                                .setDescription(`React with wanted time duration for your auction. ${author}\nAfter 30 seconds without any response this request is going to be closed.\n\n:one: 1 hour\n:two: 3 hours\n:three: 6 hours\n:four: 12 hours\n:five: 1 day\n:six: 3 days`);

                            await channel.send(pEmbed)
                                .then(m => mTemp = m)
                                .then(() => mTemp.react("\u0031\u20E3"))
                                .then(() => mTemp.react("\u0032\u20E3"))
                                .then(() => mTemp.react("\u0033\u20E3"))
                                .then(() => mTemp.react("\u0034\u20E3"))
                                .then(() => mTemp.react("\u0035\u20E3"))
                                .then(() => mTemp.react("\u0036\u20E3"));

                            rFilter = (reaction, user) => (reaction.emoji.identifier === '1%E2%83%A3' || reaction.emoji.identifier === '2%E2%83%A3' || reaction.emoji.identifier === '3%E2%83%A3' || reaction.emoji.identifier === '4%E2%83%A3' || reaction.emoji.identifier === '5%E2%83%A3' || reaction.emoji.identifier === '6%E2%83%A3') && user.id === author.id;
                            await setDialogueReactions(rFilter, mTemp, 30000)
                                .then(r => {
                                    switch (r.emoji.identifier) {
                                        case "1%E2%83%A3":
                                            iEnd_timestamp = 3600000;
                                            break;
                                        case "2%E2%83%A3":
                                            iEnd_timestamp = 10800000;
                                            break;
                                        case "3%E2%83%A3":
                                            iEnd_timestamp = 21600000;
                                            break;
                                        case "4%E2%83%A3":
                                            iEnd_timestamp = 43200000;
                                            break;
                                        case "5%E2%83%A3":
                                            iEnd_timestamp = 86400000;
                                            break;
                                        case "6%E2%83%A3":
                                            iEnd_timestamp = 259200000;
                                            break;
                                    }
                                })
                                .then(() => mTemp.delete())
                                .catch(e => {
                                    mTemp.delete();
                                    channel.send(`No response has been given. Request is no closed ${author}.`);
                                });

                            if (!iEnd_timestamp) return;
                            if (!await getTransferpilePlayerById(cInfo.id, tId) || await getTransferpilePlayerById(cInfo.id, tId) == null) return channel.send(`Player couldn't be found in your transferpile. ${author}`);

                            const aId = await addAuctionPlayer(cInfo.id, playerInfo.id, iEnd_timestamp, iBuy_now, iStart_price);

                            updateTransferPlayer(tId, aId.id)
                                .then(() => channel.send(`Player has been listed to the transfer market! ${author}\nStart price: ${iStart_price}\nBuy now: ${iBuy_now}\nTime duration: ${(toTime.fromMilliseconds(iEnd_timestamp)).humanize()}`));

                            break;
                    }
                })
                .then(() => mTemp2.delete())
                .catch(e => channel.send(`${author} your request has been called because no response has given.`));
            break;
        case 2:
            rFilter = (reaction, user) => (reaction.emoji.identifier === '1%E2%83%A3' || reaction.emoji.identifier === '2%E2%83%A3' || reaction.emoji.identifier === '3%E2%83%A3') && user.id === author.id;
            await setDialogueReactions(rFilter, mTemp2, 30000)
                .then(async r => {
                    switch (r.emoji.identifier) {
                        case "1%E2%83%A3":
                            if (await getClubPlayerById(cInfo.id, pPlayer.id) == null) return channel.send(`Player couldn't be found. Try again... ${author}`);

                            await removePlayerFromClub(cInfo.id, pPlayer.id)
                                .then(async () => {
                                    await addCoinsToClub(cInfo.id, playerInfo.min_price)
                                        .then(() => channel.send(`${playerName} is successfully quick-sold for ${playerInfo.min_price} coins! ${author}`));
                                });

                            break;
                        case "2%E2%83%A3":
                            if (await getClubPlayerById(cInfo.id, pPlayer.id) == null) return channel.send(`Player couldn't be found. Try again... ${author}`);
                            if ((await getClubTransferpileCount(cInfo.id)).length > 99) return channel.send(`Player isn't able to be moved to your transferpile. Your transferpile has reached his max... ${author}`);

                            await removePlayerFromClub(cInfo.id, pPlayer.id)
                                .then(async () => {
                                    await addTransferpilePlayer(cInfo.id, pPlayer.player_id)
                                        .then(() => channel.send(`${playerName} is successfully moved to your transferpile! ${author}`));
                                });

                            break;
                        case "3%E2%83%A3":
                            if (await getClubPlayerById(cInfo.id, pPlayer.id) == null) return channel.send(`Player couldn't be found. Try again... ${author}`);
                            if ((await getClubTransferpileCount(cInfo.id)).length > 99) return channel.send(`Player isn't able to be moved to your transferpile. Your transferpile has reached his max... ${author}`);

                            let tId;

                            await removePlayerFromClub(cInfo.id, pPlayer.id)
                                .then(async () => {
                                    await addTransferpilePlayer(cInfo.id, pPlayer.player_id)
                                        .then(id => {
                                            tId = id.id;
                                            channel.send(`${playerName} is successfully moved to your transferpile! ${author}`)
                                                .then(m => m.delete(4000));
                                        });
                                });

                            let iBuy_now;
                            let iStart_price;
                            let iEnd_timestamp;

                            await channel.send(`Type the start price of you player auction. ${author}\nIt needs to be equal or higher then the minimum price(${numberWithCommas(min_price)}). Only **NUMBERS** are allowed.\nAfter 30 seconds without any response this request is going to be closed.`)
                                .then(m => mTemp = m);

                            await setDialogue(mFilter, channel, 30000)
                                .then(m => iStart_price = m)
                                .then(() => iStart_price.delete())
                                .then(() => mTemp.delete())
                                .catch(e => {
                                    iStart_price.delete();
                                    mTemp.delete();
                                    channel.send(`No response has been given. Request is no closed ${author}.`);
                                });


                            if (!iStart_price) return;

                            iStart_price = iStart_price.content;

                            if (!iStart_price.isNumber()) return channel.send(`Only numbers are allowed as said before... You need to start all over again. ${author}`);

                            iStart_price = nextCurrentBid(iStart_price);

                            if (iStart_price >= 15000000) return channel.send(`Start price can't be equal or higher then 15 miliieeee. You need to start all over again. ${author}`);
                            if (iStart_price < min_price) return channel.send(`Start price must be equal or higher then minimum price(${numberWithCommas(min_price)}). You need to start all over again. ${author}`);

                            await channel.send(`Type the buy now of you player auction. ${author}\nIt needs to be higher then the start price(${numberWithCommas(iStart_price)}). Only **NUMBERS** are allowed.\nAfter 30 seconds without any response this request is going to be closed.`)
                                .then(m => mTemp = m);

                            await setDialogue(mFilter, channel, 30000)
                                .then(m => iBuy_now = m)
                                .then(() => iBuy_now.delete())
                                .then(() => mTemp.delete())
                                .catch(e => {
                                    iBuy_now.delete();
                                    mTemp.delete();
                                    channel.send(`No response has been given. Request is no closed ${author}.`);
                                });

                            if (!iBuy_now) return;

                            iBuy_now = iBuy_now.content;

                            if (!iBuy_now.isNumber()) return channel.send(`Only numbers are allowed as said before... You need to start all over again. ${author}`);

                            iBuy_now = nextCurrentBid(iBuy_now);

                            if (iBuy_now > 15000000) return channel.send(`Buy now can't be higher then 15 miliieeee. You need to start all over again. ${author}`);
                            if (iBuy_now <= iStart_price) return channel.send(`Buy now can't be equal or lower then start price(${numberWithCommas(iStart_price)}). You need to start all over again. ${author}`);

                            let pEmbed = new RichEmbed()
                                .setFooter(`FUTPackBot v.1.0.0 | Made by Tjird#0001`, "https://tjird.nl/futbot.jpg")
                                .setTitle("Choose time duration menu")
                                .setDescription(`React with wanted time duration for your auction. ${author}\nAfter 30 seconds without any response this request is going to be closed.\n\n:one: 1 hour\n:two: 3 hours\n:three: 6 hours\n:four: 12 hours\n:five: 1 day\n:six: 3 days`);

                            await channel.send(pEmbed)
                                .then(m => mTemp = m)
                                .then(() => mTemp.react("\u0031\u20E3"))
                                .then(() => mTemp.react("\u0032\u20E3"))
                                .then(() => mTemp.react("\u0033\u20E3"))
                                .then(() => mTemp.react("\u0034\u20E3"))
                                .then(() => mTemp.react("\u0035\u20E3"))
                                .then(() => mTemp.react("\u0036\u20E3"));


                            rFilter = (reaction, user) => (reaction.emoji.identifier === '1%E2%83%A3' || reaction.emoji.identifier === '2%E2%83%A3' || reaction.emoji.identifier === '3%E2%83%A3' || reaction.emoji.identifier === '4%E2%83%A3' || reaction.emoji.identifier === '5%E2%83%A3' || reaction.emoji.identifier === '6%E2%83%A3') && user.id === author.id;
                            await setDialogueReactions(rFilter, mTemp, 30000)
                                .then(r => {
                                    switch (r.emoji.identifier) {
                                        case "1%E2%83%A3":
                                            iEnd_timestamp = 3600000;
                                            break;
                                        case "2%E2%83%A3":
                                            iEnd_timestamp = 10800000;
                                            break;
                                        case "3%E2%83%A3":
                                            iEnd_timestamp = 21600000;
                                            break;
                                        case "4%E2%83%A3":
                                            iEnd_timestamp = 43200000;
                                            break;
                                        case "5%E2%83%A3":
                                            iEnd_timestamp = 86400000;
                                            break;
                                        case "6%E2%83%A3":
                                            iEnd_timestamp = 259200000;
                                            break;
                                    }
                                })
                                .then(() => mTemp.delete())
                                .catch(e => {
                                    mTemp.delete();
                                    channel.send(`No response has been given. Request is no closed ${author}.`);
                                });

                            if (!iEnd_timestamp) return;
                            if (!await getTransferpilePlayerById(cInfo.id, tId) || await getTransferpilePlayerById(cInfo.id, tId) == null) return channel.send(`Player couldn't be found in your transferpile. ${author}`);

                            const aId = await addAuctionPlayer(cInfo.id, playerInfo.id, iEnd_timestamp, iBuy_now, iStart_price);

                            updateTransferPlayer(tId, aId.id)
                                .then(() => channel.send(`Player has been listed to the transfer market! ${author}\nStart price: ${iStart_price}\nBuy now: ${iBuy_now}\nTime duration: ${(toTime.fromMilliseconds(iEnd_timestamp)).humanize()}`));

                            break;
                    }
                })
                .then(() => mTemp2.delete())
                .catch(e => channel.send(`${author} your request has been called because no response has given.`));
            break;
    }

}

String.prototype.isNumber = function () {
    return /^\d+$/.test(this);
}