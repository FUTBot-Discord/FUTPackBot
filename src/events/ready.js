import {
    createClient
} from "async-redis";
import {
    getAuctionById,
    resetTransferPlayer,
    addCoinsToClub,
    auctionBuyNow,
    notifyPerson,
    getPlayerVersionById
} from "../functions/general";
import dotenv from "dotenv";
dotenv.config();

const redis = createClient({
    host: process.env.R_HOST,
    db: process.env.R_DB,
    retry_strategy: function (options) {
        if (options.error && options.error.code === "ECONNREFUSED") {
            return new Error("The server refused the connection");
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error("Retry time exhausted");
        }
        if (options.attempt > 10) {
            return undefined;
        }
        return Math.min(options.attempt * 100, 3000);
    }
});

module.exports = async (client) => {
    client.user.setActivity(`startup process, give me a moment plz ,_,`, {
        type: 'PLAYING'
    });

    console.log(`Logged in as ${client.user.tag} and looking at ${getPlayerCount(client.guilds)} users.`);
    console.log("====================");

    client.user.setActivity(`pack! in #testing`, {
        type: 'WATCHING'
    });

    redisStartup(client);
}

async function redisStartup(client) {
    await redis.send_command("config", ["set", "notify-keyspace-events", "Ex"]);

    const expired_subKey =
        "__keyevent@" + process.env.REDIS_DATABASE + "__:expired";

    redis
        .subscribe(expired_subKey)
        .then(() => console.log("[i] Subscribed to " + expired_subKey));

    redis.on("message", async (channel, message) => {
        if (channel !== expired_subKey) return;
        console.log(`[a] [${message}] Expired.`);

        let aInfo;

        try {
            aInfo = await getAuctionById(message);
        } catch (e) {
            return;
        }

        if (aInfo == null) return;

        if (aInfo.b_club_id == 0) {
            console.log(`[a] [${message}] No buyer was found.`);
            return resetTransferPlayer(message);
        }

        console.log(`[a] [${message}] Buyer(${aInfo.b_club_id}) has been found.`);

        await addCoinsToClub(aInfo.s_club_id, aInfo.current_bid);
        await auctionBuyNow(aInfo.id, aInfo.b_club_id);

        const pInfo = await getPlayerVersionById(aInfo.player_id);
        const pName = pInfo.meta_info.common_name ? pInfo.meta_info.common_name : `${pInfo.meta_info.first_name} ${pInfo.meta_info.last_name}`;

        await notifyPerson(client, aInfo, 3);
    });
}

function getPlayerCount(guilds) {
    let usercount = 0;

    for (let guild of guilds.array()) {
        usercount += guild.memberCount;
    }

    return usercount;
};