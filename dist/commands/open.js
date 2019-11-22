"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _discord = require("discord.js");

var _chance = require("chance");

var _general = require("../functions/general");

var _asyncRedis = require("async-redis");

var redis = (0, _asyncRedis.createClient)({
  "host": process.env.R_HOST,
  "db": 15,
  "retry_strategy": function retry_strategy(options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('The server refused the connection');
    }

    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error('Retry time exhausted');
    }

    if (options.attempt > 10) {
      return undefined;
    }

    return Math.min(options.attempt * 100, 3000);
  }
});

exports.run =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(client, message, args) {
    var channel, author, pID, f, mTemp, mTemp2, pName, packList, wPacks, iPacks, delay, clubuser, players_info, tPacks, w, chance, players_count, duplicates, transferpile, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, p, o, card, animation, embed;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            channel = message.channel;
            author = message.author;

            if (!(!args[0] || args[0] == undefined)) {
              _context2.next = 35;
              break;
            }

            f = function f(m) {
              return m.author.id === author.id;
            };

            channel.send("Send the name of the pack you want to open.\n\n*This request is being cancelled in 20 seconds*").then(function (m) {
              return mTemp = m;
            });
            _context2.next = 7;
            return (0, _general.setDialogue)(f, channel, 20000).then(function (m) {
              return pName = m;
            }).then(function (m) {
              return m["delete"]();
            }).then(function () {
              return mTemp["delete"]();
            })["catch"](function (e) {
              switch (e) {
                case 1:
                  return channel.send("Request cancelled by ".concat(author, "."));

                case 2:
                  return channel.send("Time exceeded for ".concat(author, "."));
              }

              ;
            });

          case 7:
            if (pName) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return");

          case 9:
            _context2.next = 11;
            return (0, _general.getPacksByName)(pName.content);

          case 11:
            packList = _context2.sent;

            if (!(packList.length < 1)) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt("return", channel.send("Try again... No packs where found with that name ".concat(author, ".\nYou can get a whole list of available packs with `pack!list`.")));

          case 16:
            if (!(packList.length === 1)) {
              _context2.next = 20;
              break;
            }

            pID = packList[0].id;
            _context2.next = 33;
            break;

          case 20:
            _context2.t0 = channel;
            _context2.next = 23;
            return (0, _general.makeOptionMenuPacks)(packList);

          case 23:
            _context2.t1 = _context2.sent;
            _context2.t2 = {
              code: true
            };

            _context2.t3 = function (m) {
              return mTemp = m;
            };

            _context2.t0.send.call(_context2.t0, _context2.t1, _context2.t2).then(_context2.t3);

            channel.send("Send the **ID** of the pack you want to open.\n\n*This request is being cancelled in 20 seconds*").then(function (m) {
              return mTemp2 = m;
            });
            _context2.next = 30;
            return (0, _general.setDialogue)(f, channel, 20000).then(function (m) {
              return pID = m;
            }).then(function (m) {
              return m["delete"]();
            }).then(function () {
              return mTemp["delete"]();
            }).then(function () {
              return mTemp2["delete"]();
            })["catch"](function (e) {
              switch (e) {
                case 1:
                  return channel.send("Request cancelled by ".concat(author, "."));

                case 2:
                  return channel.send("Time exceeded for ".concat(author, "."));
              }

              ;
            });

          case 30:
            if (pID) {
              _context2.next = 32;
              break;
            }

            return _context2.abrupt("return");

          case 32:
            pID = pID.content;

          case 33:
            _context2.next = 36;
            break;

          case 35:
            pID = args[0];

          case 36:
            _context2.t4 = JSON;
            _context2.next = 39;
            return redis.get(pID);

          case 39:
            _context2.t5 = _context2.sent;
            wPacks = _context2.t4.parse.call(_context2.t4, _context2.t5);

            if (!(!wPacks || wPacks == undefined)) {
              _context2.next = 43;
              break;
            }

            return _context2.abrupt("return", channel.send("You need to fill in a valid id of a pack. ".concat(author)));

          case 43:
            _context2.next = 45;
            return (0, _general.getPackById)(pID);

          case 45:
            iPacks = _context2.sent;

            delay = function delay(ms) {
              return new Promise(function (res) {
                return setTimeout(res, ms);
              });
            };

            _context2.next = 49;
            return (0, _general.getUserClubId)(author.id);

          case 49:
            clubuser = _context2.sent;

            if (!(clubuser.points > iPacks.points)) {
              _context2.next = 55;
              break;
            }

            _context2.next = 53;
            return (0, _general.removePointsFromClub)(clubuser.id, iPacks.points);

          case 53:
            _context2.next = 61;
            break;

          case 55:
            if (!(clubuser.coins > iPacks.price)) {
              _context2.next = 60;
              break;
            }

            _context2.next = 58;
            return (0, _general.removeCoinsFromClub)(clubuser.id, iPacks.price);

          case 58:
            _context2.next = 61;
            break;

          case 60:
            return _context2.abrupt("return", channel.send("You don't have enough coins/points to open this pack. ".concat(author)));

          case 61:
            players_info = [];
            _context2.t6 = JSON;
            _context2.next = 65;
            return redis.get("information");

          case 65:
            _context2.t7 = _context2.sent;
            tPacks = _context2.t6.parse.call(_context2.t6, _context2.t7);
            players_count = 1;

          case 68:
            if (!(players_count <= iPacks.players)) {
              _context2.next = 79;
              break;
            }

            chance = new _chance.Chance();
            w = tPacks[chance.weighted(wPacks[0], wPacks[1])];
            _context2.t8 = players_info;
            _context2.next = 74;
            return (0, _general.getPlayer)(w.ratingB, w.ratingT, w.rarity);

          case 74:
            _context2.t9 = _context2.sent;

            _context2.t8.push.call(_context2.t8, _context2.t9);

          case 76:
            players_count++;
            _context2.next = 68;
            break;

          case 79:
            duplicates = [];
            transferpile = [];
            players_info = players_info.sort(function (a, b) {
              return a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0;
            });
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 85;
            _iterator = players_info[Symbol.iterator]();

          case 87:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 112;
              break;
            }

            p = _step.value;
            _context2.next = 91;
            return (0, _general.getClubPlayer)(clubuser.id, p.id);

          case 91:
            o = _context2.sent;

            if (!(o !== null)) {
              _context2.next = 107;
              break;
            }

            _context2.next = 95;
            return (0, _general.getClubTransferpileCount)(clubuser.id);

          case 95:
            _context2.t10 = _context2.sent.length;

            if (!(_context2.t10 < 100)) {
              _context2.next = 102;
              break;
            }

            transferpile.push(p.id);
            _context2.next = 100;
            return (0, _general.addTransferpilePlayer)(clubuser.id, p.id);

          case 100:
            _context2.next = 105;
            break;

          case 102:
            duplicates.push(p.id);
            _context2.next = 105;
            return (0, _general.addCoinsToClub)(clubuser.id, p.min_price);

          case 105:
            _context2.next = 109;
            break;

          case 107:
            _context2.next = 109;
            return (0, _general.addClubPlayer)(clubuser.id, p.id);

          case 109:
            _iteratorNormalCompletion = true;
            _context2.next = 87;
            break;

          case 112:
            _context2.next = 118;
            break;

          case 114:
            _context2.prev = 114;
            _context2.t11 = _context2["catch"](85);
            _didIteratorError = true;
            _iteratorError = _context2.t11;

          case 118:
            _context2.prev = 118;
            _context2.prev = 119;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 121:
            _context2.prev = 121;

            if (!_didIteratorError) {
              _context2.next = 124;
              break;
            }

            throw _iteratorError;

          case 124:
            return _context2.finish(121);

          case 125:
            return _context2.finish(118);

          case 126:
            _context2.next = 128;
            return (0, _general.makePlayerCard)(players_info[0]);

          case 128:
            card = _context2.sent;
            animation = (0, _general.getAnimation)(players_info[0].rareflag, players_info[0].rating);
            embed = new _discord.RichEmbed().setColor("0xE51E0A").setTimestamp().attachFile("pack_animations/".concat(animation, ".gif"), "".concat(animation, ".gif")).setImage("attachment://".concat(animation, ".gif")).setFooter("FUTPackBot v.1.0.0 | Made by Tjird#0001", "https://tjird.nl/futbot.jpg").setTitle("".concat(author.username, "#").concat(author.discriminator, " is opening a ").concat(iPacks.name), "https://tjird.nl/futbot.jpg");
            channel.send(embed).then(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(m) {
                var quality, other_players, i, t;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return delay(10000);

                      case 2:
                        quality = (0, _general.getQuality)(players_info[0].rating);
                        other_players = [];

                        for (i = 1; i < players_info.length; i++) {
                          if (duplicates.includes(players_info[i].id)) {
                            other_players.push("Playername: ".concat(players_info[i].meta_info.common_name ? "".concat(players_info[i].meta_info.common_name, " (").concat(players_info[i].meta_info.first_name, " ").concat(players_info[i].meta_info.last_name, ")") : "".concat(players_info[i].meta_info.first_name, " ").concat(players_info[i].meta_info.last_name), "\nVersion: ").concat((0, _general.getRarityName)("".concat(players_info[i].rareflag, "-").concat((0, _general.getQuality)(players_info[i].rating))) ? (0, _general.getRarityName)("".concat(players_info[i].rareflag, "-").concat((0, _general.getQuality)(players_info[i].rating))) : "Unknown", "\nRating: ").concat(players_info[i].rating, "\nQuick-sold for ").concat(players_info[i].min_price, " because no space left in transferpile."));
                          } else if (transferpile.includes(players_info[i].id)) {
                            other_players.push("Playername: ".concat(players_info[i].meta_info.common_name ? "".concat(players_info[i].meta_info.common_name, " (").concat(players_info[i].meta_info.first_name, " ").concat(players_info[i].meta_info.last_name, ")") : "".concat(players_info[i].meta_info.first_name, " ").concat(players_info[i].meta_info.last_name), "\nVersion: ").concat((0, _general.getRarityName)("".concat(players_info[i].rareflag, "-").concat((0, _general.getQuality)(players_info[i].rating))) ? (0, _general.getRarityName)("".concat(players_info[i].rareflag, "-").concat((0, _general.getQuality)(players_info[i].rating))) : "Unknown", "\nRating: ").concat(players_info[i].rating, "\nSend to transferpile because it's a duplicate."));
                          } else {
                            other_players.push("Playername: ".concat(players_info[i].meta_info.common_name ? "".concat(players_info[i].meta_info.common_name, " (").concat(players_info[i].meta_info.first_name, " ").concat(players_info[i].meta_info.last_name, ")") : "".concat(players_info[i].meta_info.first_name, " ").concat(players_info[i].meta_info.last_name), "\nVersion: ").concat((0, _general.getRarityName)("".concat(players_info[i].rareflag, "-").concat((0, _general.getQuality)(players_info[i].rating))) ? (0, _general.getRarityName)("".concat(players_info[i].rareflag, "-").concat((0, _general.getQuality)(players_info[i].rating))) : "Unknown", "\nRating: ").concat(players_info[i].rating));
                          }
                        }

                        t = "";
                        if (duplicates.includes(players_info[0].id)) t = "\nQuick-sold for ".concat(players_info[0].min_price, " because because no space left in transferpile.");
                        if (transferpile.includes(players_info[0].id)) t = "\nSend to transferpile because it's a duplicate.";
                        embed = new _discord.RichEmbed().setColor("0xE51E0A").attachFile(card).setTimestamp().setImage("attachment://card.png").setDescription("Version: ".concat((0, _general.getRarityName)("".concat(players_info[0].rareflag, "-").concat(quality)) ? (0, _general.getRarityName)("".concat(players_info[0].rareflag, "-").concat(quality)) : "Unknown", "\nPack: ").concat(iPacks.name).concat(t, "\n\nOther players obtained through this pack are listed below.\n\n").concat(other_players.join("\n\n"))).setTitle("".concat(author.username, "#").concat(author.discriminator, " has packed ").concat(players_info[0].meta_info.common_name ? players_info[0].meta_info.common_name : "".concat(players_info[0].meta_info.first_name, " ").concat(players_info[0].meta_info.last_name)), "https://tjird.nl/futbot.jpg").setFooter("FUTPackBot v.1.0.0 | Made by Tjird#0001", "https://tjird.nl/futbot.jpg");
                        m["delete"]()["catch"](function (e) {
                          if (e.code !== 50013) return channel.send("The packed players are stored to your club and duplicates has been quick-sold/send to transferpile.\nSomething just went wrong with the opening.");
                          return channel.send("The packed players are stored to your club and duplicates has been quick-sold/send to transferpile.\nIt looks like the bot has the wrong permissions. Make sure that it can do all the following actions:\n- Manage Messages\n- Embed Links\n- Attach Files");
                        });
                        channel.send(embed)["catch"](function (e) {
                          if (e.code !== 50013) return channel.send("The packed players are stored to your club and duplicates has been quick-sold/send to transferpile.\nSomething just went wrong with the opening.");
                          return channel.send("The packed players are stored to your club and duplicates has been quick-sold/send to transferpile.\nIt looks like the bot has the wrong permissions. Make sure that it can do all the following actions:\n- Manage Messages\n- Embed Links\n- Attach Files");
                        });

                      case 11:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }())["catch"](function (e) {
              if (e.code !== 50013) return channel.send("The packed players are stored to your club and duplicates has been quick-sold/send to transferpile.\nSomething just went wrong with the opening.");
              return channel.send("The packed players are stored to your club and duplicates has been quick-sold/send to transferpile.\nIt looks like the bot has the wrong permissions. Make sure that it can do all the following actions:\n- Manage Messages\n- Embed Links\n- Attach Files");
            });

          case 132:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[85, 114, 118, 126], [119,, 121, 125]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();