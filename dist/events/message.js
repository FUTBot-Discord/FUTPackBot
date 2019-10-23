"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var cooldown = new Set();
var cooldownsec = 15;

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(client, message) {
    var guild, prefix, channel, args, command, cmd;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!message.author.bot) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            guild = message.guild;
            prefix = client.prefix;
            channel = message.channel;

            if (message.content.startsWith(prefix)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            args = message.content.slice(prefix.length).trim().split(/ +/g);
            command = args.shift().toLowerCase();

            if (command) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return");

          case 11:
            cmd = client.commands.get(command);

            if (cmd) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return");

          case 14:
            if (!cooldown.has(message.author.id)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", channel.send("You need to wait ".concat(cooldownsec, " seconds before executing commands.")));

          case 16:
            cooldown.add(message.author.id);
            setTimeout(function () {
              cooldown["delete"](message.author.id);
            }, cooldownsec * 1000);
            return _context.abrupt("return", cmd.run(client, message, args));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();