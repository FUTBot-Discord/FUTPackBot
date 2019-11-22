import {
    getUserClubId,
    addPointsToClub
} from '../functions/general';

const cooldown = new Map();
const cooldownsec = 12;

exports.run = async (client, message, args) => {
    const author = message.author;
    const channel = message.channel;
    const curr = new Date();

    let diff;

    if (cooldown.has(author.id)) {
        let init = cooldown.get(author.id);
        diff = ((curr - init) / 1000) / 3600;

        return channel.send(`You need to wait ${(cooldownsec - diff).toFixed(2)} hours before claiming your points.`);
    }

    cooldown.set(author.id, new Date());

    const cInfo = await getUserClubId(author.id);

    await addPointsToClub(cInfo.id, 100)
        .then(() => channel.send(`You have claimed your reward of 100 points. In about 12 hours you can reclaim it.`));

    setTimeout(() => {
        cooldown.delete(author.id);
    }, cooldownsec * 3600 * 1000);
}