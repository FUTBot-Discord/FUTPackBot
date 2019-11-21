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
    var page, channel, author, cInfo, aAuctions, cuAuctions, aPages, aMenu, pMessage, filter, collector;
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

            if (!(args.length > 0)) {
              _context2.next = 12;
              break;
            }

            _context2.next = 9;
            return (0, _general.getCurrentAuctionsCount)(cInfo.id, args.join(" "));

          case 9:
            aAuctions = _context2.sent.auctions;
            _context2.next = 15;
            break;

          case 12:
            _context2.next = 14;
            return (0, _general.getCurrentAuctionsCount)(cInfo.id);

          case 14:
            aAuctions = _context2.sent.auctions;

          case 15:
            if (!(aAuctions < 1)) {
              _context2.next = 17;
              break;
            }

            return _context2.abrupt("return", channel.send("No active auctions were found ".concat(author, ".")));

          case 17:
            if (!(args.length > 0)) {
              _context2.next = 23;
              break;
            }

            _context2.next = 20;
            return (0, _general.getActiveAuctions)(cInfo.id, page, args.join(" "));

          case 20:
            cuAuctions = _context2.sent;
            _context2.next = 26;
            break;

          case 23:
            _context2.next = 25;
            return (0, _general.getActiveAuctions)(cInfo.id, page);

          case 25:
            cuAuctions = _context2.sent;

          case 26:
            if (!(cuAuctions.length < 1)) {
              _context2.next = 28;
              break;
            }

            return _context2.abrupt("return", channel.send("No active auctions were found ".concat(author, ".")));

          case 28:
            aPages = Math.ceil(aAuctions / 12);
            aMenu = (0, _general.makeAuctionMenu)(cuAuctions, author, page, aPages);
            _context2.next = 32;
            return channel.send(aMenu, {
              code: true
            }).then(function (m) {
              return pMessage = m;
            })["catch"](function (e) {
              return channel.send("An error has occurred for ".concat(author, " his/her request."));
            });

          case 32:
            if (!(aPages < 2 || !pMessage)) {
              _context2.next = 34;
              break;
            }

            return _context2.abrupt("return");

          case 34:
            _context2.next = 36;
            return pMessage.react("⏮").then(function (r) {
              return r.message.react("⏪");
            }).then(function (r) {
              return r.message.react("⏩");
            }).then(function (r) {
              return r.message.react("⏭");
            });

          case 36:
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
                          _context.next = 30;
                          break;
                        }

                        if (!(args.length > 0)) {
                          _context.next = 7;
                          break;
                        }

                        _context.next = 4;
                        return (0, _general.getCurrentAuctionsCount)(cInfo.id, args.join(" "));

                      case 4:
                        aAuctions = _context.sent.auctions;
                        _context.next = 10;
                        break;

                      case 7:
                        _context.next = 9;
                        return (0, _general.getCurrentAuctionsCount)(cInfo.id);

                      case 9:
                        aAuctions = _context.sent.auctions;

                      case 10:
                        if (aAuctions < 1) {
                          pMessage.edit("No active auctions were found ".concat(author, ". Try searching again with the correct command."));
                          collector.stop();
                        }

                        aPages = Math.ceil(aAuctions / 12);

                        if (!(aPages <= page)) {
                          _context.next = 14;
                          break;
                        }

                        return _context.abrupt("return");

                      case 14:
                        page = aPages;

                        if (!(args.length > 0)) {
                          _context.next = 21;
                          break;
                        }

                        _context.next = 18;
                        return (0, _general.getActiveAuctions)(cInfo.id, page, args.join(" "));

                      case 18:
                        cuAuctions = _context.sent;
                        _context.next = 24;
                        break;

                      case 21:
                        _context.next = 23;
                        return (0, _general.getActiveAuctions)(cInfo.id, page);

                      case 23:
                        cuAuctions = _context.sent;

                      case 24:
                        if (cuAuctions.length < 1) {
                          pMessage.edit("No active auctions were found ".concat(author, ". Try searching again with the correct command."));
                          collector.stop();
                        }

                        aMenu = (0, _general.makeAuctionMenu)(cuAuctions, author, page, aPages);
                        _context.next = 28;
                        return pMessage.edit(aMenu, {
                          code: true
                        });

                      case 28:
                        _context.next = 118;
                        break;

                      case 30:
                        if (!(r.emoji.name === "⏩")) {
                          _context.next = 60;
                          break;
                        }

                        if (!(args.length > 0)) {
                          _context.next = 37;
                          break;
                        }

                        _context.next = 34;
                        return (0, _general.getCurrentAuctionsCount)(cInfo.id, args.join(" "));

                      case 34:
                        aAuctions = _context.sent.auctions;
                        _context.next = 40;
                        break;

                      case 37:
                        _context.next = 39;
                        return (0, _general.getCurrentAuctionsCount)(cInfo.id);

                      case 39:
                        aAuctions = _context.sent.auctions;

                      case 40:
                        if (aAuctions < 1) {
                          pMessage.edit("No active auctions were found ".concat(author, ". Try searching again with the correct command."));
                          collector.stop();
                        }

                        aPages = Math.ceil(aAuctions / 12);

                        if (!(aPages <= page)) {
                          _context.next = 44;
                          break;
                        }

                        return _context.abrupt("return");

                      case 44:
                        page++;

                        if (!(args.length > 0)) {
                          _context.next = 51;
                          break;
                        }

                        _context.next = 48;
                        return (0, _general.getActiveAuctions)(cInfo.id, page, args.join(" "));

                      case 48:
                        cuAuctions = _context.sent;
                        _context.next = 54;
                        break;

                      case 51:
                        _context.next = 53;
                        return (0, _general.getActiveAuctions)(cInfo.id, page);

                      case 53:
                        cuAuctions = _context.sent;

                      case 54:
                        if (cuAuctions.length < 1) {
                          pMessage.edit("No active auctions were found ".concat(author, ". Try searching again with the correct command."));
                          collector.stop();
                        }

                        aMenu = (0, _general.makeAuctionMenu)(cuAuctions, author, page, aPages);
                        _context.next = 58;
                        return pMessage.edit(aMenu, {
                          code: true
                        });

                      case 58:
                        _context.next = 118;
                        break;

                      case 60:
                        if (!(r.emoji.name === "⏮")) {
                          _context.next = 90;
                          break;
                        }

                        if (!(page <= 1)) {
                          _context.next = 63;
                          break;
                        }

                        return _context.abrupt("return");

                      case 63:
                        if (!(args.length > 0)) {
                          _context.next = 69;
                          break;
                        }

                        _context.next = 66;
                        return (0, _general.getCurrentAuctionsCount)(cInfo.id, args.join(" "));

                      case 66:
                        aAuctions = _context.sent.auctions;
                        _context.next = 72;
                        break;

                      case 69:
                        _context.next = 71;
                        return (0, _general.getCurrentAuctionsCount)(cInfo.id);

                      case 71:
                        aAuctions = _context.sent.auctions;

                      case 72:
                        if (aAuctions < 1) {
                          pMessage.edit("No active auctions were found ".concat(author, ". Try searching again with the correct command."));
                          collector.stop();
                        }

                        page = 1;
                        aPages = Math.ceil(aAuctions / 12);

                        if (!(args.length > 0)) {
                          _context.next = 81;
                          break;
                        }

                        _context.next = 78;
                        return (0, _general.getActiveAuctions)(cInfo.id, page, args.join(" "));

                      case 78:
                        cuAuctions = _context.sent;
                        _context.next = 84;
                        break;

                      case 81:
                        _context.next = 83;
                        return (0, _general.getActiveAuctions)(cInfo.id, page);

                      case 83:
                        cuAuctions = _context.sent;

                      case 84:
                        if (cuAuctions.length < 1) {
                          pMessage.edit("No active auctions were found ".concat(author, ". Try searching again with the correct command."));
                          collector.stop();
                        }

                        aMenu = (0, _general.makeAuctionMenu)(cuAuctions, author, page, aPages);
                        _context.next = 88;
                        return pMessage.edit(aMenu, {
                          code: true
                        });

                      case 88:
                        _context.next = 118;
                        break;

                      case 90:
                        if (!(r.emoji.name === "⏪")) {
                          _context.next = 118;
                          break;
                        }

                        if (!(page <= 1)) {
                          _context.next = 93;
                          break;
                        }

                        return _context.abrupt("return");

                      case 93:
                        if (!(args.length > 0)) {
                          _context.next = 99;
                          break;
                        }

                        _context.next = 96;
                        return (0, _general.getCurrentAuctionsCount)(cInfo.id, args.join(" "));

                      case 96:
                        aAuctions = _context.sent.auctions;
                        _context.next = 102;
                        break;

                      case 99:
                        _context.next = 101;
                        return (0, _general.getCurrentAuctionsCount)(cInfo.id);

                      case 101:
                        aAuctions = _context.sent.auctions;

                      case 102:
                        if (aAuctions < 1) {
                          pMessage.edit("No active auctions were found ".concat(author, ". Try searching again with the correct command."));
                          collector.stop();
                        }

                        page--;
                        aPages = Math.ceil(aAuctions / 12);

                        if (!(args.length > 0)) {
                          _context.next = 111;
                          break;
                        }

                        _context.next = 108;
                        return (0, _general.getActiveAuctions)(cInfo.id, page, args.join(" "));

                      case 108:
                        cuAuctions = _context.sent;
                        _context.next = 114;
                        break;

                      case 111:
                        _context.next = 113;
                        return (0, _general.getActiveAuctions)(cInfo.id, page);

                      case 113:
                        cuAuctions = _context.sent;

                      case 114:
                        if (cuAuctions.length < 1) {
                          pMessage.edit("No active auctions were found ".concat(author, ". Try searching again with the correct command."));
                          collector.stop();
                        }

                        aMenu = (0, _general.makeAuctionMenu)(cuAuctions, author, page, aPages);
                        _context.next = 118;
                        return pMessage.edit(aMenu, {
                          code: true
                        });

                      case 118:
                        if (message.guild) r.remove(author);

                      case 119:
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

          case 40:
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