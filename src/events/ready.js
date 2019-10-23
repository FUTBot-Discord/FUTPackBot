module.exports = async (client) => {
    client.user.setActivity(`startup process, give me a moment plz ,_,`, { type: 'PLAYING' });

    console.log(`Logged in as ${client.user.tag} and looking at ${getPlayerCount(client.guilds)} users.`);
    console.log("====================");

    client.user.setActivity(`pack! in #testing`, { type: 'WACTHING' });
}

function getPlayerCount(guilds) {
    let usercount = 0;

    for (let guild of guilds.array()) {
        usercount += guild.memberCount;
    }

    return usercount;
}