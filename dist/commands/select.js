"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _general = require("../functions/general");

var _discord = require("discord.js");

exports.run =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(client, message, args) {
    var transferpile, club, choice, author, channel, mTemp, rFilter, count, cInfo, mFilter, mPlayerName, pCollection, page, pMenu, mTemp2, aPages, rCollector, pPlayer, place, a, b, playerInfo, playerCard, playerName, pEmbed;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
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
              _context8.next = 13;
              break;
            }

            _context8.next = 8;
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

            _context8.next = 11;
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
              _context8.next = 13;
              break;
            }

            return _context8.abrupt("return");

          case 13:
            _context8.next = 15;
            return (0, _general.getUserClubId)(author.id);

          case 15:
            cInfo = _context8.sent;
            _context8.t0 = choice;
            _context8.next = _context8.t0 === 1 ? 19 : _context8.t0 === 2 ? 25 : 31;
            break;

          case 19:
            _context8.next = 21;
            return (0, _general.getClubTransferpileCount)(cInfo.id);

          case 21:
            count = _context8.sent.length;

            if (!(count < 1)) {
              _context8.next = 24;
              break;
            }

            return _context8.abrupt("return", channel.send("Your transferpile is empty man! ".concat(author, ".")));

          case 24:
            return _context8.abrupt("break", 31);

          case 25:
            _context8.next = 27;
            return (0, _general.getClubCollectionCount)(cInfo.id);

          case 27:
            count = _context8.sent.length;

            if (!(count < 1)) {
              _context8.next = 30;
              break;
            }

            return _context8.abrupt("return", channel.send("Your club is empty man! Open some packs ".concat(author, ".")));

          case 30:
            return _context8.abrupt("break", 31);

          case 31:
            channel.send("Put in a (part of the) playername you want to search. ".concat(author, "\nIf you want all results, put in a '-' or say 30 seconds nothing.")).then(function (m) {
              return mTemp = m;
            });

            mFilter = function mFilter(m) {
              return m.author.id === author.id;
            };

            page = 1;
            _context8.next = 36;
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
              _context8.next = 50;
              break;
            }

            _context8.t1 = choice;
            _context8.next = _context8.t1 === 1 ? 40 : _context8.t1 === 2 ? 44 : 48;
            break;

          case 40:
            _context8.next = 42;
            return (0, _general.getClubTransferpile)(cInfo.id, page, mPlayerName.content);

          case 42:
            pCollection = _context8.sent;
            return _context8.abrupt("break", 48);

          case 44:
            _context8.next = 46;
            return (0, _general.getClubCollection)(cInfo.id, page, mPlayerName.content);

          case 46:
            pCollection = _context8.sent;
            return _context8.abrupt("break", 48);

          case 48:
            _context8.next = 61;
            break;

          case 50:
            _context8.t2 = choice;
            _context8.next = _context8.t2 === 1 ? 53 : _context8.t2 === 2 ? 57 : 61;
            break;

          case 53:
            _context8.next = 55;
            return (0, _general.getClubTransferpile)(cInfo.id, page);

          case 55:
            pCollection = _context8.sent;
            return _context8.abrupt("break", 61);

          case 57:
            _context8.next = 59;
            return (0, _general.getClubCollection)(cInfo.id, page);

          case 59:
            pCollection = _context8.sent;
            return _context8.abrupt("break", 61);

          case 61:
            if (!(pCollection.length < 1)) {
              _context8.next = 63;
              break;
            }

            return _context8.abrupt("return", channel.send("No players are found with this criteria. Try again later... ".concat(author)));

          case 63:
            _context8.t3 = choice;
            _context8.next = _context8.t3 === 1 ? 66 : _context8.t3 === 2 ? 76 : 86;
            break;

          case 66:
            _context8.next = 68;
            return (0, _general.getClubTransferpileCount)(cInfo.id);

          case 68:
            count = _context8.sent.length;

            if (!(count < 1)) {
              _context8.next = 71;
              break;
            }

            return _context8.abrupt("return", channel.send("Your transferpile is empty man! ".concat(author, ".")));

          case 71:
            aPages = Math.ceil(count / 18);
            _context8.next = 74;
            return (0, _general.makeTransferMenu)(pCollection, author, page, aPages, count);

          case 74:
            pMenu = _context8.sent;
            return _context8.abrupt("break", 86);

          case 76:
            _context8.next = 78;
            return (0, _general.getClubCollectionCount)(cInfo.id);

          case 78:
            count = _context8.sent.length;

            if (!(count < 1)) {
              _context8.next = 81;
              break;
            }

            return _context8.abrupt("return", channel.send("Your club is empty man! Open some packs ".concat(author, ".")));

          case 81:
            aPages = Math.ceil(count / 18);
            _context8.next = 84;
            return (0, _general.makeClubMenu)(pCollection, author, page, aPages);

          case 84:
            pMenu = _context8.sent;
            return _context8.abrupt("break", 86);

          case 86:
            _context8.next = 88;
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
            rFilter = function rFilter(reaction, user) {
              return user.id === author.id;
            };

            rCollector = mTemp.createReactionCollector(rFilter, {
              time: 30000
            });
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
            _context8.next = 94;
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

          case 94:
            if (pPlayer) {
              _context8.next = 96;
              break;
            }

            return _context8.abrupt("return");

          case 96:
            _context8.t4 = choice;
            _context8.next = _context8.t4 === 1 ? 99 : _context8.t4 === 2 ? 103 : 107;
            break;

          case 99:
            _context8.next = 101;
            return (0, _general.getTransferpilePlayerById)(cInfo.id, pPlayer.content);

          case 101:
            pPlayer = _context8.sent;
            return _context8.abrupt("break", 107);

          case 103:
            _context8.next = 105;
            return (0, _general.getClubPlayerById)(cInfo.id, pPlayer.content);

          case 105:
            pPlayer = _context8.sent;
            return _context8.abrupt("break", 107);

          case 107:
            if (!(pPlayer === null)) {
              _context8.next = 109;
              break;
            }

            return _context8.abrupt("return", channel.send("Player couldn't be found. Try again... ".concat(author)));

          case 109:
            if (!(choice === 1)) {
              _context8.next = 112;
              break;
            }

            if (!pPlayer.auction_info) {
              _context8.next = 112;
              break;
            }

            return _context8.abrupt("return", channel.send("Player has an active auction. Wait for the auction to make actions at this player. ".concat(author)));

          case 112:
            b = "";
            _context8.t5 = choice;
            _context8.next = _context8.t5 === 1 ? 116 : _context8.t5 === 2 ? 119 : 122;
            break;

          case 116:
            place = "Transferpile";
            a = "Send to club"; //b += "\n:three: List to transfer market"; UNCOMMENT THIS STUPID TJIRD

            return _context8.abrupt("break", 122);

          case 119:
            place = "Club";
            a = "Send to transferpile";
            return _context8.abrupt("break", 122);

          case 122:
            _context8.next = 124;
            return (0, _general.getPlayerVersionById)(pPlayer.player_id);

          case 124:
            playerInfo = _context8.sent;
            _context8.next = 127;
            return (0, _general.makePlayerCard)(playerInfo);

          case 127:
            playerCard = _context8.sent;
            playerName = playerInfo.meta_info.common_name ? playerInfo.meta_info.common_name : "".concat(playerInfo.meta_info.first_name, " ").concat(playerInfo.meta_info.last_name);
            pEmbed = new _discord.RichEmbed().setTimestamp().attachFile(playerCard).setImage("attachment://card.png").setTitle("You have choosen ".concat(playerName, " his card.")).setDescription("Version: ".concat((0, _general.getRarityName)("".concat(playerInfo.rareflag, "-").concat((0, _general.getQuality)(playerInfo.rating))) ? (0, _general.getRarityName)("".concat(playerInfo.rareflag, "-").concat((0, _general.getQuality)(playerInfo.rating))) : "Unknown", "\nCurrent place: ").concat(place, "\n\nReact at this message with some choosen emojis.\n:one: Quick-sell (").concat(playerInfo.min_price, " coins)\n:two: ").concat(a).concat(b, "\n\nAfter 30 seconds without any response this request is going to be closed.")).setFooter("FUTPackBot v.1.0.0 | Made by Tjird#0001", "https://tjird.nl/futbot.jpg");
            _context8.next = 132;
            return channel.send(pEmbed).then(function (m) {
              return mTemp = m;
            }).then(function () {
              return mTemp.react("1\u20E3");
            }).then(function () {
              return mTemp.react("2\u20E3");
            }).then(function () {//if (choice === 1) mTemp.react("\u0033\u20E3"); UNCOMMENT THIS STUPID TJIRD
            });

          case 132:
            _context8.t6 = choice;
            _context8.next = _context8.t6 === 1 ? 135 : _context8.t6 === 2 ? 139 : 143;
            break;

          case 135:
            rFilter = function rFilter(reaction, user) {
              return (reaction.emoji.identifier === '1%E2%83%A3' || reaction.emoji.identifier === '2%E2%83%A3' || reaction.emoji.identifier === '3%E2%83%A3') && user.id === author.id;
            };

            _context8.next = 138;
            return (0, _general.setDialogueReactions)(rFilter, mTemp, 30000).then(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee4(r) {
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.t0 = r.emoji.identifier;
                        _context4.next = _context4.t0 === "1%E2%83%A3" ? 3 : _context4.t0 === "2%E2%83%A3" ? 11 : _context4.t0 === "3%E2%83%A3" ? 24 : 30;
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
                        return _context4.abrupt("break", 30);

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
                        return _context4.abrupt("break", 30);

                      case 24:
                        _context4.next = 26;
                        return (0, _general.getClubTransferpileCount)(cInfo.id).length;

                      case 26:
                        _context4.t4 = _context4.sent;

                        if (!(_context4.t4 > 99)) {
                          _context4.next = 29;
                          break;
                        }

                        return _context4.abrupt("return", channel.send("Player isn't able to be moved to your transferpile. Your transferpile has reached his max... ".concat(author)));

                      case 29:
                        return _context4.abrupt("break", 30);

                      case 30:
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
              return mTemp["delete"]();
            })["catch"](function (e) {
              return channel.send("".concat(author, " your request has been called because no response has given."));
            });

          case 138:
            return _context8.abrupt("break", 143);

          case 139:
            rFilter = function rFilter(reaction, user) {
              return (reaction.emoji.identifier === '1%E2%83%A3' || reaction.emoji.identifier === '2%E2%83%A3') && user.id === author.id;
            };

            _context8.next = 142;
            return (0, _general.setDialogueReactions)(rFilter, mTemp, 30000).then(
            /*#__PURE__*/
            function () {
              var _ref6 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee7(r) {
                return _regenerator["default"].wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.t0 = r.emoji.identifier;
                        _context7.next = _context7.t0 === "1%E2%83%A3" ? 3 : _context7.t0 === "2%E2%83%A3" ? 11 : 24;
                        break;

                      case 3:
                        _context7.next = 5;
                        return (0, _general.getClubPlayerById)(cInfo.id, pPlayer.id);

                      case 5:
                        _context7.t1 = _context7.sent;

                        if (!(_context7.t1 == null)) {
                          _context7.next = 8;
                          break;
                        }

                        return _context7.abrupt("return", channel.send("Player couldn't be found. Try again... ".concat(author)));

                      case 8:
                        _context7.next = 10;
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
                        return _context7.abrupt("break", 24);

                      case 11:
                        _context7.next = 13;
                        return (0, _general.getClubPlayerById)(cInfo.id, pPlayer.id);

                      case 13:
                        _context7.t2 = _context7.sent;

                        if (!(_context7.t2 == null)) {
                          _context7.next = 16;
                          break;
                        }

                        return _context7.abrupt("return", channel.send("Player couldn't be found. Try again... ".concat(author)));

                      case 16:
                        _context7.next = 18;
                        return (0, _general.getClubTransferpileCount)(cInfo.id).length;

                      case 18:
                        _context7.t3 = _context7.sent;

                        if (!(_context7.t3 > 99)) {
                          _context7.next = 21;
                          break;
                        }

                        return _context7.abrupt("return", channel.send("Player isn't able to be moved to your transferpile. Your transferpile has reached his max... ".concat(author)));

                      case 21:
                        _context7.next = 23;
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
                        return _context7.abrupt("break", 24);

                      case 24:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function (_x6) {
                return _ref6.apply(this, arguments);
              };
            }()).then(function () {
              return mTemp["delete"]();
            })["catch"](function (e) {
              return channel.send("".concat(author, " your request has been called because no response has given."));
            });

          case 142:
            return _context8.abrupt("break", 143);

          case 143:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();