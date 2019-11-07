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

function getPlayerVersionById(_x8) {
  return _getPlayerVersionById.apply(this, arguments);
}

function _getPlayerVersionById() {
  _getPlayerVersionById = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(id) {
    var query, res;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            query = "{ getPlayerVersionById(id: ".concat(id, ") { def dri id nation_info{ img } pac pas phy meta_info{ common_name last_name first_name img } preferred_position rareflag rating sho min_price club_info{ img } } }");
            _context6.next = 3;
            return graphql.request(query);

          case 3:
            res = _context6.sent;
            return _context6.abrupt("return", res.getPlayerVersionById);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getPlayerVersionById.apply(this, arguments);
}

;

function addClubPlayer(_x9, _x10) {
  return _addClubPlayer.apply(this, arguments);
}

function _addClubPlayer() {
  _addClubPlayer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(club_id, player_id) {
    var query;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            query = "mutation { addClubPlayer(club_id: \"".concat(club_id, "\", player_id: \"").concat(player_id, "\") { id } }");
            _context7.prev = 1;
            _context7.next = 4;
            return graphql.request(query);

          case 4:
            _context7.next = 10;
            break;

          case 6:
            _context7.prev = 6;
            _context7.t0 = _context7["catch"](1);
            console.log(_context7.t0);
            return _context7.abrupt("return", false);

          case 10:
            return _context7.abrupt("return", true);

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 6]]);
  }));
  return _addClubPlayer.apply(this, arguments);
}

;

function makeOptionMenuPacks(packs) {
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

  t += "\nFUTPackBot v.1.0.0 | Made by Tjird#0001 | You can switch 3 minutes between pages";
  return t;
}

;

function makeTransferMenu(transfers, a, p, pp, am) {
  var t = new _asciiTable["default"]().setTitle("Transferpile of ".concat(a.username, "#").concat(a.discriminator, ". Page ").concat(p, "/").concat(pp, ". Amount ").concat(am, "/100.")).setHeading('ID', 'Name', 'Rating', 'Current bid', 'Buy now', 'Time remaining').setAlign(1, _asciiTable["default"].LEFT).setAlign(2, _asciiTable["default"].LEFT).setAlign(3, _asciiTable["default"].LEFT).setAlign(4, _asciiTable["default"].LEFT).setAlign(5, _asciiTable["default"].LEFT).setAlign(6, _asciiTable["default"].LEFT);
  var cDate = new Date();
  cDate = cDate.getTime();
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = transfers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var transfer = _step3.value;
      var cBid = void 0;
      var cTime = void 0;
      var cBuy = void 0;

      if (!transfer.auction_info || transfer.auction_info == undefined) {
        cBid = "-";
        cTime = "-";
        cBuy = "-";
      } else {
        cBid = transfer.auction_info.current_bid;
        cTime = transfer.auction_info.end_timestamp;
        cBuy = transfer.auction_info.buy_now;
      }

      t.addRow(transfer.id, transfer.card_info.meta_info.common_name ? transfer.card_info.meta_info.common_name : "".concat(transfer.card_info.meta_info.first_name, " ").concat(transfer.card_info.meta_info.last_name), transfer.card_info.rating, numberWithCommas(cBid), numberWithCommas(cBuy), transfer.auction_info ? (0, _humanizeDuration["default"])(cTime - cDate, {
        round: true,
        largest: 1
      }) : cTime);
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

  t += "\nFUTPackBot v.1.0.0 | Made by Tjird#0001 | You can switch 3 minutes between pages";
  return t;
}

;

