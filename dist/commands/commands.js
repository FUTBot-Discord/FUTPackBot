"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _discord = require("discord.js");

exports.run =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(client, message, args) {
    var embed;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            embed = new _discord.RichEmbed().setColor("0xE51E0A").setTitle("Available commands") // .setDescription("Want more information about a command? Use pack!cmd <command>. (Not yet implemented)")
            .addField('Packs', "pack!list // Get a list of available packs.\n" + "pack!open [pack_id] // Just open a pack.\n", false).addField('Club information', "pack!balance // Get your current amount of coins.\n" + "pack!clubinfo // Get some general information of your own club.\n" + "pack!select // Select a player from your club/transferpile to list, move or quick-sell.\n" + "pack!points // Get your current amount of points.", false).addField('Club collections', "pack!club [player_name] // Get a list of players in your own club. You can switch pages with the reacted emojis.\n" + "pack!transferpile // Get a collection of your transferpile. You can switch pages with the reacted emojis.\n" + "pack!select // Select a player from your club/transferpile to list, move or quick-sell.\n", false).addField('Transfer market', "pack!market [player_name] // Get a list of players that are currently on the transfer market. You can switch pages with the reacted emojis.\n" + "pack!transferpile // Get a collection of your transferpile. You can switch pages with the reacted emojis.\n" + "pack!bid <auction_id> // Bid or buy a player from the transfer market. The auction id you need is available in the menu(Most left column) of the market command.\n", false).addField('Utils', "pack!claim // Claim your 12 hour reward. There is a vote reward of 65 points and 35 points by use only the command. The vote link can be provided by pack!vote or use the claim command.\n" + "pack!ping // Get the milliseconds that the bot needs to respond.\n" + "pack!vote // Get the vote link of this bot.\n" + "pack!commands // Hey you get this page again!\n" + "pack!help // Get some information for help if needed.\n" + "pack!invite // Get the invite link to get this bot also.\n", false);
            message.channel.send(embed);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();