"use strict";

module.exports = function (client, guild) {
  client.user.setActivity("".concat(client.guilds.size, " servers"), {
    type: 'WATCHING'
  });
};