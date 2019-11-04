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
            return (0, _general.getClubCollectionCount)(cInfo.id);

          case 8:
            aPlayers = _context2.sent.length;

            if (!(aPlayers < 1)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", channel.send("Your club is empty man! Open some packs ".concat(author, ".")));

          case 11:
            _context2.next = 13;
            return (0, _general.getClubCollection)(cInfo.id, page);

          case 13:
            cPlayers = _context2.sent;

            if (!(cPlayers.length < 1)) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt("return", channel.send("Your club is empty man! Open some packs ".concat(author, ".")));

          case 16:
            aPages = Math.ceil(aPlayers / 18);
            aMenu = (0, _general.makeClubMenu)(cPlayers, author, page, aPages);
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
                          _context.next = 19;
                          break;
                        }

                        _context.next = 3;
                        return (0, _general.getClubCollectionCount)(cInfo.id);

                      case 3:
                        aPlayers = _context.sent.length;

                        if (aPlayers < 1) {
                          pMessage.edit("Your club is empty man! Open some packs ".concat(author, "."));
                          collector.stop();
                        }

                        aPages = Math.ceil(aPlayers / 18);

                        if (!(aPages <= page)) {
                          _context.next = 8;
                          break;
                        }

                        return _context.abrupt("return");

                      case 8:
                        page = aPages;
                        _context.next = 11;
                        return (0, _general.getClubCollection)(cInfo.id, page);

                      case 11:
                        cPlayers = _context.sent;

                        if (!(cPlayers.length < 1)) {
                          _context.next = 14;
                          break;
                        }

                        return _context.abrupt("return", page--);

                      case 14:
                        aMenu = (0, _general.makeClubMenu)(cPlayers, author, page, aPages);
                        _context.next = 17;
                        return pMessage.edit(aMenu, {
                          code: true
                        });

                      case 17:
                        _context.next = 74;
                        break;

                      case 19:
                        if (!(r.emoji.name === "⏩")) {
                          _context.next = 38;
                          break;
                        }

                        _context.next = 22;
                        return (0, _general.getClubCollectionCount)(cInfo.id);

                      case 22:
                        aPlayers = _context.sent.length;

                        if (aPlayers < 1) {
                          pMessage.edit("Your club is empty man! Open some packs ".concat(author, "."));
                          collector.stop();
                        }

                        aPages = Math.ceil(aPlayers / 18);

                        if (!(aPages <= page)) {
                          _context.next = 27;
                          break;
                        }

                        return _context.abrupt("return");

                      case 27:
                        page++;
                        _context.next = 30;
                        return (0, _general.getClubCollection)(cInfo.id, page);

                      case 30:
                        cPlayers = _context.sent;

                        if (!(cPlayers.length < 1)) {
                          _context.next = 33;
                          break;
                        }

                        return _context.abrupt("return", page--);

                      case 33:
                        aMenu = (0, _general.makeClubMenu)(cPlayers, author, page, aPages);
                        _context.next = 36;
                        return pMessage.edit(aMenu, {
                          code: true
                        });

                      case 36:
                        _context.next = 74;
                        break;

                      case 38:
                        if (!(r.emoji.name === "⏪")) {
                          _context.next = 57;
                          break;
                        }

                        if (!(page <= 1)) {
                          _context.next = 41;
                          break;
                        }

                        return _context.abrupt("return");

                      case 41:
                        _context.next = 43;
                        return (0, _general.getClubCollectionCount)(cInfo.id);

                      case 43:
                        aPlayers = _context.sent.length;

                        if (aPlayers < 1) {
                          pMessage.edit("Your club is empty man! Open some packs ".concat(author, "."));
                          collector.stop();
                        }

                        page--;
                        aPages = Math.ceil(aPlayers / 18);
                        _context.next = 49;
                        return (0, _general.getClubCollection)(cInfo.id, page);

                      case 49:
                        cPlayers = _context.sent;

                        if (!(cPlayers.length < 1)) {
                          _context.next = 52;
                          break;
                        }

                        return _context.abrupt("return", page++);

                      case 52:
                        aMenu = (0, _general.makeClubMenu)(cPlayers, author, page, aPages);
                        _context.next = 55;
                        return pMessage.edit(aMenu, {
                          code: true
                        });

                      case 55:
                        _context.next = 74;
                        break;

                      case 57:
                        if (!(r.emoji.name === "⏮")) {
                          _context.next = 74;
                          break;
                        }

                        if (!(page <= 1)) {
                          _context.next = 60;
                          break;
                        }

                        return _context.abrupt("return");

                      case 60:
                        _context.next = 62;
                        return (0, _general.getClubCollectionCount)(cInfo.id);

                      case 62:
                        aPlayers = _context.sent.length;

                        if (aPlayers < 1) {
                          pMessage.edit("Your club is empty man! Open some packs ".concat(author, "."));
                          collector.stop();
                        }

                        aPages = Math.ceil(aPlayers / 18);
                        page = 1;
                        _context.next = 68;
                        return (0, _general.getClubCollection)(cInfo.id, page);

                      case 68:
                        cPlayers = _context.sent;

                        if (!(cPlayers.length < 1)) {
                          _context.next = 71;
                          break;
                        }

                        return _context.abrupt("return", page++);

                      case 71:
                        aMenu = (0, _general.makeClubMenu)(cPlayers, author, page, aPages);
                        _context.next = 74;
                        return pMessage.edit(aMenu, {
                          code: true
                        });

                      case 74:
                        r.remove(author);

                      case 75:
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

          case 27:
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