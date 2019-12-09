import {
    Client,
    ShardingManager
} from 'discord.js';
import {
    createClient
} from 'async-redis';
import dotenv from 'dotenv';
import DBL from 'dblapi.js';

dotenv.config();

const pub = createClient({
    "host": process.env.R_HOST,
    "retry_strategy": function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            return undefined;
        }
        return Math.min(options.attempt * 100, 3000);
    }
});

pub.on("error", (err) => {
    console.log(`[Redis] ${err}`);
});

const client = new Client();
const dbl = new DBL(process.env.DC_DBL, client);
const shardmanager = new ShardingManager(__dirname + '/bot.js', {
    totalShards: parseInt(process.env.DC_SHARDS, 10),
    token: process.env.DC_TOKEN,
    respawn: true
});

shardmanager.spawn(parseInt(process.env.DC_SHARDS, 10), parseInt(process.env.DC_DELAY, 10));

const delay = 7000 + (parseInt(process.env.DC_SHARDS, 10) * parseInt(process.env.DC_DELAY, 10));
console.log(delay);

setTimeout(() => {
    shardmanager.fetchClientValues('guilds.size')
        .then(results => {
            var counts = results.reduce((prev, val) => prev + val, 0);

            pub.publish("updateGuildsCountPack", `${counts}`);
            dbl.postStats(`${counts}`);
        })
        .catch(console.error);
}, delay);

setInterval(() => {
    shardmanager.fetchClientValues('guilds.size')
        .then(results => {
            var counts = results.reduce((prev, val) => prev + val, 0);

            pub.publish("updateGuildsCountPack", `${counts}`);
            dbl.postStats(`${counts}`);
        })
        .catch(console.error);
}, 300000);