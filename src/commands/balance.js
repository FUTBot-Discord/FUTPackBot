import { getUserClubId, numberWithCommas } from '../functions/general';

exports.run = async (client, message, args) => {
    const channel = message.channel;
    const author = message.author;

    const cBalance = await getUserClubId(author.id);

    return channel.send(`${author} your current balance is **${numberWithCommas(cBalance.coins)}**.`);
}
