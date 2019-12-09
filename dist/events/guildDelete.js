"use strict";

var _asyncRedis = require("async-redis");

var pub = (0, _asyncRedis.createClient)({
  "host": process.env.R_HOST,
  "retry_strategy": function retry_strategy(options) {
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
    } // reconnect after


    return Math.min(options.attempt * 100, 3000);
  }
});
pub.on("error", function (err) {
  console.log("Error ".concat(err));
});

module.exports = function (client, guild) {
  pub.publish("leftGuild", "{\"guildName\": \"".concat(guild.name.toString(), "\", \"guildOwner\": \"").concat(guild.owner.user.tag.toString(), "\", \"botId\": \"").concat(client.id, "\"}"));
};