import { getClubCollection, getUserClubId, getClubCollectionCount, makeClubMenu } from '../functions/general';

exports.run = async (client, message, args) => {
    let page = 1;

    const channel = message.channel;
    const author = message.author;
    const cInfo = await getUserClubId(author.id);

    let aPlayers = (await getClubCollectionCount(cInfo.id)).length;

    if (aPlayers < 1) return channel.send(`Your club is empty man! Open some packs ${author}.`);

    let cPlayers = await getClubCollection(cInfo.id, page);

    if (cPlayers.length < 1) return channel.send(`Your club is empty man! Open some packs ${author}.`);

    let aPages = Math.ceil(aPlayers / 18);
    let aMenu = makeClubMenu(cPlayers, author, page, aPages);

    let pMessage;

    await channel.send(aMenu, {
        code: true
    })
        .then(m => pMessage = m)
        .catch(e => {
            console.log(e);
            return channel.send(`An error has occurred for ${author} his/her request.`);
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
            aPlayers = (await getClubCollectionCount(cInfo.id)).length;

            if (aPlayers < 1) {
                pMessage.edit(`Your club is empty man! Open some packs ${author}.`);
                collector.stop();
            }

            aPages = Math.ceil(aPlayers / 18);

            if (aPages <= page) return r.remove(author);

            page = aPages;
            cPlayers = await getClubCollection(cInfo.id, page);

            if (cPlayers.length < 1) {
                pMessage.edit(`Your club is empty man! Open some packs ${author}.`);
                collector.stop();
            }

            aMenu = makeClubMenu(cPlayers, author, page, aPages);

            await pMessage.edit(aMenu, {
                code: true
            });
        } else if (r.emoji.name === "⏩") {
            aPlayers = (await getClubCollectionCount(cInfo.id)).length;

            if (aPlayers < 1) {
                pMessage.edit(`Your club is empty man! Open some packs ${author}.`);
                collector.stop();
            }

            aPages = Math.ceil(aPlayers / 18);

            if (aPages <= page) return r.remove(author);

            page++;
            cPlayers = await getClubCollection(cInfo.id, page);

            if (cPlayers.length < 1) {
                pMessage.edit(`Your club is empty man! Open some packs ${author}.`);
                collector.stop();
            }

            aMenu = makeClubMenu(cPlayers, author, page, aPages);

            await pMessage.edit(aMenu, {
                code: true
            });
        } else if (r.emoji.name === "⏪") {
            if (page <= 1) return;

            aPlayers = (await getClubCollectionCount(cInfo.id)).length;

            if (aPlayers < 1) {
                pMessage.edit(`Your club is empty man! Open some packs ${author}.`);
                collector.stop();
            }

            page--;
            aPages = Math.ceil(aPlayers / 18);
            cPlayers = await getClubCollection(cInfo.id, page);

            if (cPlayers.length < 1) {
                pMessage.edit(`Your club is empty man! Open some packs ${author}.`);
                collector.stop();
            }

            aMenu = makeClubMenu(cPlayers, author, page, aPages);

            await pMessage.edit(aMenu, {
                code: true
            });
        } else if (r.emoji.name === "⏮") {
            if (page <= 1) return;

            aPlayers = (await getClubCollectionCount(cInfo.id)).length;

            if (aPlayers < 1) {
                pMessage.edit(`Your club is empty man! Open some packs ${author}.`);
                collector.stop();
            }

            aPages = Math.ceil(aPlayers / 18);
            page = 1;
            cPlayers = await getClubCollection(cInfo.id, page);

            if (cPlayers.length < 1) {
                pMessage.edit(`Your club is empty man! Open some packs ${author}.`);
                collector.stop();
            }

            aMenu = makeClubMenu(cPlayers, author, page, aPages);

            await pMessage.edit(aMenu, {
                code: true
            });
        }

        r.remove(author);
    });

}