"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _graphqlRequest = require("graphql-request");

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
            query = "{ getPacks { id name_id name description price players } }";
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
            query = "{ getPacks(name: \"".concat(name, "\") { id name_id name description price players } }");
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
            query = "{ getUserClubByAuthorId(author_id: \"".concat(author_id, "\") { id } }");
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

function createUserClub(_x11) {
  return _createUserClub.apply(this, arguments);
}

function _createUserClub() {
  _createUserClub = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(author_id) {
    var query;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            query = "mutation { createUserClub(author_id: \"".concat(author_id, "\") { id } }");
            _context8.prev = 1;
            _context8.next = 4;
            return graphql.request(query);

          case 4:
            _context8.next = 10;
            break;

          case 6:
            _context8.prev = 6;
            _context8.t0 = _context8["catch"](1);
            console.log(_context8.t0);
            return _context8.abrupt("return", false);

          case 10:
            return _context8.abrupt("return", true);

          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 6]]);
  }));
  return _createUserClub.apply(this, arguments);
}

;

function getClubPlayer(_x12, _x13) {
  return _getClubPlayer.apply(this, arguments);
}

function _getClubPlayer() {
  _getClubPlayer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9(club_id, player_id) {
    var query, res;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            query = "{ getClubPlayer(club_id: \"".concat(club_id, "\", player_id: \"").concat(player_id, "\") { id } }");
            _context9.next = 3;
            return graphql.request(query);

          case 3:
            res = _context9.sent;
            return _context9.abrupt("return", res.getClubPlayer);

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _getClubPlayer.apply(this, arguments);
}

;

function addCoinsToClub(_x14, _x15) {
  return _addCoinsToClub.apply(this, arguments);
}

function _addCoinsToClub() {
  _addCoinsToClub = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10(club_id, coins) {
    var query;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            query = "mutation { addCoinsToClub(club_id: \"".concat(club_id, "\", coins: \"").concat(coins, "\") { id } }");
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
  return _addCoinsToClub.apply(this, arguments);
}

;

function removeCoinsFromClub(_x16, _x17) {
  return _removeCoinsFromClub.apply(this, arguments);
}

function _removeCoinsFromClub() {
  _removeCoinsFromClub = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee11(club_id, coins) {
    var query;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            query = "mutation { removeCoinsFromClub(club_id: \"".concat(club_id, "\", coins: \"").concat(coins, "\") { id } }");
            _context11.prev = 1;
            _context11.next = 4;
            return graphql.request(query);

          case 4:
            _context11.next = 10;
            break;

          case 6:
            _context11.prev = 6;
            _context11.t0 = _context11["catch"](1);
            console.log(_context11.t0);
            return _context11.abrupt("return", false);

          case 10:
            return _context11.abrupt("return", true);

          case 11:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[1, 6]]);
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
  removeCoinsFromClub: removeCoinsFromClub
};