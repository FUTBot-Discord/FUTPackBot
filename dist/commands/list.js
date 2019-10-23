"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _general = require("../functions/general");

var _asciiTable = _interopRequireDefault(require("ascii-table"));

exports.run =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(client, message, args) {
    var packs, channel, author, table, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pack;

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
            table = new _asciiTable["default"]('Pack list').setHeading("Id", "Name", "Price");
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 19;

            for (_iterator = packs[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              pack = _step.value;
              table.addRow(pack.id, pack.name, (0, _general.numberWithCommas)(pack.price));
            }

            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](19);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 27:
            _context.prev = 27;
            _context.prev = 28;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 30:
            _context.prev = 30;

            if (!_didIteratorError) {
              _context.next = 33;
              break;
            }

            throw _iteratorError;

          case 33:
            return _context.finish(30);

          case 34:
            return _context.finish(27);

          case 35:
            return _context.abrupt("return", channel.send(table + "\nFUTPackBot v.1.0.0 | Made by Tjird#0001", {
              code: true,
              split: true
            }));

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[19, 23, 27, 35], [28,, 30, 34]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();