import { Redis } from "ioredis";
import { getActiveAuctions, makeAuctionMenu, getUserClubId, getCurrentAuctionsCount } from '../functions/general';

// const redis = new Redis(6379, "futbot-redis-1", {
//     reconnectOnError: function (err) {
//         var targetError = "READONLY";
//         if (err.message.slice(0, targetError.length) === targetError) {
//             // Only reconnect when the error starts with "READONLY"
//             return true; // or `return 1;`
//         }
//     }
// });

exports.run = async (client, message, args) => {
    let page = 1;

    const channel = message.channel;
    const author = message.author;
    const cInfo = await getUserClubId(author.id);

    let aAuctions = (await getCurrentAuctionsCount(cInfo.id)).auctions;

    if (aAuctions < 1) return channel.send(`No active auctions were found ${author}.`);

    let cuAuctions = await getActiveAuctions(cInfo.id, page);

    if (cuAuctions.length < 1) return channel.send(`No active auctions were found ${author}.`);

    let aPages = Math.ceil(aAuctions / 16);
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
    const collector = pMessage.createReactionCollector(filter, { time: 180000 });

    collector.on('collect', async r => {
        if (r.emoji.name === "⏭") {
            aAuctions = (await getCurrentAuctionsCount(cInfo.id)).auctions;

            if (aAuctions < 1) {
                pMessage.edit(`No active auctions were found ${author}. Try searching again with the correct command.`);
                collector.stop();
            }

            aPages = Math.ceil(aAuctions / 16);

            if (aPages <= page) return;

            page = aPages;
            cuAuctions = await getActiveAuctions(cInfo.id, page);

            if (cuAuctions.length < 1) {
                pMessage.edit(`No active auctions were found ${author}. Try searching again with the correct command.`);
                collector.stop();
            }

            aMenu = makeAuctionMenu(cuAuctions, author, page, aPages);

            await pMessage.edit(aMenu, {
                code: true
            });
        } else if (r.emoji.name === "⏩") {
            aAuctions = (await getCurrentAuctionsCount(cInfo.id)).auctions;

            if (aAuctions < 1) {
                pMessage.edit(`No active auctions were found ${author}. Try searching again with the correct command.`);
                collector.stop();
            }

            aPages = Math.ceil(aAuctions / 16);

            if (aPages <= page) return;

            page++;
            cuAuctions = await getActiveAuctions(cInfo.id, page);

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

            aAuctions = (await getCurrentAuctionsCount(cInfo.id)).auctions;

            if (aAuctions < 1) {
                pMessage.edit(`No active auctions were found ${author}. Try searching again with the correct command.`);
                collector.stop();
            }

            page = 1;
            aPages = Math.ceil(aAuctions / 16);
            cuAuctions = await getActiveAuctions(cInfo.id, page);

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

            aAuctions = (await getCurrentAuctionsCount(cInfo.id)).auctions;

            if (aAuctions < 1) {
                pMessage.edit(`No active auctions were found ${author}. Try searching again with the correct command.`);
                collector.stop();
            }

            page--;
            aPages = Math.ceil(aAuctions / 16);
            cuAuctions = await getActiveAuctions(cInfo.id, page);

            if (cuAuctions.length < 1) {
                pMessage.edit(`No active auctions were found ${author}. Try searching again with the correct command.`);
                collector.stop();
            }

            aMenu = makeAuctionMenu(cuAuctions, author, page, aPages);

            await pMessage.edit(aMenu, {
                code: true
            });
        }

        r.remove(author);
    });

}