"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _general = require("../functions/general");

var cooldown = new Map();
var cooldownsec = 12;

exports.run =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(client, message, args) {
    var author, channel, curr, diff, init, cInfo;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            author = message.author;
            channel = message.channel;
            curr = new Date();

            if (!cooldown.has(author.id)) {
              _context.next = 7;
              break;
            }

            init = cooldown.get(author.id);
            diff = (curr - init) / 1000 / 3600;
            return _context.abrupt("return", channel.send("You need to wait ".concat((cooldownsec - diff).toFixed(2), " hours before claiming your points.")));

          case 7:
            cooldown.set(author.id, new Date());
            _context.next = 10;
            return (0, _general.getUserClubId)(author.id);

          case 10:
            cInfo = _context.sent;
            _context.next = 13;
            return (0, _general.addPointsToClub)(cInfo.id, 100).then(function () {
              return channel.send("You have claimed your reward of 100 points. In about 12 hours you can reclaim it.");
            });

          case 13:
            setTimeout(function () {
              cooldown["delete"](author.id);
            }, cooldownsec * 3600 * 1000);

          case 14:
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