"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _graphqlRequest = require("graphql-request");

var Canvas = _interopRequireWildcard(require("canvas"));

var _discord = require("discord.js");

var _asciiTable = _interopRequireDefault(require("ascii-table"));

var _humanizeDuration = _interopRequireDefault(require("humanize-duration"));

var graphql = new _graphqlRequest.GraphQLClient(process.env.G_ENDPOINT, {
  headers: {}
});

var raritiesList = require('../../rarities.json');

function getQuality(rating) {
  if (rating < 65) return "bronze";
  if (rating < 75) return "silver";
  return "gold";
}

;

function getRarityName(rarity) {
  if (raritiesList.find(function (x) {
    return x.id == rarity;
  })) return raritiesList.find(function (x) {
    return x.id === rarity;
  }).rarity;
  return "Unknown cardtype";
}

;

function getPlayer(_x, _x2, _x3) {
  return _getPlayer.apply(this, arguments);
}

function _getPlayer() {
  _getPlayer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ratingB, ratingT, rareflag) {
    var query, res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = "{ getPlayerVersionPackEmulator(ratingB: ".concat(ratingB, ", ratingT: ").concat(ratingT, ", rareflag: \"").concat(rareflag, "\") { def dri id nation_info{ img } pac pas phy meta_info{ common_name last_name first_name img } preferred_position rareflag rating sho min_price club_info{ img } } }");
            _context.next = 3;
            return graphql.request(query);

          case 3:
            res = _context.sent;
            return _context.abrupt("return", res.getPlayerVersionPackEmulator);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getPlayer.apply(this, arguments);
}

;

function getCardColor(_x4, _x5) {
  return _getCardColor.apply(this, arguments);
}

function _getCardColor() {
  _getCardColor = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(rareflag, rating) {
    var rarity, query, res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            rarity = "".concat(rareflag, "-").concat(getQuality(rating));
            query = "{ getCardColorsByRarity(rarity:\"".concat(rarity, "\") { rarity color_text color_stripes color_attr_names color_attr_values font_1 font_2 font_3 } }");
            _context2.next = 4;
            return graphql.request(query);

          case 4:
            res = _context2.sent;
            return _context2.abrupt("return", res.getCardColorsByRarity);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getCardColor.apply(this, arguments);
}

;

function getPacks() {
  return _getPacks.apply(this, arguments);
}

function _getPacks() {
  _getPacks = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var query, res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            query = "{ getPacks { id name_id name description price players points } }";
            _context3.next = 3;
            return graphql.request(query);

          case 3:
            res = _context3.sent;
            return _context3.abrupt("return", res.getPacks);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getPacks.apply(this, arguments);
}

;

function getPacksByName(_x6) {
  return _getPacksByName.apply(this, arguments);
}

function _getPacksByName() {
  _getPacksByName = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(name) {
    var query, res;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            query = "{ getPacks(name: \"".concat(name, "\") { id name_id name description price players points } }");
            _context4.next = 3;
            return graphql.request(query);

          case 3:
            res = _context4.sent;
            return _context4.abrupt("return", res.getPacks);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getPacksByName.apply(this, arguments);
}

;

function getPackById(_x7) {
  return _getPackById.apply(this, arguments);
}

function _getPackById() {
  _getPackById = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(id) {
    var query, res;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            query = "{ getPackById(id: ".concat(id, ") { name players } }");
            _context5.next = 3;
            return graphql.request(query);

          case 3:
            res = _context5.sent;
            return _context5.abrupt("return", res.getPackById);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getPackById.apply(this, arguments);
}

;

function addClubPlayer(_x8, _x9) {
  return _addClubPlayer.apply(this, arguments);
}

function _addClubPlayer() {
  _addClubPlayer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(club_id, player_id) {
    var query;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            query = "mutation { addClubPlayer(club_id: \"".concat(club_id, "\", player_id: \"").concat(player_id, "\") { id } }");
            _context6.prev = 1;
            _context6.next = 4;
            return graphql.request(query);

          case 4:
            _context6.next = 10;
            break;

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](1);
            console.log(_context6.t0);
            return _context6.abrupt("return", false);

          case 10:
            return _context6.abrupt("return", true);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 6]]);
  }));
  return _addClubPlayer.apply(this, arguments);
}

;

