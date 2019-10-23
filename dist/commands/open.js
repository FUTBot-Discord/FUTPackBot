"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Canvas = _interopRequireWildcard(require("canvas"));

var _discord = require("discord.js");

var _randomWeightedChoice = _interopRequireDefault(require("random-weighted-choice"));

var _general = require("../functions/general");

exports.run =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(client, message, args) {
    var ran, weights, values, delay, player_info, card, channel, author, secondText, embed;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ran = (0, _randomWeightedChoice["default"])([{
              weight: 78,
              id: "gold+75"
            }, {
              weight: 15.3,
              id: "gold+82"
            }, {
              weight: 4.7,
              id: "gold+86"
            }, {
              weight: 3.8,
              id: "totw"
            }, {
              weight: 0.7,
              id: "icon"
            }, {
              weight: 2.9,
              id: "scream"
            }]);
            weights = {
              "gold+75": {
                ratingB: 75,
                ratingT: 81,
                rarity: "0,1,47,48"
              },
              "gold+82": {
                ratingB: 82,
                ratingT: 85,
                rarity: "0,1,47,48"
              },
              "gold+86": {
                ratingB: 86,
                ratingT: 99,
                rarity: "0,1,47,48"
              },
              "totw": {
                ratingB: 75,
                ratingT: 99,
                rarity: "3"
              },
              "icon": {
                ratingB: 75,
                ratingT: 99,
                rarity: "12"
              },
              "scream": {
                ratingB: 75,
                ratingT: 99,
                rarity: "22"
              }
            };
            values = weights[ran];

            delay = function delay(ms) {
              return new Promise(function (res) {
                return setTimeout(res, ms);
              });
            };

            _context2.next = 6;
            return (0, _general.getPlayer)(values.ratingB, values.ratingT, values.rarity);

          case 6:
            player_info = _context2.sent;
            _context2.next = 9;
            return makeCard(player_info);

          case 9:
            card = _context2.sent;
            channel = message.channel;
            author = message.author;
            secondText = ["Not even a board... Yeeezz...", "nonrare"];
            if (player_info.rareflag === 1) secondText = ["Not even a board... Yeeezz...", "rare"];
            if (player_info.rareflag !== 3 && player_info.rating > 82 || player_info.rareflag === 3 && player_info.rating <= 82) secondText = ["Decend, it's a board!", "board"];
            if (player_info.rareflag !== 3 && player_info.rating > 85 || player_info.rareflag === 3 && player_info.rating >= 83 || player_info.rareflag === 12) secondText = ["WALKOUT!!!", "walkout"];
            embed = new _discord.RichEmbed().setColor("0xE51E0A").setTimestamp().attachFile("pack_animations/".concat(secondText[1], ".gif"), "animation.gif").setImage("attachment://animation.gif").setTitle("Opening a gold pack", "https://tjird.nl/futbot.jpg");
            channel.send(embed).then(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(m) {
                var quality;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return delay(5500);

                      case 2:
                        embed = new _discord.RichEmbed().setColor("0xE51E0A").setTimestamp() // .attachFile(`pack_animations/${secondText[1]}.gif`, "animation.gif")
                        .setImage("attachment://animation.gif").setTitle(secondText[0], "https://tjird.nl/futbot.jpg");
                        m.edit(embed);
                        _context.next = 6;
                        return delay(3000);

                      case 6:
                        quality = (0, _general.getQuality)(player_info.rating);
                        embed = new _discord.RichEmbed().setColor("0xE51E0A").attachFile(card).setTimestamp().setImage("attachment://card.png").setDescription("Version: ".concat((0, _general.getRarityName)("".concat(player_info.rareflag, "-").concat(quality)) ? (0, _general.getRarityName)("".concat(player_info.rareflag, "-").concat(quality)) : "Unknown")).setTitle("".concat(author.username, "#").concat(author.discriminator, " has packed ").concat(player_info.meta_info.common_name ? player_info.meta_info.common_name : "".concat(player_info.meta_info.first_name, " ").concat(player_info.meta_info.last_name)), "https://tjird.nl/futbot.jpg").setFooter("FUTPackBot v.1.0.0 | Made by Tjird#0001", "https://tjird.nl/futbot.jpg");
                        m["delete"]();
                        channel.send(embed);

                      case 10:
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

          case 18:
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

            if (playername.length < 17) {
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