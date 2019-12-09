"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _discord = require("discord.js");

var _asyncRedis = require("async-redis");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _dblapi = _interopRequireDefault(require("dblapi.js"));

_dotenv["default"].config();

var pub = (0, _asyncRedis.createClient)({
  "host": process.env.R_HOST,
  "retry_strategy": function retry_strategy(options) {
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
pub.on("error", function (err) {
  console.log("[Redis] ".concat(err));
});
var client = new _discord.Client();
var dbl = new _dblapi["default"](process.env.DC_DBL, client);
var shardmanager = new _discord.ShardingManager(__dirname + '/bot.js', {
  totalShards: parseInt(process.env.DC_SHARDS, 10),
  token: process.env.DC_TOKEN,
  respawn: true
});
shardmanager.spawn(parseInt(process.env.DC_SHARDS, 10), parseInt(process.env.DC_DELAY, 10));
var delay = 7000 + parseInt(process.env.DC_SHARDS, 10) * parseInt(process.env.DC_DELAY, 10);
console.log(delay);
setTimeout(function () {
  shardmanager.fetchClientValues('guilds.size').then(function (results) {
    var counts = results.reduce(function (prev, val) {
      return prev + val;
    }, 0);
    pub.publish("updateGuildsCountPack", "".concat(counts));
    dbl.postStats("".concat(counts));
  })["catch"](console.error);
}, delay);
setInterval(function () {
  shardmanager.fetchClientValues('guilds.size').then(function (results) {
    var counts = results.reduce(function (prev, val) {
      return prev + val;
    }, 0);
    pub.publish("updateGuildsCountPack", "".concat(counts));
    dbl.postStats("".concat(counts));
  })["catch"](console.error);
}, 300000);