function makeClubMenu(players, a, p, pp) {
  var t = new _asciiTable["default"]().setTitle("Club player(s) from ".concat(a.username, "#").concat(a.discriminator, ". Page ").concat(p, "/").concat(pp, ".")).setHeading('ID', 'Name', 'Rating', 'Version', 'Position').setAlign(1, _asciiTable["default"].LEFT).setAlign(2, _asciiTable["default"].LEFT).setAlign(3, _asciiTable["default"].LEFT).setAlign(4, _asciiTable["default"].LEFT).setAlign(5, _asciiTable["default"].LEFT);
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = players[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var player = _step4.value;
      t.addRow(player.id, player.card_info.meta_info.common_name ? player.card_info.meta_info.common_name : "".concat(player.card_info.meta_info.first_name, " ").concat(player.card_info.meta_info.last_name), player.card_info.rating, getRarityName("".concat(player.card_info.rareflag, "-").concat(getQuality(player.card_info.rating))), player.card_info.preferred_position);
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  t += "\nFUTPackBot v.1.0.0 | Made by Tjird#0001 | You can switch 3 minutes between pages";
  return t;
}

;

function getUserClubId(_x11) {
  return _getUserClubId.apply(this, arguments);
}

function _getUserClubId() {
  _getUserClubId = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(author_id) {
    var query, res;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            query = "{ getUserClubByAuthorId(author_id: \"".concat(author_id, "\") { id points coins creation_time } }");
            _context8.next = 3;
            return graphql.request(query);

          case 3:
            res = _context8.sent;
            return _context8.abrupt("return", res.getUserClubByAuthorId);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _getUserClubId.apply(this, arguments);
}

;

function getCurrentAuctionsCount(_x12, _x13) {
  return _getCurrentAuctionsCount.apply(this, arguments);
}

function _getCurrentAuctionsCount() {
  _getCurrentAuctionsCount = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9(club_id, name) {
    var query, res;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (!name || name == undefined) {
              query = "{ getCurrentAuctionsCount(club_id: \"".concat(club_id, "\") { auctions } }");
            } else {
              query = "{ getCurrentAuctionsCount(club_id: \"".concat(club_id, "\", name: \"").concat(name, "\") { auctions } }");
            }

            _context9.next = 3;
            return graphql.request(query);

          case 3:
            res = _context9.sent;
            return _context9.abrupt("return", res.getCurrentAuctionsCount);

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _getCurrentAuctionsCount.apply(this, arguments);
}

;

function createUserClub(_x14) {
  return _createUserClub.apply(this, arguments);
}

function _createUserClub() {
  _createUserClub = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10(author_id) {
    var query;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            query = "mutation { createUserClub(author_id: \"".concat(author_id, "\") { id } }");
            _context10.prev = 1;
            _context10.next = 4;
            return graphql.request(query);

          case 4:
            _context10.next = 10;
            break;

          case 6:
            _context10.prev = 6;
            _context10.t0 = _context10["catch"](1);
            console.log(_context10.t0);
            return _context10.abrupt("return", false);

          case 10:
            return _context10.abrupt("return", true);

          case 11:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 6]]);
  }));
  return _createUserClub.apply(this, arguments);
}

;

function getClubPlayer(_x15, _x16) {
  return _getClubPlayer.apply(this, arguments);
}

function _getClubPlayer() {
  _getClubPlayer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee11(club_id, player_id) {
    var query, res;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            query = "{ getClubPlayer(club_id: \"".concat(club_id, "\", player_id: \"").concat(player_id, "\") { id } }");
            console.log(query);
            _context11.next = 4;
            return graphql.request(query);

          case 4:
            res = _context11.sent;
            return _context11.abrupt("return", res.getClubPlayer);

          case 6:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _getClubPlayer.apply(this, arguments);
}

;

function getActiveAuctions(_x17, _x18, _x19) {
  return _getActiveAuctions.apply(this, arguments);
}

function _getActiveAuctions() {
  _getActiveAuctions = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee12(club_id, page, name) {
    var query, res;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            if (!name || name == undefined) {
              query = "{ getCurrentAuctions(club_id: \"".concat(club_id, "\", page: ").concat(page, ") { id current_bid buy_now end_timestamp card_info{ rating rareflag preferred_position meta_info{ first_name last_name common_name } } } }");
            } else {
              query = "{ getCurrentAuctions(club_id: \"".concat(club_id, "\", name: \"").concat(name, "\", page: ").concat(page, ") { id current_bid buy_now end_timestamp card_info{ rating rareflag preferred_position meta_info{ first_name last_name common_name } } } }");
            }

            _context12.next = 3;
            return graphql.request(query);

          case 3:
            res = _context12.sent;
            return _context12.abrupt("return", res.getCurrentAuctions);

          case 5:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _getActiveAuctions.apply(this, arguments);
}

;

function addCoinsToClub(_x20, _x21) {
  return _addCoinsToClub.apply(this, arguments);
}

function _addCoinsToClub() {
  _addCoinsToClub = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee13(club_id, coins) {
    var query;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            query = "mutation { addCoinsToClub(club_id: \"".concat(club_id, "\", coins: \"").concat(coins, "\") { id } }");
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
  return _addCoinsToClub.apply(this, arguments);
}

;

function addTransferpilePlayer(_x22, _x23, _x24) {
  return _addTransferpilePlayer.apply(this, arguments);
}

function _addTransferpilePlayer() {
  _addTransferpilePlayer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee14(club_id, player_id, auction_id) {
    var query;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            if (!auction_id || auction_id == undefined) {
              query = "mutation { addTransferPlayer(club_id: \"".concat(club_id, "\", player_id: \"").concat(player_id, "\") { id } }");
            } else {
              query = "mutation { addTransferPlayer(club_id: \"".concat(club_id, "\", player_id: \"").concat(player_id, "\", auction_id: ").concat(auction_id, ") { id } }");
            }

            _context14.prev = 1;
            _context14.next = 4;
            return graphql.request(query);

          case 4:
            _context14.next = 10;
            break;

          case 6:
            _context14.prev = 6;
            _context14.t0 = _context14["catch"](1);
            console.log(_context14.t0);
            return _context14.abrupt("return", false);

          case 10:
            return _context14.abrupt("return", true);

          case 11:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[1, 6]]);
  }));
  return _addTransferpilePlayer.apply(this, arguments);
}

