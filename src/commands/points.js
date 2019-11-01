import { getUserClubId, numberWithCommas } from '../functions/general';

exports.run = async (client, message, args) => {
    const channel = message.channel;
    const author = message.author;

    const cBalance = await getUserClubId(author.id);

    return channel.send(`${author} you have **${numberWithCommas(cBalance.points)}** point(s).`);
}
