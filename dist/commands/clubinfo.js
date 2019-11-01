"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _general = require("../functions/general");

var _discord = require("discord.js");

var _moment = _interopRequireDefault(require("moment"));

exports.run =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(client, message, args) {
    var channel, author;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            channel = message.channel;
            author = message.author;
            channel.send("Club information is being fetched...").then(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(m) {
                var cInfo, cCollection, embed;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _general.getUserClubId)(author.id);

                      case 2:
                        cInfo = _context.sent;
                        _context.next = 5;
                        return (0, _general.getClubCollectionCount)(cInfo.id);

                      case 5:
                        cCollection = _context.sent;
                        embed = new _discord.RichEmbed().setTimestamp().setFooter("FUTPackBot v.1.0.0 | Made by Tjird#0001", "https://tjird.nl/futbot.jpg").setColor("0xE51E0A").setTitle("Club information of ".concat(author.username, "#").concat(author.discriminator)).addField("Player amount", "`".concat(cCollection.length, "`"), true).addField("Coins", "`".concat((0, _general.numberWithCommas)(cInfo.coins), "`"), true).addField("Points", "`".concat((0, _general.numberWithCommas)(cInfo.points), "`"), true).addField("Creation time", "`".concat((0, _moment["default"])(cInfo.creation_time * 1000).format("DD-MM-YYYY HH:mm:ss Z"), "`"), true);
                        m.edit(embed);

                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();