;

function removeCoinsFromClub(_x25, _x26) {
  return _removeCoinsFromClub.apply(this, arguments);
}

function _removeCoinsFromClub() {
  _removeCoinsFromClub = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee15(club_id, coins) {
    var query;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            query = "mutation { removeCoinsFromClub(club_id: \"".concat(club_id, "\", coins: \"").concat(coins, "\") { id } }");
            _context15.prev = 1;
            _context15.next = 4;
            return graphql.request(query);

          case 4:
            _context15.next = 10;
            break;

          case 6:
            _context15.prev = 6;
            _context15.t0 = _context15["catch"](1);
            console.log(_context15.t0);
            return _context15.abrupt("return", false);

          case 10:
            return _context15.abrupt("return", true);

          case 11:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[1, 6]]);
  }));
  return _removeCoinsFromClub.apply(this, arguments);
}

;

function removePlayerFromTransferpile(_x27, _x28) {
  return _removePlayerFromTransferpile.apply(this, arguments);
}

function _removePlayerFromTransferpile() {
  _removePlayerFromTransferpile = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee16(club_id, id) {
    var query;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            query = "mutation { removePlayerFromTransferpile(club_id: \"".concat(club_id, "\", id: ").concat(id, ") { id } }");
            _context16.prev = 1;
            _context16.next = 4;
            return graphql.request(query);

          case 4:
            _context16.next = 10;
            break;

          case 6:
            _context16.prev = 6;
            _context16.t0 = _context16["catch"](1);
            console.log(_context16.t0);
            return _context16.abrupt("return", false);

          case 10:
            return _context16.abrupt("return", true);

          case 11:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[1, 6]]);
  }));
  return _removePlayerFromTransferpile.apply(this, arguments);
}

;

function removePlayerFromClub(_x29, _x30) {
  return _removePlayerFromClub.apply(this, arguments);
}

function _removePlayerFromClub() {
  _removePlayerFromClub = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee17(club_id, id) {
    var query;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            query = "mutation { removePlayerFromClub(club_id: \"".concat(club_id, "\", id: ").concat(id, ") { id } }");
            _context17.prev = 1;
            _context17.next = 4;
            return graphql.request(query);

          case 4:
            _context17.next = 10;
            break;

          case 6:
            _context17.prev = 6;
            _context17.t0 = _context17["catch"](1);
            console.log(_context17.t0);
            return _context17.abrupt("return", false);

          case 10:
            return _context17.abrupt("return", true);

          case 11:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[1, 6]]);
  }));
  return _removePlayerFromClub.apply(this, arguments);
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

function makePlayerCard(_x31) {
  return _makePlayerCard.apply(this, arguments);
}