function makeOptionMenu(packs) {
  var t = new _asciiTable["default"]().setHeading('ID', 'Name', 'Price', 'Points').setAlign(1, _asciiTable["default"].LEFT).setAlign(2, _asciiTable["default"].CENTER).setAlign(3, _asciiTable["default"].LEFT).setAlign(4, _asciiTable["default"].LEFT);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = packs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var pack = _step.value;
      t.addRow(pack.id, pack.name, numberWithCommas(pack.price), numberWithCommas(pack.points));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return t;
}

;

function makeAuctionMenu(auctions, a, p, pp) {
  var t = new _asciiTable["default"]().setTitle("Transfer market for ".concat(a.username, "#").concat(a.discriminator, ". Page ").concat(p, "/").concat(pp, ".")).setHeading('ID', 'Name', 'Rating', 'Current bid', 'Buy now', 'Time remaining').setAlign(1, _asciiTable["default"].LEFT).setAlign(2, _asciiTable["default"].LEFT).setAlign(3, _asciiTable["default"].LEFT).setAlign(4, _asciiTable["default"].LEFT).setAlign(5, _asciiTable["default"].LEFT).setAlign(6, _asciiTable["default"].LEFT);
  var cDate = new Date();
  cDate = cDate.getTime();
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = auctions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var auction = _step2.value;
      var bid = auction.current_bid;
      if (bid < 1) bid = "-";
      t.addRow(auction.id, auction.card_info.meta_info.common_name ? auction.card_info.meta_info.common_name : "".concat(auction.card_info.meta_info.first_name, " ").concat(auction.card_info.meta_info.last_name), auction.card_info.rating, numberWithCommas(bid), numberWithCommas(auction.buy_now), (0, _humanizeDuration["default"])(auction.end_timestamp - cDate, {
        round: true,
        largest: 1
      }));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return t;
}

;

function makeClubMenu(players, a, p, pp) {
  var t = new _asciiTable["default"]().setTitle("Club player(s) from ".concat(a.username, "#").concat(a.discriminator, ". Page ").concat(p, "/").concat(pp, ".")).setHeading('ID', 'Name', 'Rating', 'Version', 'Position').setAlign(1, _asciiTable["default"].LEFT).setAlign(2, _asciiTable["default"].LEFT).setAlign(3, _asciiTable["default"].LEFT).setAlign(4, _asciiTable["default"].LEFT).setAlign(5, _asciiTable["default"].LEFT);
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = players[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var player = _step3.value;
      t.addRow(player.id, player.card_info.meta_info.common_name ? player.card_info.meta_info.common_name : "".concat(player.card_info.meta_info.first_name, " ").concat(player.card_info.meta_info.last_name), player.card_info.rating, getRarityName("".concat(player.card_info.rareflag, "-").concat(getQuality(player.card_info.rating))), player.card_info.preferred_position);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return t;
}

;

function getUserClubId(_x10) {
  return _getUserClubId.apply(this, arguments);
}

function _getUserClubId() {
  _getUserClubId = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(author_id) {
    var query, res;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            query = "{ getUserClubByAuthorId(author_id: \"".concat(author_id, "\") { id points coins creation_time } }");
            _context7.next = 3;
            return graphql.request(query);

          case 3:
            res = _context7.sent;
            return _context7.abrupt("return", res.getUserClubByAuthorId);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _getUserClubId.apply(this, arguments);
}

;

function getCurrentAuctionsCount(_x11, _x12) {
  return _getCurrentAuctionsCount.apply(this, arguments);
}

function _getCurrentAuctionsCount() {
  _getCurrentAuctionsCount = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(club_id, name) {
    var query, res;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!name || name == undefined) {
              query = "{ getCurrentAuctionsCount(club_id: \"".concat(club_id, "\") { auctions } }");
            } else {
              query = "{ getCurrentAuctionsCount(club_id: \"".concat(club_id, "\", name: \"").concat(name, "\") { auctions } }");
            }

            _context8.next = 3;
            return graphql.request(query);

          case 3:
            res = _context8.sent;
            return _context8.abrupt("return", res.getCurrentAuctionsCount);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _getCurrentAuctionsCount.apply(this, arguments);
}

;

function createUserClub(_x13) {
  return _createUserClub.apply(this, arguments);
}

function _createUserClub() {
  _createUserClub = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9(author_id) {
    var query;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            query = "mutation { createUserClub(author_id: \"".concat(author_id, "\") { id } }");
            _context9.prev = 1;
            _context9.next = 4;
            return graphql.request(query);

          case 4:
            _context9.next = 10;
            break;

          case 6:
            _context9.prev = 6;
            _context9.t0 = _context9["catch"](1);
            console.log(_context9.t0);
            return _context9.abrupt("return", false);

          case 10:
            return _context9.abrupt("return", true);

          case 11:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 6]]);
  }));
  return _createUserClub.apply(this, arguments);
}

