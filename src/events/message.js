const cooldown = new Map();
const cooldownsec = 12;
import { getUserClubId, createUserClub } from '../functions/general';

module.exports = async (client, message) => {
    if (message.author.bot) return;

    const prefix = client.prefix;
    const channel = message.channel;
    const author = message.author;
    const guild = message.guild;

    if (!message.content.startsWith(prefix.toLowerCase())) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!command) return;

    const cmd = client.commands.get(command);

    if (!cmd) return;

    if (await getUserClubId(author.id) === null) await createUserClub(author.id);

    const allowedCommands = [
        "help",
        "support",
        "list",
        "bal",
        "balance",
        "point",
        "points",
        "commands",
        "command",
        "clubinfo"
    ];

    if (author.id !== "259012839379828739" && allowedCommands.includes(command) && cooldown.has(author.id)) {
        let init = cooldown.get(author.id);
        let curr = new Date();
        let diff = (curr - init) / 1000;

        return channel.send(`You need to wait ${(cooldownsec - diff).toFixed(1)} seconds before opening another pack.`);
    }

    if (allowedCommands.includes(command)) {
        cooldown.set(author.id, new Date());

        setTimeout(() => {
            cooldown.delete(author.id);
        }, cooldownsec * 1000);
    }

    return cmd.run(client, message, args);
}