function _makePlayerCard() {
  _makePlayerCard = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee18(player_info) {
    var positions, packCard, ctx, colors, background, playerpicture, playername, pSize, pHeight, nation, club, attachment;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
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
            _context18.next = 9;
            return getCardColor(player_info.rareflag, player_info.rating);

          case 9:
            colors = _context18.sent;
            _context18.next = 12;
            return Canvas.loadImage("http://fifa.tjird.nl/cards/".concat(player_info.rareflag, "-").concat(getQuality(player_info.rating), ".png"));

          case 12:
            background = _context18.sent;
            ctx.drawImage(background, 0, 0, 644 / 2.15, 900 / 2.15);
            _context18.next = 16;
            return Canvas.loadImage(player_info.meta_info.img);

          case 16:
            playerpicture = _context18.sent;
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
            _context18.next = 32;
            return Canvas.loadImage(player_info.nation_info.img);

          case 32:
            nation = _context18.sent;
            ctx.drawImage(nation, 70, 128, nation.width * 0.6, nation.height * 0.6);
            _context18.next = 36;
            return Canvas.loadImage(player_info.club_info.img);

          case 36:
            club = _context18.sent;
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
            return _context18.abrupt("return", attachment);

          case 79:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));
  return _makePlayerCard.apply(this, arguments);
}

;

function setDialogue(_x32, _x33, _x34) {
  return _setDialogue.apply(this, arguments);
}

function _setDialogue() {
  _setDialogue = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee20(f, c, t) {
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            return _context20.abrupt("return", new Promise(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee19(resolve, reject) {
                return _regenerator["default"].wrap(function _callee19$(_context19) {
                  while (1) {
                    switch (_context19.prev = _context19.next) {
                      case 0:
                        _context19.next = 2;
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
                        return _context19.stop();
                    }
                  }
                }, _callee19);
              }));

              return function (_x50, _x51) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  }));
  return _setDialogue.apply(this, arguments);
}

;

function setDialogueReactions(_x35, _x36, _x37) {
  return _setDialogueReactions.apply(this, arguments);
}

function _setDialogueReactions() {
  _setDialogueReactions = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee22(f, m, t) {
    return _regenerator["default"].wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            return _context22.abrupt("return", new Promise(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee21(resolve, reject) {
                return _regenerator["default"].wrap(function _callee21$(_context21) {
                  while (1) {
                    switch (_context21.prev = _context21.next) {
                      case 0:
                        _context21.next = 2;
                        return m.awaitReactions(f, {
                          max: 1,
                          time: t
                        }).then(function (collected) {
                          var f = collected.first();
                          resolve(f);
                        })["catch"](function (e) {
                          reject();
                        });

                      case 2:
                      case "end":
                        return _context21.stop();
                    }
                  }
                }, _callee21);
              }));

              return function (_x52, _x53) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22);
  }));
  return _setDialogueReactions.apply(this, arguments);
}

;

function getClubCollectionCount(_x38, _x39) {
  return _getClubCollectionCount.apply(this, arguments);
}

function _getClubCollectionCount() {
  _getClubCollectionCount = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee23(club_id, name) {
    var query, res;
    return _regenerator["default"].wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            if (!name || name == undefined) {
              query = "{ getClubCollection(club_id: \"".concat(club_id, "\") { player_id } }");
            } else {
              query = "{ getClubCollection(club_id: \"".concat(club_id, "\", name: \"").concat(name, "\") { player_id } }");
            }

            _context23.next = 3;
            return graphql.request(query);

          case 3:
            res = _context23.sent;
            return _context23.abrupt("return", res.getClubCollection);

          case 5:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23);
  }));
  return _getClubCollectionCount.apply(this, arguments);
}

;

function getClubCollection(_x40, _x41, _x42) {
  return _getClubCollection.apply(this, arguments);
}

function _getClubCollection() {
  _getClubCollection = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee24(club_id, page, name) {
    var query, res;
    return _regenerator["default"].wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            if (!name || name == undefined) {
              query = "{ getClubCollection(club_id: \"".concat(club_id, "\", page: ").concat(page, ") { id card_info { rating rareflag preferred_position meta_info { first_name last_name common_name } } } }");
            } else {
              query = "{ getClubCollection(club_id: \"".concat(club_id, "\", page: ").concat(page, ", name: \"").concat(name, "\") { id card_info { rating rareflag preferred_position meta_info { first_name last_name common_name } } } }");
            }

            _context24.next = 3;
            return graphql.request(query);

          case 3:
            res = _context24.sent;
            return _context24.abrupt("return", res.getClubCollection);

          case 5:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24);
  }));
  return _getClubCollection.apply(this, arguments);
}

;

function getClubTransferpileCount(_x43) {
  return _getClubTransferpileCount.apply(this, arguments);
}

