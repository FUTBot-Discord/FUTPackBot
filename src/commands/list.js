import { getPacks, getPacksByName, numberWithCommas } from '../functions/general';
import AsciiTable from 'ascii-table';

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

    let table = new AsciiTable('Pack list')
        .setHeading("Id", "Name", "Price");

    for (let pack of packs) {
        table.addRow(pack.id, pack.name, numberWithCommas(pack.price));
    }

    return channel.send(table + "\nFUTPackBot v.1.0.0 | Made by Tjird#0001", {
        code: true,
        split: true
    });
}