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
    var channel, author, cBalance;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            channel = message.channel;
            author = message.author;
            _context.next = 4;
            return (0, _general.getUserClubId)(author.id);

          case 4:
            cBalance = _context.sent;
            return _context.abrupt("return", channel.send("".concat(author, " your current balance is **").concat((0, _general.numberWithCommas)(cBalance.coins), "** and **").concat((0, _general.numberWithCommas)(cBalance.points), "** point(s).")));

          case 6:
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