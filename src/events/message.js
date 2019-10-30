const cooldown = new Map();
const cooldownsec = 12;

module.exports = async (client, message) => {
    if (message.author.bot) return;

    const prefix = client.prefix;
    const channel = message.channel;
    const author = message.author;

    if (!message.content.startsWith(prefix.toLowerCase())) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!command) return;

    const cmd = client.commands.get(command);

    if (!cmd) return;

    if (author.id != 259012839379828739 && command === "open" && cooldown.has(author.id)) {
        let init = cooldown.get(author.id);
        let curr = new Date();
        let diff = (curr - init) / 1000;

        return channel.send(`You need to wait ${(cooldownsec - diff).toFixed(1)} seconds before opening another pack.`);
    }

    if (command === "open") {
        cooldown.set(author.id, new Date());

        setTimeout(() => {
            cooldown.delete(author.id);
        }, cooldownsec * 1000);
    }

    return cmd.run(client, message, args);
}