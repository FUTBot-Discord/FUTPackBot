"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _general = require("../functions/general");

var _discord = require("discord.js");

var _toTime = _interopRequireDefault(require("to-time"));

exports.run =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9(client, message, args) {
    var transferpile, club, choice, author, channel, mTemp, rFilter, count, cInfo, mFilter, mPlayerName, pCollection, page, pMenu, mTemp2, aPages, rCollector, pPlayer, place, a, b, playerInfo, min_price, playerCard, playerName, pEmbed;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            transferpile = ["t", "tp", "transferp", "transfers", "transfer", "transferpile", "transferspile"];
            club = ["c", "club", "clubs", "players"];

            if (args[0] && args[0] !== undefined && transferpile.includes(args[0])) {
              choice = 1;
            } else if (args[0] && args[0] !== undefined && club.includes(args[0])) {
              choice = 2;
            } else {
              choice = 0;
            }

            author = message.author;
            channel = message.channel;

            if (!(choice === 0)) {
              _context9.next = 13;
              break;
            }

            _context9.next = 8;
            return channel.send("From where you want to select a player. ".concat(author, "\n\n:one: Club\n:two: Transferpile\n\n*In 30 seconds this request is being closed if no answer is given.*")).then(function (m) {
              return mTemp = m;
            }).then(function () {
              return mTemp.react("1\u20E3");
            }).then(function () {
              return mTemp.react("2\u20E3");
            });

          case 8:
            rFilter = function rFilter(reaction, user) {
              return (reaction.emoji.identifier === '1%E2%83%A3' || reaction.emoji.identifier === '2%E2%83%A3') && user.id === author.id;
            };

            _context9.next = 11;
            return (0, _general.setDialogueReactions)(rFilter, mTemp, 30000).then(function (r) {
              switch (r.emoji.identifier) {
                case "1%E2%83%A3":
                  choice = 2;
                  break;

                case "2%E2%83%A3":
                  choice = 1;
                  break;
              }
            }).then(function () {
              return mTemp["delete"]();
            })["catch"](function (e) {
              return channel.send("".concat(author, " your request has been called because no response has given."));
            });

          case 11:
            if (!(choice === 0)) {
              _context9.next = 13;
              break;
            }

            return _context9.abrupt("return");

          case 13:
            _context9.next = 15;
            return (0, _general.getUserClubId)(author.id);

          case 15:
            cInfo = _context9.sent;
            _context9.t0 = choice;
            _context9.next = _context9.t0 === 1 ? 19 : _context9.t0 === 2 ? 25 : 31;
            break;

          case 19:
            _context9.next = 21;
            return (0, _general.getClubTransferpileCount)(cInfo.id);

          case 21:
            count = _context9.sent.length;

            if (!(count < 1)) {
              _context9.next = 24;
              break;
            }

            return _context9.abrupt("return", channel.send("Your transferpile is empty man! ".concat(author, ".")));

          case 24:
            return _context9.abrupt("break", 31);

          case 25:
            _context9.next = 27;
            return (0, _general.getClubCollectionCount)(cInfo.id);

          case 27:
            count = _context9.sent.length;

            if (!(count < 1)) {
              _context9.next = 30;
              break;
            }

            return _context9.abrupt("return", channel.send("Your club is empty man! Open some packs ".concat(author, ".")));

          case 30:
            return _context9.abrupt("break", 31);

          case 31:
            channel.send("Put in a (part of the) playername you want to search. ".concat(author, "\nIf you want all results, put in a '-' or say 30 seconds nothing.")).then(function (m) {
              return mTemp = m;
            });

            mFilter = function mFilter(m) {
              return m.author.id === author.id;
            };

            page = 1;
            _context9.next = 36;
            return (0, _general.setDialogue)(mFilter, channel, 30000).then(function (m) {
              return mPlayerName = m;
            }).then(function () {
              return mPlayerName["delete"]();
            }).then(function () {
              return mTemp["delete"]();
            })["catch"](function (e) {
              return mPlayerName = "";
            });

          case 36:
            if (!(mPlayerName.content !== "" && mPlayerName.content !== "-")) {
              _context9.next = 50;
              break;
            }

            _context9.t1 = choice;
            _context9.next = _context9.t1 === 1 ? 40 : _context9.t1 === 2 ? 44 : 48;
            break;

          case 40:
            _context9.next = 42;
            return (0, _general.getClubTransferpile)(cInfo.id, page, mPlayerName.content);

          case 42:
            pCollection = _context9.sent;
            return _context9.abrupt("break", 48);

          case 44:
            _context9.next = 46;
            return (0, _general.getClubCollection)(cInfo.id, page, mPlayerName.content);

          case 46:
            pCollection = _context9.sent;
            return _context9.abrupt("break", 48);

          case 48:
            _context9.next = 61;
            break;

          case 50:
            _context9.t2 = choice;
            _context9.next = _context9.t2 === 1 ? 53 : _context9.t2 === 2 ? 57 : 61;
            break;

          case 53:
            _context9.next = 55;
            return (0, _general.getClubTransferpile)(cInfo.id, page);

          case 55:
            pCollection = _context9.sent;
            return _context9.abrupt("break", 61);

          case 57:
            _context9.next = 59;
            return (0, _general.getClubCollection)(cInfo.id, page);

          case 59:
            pCollection = _context9.sent;
            return _context9.abrupt("break", 61);

          case 61:
            if (!(pCollection.length < 1)) {
              _context9.next = 63;
              break;
            }

            return _context9.abrupt("return", channel.send("No players are found with this criteria. Try again later... ".concat(author)));

          case 63:
            _context9.t3 = choice;
            _context9.next = _context9.t3 === 1 ? 66 : _context9.t3 === 2 ? 76 : 86;
            break;

          case 66:
            _context9.next = 68;
            return (0, _general.getClubTransferpileCount)(cInfo.id);

          case 68:
            count = _context9.sent.length;

            if (!(count < 1)) {
              _context9.next = 71;
              break;
            }

            return _context9.abrupt("return", channel.send("Your transferpile is empty man! ".concat(author, ".")));

          case 71:
            aPages = Math.ceil(count / 12);
            _context9.next = 74;
            return (0, _general.makeTransferMenu)(pCollection, author, page, aPages, count);

          case 74:
            pMenu = _context9.sent;
            return _context9.abrupt("break", 86);

          case 76:
            _context9.next = 78;
            return (0, _general.getClubCollectionCount)(cInfo.id);

          case 78:
            count = _context9.sent.length;

            if (!(count < 1)) {
              _context9.next = 81;
              break;
            }

            return _context9.abrupt("return", channel.send("Your club is empty man! Open some packs ".concat(author, ".")));

          case 81:
            aPages = Math.ceil(count / 18);
            _context9.next = 84;
            return (0, _general.makeClubMenu)(pCollection, author, page, aPages);

          case 84:
            pMenu = _context9.sent;
            return _context9.abrupt("break", 86);

          case 86:
            _context9.next = 88;
            return channel.send(pMenu, {
              code: true
            }).then(function (m) {
              return mTemp = m;
            }).then(function () {
              channel.send("Type the **ID** your player you want to select. ".concat(author, "\nIf the player is at the transfer market, you can do nothing with him.\nAfter 30 seconds without any response this request is going to be closed.")).then(function (m) {
                return mTemp2 = m;
              });
            });

          case 88:
            if (!message.guild) channel.send("In DM's no reactions could be removed by me. You need to remove those by yourself!");

            rFilter = function rFilter(reaction, user) {
              return user.id === author.id;
            };

            rCollector = mTemp.createReactionCollector(rFilter, {
              time: 30000
            });

            if (!(aPages > 1)) {
              _context9.next = 94;
              break;
            }

            _context9.next = 94;
            return mTemp.react("⏮").then(function (r) {
              return r.message.react("⏪");
            }).then(function (r) {
              return r.message.react("⏩");
            }).then(function (r) {
              return r.message.react("⏭");
            });

          case 94:
            rCollector.on('collect',
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(r) {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = choice;
                        _context.next = _context.t0 === 1 ? 3 : _context.t0 === 2 ? 74 : 193;
                        break;

                      case 3:
                        if (!(r.emoji.name === "⏭")) {
                          _context.next = 21;
                          break;
                        }

                        _context.next = 6;
                        return (0, _general.getClubTransferpileCount)(cInfo.id);

                      case 6:
                        count = _context.sent.length;

                        if (count < 1) {
                          mTemp.edit("Your transferpile is empty man! ".concat(author, "."));
                          collector.stop();
                        }

                        aPages = Math.ceil(count / 12);

                        if (!(aPages <= page)) {
                          _context.next = 11;
                          break;
                        }

                        return _context.abrupt("return", r.remove(author));

                      case 11:
                        page = aPages;
                        _context.next = 14;
                        return (0, _general.getClubTransferpile)(cInfo.id, page);

                      case 14:
                        pCollection = _context.sent;

                        if (pCollection.length < 1) {
                          mTemp.edit("Your transferpile is empty man! ".concat(author, "."));
                          collector.stop();
                        }

                        pMenu = (0, _general.makeTransferMenu)(pCollection, author, page, aPages, count);
                        _context.next = 19;
                        return mTemp.edit(pMenu, {
                          code: true
                        });

                      case 19:
                        _context.next = 73;
                        break;

                      case 21:
                        if (!(r.emoji.name === "⏩")) {
                          _context.next = 39;
                          break;
                        }

                        _context.next = 24;
                        return (0, _general.getClubTransferpileCount)(cInfo.id);

                      case 24:
                        count = _context.sent.length;

                        if (count < 1) {
                          mTemp.edit("Your transferpile is empty man! ".concat(author, "."));
                          collector.stop();
                        }

                        aPages = Math.ceil(count / 12);

                        if (!(aPages <= page)) {
                          _context.next = 29;
                          break;
                        }

                        return _context.abrupt("return", r.remove(author));

                      case 29:
                        page++;
                        _context.next = 32;
                        return (0, _general.getClubTransferpile)(cInfo.id, page);

                      case 32:
                        pCollection = _context.sent;

                        if (pCollection.length < 1) {
                          mTemp.edit("Your transferpile is empty man! ".concat(author, "."));
                          collector.stop();
                        }

                        pMenu = (0, _general.makeTransferMenu)(pCollection, author, page, aPages, count);
                        _context.next = 37;
                        return mTemp.edit(pMenu, {
                          code: true
                        });

                      case 37:
                        _context.next = 73;
                        break;

                      case 39:
                        if (!(r.emoji.name === "⏪")) {
                          _context.next = 57;
                          break;
                        }

                        if (!(page <= 1)) {
                          _context.next = 42;
                          break;
                        }

                        return _context.abrupt("return");

                      case 42:
                        _context.next = 44;
                        return (0, _general.getClubTransferpileCount)(cInfo.id);

                      case 44:
                        count = _context.sent.length;

                        if (count < 1) {
                          mTemp.edit("Your transferpile is empty man! ".concat(author, "."));
                          collector.stop();
                        }

                        page--;
                        aPages = Math.ceil(count / 12);
                        _context.next = 50;
                        return (0, _general.getClubTransferpile)(cInfo.id, page);

                      case 50:
                        pCollection = _context.sent;

                        if (pCollection.length < 1) {
                          mTemp.edit("Your transferpile is empty man! ".concat(author, "."));
                          collector.stop();
                        }

                        pMenu = (0, _general.makeTransferMenu)(pCollection, author, page, aPages, count);
                        _context.next = 55;
                        return mTemp.edit(pMenu, {
                          code: true
                        });

                      case 55:
                        _context.next = 73;
                        break;

                      case 57:
                        if (!(r.emoji.name === "⏮")) {
                          _context.next = 73;
                          break;
                        }

                        if (!(page <= 1)) {
                          _context.next = 60;
                          break;
                        }

                        return _context.abrupt("return");

                      case 60:
                        _context.next = 62;
                        return (0, _general.getClubTransferpileCount)(cInfo.id);

                      case 62:
                        count = _context.sent.length;

                        if (count < 1) {
                          mTemp.edit("Your transferpile is empty man! ".concat(author, "."));
                          collector.stop();
                        }

                        aPages = Math.ceil(count / 12);
                        page = 1;
                        _context.next = 68;
                        return (0, _general.getClubTransferpile)(cInfo.id, page);

                      case 68:
                        pCollection = _context.sent;

                        if (pCollection.length < 1) {
                          mTemp.edit("Your transferpile is empty man! ".concat(author, "."));
                          collector.stop();
                        }

                        pMenu = (0, _general.makeTransferMenu)(pCollection, author, page, aPages, count);
                        _context.next = 73;
                        return mTemp.edit(pMenu, {
                          code: true
                        });

                      case 73:
                        return _context.abrupt("break", 193);

                      case 74:
                        if (!(r.emoji.name === "⏭")) {
                          _context.next = 104;
                          break;
                        }

                        if (!(mPlayerName.content !== "" && mPlayerName.content !== "-")) {
                          _context.next = 81;
                          break;
                        }

                        _context.next = 78;
                        return (0, _general.getClubCollectionCount)(cInfo.id, mPlayerName.content);

                      case 78:
                        count = _context.sent.length;
                        _context.next = 84;
                        break;

                      case 81:
                        _context.next = 83;
                        return (0, _general.getClubCollectionCount)(cInfo.id);

                      case 83:
                        count = _context.sent.length;

                      case 84:
                        if (count < 1) {
                          mTemp.edit("Your club is empty man! Open some packs ".concat(author, "."));
                          collector.stop();
                        }

                        aPages = Math.ceil(count / 18);

                        if (!(aPages <= page)) {
                          _context.next = 88;
                          break;
                        }

                        return _context.abrupt("return", r.remove(author));

                      case 88:
                        page = aPages;

                        if (!(mPlayerName.content !== "" && mPlayerName.content !== "-")) {
                          _context.next = 95;
                          break;
                        }

                        _context.next = 92;
                        return (0, _general.getClubCollection)(cInfo.id, page, mPlayerName.content);

                      case 92:
                        pCollection = _context.sent;
                        _context.next = 98;
                        break;

                      case 95:
                        _context.next = 97;
                        return (0, _general.getClubCollection)(cInfo.id, page);

                      case 97:
                        pCollection = _context.sent;

                      case 98:
                        if (pCollection.length < 1) {
                          mTemp.edit("Your club is empty man! Open some packs ".concat(author, "."));
                          collector.stop();
                        }

                        pMenu = (0, _general.makeClubMenu)(pCollection, author, page, aPages);
                        _context.next = 102;
                        return mTemp.edit(pMenu, {
                          code: true
                        });

                      case 102:
                        _context.next = 192;
                        break;

                      case 104:
                        if (!(r.emoji.name === "⏩")) {
                          _context.next = 134;
                          break;
                        }

                        if (!(mPlayerName.content !== "" && mPlayerName.content !== "-")) {
                          _context.next = 111;
                          break;
                        }

                        _context.next = 108;
                        return (0, _general.getClubCollectionCount)(cInfo.id, mPlayerName.content);

                      case 108:
                        count = _context.sent.length;
                        _context.next = 114;
                        break;

                      case 111:
                        _context.next = 113;
                        return (0, _general.getClubCollectionCount)(cInfo.id);

                      case 113:
                        count = _context.sent.length;

                      case 114:
                        if (count < 1) {
                          mTemp.edit("Your club is empty man! Open some packs ".concat(author, "."));
                          collector.stop();
                        }

                        aPages = Math.ceil(count / 18);

                        if (!(aPages <= page)) {
                          _context.next = 118;
                          break;
                        }

                        return _context.abrupt("return", r.remove(author));

                      case 118:
                        page++;

                        if (!(mPlayerName.content !== "" && mPlayerName.content !== "-")) {
                          _context.next = 125;
                          break;
                        }

                        _context.next = 122;
                        return (0, _general.getClubCollection)(cInfo.id, page, mPlayerName.content);

                      case 122:
                        pCollection = _context.sent;
                        _context.next = 128;
                        break;

                      case 125:
                        _context.next = 127;
                        return (0, _general.getClubCollection)(cInfo.id, page);

                      case 127:
                        pCollection = _context.sent;

                      case 128:
                        if (pCollection.length < 1) {
                          mTemp.edit("Your club is empty man! Open some packs ".concat(author, "."));
                          collector.stop();
                        }

                        pMenu = (0, _general.makeClubMenu)(pCollection, author, page, aPages);
                        _context.next = 132;
                        return mTemp.edit(pMenu, {
                          code: true
                        });

                      case 132:
                        _context.next = 192;
                        break;

                      case 134:
                        if (!(r.emoji.name === "⏪")) {
                          _context.next = 164;
                          break;
                        }

                        if (!(page <= 1)) {
                          _context.next = 137;
                          break;
                        }

                        return _context.abrupt("return");

                      case 137:
                        if (!(mPlayerName.content !== "" && mPlayerName.content !== "-")) {
                          _context.next = 143;
                          break;
                        }

                        _context.next = 140;
                        return (0, _general.getClubCollectionCount)(cInfo.id, mPlayerName.content);

                      case 140:
                        count = _context.sent.length;
                        _context.next = 146;
                        break;

                      case 143:
                        _context.next = 145;
                        return (0, _general.getClubCollectionCount)(cInfo.id);

                      case 145:
                        count = _context.sent.length;

                      case 146:
                        if (count < 1) {
                          mTemp.edit("Your club is empty man! Open some packs ".concat(author, "."));
                          collector.stop();
                        }

                        page--;
                        aPages = Math.ceil(count / 18);

                        if (!(mPlayerName.content !== "" && mPlayerName.content !== "-")) {
                          _context.next = 155;
                          break;
                        }

                        _context.next = 152;
                        return (0, _general.getClubCollection)(cInfo.id, page, mPlayerName.content);

                      case 152:
                        pCollection = _context.sent;
                        _context.next = 158;
                        break;

                      case 155:
                        _context.next = 157;
                        return (0, _general.getClubCollection)(cInfo.id, page);

                      case 157:
                        pCollection = _context.sent;

                      case 158:
                        if (pCollection.length < 1) {
                          mTemp.edit("Your club is empty man! Open some packs ".concat(author, "."));
                          collector.stop();
                        }

                        pMenu = (0, _general.makeClubMenu)(pCollection, author, page, aPages);
                        _context.next = 162;
                        return mTemp.edit(pMenu, {
                          code: true
                        });

                      case 162:
                        _context.next = 192;
                        break;

                      case 164:
                        if (!(r.emoji.name === "⏮")) {
                          _context.next = 192;
                          break;
                        }

                        if (!(page <= 1)) {
                          _context.next = 167;
                          break;
                        }

                        return _context.abrupt("return");

                      case 167:
                        if (!(mPlayerName.content !== "" && mPlayerName.content !== "-")) {
                          _context.next = 173;
                          break;
                        }

                        _context.next = 170;
                        return (0, _general.getClubCollectionCount)(cInfo.id, mPlayerName.content);

                      case 170:
                        count = _context.sent.length;
                        _context.next = 176;
                        break;

                      case 173:
                        _context.next = 175;
                        return (0, _general.getClubCollectionCount)(cInfo.id);

                      case 175:
                        count = _context.sent.length;

                      case 176:
                        if (count < 1) {
                          mTemp.edit("Your club is empty man! Open some packs ".concat(author, "."));
                          collector.stop();
                        }

                        aPages = Math.ceil(count / 18);
                        page = 1;

                        if (!(mPlayerName.content !== "" && mPlayerName.content !== "-")) {
                          _context.next = 185;
                          break;
                        }

                        _context.next = 182;
                        return (0, _general.getClubCollection)(cInfo.id, page, mPlayerName.content);

                      case 182:
                        pCollection = _context.sent;
                        _context.next = 188;
                        break;

                      case 185:
                        _context.next = 187;
                        return (0, _general.getClubCollection)(cInfo.id, page);

                      case 187:
                        pCollection = _context.sent;

                      case 188:
                        if (pCollection.length < 1) {
                          mTemp.edit("Your club is empty man! Open some packs ".concat(author, "."));
                          collector.stop();
                        }

                        pMenu = (0, _general.makeClubMenu)(pCollection, author, page, aPages);
                        _context.next = 192;
                        return mTemp.edit(pMenu, {
                          code: true
                        });

                      case 192:
                        return _context.abrupt("break", 193);

                      case 193:
                        if (message.guild) r.remove(author)["catch"](function (e) {});

                      case 194:
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
            pPlayer = false;
            _context9.next = 98;
            return (0, _general.setDialogue)(mFilter, channel, 30000).then(function (m) {
              return pPlayer = m;
            }).then(function () {
              return rCollector.stop();
            }).then(function () {
              return pPlayer["delete"]();
            }).then(function () {
              return mTemp["delete"]();
            }).then(function () {
              return mTemp2["delete"]();
            })["catch"](function (e) {
              return channel.send("No response has been given. Request is no closed ".concat(author, "."));
            });

          case 98:
            if (pPlayer) {
              _context9.next = 100;
              break;
            }

            return _context9.abrupt("return");

          case 100:
            _context9.t4 = choice;
            _context9.next = _context9.t4 === 1 ? 103 : _context9.t4 === 2 ? 107 : 111;
            break;

          case 103:
            _context9.next = 105;
            return (0, _general.getTransferpilePlayerById)(cInfo.id, pPlayer.content);

          case 105:
            pPlayer = _context9.sent;
            return _context9.abrupt("break", 111);

          case 107:
            _context9.next = 109;
            return (0, _general.getClubPlayerById)(cInfo.id, pPlayer.content);

          case 109:
            pPlayer = _context9.sent;
            return _context9.abrupt("break", 111);

          case 111:
            if (!(pPlayer === null)) {
              _context9.next = 113;
              break;
            }

            return _context9.abrupt("return", channel.send("Player couldn't be found. Try again... ".concat(author)));

          case 113:
            if (!(choice === 1)) {
              _context9.next = 116;
              break;
            }

            if (!pPlayer.auction_info) {
              _context9.next = 116;
              break;
            }

            return _context9.abrupt("return", channel.send("Player has an active auction. Wait for the auction to make actions at this player. ".concat(author)));

          case 116:
            b = "\n:three: List to transfer market";
            _context9.t5 = choice;
            _context9.next = _context9.t5 === 1 ? 120 : _context9.t5 === 2 ? 123 : 126;
            break;

          case 120:
            place = "Transferpile";
            a = "Send to club";
            return _context9.abrupt("break", 126);

          case 123:
            place = "Club";
            a = "Send to transferpile";
            return _context9.abrupt("break", 126);

          case 126:
            _context9.next = 128;
            return (0, _general.getPlayerVersionById)(pPlayer.player_id);

          case 128:
            playerInfo = _context9.sent;
            min_price = playerInfo.min_price;
            _context9.next = 132;
            return (0, _general.makePlayerCard)(playerInfo);

          case 132:
            playerCard = _context9.sent;
            playerName = playerInfo.meta_info.common_name ? playerInfo.meta_info.common_name : "".concat(playerInfo.meta_info.first_name, " ").concat(playerInfo.meta_info.last_name);
            pEmbed = new _discord.RichEmbed().setTimestamp().attachFile(playerCard).setImage("attachment://card.png").setTitle("You have choosen ".concat(playerName, " his card.")).setDescription("Version: ".concat((0, _general.getRarityName)("".concat(playerInfo.rareflag, "-").concat((0, _general.getQuality)(playerInfo.rating))) ? (0, _general.getRarityName)("".concat(playerInfo.rareflag, "-").concat((0, _general.getQuality)(playerInfo.rating))) : "Unknown", "\nCurrent place: ").concat(place, "\n\nReact at this message with some choosen emojis.\n:one: Quick-sell (").concat(playerInfo.min_price, " coins)\n:two: ").concat(a).concat(b, "\n\nAfter 30 seconds without any response this request is going to be closed.")).setFooter("FUTPackBot v.1.0.0 | Made by Tjird#0001", "https://tjird.nl/futbot.jpg");
            _context9.next = 137;
            return channel.send(pEmbed).then(function (m) {
              return mTemp2 = m;
            }).then(function () {
              return mTemp2.react("1\u20E3");
            }).then(function () {
              return mTemp2.react("2\u20E3");
            }).then(function () {
              return mTemp2.react("3\u20E3");
            });

          case 137:
            _context9.t6 = choice;
            _context9.next = _context9.t6 === 1 ? 140 : _context9.t6 === 2 ? 144 : 148;
            break;

          case 140:
            rFilter = function rFilter(reaction, user) {
              return (reaction.emoji.identifier === '1%E2%83%A3' || reaction.emoji.identifier === '2%E2%83%A3' || reaction.emoji.identifier === '3%E2%83%A3') && user.id === author.id;
            };

            _context9.next = 143;
            return (0, _general.setDialogueReactions)(rFilter, mTemp2, 30000).then(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee4(r) {
                var tId, iBuy_now, iStart_price, iEnd_timestamp, _pEmbed, aId;

                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.t0 = r.emoji.identifier;
                        _context4.next = _context4.t0 === "1%E2%83%A3" ? 3 : _context4.t0 === "2%E2%83%A3" ? 11 : _context4.t0 === "3%E2%83%A3" ? 24 : 81;
                        break;

                      case 3:
                        _context4.next = 5;
                        return (0, _general.getTransferpilePlayerById)(cInfo.id, pPlayer.id);

                      case 5:
                        _context4.t1 = _context4.sent;

                        if (!(_context4.t1 == null)) {
                          _context4.next = 8;
                          break;
                        }

                        return _context4.abrupt("return", channel.send("Player couldn't be found. Try again... ".concat(author)));

                      case 8:
                        _context4.next = 10;
                        return (0, _general.removePlayerFromTransferpile)(cInfo.id, pPlayer.id).then(
                        /*#__PURE__*/
                        (0, _asyncToGenerator2["default"])(
                        /*#__PURE__*/
                        _regenerator["default"].mark(function _callee2() {
                          return _regenerator["default"].wrap(function _callee2$(_context2) {
                            while (1) {
                              switch (_context2.prev = _context2.next) {
                                case 0:
                                  _context2.next = 2;
                                  return (0, _general.addCoinsToClub)(cInfo.id, playerInfo.min_price).then(function () {
                                    return channel.send("".concat(playerName, " is successfully quick-sold for ").concat(playerInfo.min_price, " coins! ").concat(author));
                                  });

                                case 2:
                                case "end":
                                  return _context2.stop();
                              }
                            }
                          }, _callee2);
                        })));

                      case 10:
                        return _context4.abrupt("break", 81);

                      case 11:
                        _context4.next = 13;
                        return (0, _general.getTransferpilePlayerById)(cInfo.id, pPlayer.id);

                      case 13:
                        _context4.t2 = _context4.sent;

                        if (!(_context4.t2 == null)) {
                          _context4.next = 16;
                          break;
                        }

                        return _context4.abrupt("return", channel.send("Player couldn't be found. Try again... ".concat(author)));

                      case 16:
                        _context4.next = 18;
                        return (0, _general.getClubPlayer)(cInfo.id, pPlayer.player_id);

                      case 18:
                        _context4.t3 = _context4.sent;

                        if (!(_context4.t3 !== null)) {
                          _context4.next = 21;
                          break;
                        }

                        return _context4.abrupt("return", channel.send("Player can't be added to your club. The same version is already in your club. ".concat(author)));

                      case 21:
                        _context4.next = 23;
                        return (0, _general.removePlayerFromTransferpile)(cInfo.id, pPlayer.id).then(
                        /*#__PURE__*/
                        (0, _asyncToGenerator2["default"])(
                        /*#__PURE__*/
                        _regenerator["default"].mark(function _callee3() {
                          return _regenerator["default"].wrap(function _callee3$(_context3) {
                            while (1) {
                              switch (_context3.prev = _context3.next) {
                                case 0:
                                  _context3.next = 2;
                                  return (0, _general.addClubPlayer)(cInfo.id, pPlayer.player_id).then(function () {
                                    return channel.send("".concat(playerName, " is successfully moved to your club! ").concat(author));
                                  });

                                case 2:
                                case "end":
                                  return _context3.stop();
                              }
                            }
                          }, _callee3);
                        })));

                      case 23:
                        return _context4.abrupt("break", 81);

                      case 24:
                        _context4.next = 26;
                        return (0, _general.getTransferpilePlayerById)(cInfo.id, pPlayer.id);

                      case 26:
                        _context4.t4 = _context4.sent;

                        if (!(_context4.t4 == null)) {
                          _context4.next = 29;
                          break;
                        }

                        return _context4.abrupt("return", channel.send("Player couldn't be found. Try again... ".concat(author)));

                      case 29:
                        tId = pPlayer.id;
                        _context4.next = 32;
                        return channel.send("Type the start price of you player auction. ".concat(author, "\nIt needs to be equal or higher then the minimum price(").concat((0, _general.numberWithCommas)(min_price), "). Only **NUMBERS** are allowed.\nAfter 30 seconds without any response this request is going to be closed.")).then(function (m) {
                          return mTemp = m;
                        });

                      case 32:
                        _context4.next = 34;
                        return (0, _general.setDialogue)(mFilter, channel, 30000).then(function (m) {
                          return iStart_price = m;
                        }).then(function () {
                          return iStart_price["delete"]();
                        }).then(function () {
                          return mTemp["delete"]();
                        })["catch"](function (e) {
                          iStart_price["delete"]();
                          mTemp["delete"]();
                          channel.send("No response has been given. Request is no closed ".concat(author, "."));
                        });

                      case 34:
                        if (iStart_price) {
                          _context4.next = 36;
                          break;
                        }

                        return _context4.abrupt("return");

                      case 36:
                        iStart_price = iStart_price.content;

                        if (iStart_price.isNumber()) {
                          _context4.next = 39;
                          break;
                        }

                        return _context4.abrupt("return", channel.send("Only numbers are allowed as said before... You need to start all over again. ".concat(author)));

                      case 39:
                        iStart_price = (0, _general.nextCurrentBid)(iStart_price);

                        if (!(iStart_price >= 15000000)) {
                          _context4.next = 42;
                          break;
                        }

                        return _context4.abrupt("return", channel.send("Start price can't be equal or higher then 15 miliieeee. You need to start all over again. ".concat(author)));

                      case 42:
                        if (!(iStart_price < min_price)) {
                          _context4.next = 44;
                          break;
                        }

                        return _context4.abrupt("return", channel.send("Start price must be equal or higher then minimum price(".concat((0, _general.numberWithCommas)(min_price), "). You need to start all over again. ").concat(author)));

                      case 44:
                        _context4.next = 46;
                        return channel.send("Type the buy now of you player auction. ".concat(author, "\nIt needs to be higher then the start price(").concat((0, _general.numberWithCommas)(iStart_price), "). Only **NUMBERS** are allowed.\nAfter 30 seconds without any response this request is going to be closed.")).then(function (m) {
                          return mTemp = m;
                        });

                      case 46:
                        _context4.next = 48;
                        return (0, _general.setDialogue)(mFilter, channel, 30000).then(function (m) {
                          return iBuy_now = m;
                        }).then(function () {
                          return iBuy_now["delete"]();
                        }).then(function () {
                          return mTemp["delete"]();
                        })["catch"](function (e) {
                          iBuy_now["delete"]();
                          mTemp["delete"]();
                          channel.send("No response has been given. Request is no closed ".concat(author, "."));
                        });

                      case 48:
                        if (iBuy_now) {
                          _context4.next = 50;
                          break;
                        }

                        return _context4.abrupt("return");

                      case 50:
                        iBuy_now = iBuy_now.content;

                        if (iBuy_now.isNumber()) {
                          _context4.next = 53;
                          break;
                        }

                        return _context4.abrupt("return", channel.send("Only numbers are allowed as said before... You need to start all over again. ".concat(author)));

                      case 53:
                        iBuy_now = (0, _general.nextCurrentBid)(iBuy_now);

                        if (!(iBuy_now > 15000000)) {
                          _context4.next = 56;
                          break;
                        }

                        return _context4.abrupt("return", channel.send("Buy now can't be higher then 15 miliieeee. You need to start all over again. ".concat(author)));

                      case 56:
                        if (!(iBuy_now <= iStart_price)) {
                          _context4.next = 58;
                          break;
                        }

                        return _context4.abrupt("return", channel.send("Buy now can't be equal or lower then start price(".concat((0, _general.numberWithCommas)(iStart_price), "). You need to start all over again. ").concat(author)));

                      case 58:
                        _pEmbed = new _discord.RichEmbed().setFooter("FUTPackBot v.1.0.0 | Made by Tjird#0001", "https://tjird.nl/futbot.jpg").setTitle("Choose time duration menu").setDescription("React with wanted time duration for your auction. ".concat(author, "\nAfter 30 seconds without any response this request is going to be closed.\n\n:one: 1 hour\n:two: 3 hours\n:three: 6 hours\n:four: 12 hours\n:five: 1 day\n:six: 3 days"));
                        _context4.next = 61;
                        return channel.send(_pEmbed).then(function (m) {
                          return mTemp = m;
                        }).then(function () {
                          return mTemp.react("1\u20E3");
                        }).then(function () {
                          return mTemp.react("2\u20E3");
                        }).then(function () {
                          return mTemp.react("3\u20E3");
                        }).then(function () {
                          return mTemp.react("4\u20E3");
                        }).then(function () {
                          return mTemp.react("5\u20E3");
                        }).then(function () {
                          return mTemp.react("6\u20E3");
                        });

                      case 61:
                        rFilter = function rFilter(reaction, user) {
                          return (reaction.emoji.identifier === '1%E2%83%A3' || reaction.emoji.identifier === '2%E2%83%A3' || reaction.emoji.identifier === '3%E2%83%A3' || reaction.emoji.identifier === '4%E2%83%A3' || reaction.emoji.identifier === '5%E2%83%A3' || reaction.emoji.identifier === '6%E2%83%A3') && user.id === author.id;
                        };

                        _context4.next = 64;
                        return (0, _general.setDialogueReactions)(rFilter, mTemp, 30000).then(function (r) {
                          switch (r.emoji.identifier) {
                            case "1%E2%83%A3":
                              iEnd_timestamp = 3600000;
                              break;

                            case "2%E2%83%A3":
                              iEnd_timestamp = 10800000;
                              break;

                            case "3%E2%83%A3":
                              iEnd_timestamp = 21600000;
                              break;

                            case "4%E2%83%A3":
                              iEnd_timestamp = 43200000;
                              break;

                            case "5%E2%83%A3":
                              iEnd_timestamp = 86400000;
                              break;

                            case "6%E2%83%A3":
                              iEnd_timestamp = 259200000;
                              break;
                          }
                        }).then(function () {
                          return mTemp["delete"]();
                        })["catch"](function (e) {
                          mTemp["delete"]();
                          channel.send("No response has been given. Request is no closed ".concat(author, "."));
                        });

                      case 64:
                        if (iEnd_timestamp) {
                          _context4.next = 66;
                          break;
                        }

                        return _context4.abrupt("return");

                      case 66:
                        _context4.next = 68;
                        return (0, _general.getTransferpilePlayerById)(cInfo.id, tId);

                      case 68:
                        _context4.t5 = !_context4.sent;

                        if (_context4.t5) {
                          _context4.next = 74;
                          break;
                        }

                        _context4.next = 72;
                        return (0, _general.getTransferpilePlayerById)(cInfo.id, tId);

                      case 72:
                        _context4.t6 = _context4.sent;
                        _context4.t5 = _context4.t6 == null;

                      case 74:
                        if (!_context4.t5) {
                          _context4.next = 76;
                          break;
                        }

                        return _context4.abrupt("return", channel.send("Player couldn't be found in your transferpile. ".concat(author)));

                      case 76:
                        _context4.next = 78;
                        return (0, _general.addAuctionPlayer)(cInfo.id, playerInfo.id, iEnd_timestamp, iBuy_now, iStart_price);

                      case 78:
                        aId = _context4.sent;
                        (0, _general.updateTransferPlayer)(tId, aId.id).then(function () {
                          return channel.send("Player has been listed to the transfer market! ".concat(author, "\nStart price: ").concat(iStart_price, "\nBuy now: ").concat(iBuy_now, "\nTime duration: ").concat(_toTime["default"].fromMilliseconds(iEnd_timestamp).humanize()));
                        });
                        return _context4.abrupt("break", 81);

                      case 81:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x5) {
                return _ref3.apply(this, arguments);
              };
            }()).then(function () {
              return mTemp2["delete"]();
            })["catch"](function (e) {
              return channel.send("".concat(author, " your request has been called because no response has given."));
            });

          case 143:
            return _context9.abrupt("break", 148);

          case 144:
            rFilter = function rFilter(reaction, user) {
              return (reaction.emoji.identifier === '1%E2%83%A3' || reaction.emoji.identifier === '2%E2%83%A3' || reaction.emoji.identifier === '3%E2%83%A3') && user.id === author.id;
            };

            _context9.next = 147;
            return (0, _general.setDialogueReactions)(rFilter, mTemp2, 30000).then(
            /*#__PURE__*/
            function () {
              var _ref6 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee8(r) {
                var tId, iBuy_now, iStart_price, iEnd_timestamp, _pEmbed2, aId;

                return _regenerator["default"].wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.t0 = r.emoji.identifier;
                        _context8.next = _context8.t0 === "1%E2%83%A3" ? 3 : _context8.t0 === "2%E2%83%A3" ? 11 : _context8.t0 === "3%E2%83%A3" ? 24 : 87;
                        break;

                      case 3:
                        _context8.next = 5;
                        return (0, _general.getClubPlayerById)(cInfo.id, pPlayer.id);

                      case 5:
                        _context8.t1 = _context8.sent;

                        if (!(_context8.t1 == null)) {
                          _context8.next = 8;
                          break;
                        }

                        return _context8.abrupt("return", channel.send("Player couldn't be found. Try again... ".concat(author)));

                      case 8:
                        _context8.next = 10;
                        return (0, _general.removePlayerFromClub)(cInfo.id, pPlayer.id).then(
                        /*#__PURE__*/
                        (0, _asyncToGenerator2["default"])(
                        /*#__PURE__*/
                        _regenerator["default"].mark(function _callee5() {
                          return _regenerator["default"].wrap(function _callee5$(_context5) {
                            while (1) {
                              switch (_context5.prev = _context5.next) {
                                case 0:
                                  _context5.next = 2;
                                  return (0, _general.addCoinsToClub)(cInfo.id, playerInfo.min_price).then(function () {
                                    return channel.send("".concat(playerName, " is successfully quick-sold for ").concat(playerInfo.min_price, " coins! ").concat(author));
                                  });

                                case 2:
                                case "end":
                                  return _context5.stop();
                              }
                            }
                          }, _callee5);
                        })));

                      case 10:
                        return _context8.abrupt("break", 87);

                      case 11:
                        _context8.next = 13;
                        return (0, _general.getClubPlayerById)(cInfo.id, pPlayer.id);

                      case 13:
                        _context8.t2 = _context8.sent;

                        if (!(_context8.t2 == null)) {
                          _context8.next = 16;
                          break;
                        }

                        return _context8.abrupt("return", channel.send("Player couldn't be found. Try again... ".concat(author)));

                      case 16:
                        _context8.next = 18;
                        return (0, _general.getClubTransferpileCount)(cInfo.id);

                      case 18:
                        _context8.t3 = _context8.sent.length;

                        if (!(_context8.t3 > 99)) {
                          _context8.next = 21;
                          break;
                        }

                        return _context8.abrupt("return", channel.send("Player isn't able to be moved to your transferpile. Your transferpile has reached his max... ".concat(author)));

                      case 21:
                        _context8.next = 23;
                        return (0, _general.removePlayerFromClub)(cInfo.id, pPlayer.id).then(
                        /*#__PURE__*/
                        (0, _asyncToGenerator2["default"])(
                        /*#__PURE__*/
                        _regenerator["default"].mark(function _callee6() {
                          return _regenerator["default"].wrap(function _callee6$(_context6) {
                            while (1) {
                              switch (_context6.prev = _context6.next) {
                                case 0:
                                  _context6.next = 2;
                                  return (0, _general.addTransferpilePlayer)(cInfo.id, pPlayer.player_id).then(function () {
                                    return channel.send("".concat(playerName, " is successfully moved to your transferpile! ").concat(author));
                                  });

                                case 2:
                                case "end":
                                  return _context6.stop();
                              }
                            }
                          }, _callee6);
                        })));

                      case 23:
                        return _context8.abrupt("break", 87);

                      case 24:
                        _context8.next = 26;
                        return (0, _general.getClubPlayerById)(cInfo.id, pPlayer.id);

                      case 26:
                        _context8.t4 = _context8.sent;

                        if (!(_context8.t4 == null)) {
                          _context8.next = 29;
                          break;
                        }

                        return _context8.abrupt("return", channel.send("Player couldn't be found. Try again... ".concat(author)));

                      case 29:
                        _context8.next = 31;
                        return (0, _general.getClubTransferpileCount)(cInfo.id);

                      case 31:
                        _context8.t5 = _context8.sent.length;

                        if (!(_context8.t5 > 99)) {
                          _context8.next = 34;
                          break;
                        }

                        return _context8.abrupt("return", channel.send("Player isn't able to be moved to your transferpile. Your transferpile has reached his max... ".concat(author)));

                      case 34:
                        _context8.next = 36;
                        return (0, _general.removePlayerFromClub)(cInfo.id, pPlayer.id).then(
                        /*#__PURE__*/
                        (0, _asyncToGenerator2["default"])(
                        /*#__PURE__*/
                        _regenerator["default"].mark(function _callee7() {
                          return _regenerator["default"].wrap(function _callee7$(_context7) {
                            while (1) {
                              switch (_context7.prev = _context7.next) {
                                case 0:
                                  _context7.next = 2;
                                  return (0, _general.addTransferpilePlayer)(cInfo.id, pPlayer.player_id).then(function (id) {
                                    tId = id.id;
                                    channel.send("".concat(playerName, " is successfully moved to your transferpile! ").concat(author)).then(function (m) {
                                      return m["delete"](4000);
                                    });
                                  });

                                case 2:
                                case "end":
                                  return _context7.stop();
                              }
                            }
                          }, _callee7);
                        })));

                      case 36:
                        _context8.next = 38;
                        return channel.send("Type the start price of you player auction. ".concat(author, "\nIt needs to be equal or higher then the minimum price(").concat((0, _general.numberWithCommas)(min_price), "). Only **NUMBERS** are allowed.\nAfter 30 seconds without any response this request is going to be closed.")).then(function (m) {
                          return mTemp = m;
                        });

                      case 38:
                        _context8.next = 40;
                        return (0, _general.setDialogue)(mFilter, channel, 30000).then(function (m) {
                          return iStart_price = m;
                        }).then(function () {
                          return iStart_price["delete"]();
                        }).then(function () {
                          return mTemp["delete"]();
                        })["catch"](function (e) {
                          iStart_price["delete"]();
                          mTemp["delete"]();
                          channel.send("No response has been given. Request is no closed ".concat(author, "."));
                        });

                      case 40:
                        if (iStart_price) {
                          _context8.next = 42;
                          break;
                        }

                        return _context8.abrupt("return");

                      case 42:
                        iStart_price = iStart_price.content;

                        if (iStart_price.isNumber()) {
                          _context8.next = 45;
                          break;
                        }

                        return _context8.abrupt("return", channel.send("Only numbers are allowed as said before... You need to start all over again. ".concat(author)));

                      case 45:
                        iStart_price = (0, _general.nextCurrentBid)(iStart_price);

                        if (!(iStart_price >= 15000000)) {
                          _context8.next = 48;
                          break;
                        }

                        return _context8.abrupt("return", channel.send("Start price can't be equal or higher then 15 miliieeee. You need to start all over again. ".concat(author)));

                      case 48:
                        if (!(iStart_price < min_price)) {
                          _context8.next = 50;
                          break;
                        }

                        return _context8.abrupt("return", channel.send("Start price must be equal or higher then minimum price(".concat((0, _general.numberWithCommas)(min_price), "). You need to start all over again. ").concat(author)));

                      case 50:
                        _context8.next = 52;
                        return channel.send("Type the buy now of you player auction. ".concat(author, "\nIt needs to be higher then the start price(").concat((0, _general.numberWithCommas)(iStart_price), "). Only **NUMBERS** are allowed.\nAfter 30 seconds without any response this request is going to be closed.")).then(function (m) {
                          return mTemp = m;
                        });

                      case 52:
                        _context8.next = 54;
                        return (0, _general.setDialogue)(mFilter, channel, 30000).then(function (m) {
                          return iBuy_now = m;
                        }).then(function () {
                          return iBuy_now["delete"]();
                        }).then(function () {
                          return mTemp["delete"]();
                        })["catch"](function (e) {
                          iBuy_now["delete"]();
                          mTemp["delete"]();
                          channel.send("No response has been given. Request is no closed ".concat(author, "."));
                        });

                      case 54:
                        if (iBuy_now) {
                          _context8.next = 56;
                          break;
                        }

                        return _context8.abrupt("return");

                      case 56:
                        iBuy_now = iBuy_now.content;

                        if (iBuy_now.isNumber()) {
                          _context8.next = 59;
                          break;
                        }

                        return _context8.abrupt("return", channel.send("Only numbers are allowed as said before... You need to start all over again. ".concat(author)));

                      case 59:
                        iBuy_now = (0, _general.nextCurrentBid)(iBuy_now);

                        if (!(iBuy_now > 15000000)) {
                          _context8.next = 62;
                          break;
                        }

                        return _context8.abrupt("return", channel.send("Buy now can't be higher then 15 miliieeee. You need to start all over again. ".concat(author)));

                      case 62:
                        if (!(iBuy_now <= iStart_price)) {
                          _context8.next = 64;
                          break;
                        }

                        return _context8.abrupt("return", channel.send("Buy now can't be equal or lower then start price(".concat((0, _general.numberWithCommas)(iStart_price), "). You need to start all over again. ").concat(author)));

                      case 64:
                        _pEmbed2 = new _discord.RichEmbed().setFooter("FUTPackBot v.1.0.0 | Made by Tjird#0001", "https://tjird.nl/futbot.jpg").setTitle("Choose time duration menu").setDescription("React with wanted time duration for your auction. ".concat(author, "\nAfter 30 seconds without any response this request is going to be closed.\n\n:one: 1 hour\n:two: 3 hours\n:three: 6 hours\n:four: 12 hours\n:five: 1 day\n:six: 3 days"));
                        _context8.next = 67;
                        return channel.send(_pEmbed2).then(function (m) {
                          return mTemp = m;
                        }).then(function () {
                          return mTemp.react("1\u20E3");
                        }).then(function () {
                          return mTemp.react("2\u20E3");
                        }).then(function () {
                          return mTemp.react("3\u20E3");
                        }).then(function () {
                          return mTemp.react("4\u20E3");
                        }).then(function () {
                          return mTemp.react("5\u20E3");
                        }).then(function () {
                          return mTemp.react("6\u20E3");
                        });

                      case 67:
                        rFilter = function rFilter(reaction, user) {
                          return (reaction.emoji.identifier === '1%E2%83%A3' || reaction.emoji.identifier === '2%E2%83%A3' || reaction.emoji.identifier === '3%E2%83%A3' || reaction.emoji.identifier === '4%E2%83%A3' || reaction.emoji.identifier === '5%E2%83%A3' || reaction.emoji.identifier === '6%E2%83%A3') && user.id === author.id;
                        };

                        _context8.next = 70;
                        return (0, _general.setDialogueReactions)(rFilter, mTemp, 30000).then(function (r) {
                          switch (r.emoji.identifier) {
                            case "1%E2%83%A3":
                              iEnd_timestamp = 3600000;
                              break;

                            case "2%E2%83%A3":
                              iEnd_timestamp = 10800000;
                              break;

                            case "3%E2%83%A3":
                              iEnd_timestamp = 21600000;
                              break;

                            case "4%E2%83%A3":
                              iEnd_timestamp = 43200000;
                              break;

                            case "5%E2%83%A3":
                              iEnd_timestamp = 86400000;
                              break;

                            case "6%E2%83%A3":
                              iEnd_timestamp = 259200000;
                              break;
                          }
                        }).then(function () {
                          return mTemp["delete"]();
                        })["catch"](function (e) {
                          mTemp["delete"]();
                          channel.send("No response has been given. Request is no closed ".concat(author, "."));
                        });

                      case 70:
                        if (iEnd_timestamp) {
                          _context8.next = 72;
                          break;
                        }

                        return _context8.abrupt("return");

                      case 72:
                        _context8.next = 74;
                        return (0, _general.getTransferpilePlayerById)(cInfo.id, tId);

                      case 74:
                        _context8.t6 = !_context8.sent;

                        if (_context8.t6) {
                          _context8.next = 80;
                          break;
                        }

                        _context8.next = 78;
                        return (0, _general.getTransferpilePlayerById)(cInfo.id, tId);

                      case 78:
                        _context8.t7 = _context8.sent;
                        _context8.t6 = _context8.t7 == null;

                      case 80:
                        if (!_context8.t6) {
                          _context8.next = 82;
                          break;
                        }

                        return _context8.abrupt("return", channel.send("Player couldn't be found in your transferpile. ".concat(author)));

                      case 82:
                        _context8.next = 84;
                        return (0, _general.addAuctionPlayer)(cInfo.id, playerInfo.id, iEnd_timestamp, iBuy_now, iStart_price);

                      case 84:
                        aId = _context8.sent;
                        (0, _general.updateTransferPlayer)(tId, aId.id).then(function () {
                          return channel.send("Player has been listed to the transfer market! ".concat(author, "\nStart price: ").concat(iStart_price, "\nBuy now: ").concat(iBuy_now, "\nTime duration: ").concat(_toTime["default"].fromMilliseconds(iEnd_timestamp).humanize()));
                        });
                        return _context8.abrupt("break", 87);

                      case 87:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              }));

              return function (_x6) {
                return _ref6.apply(this, arguments);
              };
            }()).then(function () {
              return mTemp2["delete"]();
            })["catch"](function (e) {
              return channel.send("".concat(author, " your request has been called because no response has given."));
            });

          case 147:
            return _context9.abrupt("break", 148);

          case 148:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

String.prototype.isNumber = function () {
  return /^\d+$/.test(this);
};