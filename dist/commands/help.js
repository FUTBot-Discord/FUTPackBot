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
            embed = new _discord.RichEmbed().setTitle('Help page').setDescription("Don't know what to do? Where are here to help!\n" + 'Do you want to know all the commands? Use the ** commands ** (pack!commands) command to see all available commands.\n' + "Can't you understand what to do or what else? Join the supported Discord server! [Click here](https://discord.gg/KUnh4fc) to join it.\n");
            return _context.abrupt("return", message.channel.send(embed));

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