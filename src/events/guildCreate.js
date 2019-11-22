module.exports = (client, guild) => {
    client.user.setActivity(`${client.guilds.size} servers`, {
        type: 'WATCHING'
    });
}