;

function getClubPlayer(_x14, _x15) {
  return _getClubPlayer.apply(this, arguments);
}

function _getClubPlayer() {
  _getClubPlayer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10(club_id, player_id) {
    var query, res;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            query = "{ getClubPlayer(club_id: \"".concat(club_id, "\", player_id: \"").concat(player_id, "\") { id } }");
            _context10.next = 3;
            return graphql.request(query);

          case 3:
            res = _context10.sent;
            return _context10.abrupt("return", res.getClubPlayer);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _getClubPlayer.apply(this, arguments);
}

;

function getActiveAuctions(_x16, _x17, _x18) {
  return _getActiveAuctions.apply(this, arguments);
}

function _getActiveAuctions() {
  _getActiveAuctions = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee11(club_id, page, name) {
    var query, res;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            if (!name || name == undefined) {
              query = "{ getCurrentAuctions(club_id: \"".concat(club_id, "\", page: ").concat(page, ") { id current_bid buy_now end_timestamp card_info{ rating rareflag preferred_position meta_info{ first_name last_name common_name } } } }");
            } else {
              query = "{ getCurrentAuctions(club_id: \"".concat(club_id, "\", name: \"").concat(name, "\", page: ").concat(page, ") { id current_bid buy_now end_timestamp card_info{ rating rareflag preferred_position meta_info{ first_name last_name common_name } } } }");
            }

            _context11.next = 3;
            return graphql.request(query);

          case 3:
            res = _context11.sent;
            return _context11.abrupt("return", res.getCurrentAuctions);

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _getActiveAuctions.apply(this, arguments);
}

;

function addCoinsToClub(_x19, _x20) {
  return _addCoinsToClub.apply(this, arguments);
}

function _addCoinsToClub() {
  _addCoinsToClub = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee12(club_id, coins) {
    var query;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            query = "mutation { addCoinsToClub(club_id: \"".concat(club_id, "\", coins: \"").concat(coins, "\") { id } }");
            _context12.prev = 1;
            _context12.next = 4;
            return graphql.request(query);

          case 4:
            _context12.next = 10;
            break;

          case 6:
            _context12.prev = 6;
            _context12.t0 = _context12["catch"](1);
            console.log(_context12.t0);
            return _context12.abrupt("return", false);

          case 10:
            return _context12.abrupt("return", true);

          case 11:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[1, 6]]);
  }));
  return _addCoinsToClub.apply(this, arguments);
}

;

function removeCoinsFromClub(_x21, _x22) {
  return _removeCoinsFromClub.apply(this, arguments);
}

function _removeCoinsFromClub() {
  _removeCoinsFromClub = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee13(club_id, coins) {
    var query;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            query = "mutation { removeCoinsFromClub(club_id: \"".concat(club_id, "\", coins: \"").concat(coins, "\") { id } }");
            _context13.prev = 1;
            _context13.next = 4;
            return graphql.request(query);

          case 4:
            _context13.next = 10;
            break;

          case 6:
            _context13.prev = 6;
            _context13.t0 = _context13["catch"](1);
            console.log(_context13.t0);
            return _context13.abrupt("return", false);

          case 10:
            return _context13.abrupt("return", true);

          case 11:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[1, 6]]);
  }));
  return _removeCoinsFromClub.apply(this, arguments);
}

;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

;

function getAnimation(rf, rt) {
  var a = "nonrare";
  if (rf === 1) a = "rare";
  if (rf !== 3 && rt >= 83 || rf === 3 && rt <= 82 || rf === 48) a = "board";
  if (rf !== 3 && rt > 85 || rf === 3 && rt >= 83 || rf === 12) a = "walkout";
  return a;
}

;

function makePlayerCard(_x23) {
  return _makePlayerCard.apply(this, arguments);
}

