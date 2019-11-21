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
    var channel, author, cInfo, aInfo, bid;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(args[0] == undefined || args[0] == null)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", channel.send("Please fill-in an id of an auction. ".concat(author)));

          case 2:
            channel = message.channel;
            author = message.author;
            _context.next = 6;
            return (0, _general.getUserClubId)(author.id);

          case 6:
            cInfo = _context.sent;
            _context.next = 9;
            return (0, _general.getAuctionById)(args[0]);

          case 9:
            aInfo = _context.sent;

            if (!(aInfo === null)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", channel.send("Auction has not been found. Try again... ".concat(author)));

          case 12:
            if (!(aInfo.s_club_id === cInfo.id)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", channel.send("You can't bid on your own item. ".concat(author)));

          case 14:
            if (!(args[1] == undefined || args[1] == null)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return");

          case 16:
            bid = (0, _general.nextCurrentBid)(args[1]);

            if (!(bid < aInfo.start_price)) {
              _context.next = 19;
              break;
            }

            return _context.abrupt("return", channel.send("Your bid must be higher then the start price ".concat(aInfo.start_price, ". ").concat(author)));

          case 19:
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