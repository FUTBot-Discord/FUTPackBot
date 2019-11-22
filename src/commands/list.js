import {
    getPacks,
    getPacksByName,
    numberWithCommas,
    makeOptionMenuPacks
} from '../functions/general';

exports.run = async (client, message, args) => {
    let packs;
    const channel = message.channel;
    const author = message.author;

    if (!args || args.length < 1) {
        packs = await getPacks();
    } else {
        packs = await getPacksByName(args.join(" "));
    }

    if (packs.length < 1 && args.length > 0) return channel.send("There where no packs available with that search criteria.");
    if (packs.length < 1 && args.length < 1) return channel.send("There where no packs available.");

    let table = makeOptionMenuPacks(packs);

    return channel.send(table + "\nFUTPackBot v.1.0.0 | Made by Tjird#0001", {
        code: true,
        split: true
    });
}