function _getClubTransferpileCount() {
  _getClubTransferpileCount = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee25(club_id) {
    var query, res;
    return _regenerator["default"].wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            query = "{ getTransferpile(club_id: \"".concat(club_id, "\") { player_id } }");
            _context25.next = 3;
            return graphql.request(query);

          case 3:
            res = _context25.sent;
            return _context25.abrupt("return", res.getTransferpile);

          case 5:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25);
  }));
  return _getClubTransferpileCount.apply(this, arguments);
}

;

function getClubPlayerById(_x44, _x45) {
  return _getClubPlayerById.apply(this, arguments);
}

function _getClubPlayerById() {
  _getClubPlayerById = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee26(club_id, id) {
    var query, res;
    return _regenerator["default"].wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            query = "{ getClubCollectionPlayer(club_id: \"".concat(club_id, "\", id: \"").concat(id, "\") { id player_id card_info { rating rareflag preferred_position meta_info { first_name last_name common_name } } } }");
            _context26.next = 3;
            return graphql.request(query);

          case 3:
            res = _context26.sent;
            return _context26.abrupt("return", res.getClubCollectionPlayer);

          case 5:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26);
  }));
  return _getClubPlayerById.apply(this, arguments);
}

;

function getTransferpilePlayerById(_x46, _x47) {
  return _getTransferpilePlayerById.apply(this, arguments);
}

function _getTransferpilePlayerById() {
  _getTransferpilePlayerById = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee27(club_id, id) {
    var query, res;
    return _regenerator["default"].wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            query = "{ getTransferpilePlayer(club_id: \"".concat(club_id, "\", id: \"").concat(id, "\") { id player_id auction_info{current_bid buy_now end_timestamp} card_info { rating rareflag preferred_position meta_info { first_name last_name common_name } } } }");
            _context27.next = 3;
            return graphql.request(query);

          case 3:
            res = _context27.sent;
            return _context27.abrupt("return", res.getTransferpilePlayer);

          case 5:
          case "end":
            return _context27.stop();
        }
      }
    }, _callee27);
  }));
  return _getTransferpilePlayerById.apply(this, arguments);
}

;

function getClubTransferpile(_x48, _x49) {
  return _getClubTransferpile.apply(this, arguments);
}

function _getClubTransferpile() {
  _getClubTransferpile = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee28(club_id, page) {
    var query, res;
    return _regenerator["default"].wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            query = "{ getTransferpile(club_id: \"".concat(club_id, "\", page: ").concat(page, ") { id auction_info{current_bid buy_now end_timestamp} card_info { rating rareflag preferred_position meta_info { first_name last_name common_name } } } }");
            _context28.next = 3;
            return graphql.request(query);

          case 3:
            res = _context28.sent;
            return _context28.abrupt("return", res.getTransferpile);

          case 5:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee28);
  }));
  return _getClubTransferpile.apply(this, arguments);
}

;
module.exports = {
  getClubTransferpileCount: getClubTransferpileCount,
  getClubPlayerById: getClubPlayerById,
  getTransferpilePlayerById: getTransferpilePlayerById,
  getClubTransferpile: getClubTransferpile,
  getQuality: getQuality,
  removePlayerFromTransferpile: removePlayerFromTransferpile,
  removePlayerFromClub: removePlayerFromClub,
  getRarityName: getRarityName,
  getPlayer: getPlayer,
  getCardColor: getCardColor,
  getPacks: getPacks,
  getPacksByName: getPacksByName,
  numberWithCommas: numberWithCommas,
  getPackById: getPackById,
  makeTransferMenu: makeTransferMenu,
  getAnimation: getAnimation,
  addClubPlayer: addClubPlayer,
  getUserClubId: getUserClubId,
  createUserClub: createUserClub,
  getClubPlayer: getClubPlayer,
  addCoinsToClub: addCoinsToClub,
  setDialogueReactions: setDialogueReactions,
  removeCoinsFromClub: removeCoinsFromClub,
  makePlayerCard: makePlayerCard,
  setDialogue: setDialogue,
  makeOptionMenuPacks: makeOptionMenuPacks,
  getClubCollectionCount: getClubCollectionCount,
  getClubCollection: getClubCollection,
  getActiveAuctions: getActiveAuctions,
  makeAuctionMenu: makeAuctionMenu,
  getCurrentAuctionsCount: getCurrentAuctionsCount,
  addTransferpilePlayer: addTransferpilePlayer,
  makeClubMenu: makeClubMenu,
  getPlayerVersionById: getPlayerVersionById
};