"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _general = require("../functions/general");

exports.run =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(client, message, args) {
    var packs, channel, author, table;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            channel = message.channel;
            author = message.author;

            if (!(!args || args.length < 1)) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return (0, _general.getPacks)();

          case 5:
            packs = _context.sent;
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return (0, _general.getPacksByName)(args.join(" "));

          case 10:
            packs = _context.sent;

          case 11:
            if (!(packs.length < 1 && args.length > 0)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", channel.send("There where no packs available with that search criteria."));

          case 13:
            if (!(packs.length < 1 && args.length < 1)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", channel.send("There where no packs available."));

          case 15:
            table = (0, _general.makeOptionMenuPacks)(packs);
            return _context.abrupt("return", channel.send(table + "\nFUTPackBot v.1.0.0 | Made by Tjird#0001", {
              code: true,
              split: true
            }));

          case 17:
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