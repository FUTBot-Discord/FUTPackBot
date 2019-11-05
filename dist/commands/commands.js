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
            embed = new _discord.RichEmbed().setColor("0xE51E0A").setTitle("Available commands").setDescription("Want more information about a command? Use pack!cmd <command>. (Not yet implemented)").addField('Packs', "pack!list // Get a list of available packs.\n" + "pack!open [pack_id] // Just open a pack.\n", false).addField('Club information', "pack!balance // Get your current amount of coins.\n" + "pack!clubinfo // Get some general information of your own club.\n" + "pack!points // Get your current amount of points.", false).addField('Club collections', "pack!club [player_name] // Get a list of players in your own club. You can switch pages with the reacted emojis.\n" + "pack!transferpile // Get a collection of your transferpile. You can switch pages with the reacted emojis.\n", false).addField('Transfer market', "pack!market // Get a list of players that are currently on the transfer market. You can switch pages with the reacted emojis.\n" + "pack!transferpile // Get a collection of your transferpile. You can switch pages with the reacted emojis.\n", false);
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