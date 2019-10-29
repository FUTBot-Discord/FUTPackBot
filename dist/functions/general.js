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
            query = "{ getPlayerVersionPackEmulator(ratingB: ".concat(ratingB, ", ratingT: ").concat(ratingT, ", rareflag: \"").concat(rareflag, "\") { def dri nation_info{ img } pac pas phy meta_info{ common_name last_name first_name img } preferred_position rareflag rating sho club_info{ img } } }");
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
  getAnimation: getAnimation
};