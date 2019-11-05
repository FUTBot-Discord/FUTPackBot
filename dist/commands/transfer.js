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
  _regenerator["default"].mark(function _callee2(client, message, args) {
    var page, channel, author, cInfo, aPlayers, cPlayers, aPages, aMenu, pMessage, filter, collector;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            page = 1;
            channel = message.channel;
            author = message.author;
            _context2.next = 5;
            return (0, _general.getUserClubId)(author.id);

          case 5:
            cInfo = _context2.sent;
            _context2.next = 8;
            return (0, _general.getClubTransferpileCount)(cInfo.id);

          case 8:
            aPlayers = _context2.sent.length;

            if (!(aPlayers < 1)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", channel.send("Your transferpile is empty man! ".concat(author, ".")));

          case 11:
            _context2.next = 13;
            return (0, _general.getClubTransferpile)(cInfo.id, page);

          case 13:
            cPlayers = _context2.sent;

            if (!(cPlayers.length < 1)) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt("return", channel.send("Your transferpile is empty man! ".concat(author, ".")));

          case 16:
            aPages = Math.ceil(aPlayers / 18);
            aMenu = (0, _general.makeTransferMenu)(cPlayers, author, page, aPages, aPlayers);
            _context2.next = 20;
            return channel.send(aMenu, {
              code: true
            }).then(function (m) {
              return pMessage = m;
            })["catch"](function (e) {
              console.log(e);
              return channel.send("An error has occurred for ".concat(author, " his/her request."));
            });

          case 20:
            if (!(aPages < 2 || !pMessage)) {
              _context2.next = 22;
              break;
            }

            return _context2.abrupt("return");

          case 22:
            _context2.next = 24;
            return pMessage.react("⏮").then(function (r) {
              return r.message.react("⏪");
            }).then(function (r) {
              return r.message.react("⏩");
            }).then(function (r) {
              return r.message.react("⏭");
            });

          case 24:
            filter = function filter(reaction, user) {
              return user.id === author.id;
            };

            collector = pMessage.createReactionCollector(filter, {
              time: 180000
            });
            if (!message.guild) channel.send("In DM's no reactions could be removed by me. You need to remove those by yourself!");
            collector.on('collect',
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(r) {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(r.emoji.name === "⏭")) {
                          _context.next = 18;
                          break;
                        }

                        _context.next = 3;
                        return (0, _general.getClubTransferpileCount)(cInfo.id);

                      case 3:
                        aPlayers = _context.sent.length;

                        if (aPlayers < 1) {
                          pMessage.edit("Your transferpile is empty man! ".concat(author, "."));
                          collector.stop();
                        }

                        aPages = Math.ceil(aPlayers / 12);

                        if (!(aPages <= page)) {
                          _context.next = 8;
                          break;
                        }

                        return _context.abrupt("return", r.remove(author));

                      case 8:
                        page = aPages;
                        _context.next = 11;
                        return (0, _general.getClubTransferpile)(cInfo.id, page);

                      case 11:
                        cPlayers = _context.sent;

                        if (cPlayers.length < 1) {
                          pMessage.edit("Your transferpile is empty man! ".concat(author, "."));
                          collector.stop();
                        }

                        aMenu = (0, _general.makeTransferMenu)(cPlayers, author, page, aPages, aPlayers);
                        _context.next = 16;
                        return pMessage.edit(aMenu, {
                          code: true
                        });

                      case 16:
                        _context.next = 70;
                        break;

                      case 18:
                        if (!(r.emoji.name === "⏩")) {
                          _context.next = 36;
                          break;
                        }

                        _context.next = 21;
                        return (0, _general.getClubTransferpileCount)(cInfo.id);

                      case 21:
                        aPlayers = _context.sent.length;

                        if (aPlayers < 1) {
                          pMessage.edit("Your transferpile is empty man! ".concat(author, "."));
                          collector.stop();
                        }

                        aPages = Math.ceil(aPlayers / 12);

                        if (!(aPages <= page)) {
                          _context.next = 26;
                          break;
                        }

                        return _context.abrupt("return", r.remove(author));

                      case 26:
                        page++;
                        _context.next = 29;
                        return (0, _general.getClubTransferpile)(cInfo.id, page);

                      case 29:
                        cPlayers = _context.sent;

                        if (cPlayers.length < 1) {
                          pMessage.edit("Your transferpile is empty man! ".concat(author, "."));
                          collector.stop();
                        }

                        aMenu = (0, _general.makeTransferMenu)(cPlayers, author, page, aPages, aPlayers);
                        _context.next = 34;
                        return pMessage.edit(aMenu, {
                          code: true
                        });

                      case 34:
                        _context.next = 70;
                        break;

                      case 36:
                        if (!(r.emoji.name === "⏪")) {
                          _context.next = 54;
                          break;
                        }

                        if (!(page <= 1)) {
                          _context.next = 39;
                          break;
                        }

                        return _context.abrupt("return");

                      case 39:
                        _context.next = 41;
                        return (0, _general.getClubTransferpileCount)(cInfo.id);

                      case 41:
                        aPlayers = _context.sent.length;

                        if (aPlayers < 1) {
                          pMessage.edit("Your transferpile is empty man! ".concat(author, "."));
                          collector.stop();
                        }

                        page--;
                        aPages = Math.ceil(aPlayers / 12);
                        _context.next = 47;
                        return (0, _general.getClubTransferpile)(cInfo.id, page);

                      case 47:
                        cPlayers = _context.sent;

                        if (cPlayers.length < 1) {
                          pMessage.edit("Your transferpile is empty man! ".concat(author, "."));
                          collector.stop();
                        }

                        aMenu = (0, _general.makeTransferMenu)(cPlayers, author, page, aPages, aPlayers);
                        _context.next = 52;
                        return pMessage.edit(aMenu, {
                          code: true
                        });

                      case 52:
                        _context.next = 70;
                        break;

                      case 54:
                        if (!(r.emoji.name === "⏮")) {
                          _context.next = 70;
                          break;
                        }

                        if (!(page <= 1)) {
                          _context.next = 57;
                          break;
                        }

                        return _context.abrupt("return");

                      case 57:
                        _context.next = 59;
                        return (0, _general.getClubTransferpileCount)(cInfo.id);

                      case 59:
                        aPlayers = _context.sent.length;

                        if (aPlayers < 1) {
                          pMessage.edit("Your transferpile is empty man! ".concat(author, "."));
                          collector.stop();
                        }

                        aPages = Math.ceil(aPlayers / 12);
                        page = 1;
                        _context.next = 65;
                        return (0, _general.getClubTransferpile)(cInfo.id, page);

                      case 65:
                        cPlayers = _context.sent;

                        if (cPlayers.length < 1) {
                          pMessage.edit("Your transferpile is empty man! ".concat(author, "."));
                          collector.stop();
                        }

                        aMenu = (0, _general.makeTransferMenu)(cPlayers, author, page, aPages, aPlayers);
                        _context.next = 70;
                        return pMessage.edit(aMenu, {
                          code: true
                        });

                      case 70:
                        if (message.guild) r.remove(author);

                      case 71:
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

          case 28:
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