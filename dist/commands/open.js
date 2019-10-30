"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Canvas = _interopRequireWildcard(require("canvas"));

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
    var channel, author, wPacks, iPacks, delay, players_info, tPacks, w, chance, players_count, card, animation, embed;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            channel = message.channel;
            author = message.author;

            if (!(!args[0] || args[0] == undefined)) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", channel.send("You need to fill in an id of a pack. ".concat(author)));

          case 4:
            _context2.t0 = JSON;
            _context2.next = 7;
            return redis.get(args[0]);

          case 7:
            _context2.t1 = _context2.sent;
            wPacks = _context2.t0.parse.call(_context2.t0, _context2.t1);

            if (!(!wPacks || wPacks == undefined)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", channel.send("You need to fill in a valid id of a pack. ".concat(author)));

          case 11:
            _context2.next = 13;
            return (0, _general.getPackById)(args[0]);

          case 13:
            iPacks = _context2.sent;

            delay = function delay(ms) {
              return new Promise(function (res) {
                return setTimeout(res, ms);
              });
            };

            players_info = [];
            _context2.t2 = JSON;
            _context2.next = 19;
            return redis.get("information");

          case 19:
            _context2.t3 = _context2.sent;
            tPacks = _context2.t2.parse.call(_context2.t2, _context2.t3);
            players_count = 1;

          case 22:
            if (!(players_count <= iPacks.players)) {
              _context2.next = 34;
              break;
            }

            chance = new _chance.Chance();
            w = tPacks[chance.weighted(wPacks[0], wPacks[1])];
            console.log(w);
            _context2.t4 = players_info;
            _context2.next = 29;
            return (0, _general.getPlayer)(w.ratingB, w.ratingT, w.rarity);

          case 29:
            _context2.t5 = _context2.sent;

            _context2.t4.push.call(_context2.t4, _context2.t5);

          case 31:
            players_count++;
            _context2.next = 22;
            break;

          case 34:
            console.log("==========");
            players_info = players_info.sort(function (a, b) {
              return a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0;
            });
            _context2.next = 38;
            return makeCard(players_info[0]);

          case 38:
            card = _context2.sent;
            animation = (0, _general.getAnimation)(players_info[0].rareflag, players_info[0].rating);
            embed = new _discord.RichEmbed().setColor("0xE51E0A").setTimestamp().attachFile("pack_animations/".concat(animation, ".gif"), "".concat(animation, ".gif")).setImage("attachment://".concat(animation, ".gif")).setFooter("FUTPackBot v.1.0.0 | Made by Tjird#0001", "https://tjird.nl/futbot.jpg").setTitle("".concat(author.username, "#").concat(author.discriminator, " is opening a ").concat(iPacks.name), "https://tjird.nl/futbot.jpg");
            channel.send(embed).then(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(m) {
                var quality, other_players, i;
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
                          other_players.push("Playername: ".concat(players_info[i].meta_info.common_name ? "".concat(players_info[i].meta_info.common_name, " (").concat(players_info[i].meta_info.first_name, " ").concat(players_info[i].meta_info.last_name, ")") : "".concat(players_info[i].meta_info.first_name, " ").concat(players_info[i].meta_info.last_name), "\nVersion: ").concat((0, _general.getRarityName)("".concat(players_info[i].rareflag, "-").concat((0, _general.getQuality)(players_info[i].rating))) ? (0, _general.getRarityName)("".concat(players_info[i].rareflag, "-").concat((0, _general.getQuality)(players_info[i].rating))) : "Unknown", "\nRating: ").concat(players_info[i].rating));
                        }

                        embed = new _discord.RichEmbed().setColor("0xE51E0A").attachFile(card).setTimestamp().setImage("attachment://card.png").setDescription("Version: ".concat((0, _general.getRarityName)("".concat(players_info[0].rareflag, "-").concat(quality)) ? (0, _general.getRarityName)("".concat(players_info[0].rareflag, "-").concat(quality)) : "Unknown", "\nPack: ").concat(iPacks.name, "\n\nOther players obtained through this pack are listed below.\n\n").concat(other_players.join("\n\n"))).setTitle("".concat(author.username, "#").concat(author.discriminator, " has packed ").concat(players_info[0].meta_info.common_name ? players_info[0].meta_info.common_name : "".concat(players_info[0].meta_info.first_name, " ").concat(players_info[0].meta_info.last_name)), "https://tjird.nl/futbot.jpg").setFooter("FUTPackBot v.1.0.0 | Made by Tjird#0001", "https://tjird.nl/futbot.jpg");
                        m["delete"]();
                        channel.send(embed);

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

          case 42:
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

function makeCard(_x5) {
  return _makeCard.apply(this, arguments);
}

function _makeCard() {
  _makeCard = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(player_info) {
    var positions, packCard, ctx, colors, background, playerpicture, playername, pSize, pHeight, nation, club, attachment;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            positions = {
              p: {
                "pac": "pac",
                "sho": "sho",
                "pas": "pas",
                "dri": "dri",
                "def": "def",
                "phy": "phy"
              },
              g: {
                "pac": "DIV",
                "sho": "HAN",
                "pas": "KIC",
                "dri": "REF",
                "def": "SPE",
                "phy": "POS"
              }
            };
            Canvas.registerFont("Roboto-Bold.ttf", {
              family: "Roboto Bold"
            });
            Canvas.registerFont("Champions-Regular.otf", {
              family: "Champions"
            });
            Canvas.registerFont("fut.ttf", {
              family: "DIN Condensed Web"
            });
            Canvas.registerFont("futlight.ttf", {
              family: "DIN Condensed Web Light"
            });
            packCard = Canvas.createCanvas(644 / 2.15, 900 / 2.15);
            ctx = packCard.getContext('2d');
            _context3.next = 9;
            return (0, _general.getCardColor)(player_info.rareflag, player_info.rating);

          case 9:
            colors = _context3.sent;
            _context3.next = 12;
            return Canvas.loadImage("http://fifa.tjird.nl/cards/".concat(player_info.rareflag, "-").concat((0, _general.getQuality)(player_info.rating), ".png"));

          case 12:
            background = _context3.sent;
            ctx.drawImage(background, 0, 0, 644 / 2.15, 900 / 2.15);
            _context3.next = 16;
            return Canvas.loadImage(player_info.meta_info.img);

          case 16:
            playerpicture = _context3.sent;
            ctx.drawImage(playerpicture, 95, 57, 160, 160);
            playername = player_info.meta_info.common_name ? player_info.meta_info.common_name.toUpperCase() : player_info.meta_info.last_name.toUpperCase();
            pSize = '19px';
            pHeight = 241;

            if (playername.length < 15) {
              pSize = '24px';
              pHeight = 241;
            }

            ctx.font = "".concat(pSize, " '").concat(colors.font_3, "'");
            ctx.fillStyle = "#".concat(colors.color_text);
            ctx.textAlign = "center";
            ctx.fillText(playername, packCard.width / 2, pHeight);
            ctx.font = "45px '".concat(colors.font_1, "'");
            ctx.fillText(player_info.rating, 90, 93);
            ctx.font = "28px '".concat(colors.font_2, "'");
            ctx.fillText(player_info.preferred_position.toUpperCase(), 90, 119);
            _context3.next = 32;
            return Canvas.loadImage(player_info.nation_info.img);

          case 32:
            nation = _context3.sent;
            ctx.drawImage(nation, 70, 128, nation.width * 0.6, nation.height * 0.6);
            _context3.next = 36;
            return Canvas.loadImage(player_info.club_info.img);

          case 36:
            club = _context3.sent;
            ctx.drawImage(club, 70, 165, club.width * 0.31, club.height * 0.31);
            ctx.font = "18px '".concat(colors.font_3, "'");
            ctx.fillStyle = "#".concat(colors.color_attr_values);
            ctx.textAlign = "center";
            ctx.fillText(player_info.pac, packCard.width * 0.28, packCard.height * 0.67);
            ctx.fillText(player_info.sho, packCard.width * 0.28, packCard.height * 0.73);
            ctx.fillText(player_info.pas, packCard.width * 0.28, packCard.height * 0.79);
            ctx.fillText(player_info.dri, packCard.width * 0.598, packCard.height * 0.67);
            ctx.fillText(player_info.def, packCard.width * 0.598, packCard.height * 0.73);
            ctx.fillText(player_info.phy, packCard.width * 0.598, packCard.height * 0.79);

            if (player_info.preferred_position === "GK") {
              positions = positions.g;
            } else {
              positions = positions.p;
            }

            ctx.fillStyle = "#".concat(colors.color_attr_names);
            ctx.textAlign = "left";
            ctx.fillText(positions.pac.toUpperCase(), packCard.width * 0.33, packCard.height * 0.67);
            ctx.fillText(positions.sho.toUpperCase(), packCard.width * 0.33, packCard.height * 0.73);
            ctx.fillText(positions.pas.toUpperCase(), packCard.width * 0.33, packCard.height * 0.79);
            ctx.fillText(positions.dri.toUpperCase(), packCard.width * 0.648, packCard.height * 0.67);
            ctx.fillText(positions.def.toUpperCase(), packCard.width * 0.648, packCard.height * 0.73);
            ctx.fillText(positions.phy.toUpperCase(), packCard.width * 0.648, packCard.height * 0.79);
            ctx.strokeStyle = "#".concat(colors.color_stripes);
            ctx.beginPath();
            ctx.moveTo(80, 124);
            ctx.lineTo(101, 124);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(80, 160);
            ctx.lineTo(101, 160);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(packCard.width / 2, 262);
            ctx.lineTo(packCard.width / 2, 337);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(62, 249);
            ctx.lineTo(235, 249);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(packCard.width / 2 - 23, 350);
            ctx.lineTo(packCard.width / 2 + 23, 350);
            ctx.stroke();
            attachment = new _discord.Attachment(packCard.toBuffer(), 'card.png');
            return _context3.abrupt("return", attachment);

          case 79:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _makeCard.apply(this, arguments);
}