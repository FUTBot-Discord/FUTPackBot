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
    client.user.setActivity(`${client.guilds.size} servers`, {
        type: 'WATCHING'
    });

    pub.publish("leftGuild", `{"guildName": "${guild.name.toString()}", "guildOwner": "${guild.owner.user.tag.toString()}", "botId": "${client.id}"}`);
}