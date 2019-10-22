const cooldown = new Set();
const cooldownsec = 5;

module.exports = async (client, message) => {
    if (message.author.bot) return;

    const guild = message.guild;
    const prefix = client.prefix;
    const channel = message.channel;

    if (!guild || guild == undefined) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!command) return;

    const cmd = client.commands.get(command);

    if (!cmd) return;
    if (cooldown.has(message.author.id)) return channel.send(`You need to wait ${cooldownsec} seconds before executing commands.`);

    cooldown.add(message.author.id);

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, cooldownsec * 1000);

    return cmd.run(client, message, args);
}