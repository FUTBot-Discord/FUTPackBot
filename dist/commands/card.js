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
  _regenerator["default"].mark(function _callee(client, message, args) {
    var ran, player_info, positions, packCard, ctx, colors, background, playerpicture, playername, nation, club, attachment;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ran = (0, _randomWeightedChoice["default"])([{
              weight: 76,
              id: "gold+75"
            }, {
              weight: 18,
              id: "gold+82"
            }, {
              weight: 4.2,
              id: "gold+84"
            }, {
              weight: 1.8,
              id: "totw"
            }]);
            _context.next = 3;
            return (0, _general.getPlayer)(75, 99, "47,48");

          case 3:
            player_info = _context.sent;
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
            }); // Canvas.registerFont(`fut.ttf`, { family: "DIN Condensed Web" });
            // Canvas.registerFont(`futlight.ttf`, { family: "DIN Condensed Web Light" });

            packCard = Canvas.createCanvas(644 / 2.15, 900 / 2.15);
            ctx = packCard.getContext('2d');
            _context.next = 11;
            return (0, _general.getCardColor)(player_info.rareflag, player_info.rating);

          case 11:
            colors = _context.sent;
            _context.next = 14;
            return Canvas.loadImage("http://fifa.tjird.nl/cards/".concat(player_info.rareflag, "-").concat((0, _general.getQuality)(player_info.rating), ".png"));

          case 14:
            background = _context.sent;
            ctx.drawImage(background, 0, 0, 644 / 2.15, 900 / 2.15);
            _context.next = 18;
            return Canvas.loadImage(player_info.meta_info.img);

          case 18:
            playerpicture = _context.sent;
            ctx.drawImage(playerpicture, 95, 57, 160, 160);
            playername = player_info.meta_info.common_name ? player_info.meta_info.common_name.toUpperCase() : player_info.meta_info.last_name.toUpperCase();
            ctx.font = "19px '".concat(colors.font_3, "'");
            ctx.fillStyle = "#".concat(colors.color_text);
            ctx.textAlign = "center";
            ctx.fillText(playername, packCard.width / 2, 240);
            ctx.font = "45px '".concat(colors.font_1, "'");
            ctx.fillText(player_info.rating, 90, 93);
            ctx.font = "28px '".concat(colors.font_2, "'");
            ctx.fillText(player_info.preferred_position.toUpperCase(), 90, 119);
            _context.next = 31;
            return Canvas.loadImage(player_info.nation_info.img);

          case 31:
            nation = _context.sent;
            ctx.drawImage(nation, 70, 128, nation.width * 0.6, nation.height * 0.6);
            _context.next = 35;
            return Canvas.loadImage(player_info.club_info.img);

          case 35:
            club = _context.sent;
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
            message.channel.send(attachment);

          case 78:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();