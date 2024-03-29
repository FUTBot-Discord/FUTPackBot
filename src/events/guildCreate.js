import {
    createClient
} from 'async-redis';

const pub = createClient({
    "host": process.env.R_HOST,
    "retry_strategy": function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
});

pub.on("error", (err) => {
    console.log(`Error ${err}`);
});

module.exports = (client, guild) => {
    try {
        guild.owner.send(`Heeyy!! Love to you because your guild has invited me. \nYou can find the commandlist with \`pack!commands\` or at https://top.gg/bot/647251451625603082. \nIf you have any questions, don't hesitate and join the supported Discord https://discord.gg/KUnh4fc.`)
    } catch (e) {

    }

    pub.publish("addedGuild", `{"guildName": "${guild.name.toString()}", "guildOwner": "${guild.owner.user.tag.toString()}", "botId": "${client.id}"}`);
}