function _makePlayerCard() {
  _makePlayerCard = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee14(player_info) {
    var positions, packCard, ctx, colors, background, playerpicture, playername, pSize, pHeight, nation, club, attachment;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
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
            _context14.next = 9;
            return getCardColor(player_info.rareflag, player_info.rating);

          case 9:
            colors = _context14.sent;
            _context14.next = 12;
            return Canvas.loadImage("http://fifa.tjird.nl/cards/".concat(player_info.rareflag, "-").concat(getQuality(player_info.rating), ".png"));

          case 12:
            background = _context14.sent;
            ctx.drawImage(background, 0, 0, 644 / 2.15, 900 / 2.15);
            _context14.next = 16;
            return Canvas.loadImage(player_info.meta_info.img);

          case 16:
            playerpicture = _context14.sent;
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
            _context14.next = 32;
            return Canvas.loadImage(player_info.nation_info.img);

          case 32:
            nation = _context14.sent;
            ctx.drawImage(nation, 70, 128, nation.width * 0.6, nation.height * 0.6);
            _context14.next = 36;
            return Canvas.loadImage(player_info.club_info.img);

          case 36:
            club = _context14.sent;
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
            return _context14.abrupt("return", attachment);

          case 79:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _makePlayerCard.apply(this, arguments);
}

;

function setDialogue(_x24, _x25, _x26) {
  return _setDialogue.apply(this, arguments);
}

function _setDialogue() {
  _setDialogue = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee16(f, c, t) {
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            return _context16.abrupt("return", new Promise(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee15(resolve, reject) {
                return _regenerator["default"].wrap(function _callee15$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        _context15.next = 2;
                        return c.awaitMessages(f, {
                          max: 1,
                          time: t
                        }).then(function (collected) {
                          var f = collected.first();
                          if (f.content.toLowerCase() === "stop" || f.content.toLowerCase() === "cancel") reject(1);
                          resolve(f);
                        })["catch"](function (e) {
                          reject(2);
                        });

                      case 2:
                      case "end":
                        return _context15.stop();
                    }
                  }
                }, _callee15);
              }));

              return function (_x30, _x31) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return _setDialogue.apply(this, arguments);
}

;

function getClubCollectionCount(_x27) {
  return _getClubCollectionCount.apply(this, arguments);
}

function _getClubCollectionCount() {
  _getClubCollectionCount = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee17(club_id) {
    var query, res;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            query = "{ getClubCollection(club_id: \"".concat(club_id, "\") { player_id } }");
            _context17.next = 3;
            return graphql.request(query);

          case 3:
            res = _context17.sent;
            return _context17.abrupt("return", res.getClubCollection);

          case 5:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));
  return _getClubCollectionCount.apply(this, arguments);
}

;

function getClubCollection(_x28, _x29) {
  return _getClubCollection.apply(this, arguments);
}

function _getClubCollection() {
  _getClubCollection = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee18(club_id, page) {
    var query, res;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            query = "{ getClubCollection(club_id: \"".concat(club_id, "\", page: ").concat(page, ") { id card_info { rating rareflag preferred_position meta_info { first_name last_name common_name } } } }");
            _context18.next = 3;
            return graphql.request(query);

          case 3:
            res = _context18.sent;
            return _context18.abrupt("return", res.getClubCollection);

          case 5:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));
  return _getClubCollection.apply(this, arguments);
}

;
module.exports = {
  getQuality: getQuality,
  getRarityName: getRarityName,
  getPlayer: getPlayer,
  getCardColor: getCardColor,
  getPacks: getPacks,
  getPacksByName: getPacksByName,
  numberWithCommas: numberWithCommas,
  getPackById: getPackById,
  getAnimation: getAnimation,
  addClubPlayer: addClubPlayer,
  getUserClubId: getUserClubId,
  createUserClub: createUserClub,
  getClubPlayer: getClubPlayer,
  addCoinsToClub: addCoinsToClub,
  removeCoinsFromClub: removeCoinsFromClub,
  makePlayerCard: makePlayerCard,
  setDialogue: setDialogue,
  makeOptionMenu: makeOptionMenu,
  getClubCollectionCount: getClubCollectionCount,
  getClubCollection: getClubCollection,
  getActiveAuctions: getActiveAuctions,
  makeAuctionMenu: makeAuctionMenu,
  getCurrentAuctionsCount: getCurrentAuctionsCount,
  makeClubMenu: makeClubMenu
};