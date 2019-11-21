import {
    getActiveAuctions,
    makeAuctionMenu,
    getUserClubId,
    getCurrentAuctionsCount
} from '../functions/general';

exports.run = async (client, message, args) => {
    let page = 1;

    const channel = message.channel;
    const author = message.author;

    const cInfo = await getUserClubId(author.id);

    let aAuctions;

    if (args.length > 0) {
        aAuctions = (await getCurrentAuctionsCount(cInfo.id, args.join(" "))).auctions;
    } else {
        aAuctions = (await getCurrentAuctionsCount(cInfo.id)).auctions;
    }

    if (aAuctions < 1) return channel.send(`No active auctions were found ${author}.`);

    let cuAuctions;

    if (args.length > 0) {
        cuAuctions = await getActiveAuctions(cInfo.id, page, args.join(" "));
    } else {
        cuAuctions = await getActiveAuctions(cInfo.id, page);
    }

    if (cuAuctions.length < 1) return channel.send(`No active auctions were found ${author}.`);

    let aPages = Math.ceil(aAuctions / 12);
    let aMenu = makeAuctionMenu(cuAuctions, author, page, aPages);

    let pMessage;

    await channel.send(aMenu, {
            code: true
        })
        .then(m => pMessage = m)
        .catch(e => {
            return channel.send(`An error has occurred for ${author} his/her request.`)
        });

    if (aPages < 2 || !pMessage) return;

    await pMessage.react("⏮")
        .then(r => r.message.react("⏪"))
        .then(r => r.message.react("⏩"))
        .then(r => r.message.react("⏭"));

    const filter = (reaction, user) => user.id === author.id;
    const collector = pMessage.createReactionCollector(filter, {
        time: 180000
    });

    if (!message.guild) channel.send("In DM's no reactions could be removed by me. You need to remove those by yourself!");

    collector.on('collect', async r => {
        if (r.emoji.name === "⏭") {
            if (args.length > 0) {
                aAuctions = (await getCurrentAuctionsCount(cInfo.id, args.join(" "))).auctions;
            } else {
                aAuctions = (await getCurrentAuctionsCount(cInfo.id)).auctions;
            }

            if (aAuctions < 1) {
                pMessage.edit(`No active auctions were found ${author}. Try searching again with the correct command.`);
                collector.stop();
            }

            aPages = Math.ceil(aAuctions / 12);

            if (aPages <= page) return;

            page = aPages;

            if (args.length > 0) {
                cuAuctions = await getActiveAuctions(cInfo.id, page, args.join(" "));
            } else {
                cuAuctions = await getActiveAuctions(cInfo.id, page);
            }

            if (cuAuctions.length < 1) {
                pMessage.edit(`No active auctions were found ${author}. Try searching again with the correct command.`);
                collector.stop();
            }

            aMenu = makeAuctionMenu(cuAuctions, author, page, aPages);

            await pMessage.edit(aMenu, {
                code: true
            });
        } else if (r.emoji.name === "⏩") {
            if (args.length > 0) {
                aAuctions = (await getCurrentAuctionsCount(cInfo.id, args.join(" "))).auctions;
            } else {
                aAuctions = (await getCurrentAuctionsCount(cInfo.id)).auctions;
            }

            if (aAuctions < 1) {
                pMessage.edit(`No active auctions were found ${author}. Try searching again with the correct command.`);
                collector.stop();
            }

            aPages = Math.ceil(aAuctions / 12);

            if (aPages <= page) return;

            page++;

            if (args.length > 0) {
                cuAuctions = await getActiveAuctions(cInfo.id, page, args.join(" "));
            } else {
                cuAuctions = await getActiveAuctions(cInfo.id, page);
            }

            if (cuAuctions.length < 1) {
                pMessage.edit(`No active auctions were found ${author}. Try searching again with the correct command.`);
                collector.stop();
            }

            aMenu = makeAuctionMenu(cuAuctions, author, page, aPages);

            await pMessage.edit(aMenu, {
                code: true
            });
        } else if (r.emoji.name === "⏮") {
            if (page <= 1) return;

            if (args.length > 0) {
                aAuctions = (await getCurrentAuctionsCount(cInfo.id, args.join(" "))).auctions;
            } else {
                aAuctions = (await getCurrentAuctionsCount(cInfo.id)).auctions;
            }

            if (aAuctions < 1) {
                pMessage.edit(`No active auctions were found ${author}. Try searching again with the correct command.`);
                collector.stop();
            }

            page = 1;
            aPages = Math.ceil(aAuctions / 12);

            if (args.length > 0) {
                cuAuctions = await getActiveAuctions(cInfo.id, page, args.join(" "));
            } else {
                cuAuctions = await getActiveAuctions(cInfo.id, page);
            }

            if (cuAuctions.length < 1) {
                pMessage.edit(`No active auctions were found ${author}. Try searching again with the correct command.`);
                collector.stop();
            }

            aMenu = makeAuctionMenu(cuAuctions, author, page, aPages);

            await pMessage.edit(aMenu, {
                code: true
            });
        } else if (r.emoji.name === "⏪") {
            if (page <= 1) return;

            if (args.length > 0) {
                aAuctions = (await getCurrentAuctionsCount(cInfo.id, args.join(" "))).auctions;
            } else {
                aAuctions = (await getCurrentAuctionsCount(cInfo.id)).auctions;
            }

            if (aAuctions < 1) {
                pMessage.edit(`No active auctions were found ${author}. Try searching again with the correct command.`);
                collector.stop();
            }

            page--;
            aPages = Math.ceil(aAuctions / 12);

            if (args.length > 0) {
                cuAuctions = await getActiveAuctions(cInfo.id, page, args.join(" "));
            } else {
                cuAuctions = await getActiveAuctions(cInfo.id, page);
            }

            if (cuAuctions.length < 1) {
                pMessage.edit(`No active auctions were found ${author}. Try searching again with the correct command.`);
                collector.stop();
            }

            aMenu = makeAuctionMenu(cuAuctions, author, page, aPages);

            await pMessage.edit(aMenu, {
                code: true
            });
        }

        if (message.guild) r.remove(author);
    });

}