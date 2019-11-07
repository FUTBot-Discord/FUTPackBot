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
  _regenerator["default"].mark(function _callee2(client, message, args) {
    var transferpile, club, choice, author, channel, mTemp, rFilter, count, cInfo, mFilter, mPlayerName, pCollection, page, pMenu, mTemp2, aPages, rCollector, pPlayer, place, a, b, playerInfo, playerCard, playerName, pEmbed;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
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
              _context2.next = 13;
              break;
            }

            _context2.next = 8;
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

            _context2.next = 11;
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
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return");

          case 13:
            _context2.next = 15;
            return (0, _general.getUserClubId)(author.id);

          case 15:
            cInfo = _context2.sent;
            _context2.t0 = choice;
            _context2.next = _context2.t0 === 1 ? 19 : _context2.t0 === 2 ? 25 : 31;
            break;

          case 19:
            _context2.next = 21;
            return (0, _general.getClubTransferpileCount)(cInfo.id);

          case 21:
            count = _context2.sent.length;

            if (!(count < 1)) {
              _context2.next = 24;
              break;
            }

            return _context2.abrupt("return", channel.send("Your transferpile is empty man! ".concat(author, ".")));

          case 24:
            return _context2.abrupt("break", 31);

          case 25:
            _context2.next = 27;
            return (0, _general.getClubCollectionCount)(cInfo.id);

          case 27:
            count = _context2.sent.length;

            if (!(count < 1)) {
              _context2.next = 30;
              break;
            }

            return _context2.abrupt("return", channel.send("Your club is empty man! Open some packs ".concat(author, ".")));

          case 30:
            return _context2.abrupt("break", 31);

          case 31:
            channel.send("Put in a (part of the) playername you want to search. ".concat(author, "\nIf you want all results, put in a '-' or say 30 seconds nothing.")).then(function (m) {
              return mTemp = m;
            });

            mFilter = function mFilter(m) {
              return m.author.id === author.id;
            };

            page = 1;
            _context2.next = 36;
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
              _context2.next = 50;
              break;
            }

            _context2.t1 = choice;
            _context2.next = _context2.t1 === 1 ? 40 : _context2.t1 === 2 ? 44 : 48;
            break;

          case 40:
            _context2.next = 42;
            return (0, _general.getClubTransferpile)(cInfo.id, page, mPlayerName.content);

          case 42:
            pCollection = _context2.sent;
            return _context2.abrupt("break", 48);

          case 44:
            _context2.next = 46;
            return (0, _general.getClubCollection)(cInfo.id, page, mPlayerName.content);

          case 46:
            pCollection = _context2.sent;
            return _context2.abrupt("break", 48);

          case 48:
            _context2.next = 61;
            break;

          case 50:
            _context2.t2 = choice;
            _context2.next = _context2.t2 === 1 ? 53 : _context2.t2 === 2 ? 57 : 61;
            break;

          case 53:
            _context2.next = 55;
            return (0, _general.getClubTransferpile)(cInfo.id, page);

          case 55:
            pCollection = _context2.sent;
            return _context2.abrupt("break", 61);

          case 57:
            _context2.next = 59;
            return (0, _general.getClubCollection)(cInfo.id, page);

          case 59:
            pCollection = _context2.sent;
            return _context2.abrupt("break", 61);

          case 61:
            _context2.t3 = choice;
            _context2.next = _context2.t3 === 1 ? 64 : _context2.t3 === 2 ? 74 : 84;
            break;

          case 64:
            _context2.next = 66;
            return (0, _general.getClubTransferpileCount)(cInfo.id);

          case 66:
            count = _context2.sent.length;

            if (!(count < 1)) {
              _context2.next = 69;
              break;
            }

            return _context2.abrupt("return", channel.send("Your transferpile is empty man! ".concat(author, ".")));

          case 69:
            aPages = Math.ceil(count / 18);
            _context2.next = 72;
            return (0, _general.makeTransferMenu)(pCollection, author, page, aPages, count);

          case 72:
            pMenu = _context2.sent;
            return _context2.abrupt("break", 84);

          case 74:
            _context2.next = 76;
            return (0, _general.getClubCollectionCount)(cInfo.id);

          case 76:
            count = _context2.sent.length;

            if (!(count < 1)) {
              _context2.next = 79;
              break;
            }

            return _context2.abrupt("return", channel.send("Your club is empty man! Open some packs ".concat(author, ".")));

          case 79:
            aPages = Math.ceil(count / 18);
            _context2.next = 82;
            return (0, _general.makeClubMenu)(pCollection, author, page, aPages);

          case 82:
            pMenu = _context2.sent;
            return _context2.abrupt("break", 84);

          case 84:
            _context2.next = 86;
            return channel.send(pMenu, {
              code: true
            }).then(function (m) {
              return mTemp = m;
            }).then(function () {
              channel.send("Type the **ID** your player you want to select. ".concat(author, "\nIf the player is at the transfer market, you can do nothing with him.\nAfter 30 seconds without any response this request is going to be closed.")).then(function (m) {
                return mTemp2 = m;
              });
            });

          case 86:
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
            _context2.next = 92;
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

          case 92:
            if (pPlayer) {
              _context2.next = 94;
              break;
            }

            return _context2.abrupt("return");

          case 94:
            _context2.t4 = choice;
            _context2.next = _context2.t4 === 1 ? 97 : _context2.t4 === 2 ? 101 : 105;
            break;

          case 97:
            _context2.next = 99;
            return (0, _general.getTransferpilePlayerById)(cInfo.id, pPlayer.content);

          case 99:
            pPlayer = _context2.sent;
            return _context2.abrupt("break", 105);

          case 101:
            _context2.next = 103;
            return (0, _general.getClubPlayerById)(cInfo.id, pPlayer.content);

          case 103:
            pPlayer = _context2.sent;
            return _context2.abrupt("break", 105);

          case 105:
            if (!(pPlayer === null)) {
              _context2.next = 107;
              break;
            }

            return _context2.abrupt("return", channel.send("Player couldn't be found. Try again... ".concat(author)));

          case 107:
            if (!(choice === 1)) {
              _context2.next = 110;
              break;
            }

            if (!pPlayer.auction_info) {
              _context2.next = 110;
              break;
            }

            return _context2.abrupt("return", channel.send("Player has an active auction. Wait for the auction to make actions at this player. ".concat(author)));

          case 110:
            b = "";
            _context2.t5 = choice;
            _context2.next = _context2.t5 === 1 ? 114 : _context2.t5 === 2 ? 118 : 121;
            break;

          case 114:
            place = "Transferpile";
            a = "Send to club";
            b += "\n:three: List to transfer market";
            return _context2.abrupt("break", 121);

          case 118:
            place = "Club";
            a = "Send to transferpile";
            return _context2.abrupt("break", 121);

          case 121:
            _context2.next = 123;
            return (0, _general.getPlayerVersionById)(pPlayer.player_id);

          case 123:
            playerInfo = _context2.sent;
            _context2.next = 126;
            return (0, _general.makePlayerCard)(playerInfo);

          case 126:
            playerCard = _context2.sent;
            playerName = playerInfo.meta_info.common_name ? playerInfo.meta_info.common_name : "".concat(playerInfo.meta_info.first_name, " ").concat(playerInfo.meta_info.last_name);
            pEmbed = new _discord.RichEmbed().setTimestamp().attachFile(playerCard).setImage("attachment://card.png").setTitle("You have choosen ".concat(playerName, " his card.")).setDescription("Version: ".concat((0, _general.getRarityName)("".concat(playerInfo.rareflag, "-").concat((0, _general.getQuality)(playerInfo.rating))) ? (0, _general.getRarityName)("".concat(playerInfo.rareflag, "-").concat((0, _general.getQuality)(playerInfo.rating))) : "Unknown", "\nCurrent place: ").concat(place, "\n\nReact at this message with some choosen emojis.\n:one: Quick-sell (").concat(playerInfo.min_price, " coins)\n:two: ").concat(a).concat(b)).setFooter("FUTPackBot v.1.0.0 | Made by Tjird#0001", "https://tjird.nl/futbot.jpg");
            _context2.next = 131;
            return channel.send(pEmbed).then(function (m) {
              return mTemp = m;
            }).then(function () {
              return mTemp.react("1\u20E3");
            }).then(function () {
              return mTemp.react("2\u20E3");
            }).then(function () {
              if (choice === 1) mTemp.react("3\u20E3");
            });

          case 131:
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