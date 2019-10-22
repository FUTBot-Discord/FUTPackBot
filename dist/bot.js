"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var Discord = _interopRequireWildcard(require("discord.js"));

var _enmap = _interopRequireDefault(require("enmap"));

var _fs = _interopRequireDefault(require("fs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var client = new Discord.Client();
client.prefix = process.env.DC_PREFIX;

_fs["default"].readdir("".concat(__dirname, "/events"), function (err, files) {
  if (err) return console.error(err);
  files.forEach(function (file) {
    var event = require("".concat(__dirname, "/events/").concat(file));

    var eventName = file.split(".")[0];
    console.log("Attempting to load event ".concat(eventName));
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new _enmap["default"]();

_fs["default"].readdir("".concat(__dirname, "/commands"), function (err, files) {
  if (err) return console.error(err);
  files.forEach(function (file) {
    if (!file.endsWith(".js")) return;

    var props = require("".concat(__dirname, "/commands/").concat(file));

    var commandName = file.split(".")[0];
    console.log("Attempting to load command ".concat(commandName, "."));
    client.commands.set(commandName, props);
  });
});

client.login(process.env.DC_TOKEN);