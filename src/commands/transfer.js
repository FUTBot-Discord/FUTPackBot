import { getClubTransferpile, getUserClubId, getClubTransferpileCount, makeTransferMenu } from '../functions/general';

exports.run = async (client, message, args) => {
    let page = 1;

    const channel = message.channel;
    const author = message.author;
    const cInfo = await getUserClubId(author.id);

    let aPlayers = (await getClubTransferpileCount(cInfo.id)).length;

    if (aPlayers < 1) return channel.send(`Your transferpile is empty man! ${author}.`);

    let cPlayers = await getClubTransferpile(cInfo.id, page);

    if (cPlayers.length < 1) return channel.send(`Your transferpile is empty man! ${author}.`);

    let aPages = Math.ceil(aPlayers / 18);
    let aMenu = makeTransferMenu(cPlayers, author, page, aPages, aPlayers);

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

    if (!message.guild) channel.send("In DM's no reactions could be removed by me. You need to remove those by yourself!");

    collector.on('collect', async r => {
        if (r.emoji.name === "⏭") {
            aPlayers = (await getClubTransferpileCount(cInfo.id)).length;

            if (aPlayers < 1) {
                pMessage.edit(`Your transferpile is empty man! ${author}.`);
                collector.stop();
            }

            aPages = Math.ceil(aPlayers / 12);

            if (aPages <= page) return r.remove(author);

            page = aPages;
            cPlayers = await getClubTransferpile(cInfo.id, page);

            if (cPlayers.length < 1) {
                pMessage.edit(`Your transferpile is empty man! ${author}.`);
                collector.stop();
            }

            aMenu = makeTransferMenu(cPlayers, author, page, aPages, aPlayers);

            await pMessage.edit(aMenu, {
                code: true
            });
        } else if (r.emoji.name === "⏩") {
            aPlayers = (await getClubTransferpileCount(cInfo.id)).length;

            if (aPlayers < 1) {
                pMessage.edit(`Your transferpile is empty man! ${author}.`);
                collector.stop();
            }

            aPages = Math.ceil(aPlayers / 12);

            if (aPages <= page) return r.remove(author);

            page++;
            cPlayers = await getClubTransferpile(cInfo.id, page);

            if (cPlayers.length < 1) {
                pMessage.edit(`Your transferpile is empty man! ${author}.`);
                collector.stop();
            }

            aMenu = makeTransferMenu(cPlayers, author, page, aPages, aPlayers);

            await pMessage.edit(aMenu, {
                code: true
            });
        } else if (r.emoji.name === "⏪") {
            if (page <= 1) return;

            aPlayers = (await getClubTransferpileCount(cInfo.id)).length;

            if (aPlayers < 1) {
                pMessage.edit(`Your transferpile is empty man! ${author}.`);
                collector.stop();
            }

            page--;
            aPages = Math.ceil(aPlayers / 12);
            cPlayers = await getClubTransferpile(cInfo.id, page);

            if (cPlayers.length < 1) {
                pMessage.edit(`Your transferpile is empty man! ${author}.`);
                collector.stop();
            }

            aMenu = makeTransferMenu(cPlayers, author, page, aPages, aPlayers);

            await pMessage.edit(aMenu, {
                code: true
            });
        } else if (r.emoji.name === "⏮") {
            if (page <= 1) return;

            aPlayers = (await getClubTransferpileCount(cInfo.id)).length;

            if (aPlayers < 1) {
                pMessage.edit(`Your transferpile is empty man! ${author}.`);
                collector.stop();
            }

            aPages = Math.ceil(aPlayers / 12);
            page = 1;
            cPlayers = await getClubTransferpile(cInfo.id, page);

            if (cPlayers.length < 1) {
                pMessage.edit(`Your transferpile is empty man! ${author}.`);
                collector.stop();
            }

            aMenu = makeTransferMenu(cPlayers, author, page, aPages, aPlayers);

            await pMessage.edit(aMenu, {
                code: true
            });
        }

        if (message.guild) r.remove(author);
    });

}